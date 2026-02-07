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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, History, Filter } from "lucide-react";

export default function LogsPage() {
  const logs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      event: "Flag toggled",
      flag: "dark_mode",
      user: "John Doe",
      action: "ON",
      environment: "prod",
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      event: "Rollout changed",
      flag: "new_dashboard",
      user: "Jane Smith",
      action: "45% → 50%",
      environment: "staging",
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      event: "Rule created",
      flag: "ai_suggestions",
      user: "John Doe",
      action: "New rule",
      environment: "dev",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activity Logs</h1>
          <p className="text-muted-foreground mt-1">View all flag changes and activities</p>
        </div>
        <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-10 border-border bg-card text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Timestamp</TableHead>
                <TableHead className="text-muted-foreground">Event</TableHead>
                <TableHead className="text-muted-foreground">Flag</TableHead>
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Action</TableHead>
                <TableHead className="text-muted-foreground">Environment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="border-b border-border/50 hover:bg-accent/50">
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4" />
                      {log.timestamp.toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {log.event}
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded text-foreground font-mono border border-border">
                      {log.flag}
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{log.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        log.environment === "dev"
                          ? "bg-muted text-muted-foreground border-border"
                          : log.environment === "staging"
                          ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                          : "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                      }
                    >
                      {log.environment}
                    </Badge>
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
