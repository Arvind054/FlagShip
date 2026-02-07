"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Flag,
  Zap,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Feature Flags", href: "/flags", icon: Flag },
  { name: "Environments", href: "/environments", icon: Zap },
  { name: "Logs", href: "/logs", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(true);
  const pathname = usePathname();

  const projects = [
    { id: 1, name: "Web Platform", color: "bg-blue-500" },
    { id: 2, name: "Mobile App", color: "bg-purple-500" },
    { id: 3, name: "Backend API", color: "bg-green-500" },
  ];

  return (
    <div
      className={cn(
        "border-r border-border bg-card transition-all duration-300 flex flex-col h-full",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-primary to-blue-400 rounded-lg flex items-center justify-center shadow-lg shadow-primary/25">
              <Flag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-foreground">Flagship</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Project Switcher */}
      {isOpen && (
        <div className="p-4 border-b border-border">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Projects
          </div>
          <div className="space-y-1.5">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent cursor-pointer transition-colors"
              >
                <div className={cn("w-2 h-2 rounded-full", project.color)} />
                <span className="text-sm text-foreground">{project.name}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3 border-border text-muted-foreground hover:text-foreground">
            + New Project
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary hover:bg-primary/15 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
                  {isOpen && <span className="ml-3">{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Pro Upgrade Banner */}
      {isOpen && (
        <div className="p-4 border-t border-border">
          <div className="p-4 rounded-lg bg-linear-to-br from-primary/10 to-purple-500/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Unlock unlimited flags and advanced analytics</p>
            <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Upgrade
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      {isOpen && (
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-linear-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-sm font-semibold text-white shadow-lg">
              JD
            </div>
            <div className="text-sm flex-1">
              <div className="font-medium text-foreground">John Doe</div>
              <div className="text-xs text-muted-foreground">john@example.com</div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}
