"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EnvironmentsPage() {
  const environments = [
    {
      name: "Development",
      key: "dev",
      color: "bg-slate-100 text-slate-800",
      description: "Local development environment",
    },
    {
      name: "Staging",
      key: "staging",
      color: "bg-yellow-100 text-yellow-800",
      description: "Pre-production testing environment",
    },
    {
      name: "Production",
      key: "prod",
      color: "bg-green-100 text-green-800",
      description: "Live production environment",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Environments</h1>
          <p className="text-slate-500 mt-1">Manage your deployment environments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          + Add Environment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {environments.map((env) => (
          <Card key={env.key} className="border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{env.name}</CardTitle>
                <Badge className={env.color}>{env.key}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">{env.description}</p>
              <div className="pt-4 border-t border-slate-200 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-200 text-slate-600"
                >
                  Configure
                </Button>
                <Button variant="ghost" className="text-slate-600">
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
