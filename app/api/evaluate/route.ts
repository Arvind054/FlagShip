import { evaluateRules } from "@/lib/evaluateRules";
import { redis } from "@/lib/radis";
import { isInRollout } from "@/lib/rolloutPercenatge";
import { db } from "@/src/DB";
import { featureEnvironments, features, projects } from "@/src/DB/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { apiKey, featureKey, environment, user } = await req.json();

        // Checking for Cache
        const cacheKey = `flag:${apiKey}:${featureKey}:${environment}`;
        let config;
        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                config = JSON.parse(cached);
            }
        } catch (err) {
            console.log("error occured ", err);
        }
        // Validation for feature ->project
        if (!config) {
            const result = await db
                .select({
                    status: featureEnvironments.status,
                    rolloutPercentage: featureEnvironments.rolloutPercentage,
                    rules: featureEnvironments.rules,
                })
                .from(features)
                .innerJoin(projects, eq(features.projectId, projects.id))
                .innerJoin(
                    featureEnvironments,
                    eq(featureEnvironments.featureId, features.id)
                )
                .where(
                    and(
                        eq(projects.apiKey, apiKey),
                        eq(features.key, featureKey),
                        eq(featureEnvironments.environment, environment)
                    )
                )
                .limit(1);

            if (!result.length) {
                return NextResponse.json({ enabled: false });
            }

            config = result[0];

            // Cache config only
            try {
                await redis.set(cacheKey, JSON.stringify(config), "EX", 120);
            } catch (err) {
                console.error("Redis set failed:", err);
            }
        }

        if (!config.status) {
            return NextResponse.json({ enabled: false });
        }

        if (config.rules && !evaluateRules(config.rules, user)) {
            return NextResponse.json({ enabled: false });
        }

        if (!isInRollout(user?.id, config.rolloutPercentage)) {
            return NextResponse.json({ enabled: false });
        }

        return NextResponse.json({ enabled: true });

    } catch (err) {
        console.log("error ", err);
        return NextResponse.json({ enabled: false });
    }
}