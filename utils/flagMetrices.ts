import { flagMatricesTypes } from "@/lib/types/FlagMetricesTypes";
import { db } from "@/src/DB";
import { flagMetrices } from "@/src/DB/schema";
import { and, eq, sql } from "drizzle-orm";



// Helper Function to Update the Flag Metrices.
// Store analytics in fixed hourly buckets (HH:00:00 through HH:59:59).

export default async function updateFlagMetrices(flagDetails: flagMatricesTypes) {
    const bucketStart = new Date(flagDetails.evaluationTime);
    bucketStart.setMinutes(0, 0, 0);

    const existingTable = await db
        .select({ id: flagMetrices.id })
        .from(flagMetrices)
        .where(
            and(
                eq(flagMetrices.flagId, flagDetails.flagId),
                eq(flagMetrices.bucketStart, bucketStart),
            ),
        )
        .limit(1);

    const isEnabled = flagDetails.isEnabled ? 1 : 0;
    const isDisabled = flagDetails.isEnabled ? 0 : 1;
    const isCacheHit = flagDetails.isCacheHits ? 1 : 0;
    const isCacheMiss = flagDetails.isCacheHits ? 0 : 1;
    const latency = Number(flagDetails.timeTakenToEval);

    if (existingTable.length > 0) {
        await db
            .update(flagMetrices)
            .set({
                evaluations: sql`${flagMetrices.evaluations} + 1`,
                enabledCount: sql`${flagMetrices.enabledCount} + ${isEnabled}`,
                disabledCount: sql`${flagMetrices.disabledCount} + ${isDisabled}`,
                cacheHits: sql`${flagMetrices.cacheHits} + ${isCacheHit}`,
                cacheMisses: sql`${flagMetrices.cacheMisses} + ${isCacheMiss}`,
                latencySums: sql`${flagMetrices.latencySums} + ${latency}`,
            })
            .where(eq(flagMetrices.id, existingTable[0].id));

        return;
    }

    await db.insert(flagMetrices).values({
        flagId: flagDetails.flagId,
        bucketStart,
        evaluations: 1,
        enabledCount: isEnabled,
        disabledCount: isDisabled,
        cacheHits: isCacheHit,
        cacheMisses: isCacheMiss,
        latencySums: latency,
    });
};