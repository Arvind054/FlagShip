import { auth } from "@/lib/auth";
import { db } from "@/src/DB";
import { featureEnvironments, features, projects, user } from "@/src/DB/schema";
import { and, eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


// Function to delete a project and all its features/environments
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
        
        const { id: projectId } = await params;
        if (!projectId) {
            return NextResponse.json({ error: "Project Id Not Found" }, { status: 400 });
        }

        // Verify the project belongs to the user
        const [project] = await db
            .select()
            .from(projects)
            .where(and(eq(projects.id, projectId), eq(projects.userId, userData.id)))
            .limit(1);

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Get all features for this project
        const projectFeatures = await db
            .select()
            .from(features)
            .where(eq(features.projectId, projectId));

        // Delete all feature environments for all features in this project
        if (projectFeatures.length > 0) {
            const featureIds = projectFeatures.map(f => f.id);
            await db
                .delete(featureEnvironments)
                .where(inArray(featureEnvironments.featureId, featureIds));

            // Delete all features for this project
            await db
                .delete(features)
                .where(eq(features.projectId, projectId));
        }

        // Finally delete the project
        const deleted = await db
            .delete(projects)
            .where(eq(projects.id, projectId))
            .returning();

        if (!deleted.length) {
            return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
        }

        return NextResponse.json({ message: "Project deleted successfully" });
    } catch (err) {
        console.error("Error deleting project:", err);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
