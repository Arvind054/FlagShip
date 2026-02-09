export type FeatureFlag = {
  id: string;
  key: string;
  name: string;
  description: string;
  type: "release" | "experiment" | "ops";
  status: "on" | "off";
  rollout: number;
  environments: ("dev" | "staging" | "prod")[];
  lastUpdated: Date;
  createdAt: Date;
  projectId: string;
};

export type Project = {
  id: string;
  name: string;
  apiKey: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Environment = "dev" | "staging" | "prod";

export const mockProjects: Project[] = [
  {
    id: "proj_1",
    name: "Web Platform",
    apiKey: "pk_live_a1b2c3d4e5f6",
    description: "Main web application",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2026-02-01"),
  },
  {
    id: "proj_2",
    name: "Mobile App",
    apiKey: "pk_live_x9y8z7w6v5u4",
    description: "iOS and Android applications",
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2026-02-02"),
  },
  {
    id: "proj_3",
    name: "Backend API",
    apiKey: "pk_live_q1w2e3r4t5y6",
    description: "Core API services",
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2026-02-03"),
  },
];

export const mockFlags: FeatureFlag[] = [
  {
    id: "flag_1",
    key: "dark_mode",
    name: "Dark Mode UI",
    description: "Enable dark mode theme for the application",
    type: "release",
    status: "on",
    rollout: 100,
    environments: ["dev", "staging", "prod"],
    lastUpdated: new Date("2026-02-03"),
    createdAt: new Date("2026-01-10"),
    projectId: "proj_1",
  },
  {
    id: "flag_2",
    key: "new_dashboard",
    name: "New Dashboard Design",
    description: "Rollout of redesigned dashboard interface",
    type: "release",
    status: "on",
    rollout: 45,
    environments: ["dev", "staging"],
    lastUpdated: new Date("2026-02-02"),
    createdAt: new Date("2026-01-20"),
    projectId: "proj_1",
  },
  {
    id: "flag_3",
    key: "ai_suggestions",
    name: "AI Code Suggestions",
    description: "A/B testing AI-powered code suggestions",
    type: "experiment",
    status: "on",
    rollout: 30,
    environments: ["prod"],
    lastUpdated: new Date("2026-02-01"),
    createdAt: new Date("2026-01-01"),
    projectId: "proj_1",
  },
  {
    id: "flag_4",
    key: "performance_optimization",
    name: "Performance Optimization",
    description: "Gradual rollout of performance improvements",
    type: "ops",
    status: "on",
    rollout: 75,
    environments: ["staging", "prod"],
    lastUpdated: new Date("2026-01-28"),
    createdAt: new Date("2025-12-15"),
    projectId: "proj_1",
  },
  {
    id: "flag_5",
    key: "social_sharing",
    name: "Social Sharing",
    description: "Enable social media sharing features",
    type: "release",
    status: "off",
    rollout: 0,
    environments: ["dev"],
    lastUpdated: new Date("2026-01-25"),
    createdAt: new Date("2025-12-01"),
    projectId: "proj_2",
  },
  {
    id: "flag_6",
    key: "push_notifications",
    name: "Push Notifications",
    description: "Mobile push notifications system",
    type: "release",
    status: "on",
    rollout: 60,
    environments: ["dev", "staging", "prod"],
    lastUpdated: new Date("2026-02-03"),
    createdAt: new Date("2025-11-10"),
    projectId: "proj_2",
  },
];

export function maskApiKey(apiKey: string): string {
  if (apiKey.length <= 8) return apiKey;
  return `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`;
}

export function getTypeColor(
  type: "release" | "experiment" | "ops"
): string {
  switch (type) {
    case "release":
      return "bg-blue-100 text-blue-800";
    case "experiment":
      return "bg-purple-100 text-purple-800";
    case "ops":
      return "bg-orange-100 text-orange-800";
  }
}

export function getEnvironmentColor(env: Environment): string {
  switch (env) {
    case "dev":
      return "bg-slate-100 text-slate-800";
    case "staging":
      return "bg-yellow-100 text-yellow-800";
    case "prod":
      return "bg-green-100 text-green-800";
  }
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) {
    return "N/A";
  }
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) {
    return "Invalid date";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) {
    return "N/A";
  }
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) {
    return "Invalid date";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
