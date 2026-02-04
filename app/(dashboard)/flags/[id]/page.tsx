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
import { ChevronLeft, Edit2, MoreVertical } from "lucide-react";

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
            <Button variant="ghost" size="icon" className="text-slate-400">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900">{flag.name}</h1>
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
            </div>
            <p className="text-slate-500 mt-1 font-mono text-sm">
              {flag.key}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-slate-600"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="border-b border-slate-200 bg-transparent p-0">
          <TabsTrigger
            value="overview"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="targeting"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
          >
            Targeting Rules
          </TabsTrigger>
          <TabsTrigger
            value="environments"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
          >
            Environments
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
          >
            Audit Logs
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Name
                  </Label>
                  <p className="text-slate-900 mt-1">{flag.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Key
                  </Label>
                  <p className="text-slate-900 font-mono mt-1">{flag.key}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Type
                  </Label>
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
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Created
                  </Label>
                  <p className="text-slate-900 mt-1">
                    {formatDate(flag.createdAt)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Last Updated
                  </Label>
                  <p className="text-slate-900 mt-1">
                    {formatDateTime(flag.lastUpdated)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Description
                  </Label>
                  <p className="text-slate-900 mt-1">{flag.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Targeting Rules Tab */}
        <TabsContent value="targeting" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Targeting Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-slate-500 mb-4">No rules configured yet</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Development</CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-slate-100 text-slate-700 border-slate-200"
                  >
                    dev
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-slate-700">Status</Label>
                    <Switch defaultChecked={false} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-slate-700">
                      Rollout
                    </Label>
                    <span className="text-sm font-bold text-blue-600">
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
                  className="w-full border-slate-200 text-slate-600"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Rules
                </Button>
              </CardContent>
            </Card>

            {/* Staging Environment */}
            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Staging</CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-700 border-yellow-200"
                  >
                    staging
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-slate-700">Status</Label>
                    <Switch defaultChecked={true} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-slate-700">
                      Rollout
                    </Label>
                    <span className="text-sm font-bold text-blue-600">
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
                  className="w-full border-slate-200 text-slate-600"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Rules
                </Button>
              </CardContent>
            </Card>

            {/* Production Environment */}
            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Production</CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-700 border-green-200"
                  >
                    prod
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-slate-700">Status</Label>
                    <Switch defaultChecked={true} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium text-slate-700">
                      Rollout
                    </Label>
                    <span className="text-sm font-bold text-blue-600">
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
                  className="w-full border-slate-200 text-slate-600"
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
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{log.action}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        {log.details}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                        <span>{log.user}</span>
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
