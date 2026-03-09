export type FeatureFlag = {
  id: string;
  key: string;
  projectId: string | null;
  name: string | null;
  description: string | null;
  type: string | null;
  environments: FeatureEnvironment[],
  createdAt: Date | null;
};

export type FeatureEnvironment = {
  id: string;                 
  featureId: string | null;   
  environment: string | null; 
  status: boolean | null;
  rolloutPercentage: number | null;
  rules: FeatureRule[] | null;
};
export type FeatureRule = {
  field: string;
  operator: string;
  value: any;
};
export type Project = {
  id: string;
  name: string;
  apiKey: string;
  description: string | null;
  createdAt: Date | null;
  userId?: string | null;
};

export type Environment = "dev" | "staging" | "prod";


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
export const mockProjects: Project[] = [
  {
    id: "proj_1",
    name: "Web Platform",
    apiKey: "pk_live_a1b2c3d4e5f6",
    description: "Main web application",
    createdAt: new Date("2025-01-15"),
  },
  {
    id: "proj_2",
    name: "Mobile App",
    apiKey: "pk_live_x9y8z7w6v5u4",
    description: "iOS and Android applications",
    createdAt: new Date("2025-02-10"),
  },
  {
    id: "proj_3",
    name: "Backend API",
    apiKey: "pk_live_q1w2e3r4t5y6",
    description: "Core API services",
    createdAt: new Date("2025-03-05"),
  },
];


