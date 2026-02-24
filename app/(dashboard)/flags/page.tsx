"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FeatureFlag, FeatureEnvironment, formatDateTime } from "@/lib/mock-data";
import { Search, Edit2, Filter, Flag, Loader2 } from "lucide-react";

type Project = {
  id: string;
  name: string;
  description: string | null;
  apiKey: string;
  userId: string | null;
  createdAt: Date | null;
};

export default function FlagsPage() {
  const [selectedProject, setSelectedProject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFlags() {
      try {
        setLoading(true);
        const response = await fetch("/api/features/all");
        if (!response.ok) {
          throw new Error("Failed to fetch flags");
        }
        const data = await response.json();
        setFlags(data.flags || []);
        setProjects(data.projects || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchFlags();
  }, []);

  const filteredFlags = useMemo(() => {
    return flags.filter((flag) => {
      const matchesProject =
        selectedProject === "all" || flag.projectId === selectedProject;
      const matchesSearch =
        flag.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (flag.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchesProject && matchesSearch;
    });
  }, [selectedProject, searchQuery, flags]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading flags...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 rounded-full bg-destructive/10">
            <Flag className="w-8 h-8 text-destructive" />
          </div>
          <p className="text-destructive">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Feature Flags</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all your feature flags
          </p>
        </div>

        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
          + Create Flag
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search flags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-border bg-card text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-48 border-border bg-card text-foreground">
            <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent className="border-border bg-card">
            <SelectItem value="all">All Projects</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Flags Table */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Feature Key</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Environments</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Rollout</TableHead>
                <TableHead className="text-muted-foreground">Last Updated</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFlags.length > 0 ? (
                filteredFlags.map((flag) => {
                  // Find production environment for status/rollout display, fallback to first enabled env
                  const prodEnv = flag.environments.find((e: FeatureEnvironment) => e.environment === "prod");
                  const anyEnabledEnv = flag.environments.find((e: FeatureEnvironment) => e.status === true);
                  const displayEnv = prodEnv || anyEnabledEnv || flag.environments[0];
                  const isEnabled = displayEnv?.status === true;
                  const rolloutPercentage = displayEnv?.rolloutPercentage ?? 0;

                  return (
                  <TableRow key={flag.id} className="border-b border-border/50 hover:bg-accent/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Flag className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{flag.key}</p>
                          <p className="text-xs text-muted-foreground">{flag.name || "No description"}</p>
                        </div>
                      </div>
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
                        {flag.type || "release"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1.5">
                        {flag.environments.map((env: FeatureEnvironment) => (
                          <Badge
                            key={env.id}
                            variant="outline"
                            className={
                              env.environment === "dev"
                                ? "bg-muted text-muted-foreground border-border"
                                : env.environment === "staging"
                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                                : "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                            }
                          >
                            {env.environment}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          isEnabled
                            ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                            : "bg-muted text-muted-foreground border-border"
                        }
                      >
                        {isEnabled ? "ON" : "OFF"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-primary to-blue-400 transition-all"
                            style={{ width: `${rolloutPercentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground w-10">
                          {rolloutPercentage}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {flag.createdAt ? formatDateTime(new Date(flag.createdAt)) : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Link href={`/flags/${flag.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-full bg-muted">
                        <Flag className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">No flags found</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Create your first flag
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
