import { auth } from "@/lib/auth";
import { db } from "@/src/DB";
import { featureEnvironments, user } from "@/src/DB/schema";
import { error } from "console";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


// Function to update the feature Environment
export async function PATCH(req: NextRequest, { params }: { params: { featureId: string } }) {
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
        const { featureId } = params;
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


