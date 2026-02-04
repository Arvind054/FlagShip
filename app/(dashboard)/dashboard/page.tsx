"use client";

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
import { mockFlags, mockProjects, formatDateTime } from "@/lib/mock-data";
import { Activity, Flag, Zap } from "lucide-react";

export default function DashboardPage() {
  const recentFlags = mockFlags.slice(0, 5);
  const activeFlags = mockFlags.filter((f) => f.status === "on").length;
  const partialRolloutFlags = mockFlags.filter(
    (f) => f.rollout > 0 && f.rollout < 100
  ).length;

  const stats = [
    {
      label: "Total Projects",
      value: mockProjects.length,
      icon: Activity,
      color: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Total Flags",
      value: mockFlags.length,
      icon: Flag,
      color: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      label: "Active Flags",
      value: activeFlags,
      icon: Zap,
      color: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "Partial Rollout",
      value: partialRolloutFlags,
      icon: Activity,
      color: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Overview of your feature flags and projects
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="border-slate-200">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>
                    <p className={`text-3xl font-bold mt-2 ${stat.textColor}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recently Updated Flags */}
      <Card className="border-slate-200">
        <CardHeader className="border-b border-slate-200">
          <CardTitle>Recently Updated Flags</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200">
                <TableHead className="text-slate-600">Feature Key</TableHead>
                <TableHead className="text-slate-600">Type</TableHead>
                <TableHead className="text-slate-600">Status</TableHead>
                <TableHead className="text-slate-600">Rollout</TableHead>
                <TableHead className="text-slate-600">Last Updated</TableHead>
                <TableHead className="text-slate-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentFlags.map((flag) => (
                <TableRow key={flag.id} className="border-b border-slate-100">
                  <TableCell>
                    <div>
                      <p className="font-medium text-slate-900">{flag.key}</p>
                      <p className="text-xs text-slate-500">{flag.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        flag.type === "release"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : flag.type === "experiment"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : "bg-orange-50 text-orange-700 border-orange-200"
                      }
                    >
                      {flag.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        flag.status === "on"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }
                    >
                      {flag.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all"
                          style={{ width: `${flag.rollout}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {flag.rollout}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {formatDateTime(flag.lastUpdated)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
