"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Flag, Zap, TrendingUp, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";

interface FeatureEnvironment {
  id: string;
  featureId: string;
  environment: string;
  status: boolean | null;
  rolloutPercentage: number | null;
}

interface RecentFlag {
  id: string;
  key: string;
  name: string | null;
  description: string | null;
  type: string | null;
  projectId: string;
  projectName: string;
  createdAt: string;
  environments: FeatureEnvironment[];
  isActive: boolean;
  hasPartialRollout: boolean;
}

interface DashboardData {
  projectCount: number;
  flagCount: number;
  activeFlags: number;
  partialRolloutFlags: number;
  recentFlags: RecentFlag[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const dashboardData = await response.json();
        setData(dashboardData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMaxRollout = (environments: FeatureEnvironment[]) => {
    if (!environments || environments.length === 0) return 0;
    const rollouts = environments.map(e => e.rolloutPercentage || 0);
    return Math.max(...rollouts);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center text-destructive">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Projects",
      value: data?.projectCount || 0,
      icon: Activity,
      change: `${data?.projectCount || 0} project${(data?.projectCount || 0) !== 1 ? 's' : ''}`,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/10 to-blue-600/5",
    },
    {
      label: "Total Flags",
      value: data?.flagCount || 0,
      icon: Flag,
      change: `${data?.flagCount || 0} flag${(data?.flagCount || 0) !== 1 ? 's' : ''}`,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-500/10 to-purple-600/5",
    },
    {
      label: "Active Flags",
      value: data?.activeFlags || 0,
      icon: Zap,
      change: data?.flagCount ? `${Math.round(((data?.activeFlags || 0) / data.flagCount) * 100)}% active` : "0% active",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-500/10 to-emerald-600/5",
    },
    {
      label: "Partial Rollout",
      value: data?.partialRolloutFlags || 0,
      icon: TrendingUp,
      change: "In testing",
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-500/10 to-amber-500/5",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your feature flags and projects
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
          + Create Flag
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="border-border bg-card overflow-hidden relative group hover:shadow-lg transition-shadow duration-300">
              <div className={`absolute inset-0 bg-linear-to-br ${stat.bgGradient} opacity-50`} />
              <CardContent className="pt-6 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-4xl font-bold mt-2 text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-linear-to-br ${stat.gradient} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recently Updated Flags */}
      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border flex-row items-center justify-between">
          <CardTitle className="text-foreground">Recently Created Flags</CardTitle>
          <Link href="/flags">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="pt-0">
          {data?.recentFlags && data.recentFlags.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Feature Key</TableHead>
                <TableHead className="text-muted-foreground">Project</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Rollout</TableHead>
                <TableHead className="text-muted-foreground">Created</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentFlags.map((flag) => {
                const maxRollout = getMaxRollout(flag.environments);
                return (
                <TableRow key={flag.id} className="border-b border-border/50 hover:bg-accent/50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{flag.key}</p>
                      <p className="text-xs text-muted-foreground">{flag.name || "—"}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{flag.projectName}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        flag.type === "release"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                          : flag.type === "experiment"
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                          : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
                      }
                    >
                      {flag.type || "feature"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        flag.isActive
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                          : "bg-muted text-muted-foreground border-border"
                      }
                    >
                      {flag.isActive ? "ON" : "OFF"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-primary to-blue-400 transition-all"
                          style={{ width: `${maxRollout}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground w-10">
                        {maxRollout}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDateTime(flag.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Link href={`/flags/${flag.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary hover:bg-primary/10"
                      >
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>No flags created yet.</p>
              <Link href="/flags">
                <Button variant="outline" className="mt-4">
                  Create your first flag
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
