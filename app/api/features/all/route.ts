import { auth } from "@/lib/auth";
import { db } from "@/src/DB";
import { featureEnvironments, features, projects, user } from "@/src/DB/schema";
import { eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Get all features for the current user (across all their projects)
export async function GET(req: NextRequest) {
    try {
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

        // Get all projects for the user
        const userProjects = await db
            .select()
            .from(projects)
            .where(eq(projects.userId, userData.id));

        if (userProjects.length === 0) {
            return NextResponse.json({ flags: [], projects: [] }, { status: 200 });
        }

        const projectIds = userProjects.map(p => p.id);

        // Get all features for these projects
        const allFeatures = await db
            .select()
            .from(features)
            .where(inArray(features.projectId, projectIds));

        if (allFeatures.length === 0) {
            return NextResponse.json({ flags: [], projects: userProjects }, { status: 200 });
        }

        const featureIds = allFeatures.map(f => f.id);

        // Get all environments for these features
        const environments = await db
            .select()
            .from(featureEnvironments)
            .where(inArray(featureEnvironments.featureId, featureIds));

        // Combine features with their environments
        const data = allFeatures.map(feature => ({
            ...feature,
            environments: environments.filter(env => env.featureId === feature.id)
        }));

        return NextResponse.json({ flags: data, projects: userProjects }, { status: 200 });
    } catch (err) {
        console.error("Error fetching all features:", err);
        return NextResponse.json({ error: "Failed to fetch features" }, { status: 500 });
    }
}
