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
  User,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Feature Flags", href: "/flags", icon: Flag },
  { name: "Environments", href: "/environments", icon: Zap },
  { name: "Logs", href: "/logs", icon: BarChart3 },
  { name: "Docs", href: "/docs", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(true);
  const pathname = usePathname();
  const { data: session } = useSession();

  const projects = [
    { id: 1, name: "Web Platform", color: "bg-blue-500" },
    { id: 2, name: "Mobile App", color: "bg-purple-500" },
    { id: 3, name: "Backend API", color: "bg-green-500" },
  ];

  return (
    <div
      className={cn(
        "border-r border-border/60 bg-card transition-all duration-300 ease-in-out flex flex-col h-full",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center border-b border-border/60 p-5",
        isOpen ? "justify-between" : "justify-center"
      )}>
        {isOpen ? (
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-linear-to-br from-primary to-blue-400 rounded-lg flex items-center justify-center shadow-lg shadow-primary/25">
              <Flag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-foreground">Flagship</span>
          </Link>
        ) : (
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-linear-to-br from-primary to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
              <Flag className="w-6 h-6 text-white" />
            </div>
          </Link>
        )}
        {isOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {!isOpen && (
        <div className="flex justify-center py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}


      {/* Navigation */}
      <nav className={cn(
        "flex-1 overflow-y-auto py-4",
        isOpen ? "px-4" : "px-2"
      )}>
        <div className="space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full transition-all duration-200 h-11",
                    isOpen ? "justify-start" : "justify-center",
                    isActive
                      ? "bg-primary/10 text-primary hover:bg-primary/15 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className={cn(
                    isOpen ? "w-5 h-5" : "w-6 h-6",
                    isActive && "text-primary"
                  )} />
                  {isOpen && <span className="ml-3">{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Pro Upgrade Banner */}
      {isOpen && (
        <div className="p-5 border-t border-border/60">
          <div className="p-4 rounded-xl bg-linear-to-br from-primary/10 to-purple-500/10 border border-primary/20">
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
      {isOpen && session?.user && (
        <div className="border-t border-border/60 p-5">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent cursor-pointer transition-colors">
            {session.user.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || "User"} 
                className="w-8 h-8 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="w-8 h-8 bg-linear-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-sm font-semibold text-white shadow-lg">
                {session.user.name ? session.user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </div>
            )}
            <div className="text-sm flex-1 overflow-hidden">
              <div className="font-medium text-foreground truncate">{session.user.name || "User"}</div>
              <div className="text-xs text-muted-foreground truncate">{session.user.email}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}
