import { auth } from "@/lib/auth";
import { db } from "@/src/DB";
import { flagMetrices } from "@/src/DB/schema";
import { and, asc, eq, gte } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



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

        const searchParams = req.nextUrl.searchParams;
        const requestedDays = Number(searchParams.get("days") ?? 1);
        const limitDays = Number.isFinite(requestedDays) && requestedDays > 0 ? requestedDays : 1;
        const fromDate = new Date(Date.now() - limitDays * 24 * 60 * 60 * 1000);

        const metrics = await db
            .select()
            .from(flagMetrices)
            .where(and(eq(flagMetrices.flagId, featureId), gte(flagMetrices.bucketStart, fromDate)))
            .orderBy(asc(flagMetrices.bucketStart));

        const groupedByDay = metrics.reduce<Record<string, typeof metrics>>((groups, metric) => {
            const dayKey = new Date(metric.bucketStart).toISOString().slice(0, 10);
            if (!groups[dayKey]) {
                groups[dayKey] = [];
            }

            groups[dayKey].push(metric);
            return groups;
        }, {});

        const result = Object.entries(groupedByDay).map(([day, dayMetrics]) => ({
            day,
            flagMetrices: dayMetrics,
        }));

        return NextResponse.json(
            {
                featureId,
                days: limitDays,
                result,
            },
            { status: 200 },
        );
    } catch (err) {
        console.error("Error getting feature analytics:", err);
        return NextResponse.json({ error: "Failed to get feature analytics" }, { status: 500 });
    }
}