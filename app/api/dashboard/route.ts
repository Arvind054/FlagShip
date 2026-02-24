import { auth } from "@/lib/auth";
import { db } from "@/src/DB";
import { featureEnvironments, features, projects, user } from "@/src/DB/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Get dashboard stats for the current user
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

        const projectCount = userProjects.length;

        if (projectCount === 0) {
            return NextResponse.json({
                projectCount: 0,
                flagCount: 0,
                activeFlags: 0,
                partialRolloutFlags: 0,
                recentFlags: [],
            }, { status: 200 });
        }

        const projectIds = userProjects.map(p => p.id);

        // Get all features for these projects
        const allFeatures = await db
            .select()
            .from(features)
            .where(inArray(features.projectId, projectIds))
            .orderBy(desc(features.createdAt));

        const flagCount = allFeatures.length;

        if (flagCount === 0) {
            return NextResponse.json({
                projectCount,
                flagCount: 0,
                activeFlags: 0,
                partialRolloutFlags: 0,
                recentFlags: [],
            }, { status: 200 });
        }

        const featureIds = allFeatures.map(f => f.id);

        // Get all environments for these features
        const environments = await db
            .select()
            .from(featureEnvironments)
            .where(inArray(featureEnvironments.featureId, featureIds));

        // Calculate stats
        let activeFlags = 0;
        let partialRolloutFlags = 0;

        // Count active flags and partial rollout flags
        const featuresWithEnvs = allFeatures.map(feature => {
            const featureEnvs = environments.filter(env => env.featureId === feature.id);
            const project = userProjects.find(p => p.id === feature.projectId);
            
            // A flag is active if any environment has status = true
            const isActive = featureEnvs.some(env => env.status === true);
            
            // A flag has partial rollout if any environment has rollout between 1 and 99
            const hasPartialRollout = featureEnvs.some(
                env => env.rolloutPercentage !== null && 
                       env.rolloutPercentage > 0 && 
                       env.rolloutPercentage < 100
            );

            if (isActive) activeFlags++;
            if (hasPartialRollout) partialRolloutFlags++;

            return {
                id: feature.id,
                key: feature.key,
                name: feature.name,
                description: feature.description,
                type: feature.type,
                projectId: feature.projectId,
                projectName: project?.name || "Unknown",
                createdAt: feature.createdAt,
                environments: featureEnvs,
                isActive,
                hasPartialRollout,
            };
        });

        // Get recent 5 flags
        const recentFlags = featuresWithEnvs.slice(0, 5);

        return NextResponse.json({
            projectCount,
            flagCount,
            activeFlags,
            partialRolloutFlags,
            recentFlags,
        }, { status: 200 });

    } catch (err) {
        console.error("Dashboard API error:", err);
        return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
    }
}
