"use client";

import { useState, useMemo } from "react";
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
import { mockFlags, mockProjects, formatDateTime } from "@/lib/mock-data";
import { Search, Edit2 } from "lucide-react";

export default function FlagsPage() {
  const [selectedProject, setSelectedProject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFlags = useMemo(() => {
    return mockFlags.filter((flag) => {
      const matchesProject =
        selectedProject === "all" || flag.projectId === selectedProject;
      const matchesSearch =
        flag.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flag.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesProject && matchesSearch;
    });
  }, [selectedProject, searchQuery]);

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Feature Flags</h1>
          <p className="text-slate-500 mt-1">
            View and manage all your feature flags
          </p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          + Create Flag
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search flags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-slate-200 bg-white"
          />
        </div>

        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-48 border-slate-200 bg-white">
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent className="border-slate-200">
            <SelectItem value="all">All Projects</SelectItem>
            {mockProjects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Flags Table */}
      <Card className="border-slate-200">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200">
                <TableHead className="text-slate-600">Feature Key</TableHead>
                <TableHead className="text-slate-600">Type</TableHead>
                <TableHead className="text-slate-600">Environments</TableHead>
                <TableHead className="text-slate-600">Status</TableHead>
                <TableHead className="text-slate-600">Rollout</TableHead>
                <TableHead className="text-slate-600">Last Updated</TableHead>
                <TableHead className="text-slate-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFlags.length > 0 ? (
                filteredFlags.map((flag) => (
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
                      <div className="flex gap-2">
                        {flag.environments.map((env) => (
                          <Badge
                            key={env}
                            variant="outline"
                            className={
                              env === "dev"
                                ? "bg-slate-100 text-slate-700 border-slate-200"
                                : env === "staging"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                : "bg-green-100 text-green-700 border-green-200"
                            }
                          >
                            {env}
                          </Badge>
                        ))}
                      </div>
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
                        <span className="text-sm font-medium text-slate-600 w-10">
                          {flag.rollout}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {formatDateTime(flag.lastUpdated)}
                    </TableCell>
                    <TableCell>
                      <Link href={`/flags/${flag.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-blue-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-slate-500">No flags found</p>
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
