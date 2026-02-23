import { auth } from "@/lib/auth";
import { db } from "@/src/DB";
import { featureEnvironments, features, user } from "@/src/DB/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


// Function to update the feature Environment
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ featureId: string }> }) {
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
        const { featureId } = await params;
        const { environment, status, rolloutPercentage, rules } = await req.json();
        if(!environment){
            return NextResponse.json({error: "Environment not Found"}, {status:500});
        }
         const updated = await db
      .update(featureEnvironments)
      .set({
        ...(status !== undefined && { status }),
        ...(rolloutPercentage !== undefined && { rolloutPercentage }),
        ...(rules !== undefined && { rules }),
      })
      .where(
        and(
          eq(featureEnvironments.featureId, featureId),
          eq(featureEnvironments.environment, environment)
        )
      )
      .returning();

    return NextResponse.json(updated[0]);
    }
    catch (err) {
        return NextResponse.json({ error: "Failed to Update the feature Environments" }, { status: 500 });
    }
}


export async function GET(req: NextRequest, { params }: { params: Promise<{ featureId: string }> }) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const { featureId } = await params;
        if (!featureId) {
            return NextResponse.json({ error: "Feature Id Not Found" }, { status: 400 });
        }

        // Get feature details
        const [feature] = await db
            .select()
            .from(features)
            .where(eq(features.id, featureId))
            .limit(1);

        if (!feature) {
            return NextResponse.json({ error: "Feature not found" }, { status: 404 });
        }

        // Get feature environments
        const environments = await db
            .select()
            .from(featureEnvironments)
            .where(eq(featureEnvironments.featureId, featureId));

        return NextResponse.json({
            ...feature,
            environments,
            lastUpdated: feature.createdAt // Use createdAt as lastUpdated for now
        });
    } catch (err) {
        console.error("Error getting Feature Details:", err);
        return NextResponse.json({ error: "Error getting Feature Details" }, { status: 500 });
    }
}


// Function to delete a feature and its environments
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ featureId: string }> }) {
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
        
        const { featureId } = await params;
        if (!featureId) {
            return NextResponse.json({ error: "Feature Id Not Found" }, { status: 400 });
        }

        // First delete all feature environments
        await db
            .delete(featureEnvironments)
            .where(eq(featureEnvironments.featureId, featureId));

        // Then delete the feature itself
        const deleted = await db
            .delete(features)
            .where(eq(features.id, featureId))
            .returning();

        if (!deleted.length) {
            return NextResponse.json({ error: "Feature not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Feature deleted successfully" });
    } catch (err) {
        console.error("Error deleting feature:", err);
        return NextResponse.json({ error: "Failed to delete feature" }, { status: 500 });
    }
}


