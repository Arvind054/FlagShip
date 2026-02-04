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
import { Search } from "lucide-react";

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
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Activity Logs</h1>
        <p className="text-slate-500 mt-1">View all flag changes and activities</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search logs..."
            className="pl-10 border-slate-200 bg-white"
          />
        </div>
      </div>

      <Card className="border-slate-200">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200">
                <TableHead className="text-slate-600">Timestamp</TableHead>
                <TableHead className="text-slate-600">Event</TableHead>
                <TableHead className="text-slate-600">Flag</TableHead>
                <TableHead className="text-slate-600">User</TableHead>
                <TableHead className="text-slate-600">Action</TableHead>
                <TableHead className="text-slate-600">Environment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="border-b border-slate-100">
                  <TableCell className="text-sm text-slate-600">
                    {log.timestamp.toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">
                    {log.event}
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-slate-100 px-2 py-1 rounded text-slate-700">
                      {log.flag}
                    </code>
                  </TableCell>
                  <TableCell className="text-slate-600">{log.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        log.environment === "dev"
                          ? "bg-slate-100 text-slate-700 border-slate-200"
                          : log.environment === "staging"
                          ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                          : "bg-green-100 text-green-700 border-green-200"
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
