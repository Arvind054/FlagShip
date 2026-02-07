"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Server, Cloud, Settings } from "lucide-react";

export default function EnvironmentsPage() {
  const environments = [
    {
      name: "Development",
      key: "dev",
      icon: Server,
      gradient: "from-slate-500 to-slate-600",
      bgGradient: "from-slate-500/10 to-slate-600/5",
      badgeClass: "bg-muted text-muted-foreground border-border",
      description: "Local development environment",
    },
    {
      name: "Staging",
      key: "staging",
      icon: Zap,
      gradient: "from-yellow-500 to-amber-500",
      bgGradient: "from-yellow-500/10 to-amber-500/5",
      badgeClass: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
      description: "Pre-production testing environment",
    },
    {
      name: "Production",
      key: "prod",
      icon: Cloud,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/5",
      badgeClass: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
      description: "Live production environment",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Environments</h1>
          <p className="text-muted-foreground mt-1">Manage your deployment environments</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
          + Add Environment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {environments.map((env) => {
          const Icon = env.icon;
          return (
            <Card key={env.key} className="border-border bg-card overflow-hidden relative group hover:shadow-lg transition-shadow duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br ${env.bgGradient} opacity-50`} />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${env.gradient} shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{env.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className={env.badgeClass}>{env.key}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <p className="text-muted-foreground">{env.description}</p>
                <div className="pt-4 border-t border-border flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    Configure
                  </Button>
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-accent">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
