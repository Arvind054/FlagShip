"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="border-b border-slate-200 bg-transparent p-0">
          <TabsTrigger
            value="account"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
          >
            Billing
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
          >
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  defaultValue="John Doe"
                  className="border-slate-200 mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@example.com"
                  className="border-slate-200 mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  defaultValue="UTC-5 (EST)"
                  className="border-slate-200 mt-1.5"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current">Current Password</Label>
                <Input
                  id="current"
                  type="password"
                  className="border-slate-200 mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="new">New Password</Label>
                <Input
                  id="new"
                  type="password"
                  className="border-slate-200 mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  className="border-slate-200 mt-1.5"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Manage your subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-semibold text-blue-900">Pro Plan</p>
                <p className="text-sm text-blue-700 mt-1">$49/month</p>
              </div>
              <Button variant="outline" className="border-slate-200 text-slate-600">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Flag Changes</p>
                  <p className="text-sm text-slate-500">Get notified when flags are modified</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Rollout Updates</p>
                  <p className="text-sm text-slate-500">Alerts for rollout percentage changes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Weekly Digest</p>
                  <p className="text-sm text-slate-500">Summary of all activities</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Connected Integrations</CardTitle>
              <CardDescription>Manage third-party integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Slack</p>
                  <p className="text-sm text-slate-500">Send notifications to Slack</p>
                </div>
                <Button variant="outline" className="border-slate-200 text-slate-600">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">GitHub</p>
                  <p className="text-sm text-slate-500">Sync with GitHub deployments</p>
                </div>
                <Button variant="outline" className="border-slate-200 text-slate-600">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Datadog</p>
                  <p className="text-sm text-slate-500">Monitor flag performance</p>
                </div>
                <Button variant="outline" className="border-slate-200 text-slate-600">
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
