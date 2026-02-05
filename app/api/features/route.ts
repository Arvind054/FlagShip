import { auth } from "@/lib/auth";
import { db } from "@/src/DB";
import { featureEnvironments, features, user } from "@/src/DB/schema";
import { eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Function to create a New Feature
export async function POST(req: NextRequest){
    try{
        const {projectId, key, name, description,type} = await req.json();
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
            const feature = await db.insert(features).values({
                projectId,
                key,
                name, 
                description,
                type,
            }).returning();
           const featureId = feature[0]?.id;
           await db.insert(featureEnvironments).values([
            {featureId, environment: "dev"},
            {featureId, environment: "staging"},
            {featureId, environment: "prod"}
           ]);
           return NextResponse.json(feature[0],{status: 201});

    }catch(err){
        return NextResponse.json({error: "Failed to Create feature"}, {status: 500})
    }
}

// Function to get the Features by project Id

export async function GET(req: NextRequest){
    try{
    const {searchParams} = new URL(req.url);
    const projectId = searchParams.get("projectId");
    
    if (!projectId) {
        return NextResponse.json({error: "projectId is required"}, {status: 400});
    }
    
    const projectFeatures = await db.select().from(features).where(eq(features.projectId, projectId));

    const featureIds = projectFeatures.map(p=>p.id);
    const environments = await db.select().from(featureEnvironments).where(inArray(featureEnvironments.featureId,featureIds));

    const data = projectFeatures.map(feature=>({
        ...feature,
        environments: environments.filter(env=>env.featureId===feature.id)
    }));
    
    return NextResponse.json(data, {status: 201});
    }catch(err){
        return NextResponse.json({error: "Error Getting Project Features"}, {status: 500});
    }
}
