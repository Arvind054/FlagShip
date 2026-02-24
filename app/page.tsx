"use client";

import Link from "next/link";
import {
  Flag,
  Zap,
  Shield,
  BarChart3,
  Users,
  Globe,
  Check,
  ArrowRight,
  Github,
  Twitter,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      title={`Theme: ${theme}`}
    >
      {theme === "light" ? (
        <Sun className="w-5 h-5" />
      ) : theme === "dark" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Monitor className="w-5 h-5" />
      )}
    </button>
  );
}

export default function Home() {
  const features = [
    {
      icon: Flag,
      title: "Feature Flags",
      description:
        "Toggle features on/off instantly without deploying new code. Control what users see in real-time.",
    },
    {
      icon: Zap,
      title: "Instant Rollouts",
      description:
        "Gradually roll out features to specific percentages of users. Reduce risk with controlled releases.",
    },
    {
      icon: Shield,
      title: "Kill Switches",
      description:
        "Instantly disable problematic features in production without emergency deployments.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description:
        "Track feature adoption, performance metrics, and user engagement in real-time.",
    },
    {
      icon: Users,
      title: "User Targeting",
      description:
        "Target specific user segments, beta testers, or enterprise customers with precision.",
    },
    {
      icon: Globe,
      title: "Multi-Environment",
      description:
        "Manage flags across development, staging, and production environments seamlessly.",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "For small teams getting started",
      features: [
        "Up to 5 feature flags",
        "1 project",
        "2 environments",
        "Community support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "For growing teams and products",
      features: [
        "Unlimited feature flags",
        "10 projects",
        "Unlimited environments",
        "Advanced targeting",
        "Audit logs",
        "Priority support",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale organizations",
      features: [
        "Everything in Pro",
        "Unlimited projects",
        "SSO & SAML",
        "SLA guarantee",
        "Dedicated support",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <Flag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">Flagship</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="https://docs.flagship.dev" className="text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </a>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Now with AI-powered rollout recommendations
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Ship features with
            <span className="text-primary">
              {" "}confidence
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Flagship is a modern feature flag management platform that helps development teams release features safely, test in production, and deliver faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg flex items-center gap-2"
            >
              Start for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://github.com/flagship"
              className="bg-muted hover:bg-accent text-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required · Free tier available
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="bg-linear-to-b from-muted to-background rounded-2xl p-2 shadow-2xl">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-4 text-sm text-muted-foreground">flagship.dev/dashboard</span>
              </div>
              <div className="p-6 bg-muted/50">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Total Projects", value: "12" },
                    { label: "Feature Flags", value: "87" },
                    { label: "Active Flags", value: "64" },
                    { label: "API Requests", value: "2.4M" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-card rounded-lg p-4 border border-border">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Recent Flags</h3>
                    <span className="text-primary text-sm">View all →</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { key: "dark_mode", status: "ON", rollout: "100%" },
                      { key: "new_checkout", status: "ON", rollout: "45%" },
                      { key: "ai_suggestions", status: "OFF", rollout: "0%" },
                    ].map((flag, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <code className="text-sm bg-muted px-2 py-1 rounded text-foreground">{flag.key}</code>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{flag.rollout}</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${flag.status === "ON" ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"}`}>
                            {flag.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 border-y border-border bg-muted">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            TRUSTED BY ENGINEERING TEAMS AT
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {["Vercel", "Stripe", "Linear", "Notion", "Figma", "Discord"].map((company) => (
              <span key={company} className="text-2xl font-bold text-muted-foreground">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything you need to ship safely
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help your team release with confidence and iterate faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Get started in minutes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Integrate Flagship into your application with just a few lines of code.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create a flag",
                description: "Define your feature flag in the dashboard with targeting rules and rollout percentages.",
              },
              {
                step: "2",
                title: "Add the SDK",
                description: "Install our lightweight SDK and initialize it with your API key. Works with any framework.",
              },
              {
                step: "3",
                title: "Ship with confidence",
                description: "Toggle features remotely, run experiments, and roll back instantly if needed.",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-card border border-border rounded-xl p-8 text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Code Example */}
          <div className="mt-16 bg-black rounded-xl overflow-hidden border border-border">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-4 text-sm text-muted-foreground">app.tsx</span>
            </div>
            <pre className="p-6 text-sm overflow-x-auto">
              <code className="text-slate-300">
                <span className="text-purple-400">import</span> {"{ "}<span className="text-blue-400">Flagship</span>{" }"} <span className="text-purple-400">from</span> <span className="text-green-400">&apos;@flagship/sdk&apos;</span>;{"\n\n"}
                <span className="text-slate-500">// Initialize the SDK</span>{"\n"}
                <span className="text-purple-400">const</span> flagship = <span className="text-purple-400">new</span> <span className="text-blue-400">Flagship</span>({"{"}{"\n"}
                {"  "}apiKey: <span className="text-green-400">&apos;your-api-key&apos;</span>,{"\n"}
                {"  "}environment: <span className="text-green-400">&apos;production&apos;</span>{"\n"}
                {"}"});{"\n\n"}
                <span className="text-slate-500">// Check if a feature is enabled</span>{"\n"}
                <span className="text-purple-400">if</span> (flagship.<span className="text-yellow-400">isEnabled</span>(<span className="text-green-400">&apos;new_checkout&apos;</span>)) {"{"}{"\n"}
                {"  "}<span className="text-slate-500">// Show new checkout experience</span>{"\n"}
                {"  "}<span className="text-blue-400">renderNewCheckout</span>();{"\n"}
                {"}"}{"\n"}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-xl p-8 ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground ring-4 ring-primary ring-offset-4 ring-offset-background"
                    : "bg-card border border-border"
                }`}
              >
                <h3 className={`text-xl font-semibold mb-2 ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <Check className={`w-5 h-5 ${plan.highlighted ? "text-primary-foreground/80" : "text-primary"}`} />
                      <span className={plan.highlighted ? "text-primary-foreground/90" : "text-muted-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.highlighted
                      ? "bg-background text-primary hover:bg-accent"
                      : "bg-muted text-foreground hover:bg-accent"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to ship with confidence?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10">
            Join thousands of teams using Flagship to release features safely.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent transition-colors"
          >
            Get Started for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-black text-white border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Flag className="w-5 h-5 text-black" />
                </div>
                <span className="font-bold text-xl">Flagship</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-xs">
                Modern feature flag management for engineering teams who ship fast.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://github.com/flagship" className="text-muted-foreground hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/flagship" className="text-muted-foreground hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2026 Flagship. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
