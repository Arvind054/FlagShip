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
} from "lucide-react";

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <Flag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">Flagship</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
              Pricing
            </a>
            <a href="https://docs.flagship.dev" className="text-slate-600 hover:text-slate-900 transition-colors">
              Docs
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Now with AI-powered rollout recommendations
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Ship features with
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
              {" "}confidence
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Flagship is a modern feature flag management platform that helps development teams release features safely, test in production, and deliver faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
            >
              Start for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://github.com/flagship"
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
          <p className="text-sm text-slate-500 mt-6">
            No credit card required · Free tier available
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="bg-linear-to-b from-slate-100 to-slate-50 rounded-2xl p-2 shadow-2xl shadow-slate-200/50">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 bg-slate-50">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-4 text-sm text-slate-500">flagship.dev/dashboard</span>
              </div>
              <div className="p-6 bg-slate-50">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Total Projects", value: "12" },
                    { label: "Feature Flags", value: "87" },
                    { label: "Active Flags", value: "64" },
                    { label: "API Requests", value: "2.4M" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 border border-slate-200">
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Recent Flags</h3>
                    <span className="text-blue-600 text-sm">View all →</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { key: "dark_mode", status: "ON", rollout: "100%" },
                      { key: "new_checkout", status: "ON", rollout: "45%" },
                      { key: "ai_suggestions", status: "OFF", rollout: "0%" },
                    ].map((flag, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                        <code className="text-sm bg-slate-100 px-2 py-1 rounded text-slate-700">{flag.key}</code>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-slate-500">{flag.rollout}</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${flag.status === "ON" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
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
      <section className="py-16 border-y border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-slate-500 mb-8">
            TRUSTED BY ENGINEERING TEAMS AT
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {["Vercel", "Stripe", "Linear", "Notion", "Figma", "Discord"].map((company) => (
              <span key={company} className="text-2xl font-bold text-slate-400">
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything you need to ship safely
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features to help your team release with confidence and iterate faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:shadow-slate-100 transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Get started in minutes
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
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
                <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Code Example */}
          <div className="mt-16 bg-slate-900 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-4 text-sm text-slate-400">app.tsx</span>
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-xl p-8 ${
                  plan.highlighted
                    ? "bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-4"
                    : "bg-white border border-slate-200"
                }`}
              >
                <h3 className={`text-xl font-semibold mb-2 ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? "text-blue-100" : "text-slate-600"}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={plan.highlighted ? "text-blue-100" : "text-slate-500"}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <Check className={`w-5 h-5 ${plan.highlighted ? "text-blue-200" : "text-blue-600"}`} />
                      <span className={plan.highlighted ? "text-blue-50" : "text-slate-600"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.highlighted
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
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
      <section className="py-24 px-6 bg-linear-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to ship with confidence?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of teams using Flagship to release features safely.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors"
          >
            Get Started for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                  <Flag className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">Flagship</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-xs">
                Modern feature flag management for engineering teams who ship fast.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://github.com/flagship" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/flagship" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 Flagship. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-400">
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
