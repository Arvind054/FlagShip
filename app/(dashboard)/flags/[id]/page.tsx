"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { mockFlags, formatDateTime, formatDate } from "@/lib/mock-data";
import { ChevronLeft, Edit2, MoreVertical, Flag, Info, Target, Layers, History } from "lucide-react";

type PageProps = {
  params: {
    id: string;
  };
};

export default function FlagDetailsPage({ params }: PageProps) {
  const flag = mockFlags.find((f) => f.id === params.id) || mockFlags[0];
  const [rolloutValues, setRolloutValues] = useState({
    dev: 0,
    staging: 50,
    prod: 100,
  });

  const auditLogs = [
    {
      id: 1,
      action: "Flag toggled ON",
      user: "John Doe",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      details: "Production environment",
    },
    {
      id: 2,
      action: "Rollout changed",
      user: "Jane Smith",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      details: "Changed from 45% to 50%",
    },
    {
      id: 3,
      action: "Flag created",
      user: "John Doe",
      timestamp: flag.createdAt,
      details: "Initial creation",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/flags">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-accent">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-linear-to-br from-primary to-blue-400 shadow-lg shadow-primary/25">
              <Flag className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-foreground">{flag.name}</h1>
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
                  {flag.type}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1 font-mono text-sm">
                {flag.key}
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="border-b border-border bg-transparent p-0 h-auto">
          <TabsTrigger
            value="overview"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none px-4 py-2"
          >
            <Info className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="targeting"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none px-4 py-2"
          >
            <Target className="w-4 h-4 mr-2" />
            Targeting Rules
          </TabsTrigger>
          <TabsTrigger
            value="environments"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none px-4 py-2"
          >
            <Layers className="w-4 h-4 mr-2" />
            Environments
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none px-4 py-2"
          >
            <History className="w-4 h-4 mr-2" />
            Audit Logs
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Name
                  </Label>
                  <p className="text-foreground mt-1">{flag.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Key
                  </Label>
                  <p className="text-foreground font-mono mt-1 bg-muted px-2 py-1 rounded inline-block">{flag.key}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Type
                  </Label>
                  <div className="mt-1">
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
                      {flag.type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Created
                  </Label>
                  <p className="text-foreground mt-1">
                    {formatDate(flag.createdAt)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </Label>
                  <p className="text-foreground mt-1">
                    {formatDateTime(flag.lastUpdated)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Description
                  </Label>
                  <p className="text-foreground mt-1">{flag.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Targeting Rules Tab */}
        <TabsContent value="targeting" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Targeting Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="p-4 rounded-full bg-muted inline-block mb-4">
                  <Target className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">No rules configured yet</p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  + Add Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Environments Tab */}
        <TabsContent value="environments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dev Environment */}
            <Card className="border-border bg-card overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-br from-slate-500/5 to-slate-600/5 opacity-50" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Development</CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-muted text-muted-foreground border-border"
                  >
                    dev
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 relative">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-muted-foreground">Status</Label>
                    <Switch defaultChecked={false} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-muted-foreground">
                      Rollout
                    </Label>
                    <span className="text-sm font-bold text-primary">
                      {rolloutValues.dev}%
                    </span>
                  </div>
                  <Slider
                    value={[rolloutValues.dev]}
                    onValueChange={(val) =>
                      setRolloutValues({ ...rolloutValues, dev: val[0] })
                    }
                    max={100}
                    step={10}
                    className="cursor-pointer"
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Rules
                </Button>
              </CardContent>
            </Card>

            {/* Staging Environment */}
            <Card className="border-border bg-card overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-br from-yellow-500/5 to-amber-500/5 opacity-50" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Staging</CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                  >
                    staging
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 relative">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-muted-foreground">Status</Label>
                    <Switch defaultChecked={true} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-muted-foreground">
                      Rollout
                    </Label>
                    <span className="text-sm font-bold text-primary">
                      {rolloutValues.staging}%
                    </span>
                  </div>
                  <Slider
                    value={[rolloutValues.staging]}
                    onValueChange={(val) =>
                      setRolloutValues({ ...rolloutValues, staging: val[0] })
                    }
                    max={100}
                    step={10}
                    className="cursor-pointer"
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Rules
                </Button>
              </CardContent>
            </Card>

            {/* Production Environment */}
            <Card className="border-border bg-card overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-emerald-500/5 opacity-50" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground">Production</CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                  >
                    prod
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 relative">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-muted-foreground">Status</Label>
                    <Switch defaultChecked={true} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-muted-foreground">
                      Rollout
                    </Label>
                    <span className="text-sm font-bold text-primary">
                      {rolloutValues.prod}%
                    </span>
                  </div>
                  <Slider
                    value={[rolloutValues.prod]}
                    onValueChange={(val) =>
                      setRolloutValues({ ...rolloutValues, prod: val[0] })
                    }
                    max={100}
                    step={10}
                    className="cursor-pointer"
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Rules
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value="audit" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log, index) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border"
                  >
                    <div className="p-2 rounded-full bg-primary/10">
                      <History className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{log.action}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {log.details}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span className="font-medium">{log.user}</span>
                        <span>•</span>
                        <span>{formatDateTime(log.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
