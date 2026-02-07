"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { User, CreditCard, Bell, Plug, Slack, Github } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="border-b border-border bg-transparent p-0 h-auto">
          <TabsTrigger
            value="account"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none px-4 py-2"
          >
            <User className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none px-4 py-2"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none px-4 py-2"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none px-4 py-2"
          >
            <Plug className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Profile Information</CardTitle>
              <CardDescription className="text-muted-foreground">Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">Full Name</Label>
                <Input
                  id="name"
                  defaultValue="John Doe"
                  className="border-border bg-muted/50 text-foreground mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@example.com"
                  className="border-border bg-muted/50 text-foreground mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="timezone" className="text-foreground">Timezone</Label>
                <Input
                  id="timezone"
                  defaultValue="UTC-5 (EST)"
                  className="border-border bg-muted/50 text-foreground mt-1.5"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Password</CardTitle>
              <CardDescription className="text-muted-foreground">Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current" className="text-foreground">Current Password</Label>
                <Input
                  id="current"
                  type="password"
                  className="border-border bg-muted/50 text-foreground mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="new" className="text-foreground">New Password</Label>
                <Input
                  id="new"
                  type="password"
                  className="border-border bg-muted/50 text-foreground mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="confirm" className="text-foreground">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  className="border-border bg-muted/50 text-foreground mt-1.5"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Current Plan</CardTitle>
              <CardDescription className="text-muted-foreground">Manage your subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-linear-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-lg">
                <p className="font-semibold text-foreground">Pro Plan</p>
                <p className="text-sm text-muted-foreground mt-1">$49/month</p>
              </div>
              <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Notification Preferences</CardTitle>
              <CardDescription className="text-muted-foreground">Choose how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                <div>
                  <p className="font-medium text-foreground">Flag Changes</p>
                  <p className="text-sm text-muted-foreground">Get notified when flags are modified</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                <div>
                  <p className="font-medium text-foreground">Rollout Updates</p>
                  <p className="text-sm text-muted-foreground">Alerts for rollout percentage changes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                <div>
                  <p className="font-medium text-foreground">Weekly Digest</p>
                  <p className="text-sm text-muted-foreground">Summary of all activities</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Connected Integrations</CardTitle>
              <CardDescription className="text-muted-foreground">Manage third-party integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#4A154B]">
                    <Slack className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Slack</p>
                    <p className="text-sm text-muted-foreground">Send notifications to Slack</p>
                  </div>
                </div>
                <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#24292e] dark:bg-white">
                    <Github className="w-5 h-5 text-white dark:text-black" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">GitHub</p>
                    <p className="text-sm text-muted-foreground">Sync with GitHub deployments</p>
                  </div>
                </div>
                <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#632CA6]">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Datadog</p>
                    <p className="text-sm text-muted-foreground">Monitor flag performance</p>
                  </div>
                </div>
                <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground">
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
