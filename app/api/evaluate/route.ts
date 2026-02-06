import { evaluateRules } from "@/lib/evaluateRules";
import { isInRollout } from "@/lib/rolloutPercenatge";
import { db } from "@/src/DB";
import { featureEnvironments, features, projects } from "@/src/DB/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { apiKey, featureKey, environment, user } = await req.json();

        // Validation for feature ->project
        const project = await db.select()
            .from(projects)
            .where(eq(projects.apiKey, apiKey))
            .limit(1);

        if (!project.length) return NextResponse.json({ enabled: false });

        // Validate feature
        const feature = await db.select()
            .from(features)
            .where(and(eq(features.id, featureKey), eq(features.projectId, project[0]?.id)))
            .limit(1);

        if (!feature.length) return NextResponse.json({ enabled: false });
        // Validate feature environment
        const envConfig = await db.select()
            .from(featureEnvironments)
            .where(and(eq(featureEnvironments.featureId, feature[0].id), featureEnvironments.environment, environment))
            .limit(1);
        if (!envConfig.length || !envConfig[0].status) return NextResponse.json({ enabled: false });

        const rules = envConfig[0].rules;
        if (rules && !evaluateRules(rules, user)) {
            return NextResponse.json({ enabled: true });
        }
        const rollOut = envConfig[0].rolloutPercentage;
        if (!isInRollout(user?.id, rollOut)) {
            return NextResponse.json({ enabled: true });
        }
        return NextResponse.json({ enabled: true });

    } catch (err) {
        console.log("error ", err);
        return NextResponse.json({ enabled: false });
    }
}