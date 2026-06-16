import { auth } from "@/lib/auth";
import { db } from "@/src/DB";
import { features, flagMetrices, projects, user } from "@/src/DB/schema";
import { and, asc, eq, gte, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

		const [project] = await db
			.select()
			.from(projects)
			.where(and(eq(projects.id, projectId), eq(projects.userId, userData.id)))
			.limit(1);

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		const searchParams = req.nextUrl.searchParams;
		const requestedDays = Number(searchParams.get("days") ?? 1);
		const limitDays = Number.isFinite(requestedDays) && requestedDays > 0 ? requestedDays : 1;
		const fromDate = new Date(Date.now() - limitDays * 24 * 60 * 60 * 1000);

		const projectFeatures = await db
			.select({ id: features.id })
			.from(features)
			.where(eq(features.projectId, projectId));

		const featureIds = projectFeatures.map((feature) => feature.id);

		if (!featureIds.length) {
			return NextResponse.json(
				{
					projectId,
					days: limitDays,
					result: [],
				},
				{ status: 200 },
			);
		}

		const metrics = await db
			.select()
			.from(flagMetrices)
			.where(and(inArray(flagMetrices.flagId, featureIds), gte(flagMetrices.bucketStart, fromDate)))
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
				projectId,
				days: limitDays,
				result,
			},
			{ status: 200 },
		);
	} catch (err) {
		console.error("Error getting project analytics:", err);
		return NextResponse.json({ error: "Failed to get project analytics" }, { status: 500 });
	}
}
