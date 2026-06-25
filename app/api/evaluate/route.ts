import { evaluateRules } from "@/lib/evaluateRules";
import { redis } from "@/lib/radis";
import { isInRollout } from "@/lib/rolloutPercenatge";
import { db } from "@/src/DB";
import { featureEnvironments, features, projects } from "@/src/DB/schema";
import updateFlagMetrices from "@/utils/flagMetrices";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type FeatureRule = {
    field: string;
    operator: string;
    value: any;
};

type FeatureConfig = {
    status: boolean | null;
    rolloutPercentage: number | null;
    rules: FeatureRule[] | null;
};

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    const startTime = Date.now();
    const flagMetricesData = {
        flagKey: "",
        evaluationTime: new Date(),
        isEnabled: false,
        isCacheHits: false,
        timeTakenToEval: 0,
    };

    try {
        const t0 = performance.now();
        const body = await req.json();
        const { apiKey, featureKey, environment, user } = body;
        if (!featureKey || !apiKey) {
            throw new Error("Feature Key Not found");

        }

        // Checking for Cache
        const cacheKey = `flag:${apiKey}:${featureKey}:${environment}`;
        flagMetricesData.flagKey = featureKey;
        let config: FeatureConfig | null = null;
       
        try {
            const cached = await redis.get<FeatureConfig>(cacheKey);
            if (cached) {
                config = typeof cached === "string" ? JSON.parse(cached) : cached;
                flagMetricesData.isCacheHits = true;
            }
        } catch (err) {
            console.log("Error getting Cached Key", err);
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
                flagMetricesData.isEnabled = false;
                flagMetricesData.evaluationTime = new Date();
                flagMetricesData.timeTakenToEval = Date.now() - startTime;
                await updateFlagMetrices(flagMetricesData);
                return NextResponse.json({ enabled: false }, { headers: corsHeaders });
            }

            config = result[0];

            // Cache config only
            try {
                await redis.set(cacheKey, JSON.stringify(config), { ex: 300 });
            } catch (err) {
                console.error("Redis set failed:", err);
            }
        }

        if (!config) {
            throw new Error("Feature config not found");
        }
                
        if (!config.status) {
              flagMetricesData.isEnabled = false;
              flagMetricesData.evaluationTime = new Date();
              flagMetricesData.timeTakenToEval = Date.now() - startTime;
              await updateFlagMetrices(flagMetricesData);
            return NextResponse.json({ enabled: false }, { headers: corsHeaders });
        }

        if (config.rules && !evaluateRules(config.rules, user)) {
             flagMetricesData.isEnabled = false;
             flagMetricesData.evaluationTime = new Date();
             flagMetricesData.timeTakenToEval = Date.now() - startTime;
             await updateFlagMetrices(flagMetricesData);
            return NextResponse.json({ enabled: false }, { headers: corsHeaders });
        }

        if (!isInRollout(user?.id, config.rolloutPercentage)) {
             flagMetricesData.isEnabled = false;
            flagMetricesData.evaluationTime = new Date();
            flagMetricesData.timeTakenToEval = Date.now() - startTime;
            await updateFlagMetrices(flagMetricesData);
            return NextResponse.json({ enabled: false }, { headers: corsHeaders });
        }
          flagMetricesData.isEnabled = true;
         flagMetricesData.evaluationTime = new Date();
         flagMetricesData.timeTakenToEval = Date.now() - startTime;
        // console.log("Time before insertion: ", performance.now()-t0);
         await updateFlagMetrices(flagMetricesData);
        // console.log("Time after insertion: ", performance.now()-t0);
        return NextResponse.json({ enabled: true }, { headers: corsHeaders });

    } catch (err) {
        console.log("error ", err);
         flagMetricesData.isEnabled = false;
        flagMetricesData.evaluationTime = new Date();
        flagMetricesData.timeTakenToEval = Date.now() - startTime;
        await updateFlagMetrices(flagMetricesData);
        return NextResponse.json({ enabled: false }, { headers: corsHeaders });
    }
}