"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, HelpCircle, Sun, Moon, Monitor, User, LogOut, ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useSession, signOut } from "@/lib/auth-client";

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're in a nested route (more than 2 path segments like /projects/123)
  const pathSegments = pathname.split('/').filter(Boolean);
  const isNestedRoute = pathSegments.length > 1;

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4 flex-1">
          {isNestedRoute && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoBack}
              className="text-muted-foreground hover:text-foreground hover:bg-accent"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="max-w-md flex-1">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search flags, projects..."
                className="pl-11 bg-muted/50 border-border/60 text-foreground placeholder:text-muted-foreground rounded-xl h-11"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
            title={`Theme: ${theme}`}
          >
            {theme === "light" ? (
              <Sun className="w-5 h-5" />
            ) : theme === "dark" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Monitor className="w-5 h-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-accent">
            <HelpCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-accent relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
          
          {/* Auth buttons */}
          {!isPending && (
            session?.user ? (
              <div className="flex items-center gap-2 ml-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                  <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {session.user.name || session.user.email?.split('@')[0]}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm" className="ml-2">
                  Login
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
