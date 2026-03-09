"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Package, Code, Settings, Zap, CheckCircle } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" />
          Documentation
        </h1>
        <p className="text-muted-foreground mt-2">
          Learn how to integrate Flagship SDK into your application
        </p>
      </div>

      {/* Installation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Installation
          </CardTitle>
          <CardDescription>
            Install the Flagship SDK using npm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm">
            <code className="text-foreground">npm i @arvind_054/flagship-sdk</code>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Quick Start
          </CardTitle>
          <CardDescription>
            Get started with Flagship in minutes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Initialize */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">Step 1</Badge>
              <span className="font-medium text-foreground">Initialize the SDK</span>
            </div>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-foreground">{`import { Flagship } from "@arvind_054/flagship-sdk";

const flagship = new Flagship({
  apiKey: "your-api-key",
  environment: "production",
  baseUrl: "https://your-flagship-server.com", // optional, defaults to http://localhost:3000
  ttl: 30000, // optional, cache TTL in ms (default: 30000)
});`}</pre>
            </div>
          </div>

          {/* Step 2: Define User Context */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">Step 2</Badge>
              <span className="font-medium text-foreground">Define User Context</span>
            </div>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-foreground">{`const user = {
  id: "user-123",
  email: "user@example.com",
  plan: "premium",
};`}</pre>
            </div>
          </div>

          {/* Step 3: Check Feature Flag */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">Step 3</Badge>
              <span className="font-medium text-foreground">Check Feature Flag</span>
            </div>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-foreground">{`const isFeatureEnabled = await flagship.isEnabled("new-checkout-flow", user);

if (isFeatureEnabled) {
  // Show new feature
} else {
  // Show default experience
}`}</pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Configuration Options
          </CardTitle>
          <CardDescription>
            Available options when initializing the SDK
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Option</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Required</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Default</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-primary">apiKey</td>
                  <td className="py-3 px-4 text-muted-foreground">string</td>
                  <td className="py-3 px-4">
                    <Badge variant="destructive" className="text-xs">Required</Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">-</td>
                  <td className="py-3 px-4 text-muted-foreground">Your Flagship project API key</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-primary">environment</td>
                  <td className="py-3 px-4 text-muted-foreground">string</td>
                  <td className="py-3 px-4">
                    <Badge variant="destructive" className="text-xs">Required</Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">-</td>
                  <td className="py-3 px-4 text-muted-foreground">Environment name (e.g., &quot;production&quot;, &quot;staging&quot;, &quot;development&quot;)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-primary">baseUrl</td>
                  <td className="py-3 px-4 text-muted-foreground">string</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary" className="text-xs">Optional</Badge>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-muted-foreground">http://localhost:3000</td>
                  <td className="py-3 px-4 text-muted-foreground">Your Flagship server URL</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-primary">ttl</td>
                  <td className="py-3 px-4 text-muted-foreground">number</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary" className="text-xs">Optional</Badge>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-muted-foreground">30000</td>
                  <td className="py-3 px-4 text-muted-foreground">Cache time-to-live in milliseconds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            User Context
          </CardTitle>
          <CardDescription>
            Pass user attributes for targeted feature delivery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The user context object can contain any attributes you want to use for targeting rules. 
            Common attributes include:
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-foreground"><code className="text-primary">id</code> - Unique user identifier</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-foreground"><code className="text-primary">email</code> - User email address</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-foreground"><code className="text-primary">plan</code> - Subscription plan</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-foreground"><code className="text-primary">country</code> - User location</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-foreground"><code className="text-primary">version</code> - App version</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-foreground"><code className="text-primary">customAttribute</code> - Any custom data</span>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto mt-4">
            <pre className="text-foreground">{`// Example with multiple attributes
const user = {
  id: "user-123",
  email: "user@example.com",
  plan: "premium",
  country: "US",
  version: "2.1.0",
  betaTester: true,
};

const isEnabled = await flagship.isEnabled("premium-feature", user);`}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Full Example */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Complete Example
          </CardTitle>
          <CardDescription>
            A full working example with React
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-foreground">{`import { Flagship } from "@arvind_054/flagship-sdk";
import { useEffect, useState } from "react";

// Initialize SDK
const flagship = new Flagship({
  apiKey: "your-api-key",
  environment: "production",
  baseUrl: "https://your-flagship-server.com",
  ttl: 30000,
});

function CheckoutButton({ user }) {
  const [showNewCheckout, setShowNewCheckout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkFeature() {
      const isEnabled = await flagship.isEnabled("new-checkout-flow", user);
      setShowNewCheckout(isEnabled);
      setLoading(false);
    }
    checkFeature();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  if (showNewCheckout) {
    return <NewCheckoutButton />;
  }

  return <LegacyCheckoutButton />;
}`}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
