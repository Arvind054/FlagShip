import { auth } from "@/lib/auth";
import { generateAPIKey } from "@/lib/generate_API_key";
import { db } from "@/src/DB";
import { features, projects, user } from "@/src/DB/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const projectId = searchParams.get("id");
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const [userData] = await db
            .select()
            .from(user)
            .where(eq(user.id, session.user.id))
            .limit(1);
        if (!userData || !userData.email) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (projectId) {
            const project = await db.select()
                .from(projects)
                .where(and(eq(projects.id, projectId), eq(projects?.userId, userData?.id))).limit(1);
            if (!project[0]) {
                return NextResponse.json({ error: "Project Not Found" }, { status: 404 });
            }
            const projectFeatures = await db.select()
                .from(features)
                .where(eq(features.projectId, project[0].id));
            const response = {
                ...project[0],
                features: projectFeatures,
            };
            return NextResponse.json(response);
        }
        const allProjects = await db.select()
            .from(projects)
            .where(eq(projects?.userId, userData?.id));
      
        return NextResponse.json(allProjects);
    } catch (err) {
        return NextResponse.json({ error: "Failed to Create Project" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {

        const { name, description } = await req.json();
        console.log("description is  ", description);
        if (!name) {
            return NextResponse.json({ error: "Project Name Not Found" }, { status: 404 });
        }
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const [userData] = await db
            .select()
            .from(user)
            .where(eq(user.id, session.user.id))
            .limit(1);
        if (!userData || !userData.email) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const apiKey = generateAPIKey();
        const project = await db.insert(projects).values({ name, description, userId: userData?.id, apiKey }).returning();
        return NextResponse.json(project[0], { status: 201 });

    } catch (err) {
        console.log("error is ", err);
        return NextResponse.json({ error: "Failed to Create Project" }, { status: 500 });
    }
}