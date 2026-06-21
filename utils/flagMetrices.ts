import { flagMatricesTypes } from "@/lib/types/FlagMetricesTypes";
import { db } from "@/src/DB";
import {features, flagMetrices } from "@/src/DB/schema";
import { and, eq, sql } from "drizzle-orm";



// Helper Function to Update the Flag Metrices.
// Store analytics in fixed hourly buckets (HH:00:00 through HH:59:59).

export default async function updateFlagMetrices(flagDetails: flagMatricesTypes) {
    const bucketStart = new Date(flagDetails.evaluationTime);
    bucketStart.setMinutes(0, 0, 0);
    const [{ id: featureId } = {}] = await db
        .select({ id: features.id })
        .from(features)
        .where(eq(features.key, flagDetails.flagKey))
        .limit(1);

    if (!featureId) {
        return;
    }

    const [existingTable] = await db
        .select({ id: flagMetrices.id })
        .from(flagMetrices)
        .where(
            and(
                eq(flagMetrices.flagId, featureId),
                eq(flagMetrices.bucketStart, bucketStart),
            ),
        )
        .limit(1);

    const isEnabled = flagDetails.isEnabled ? 1 : 0;
    const isDisabled = flagDetails.isEnabled ? 0 : 1;
    const isCacheHit = flagDetails.isCacheHits ? 1 : 0;
    const isCacheMiss = flagDetails.isCacheHits ? 0 : 1;
    const latency = Number(flagDetails.timeTakenToEval);

    if (existingTable) {
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
            .where(eq(flagMetrices.id, existingTable.id));

        return;
    }

    await db.insert(flagMetrices).values({
        flagId: featureId,
        bucketStart,
        evaluations: 1,
        enabledCount: isEnabled,
        disabledCount: isDisabled,
        cacheHits: isCacheHit,
        cacheMisses: isCacheMiss,
        latencySums: latency,
    });
};