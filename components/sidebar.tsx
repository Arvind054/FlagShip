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
        "border-r border-slate-200 bg-white transition-all duration-300 flex flex-col h-full",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <Flag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900">Flagship</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto"
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
        <div className="p-4 border-b border-slate-200">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Projects
          </div>
          <button
            onClick={() => setProjectsOpen(!projectsOpen)}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm font-medium text-slate-700">
                Web Platform
              </span>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform",
                projectsOpen ? "rotate-180" : ""
              )}
            />
          </button>

          {projectsOpen && (
            <div className="mt-2 space-y-1">
              {projects.map((project) => (
                <button
                  key={project.id}
                  className="w-full flex items-center gap-2 p-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors text-left"
                >
                  <div
                    className={cn("w-2 h-2 rounded-full", project.color)}
                  />
                  {project.name}
                </button>
              ))}
            </div>
          )}

          <Button variant="outline" size="sm" className="w-full mt-3">
            + New Project
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600 hover:bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {isOpen && <span className="ml-3">{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-sm font-semibold text-slate-700">
              JD
            </div>
            <div className="text-sm">
              <div className="font-medium text-slate-900">John Doe</div>
              <div className="text-xs text-slate-500">john@example.com</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
