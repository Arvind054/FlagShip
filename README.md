# Flagship

**Ship Features with Confidence**

Flagship is a modern, open-source feature flag management platform that gives you complete control over feature releases, A/B testing, and gradual rollouts.

---

## What is Flagship?

Flagship is a self-hosted feature flag service that allows development teams to:

- **Toggle features on/off** without deploying new code
- **Gradually roll out features** to a percentage of users
- **Target specific users** based on custom rules and attributes
- **Manage multiple environments** (development, staging, production)
- **Track feature flag changes** with comprehensive audit logs

Instead of risky big-bang releases, ship features safely by controlling who sees what, when.

---

## Key Features

### Feature Flag Management
- Create and organize feature flags by project
- Support for multiple flag types: **Release**, **Experiment**, and **Ops**
- Toggle flags instantly across environments

### Percentage-Based Rollouts
- Gradually release features to 1%, 10%, 50%, or any percentage of users
- Consistent user experience with deterministic bucketing (same user always gets the same experience)

### Targeting Rules
- Define rules based on user attributes (e.g., country, plan, user ID)
- Operators include: `equals`, `not_equals`, `in`, `greater_than`, `less_than`
- Stack multiple conditions for precise targeting

### Multi-Environment Support
- Separate configurations for **Development**, **Staging**, and **Production**
- Different rollout percentages and rules per environment
- Environment-specific status toggles

### High-Performance API
- Fast feature evaluation endpoint (`/api/evaluate`)
- **Redis caching** for instant responses (120s TTL)
- Simple JSON API with API key authentication

### Modern Dashboard
- Clean, professional SaaS interface inspired by Vercel and Linear
- Real-time flag status overview
- Activity logs and audit trail
- Project organization with API key management

---

## Advantages

| Advantage | Description |
|-----------|-------------|
| **Reduce Risk** | Roll back features instantly without redeploying |
| **Ship Faster** | Decouple deployment from release |
| **Test in Production** | Safely experiment with real users |
| **Self-Hosted** | Full control over your data and infrastructure |
| **Developer-Friendly** | Simple REST API, easy integration |
| **Scalable** | Redis caching ensures low-latency evaluations |

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Neon Serverless)
- **ORM**: Drizzle ORM
- **Cache**: Redis (ioredis)
- **Auth**: Better Auth
- **UI**: Tailwind CSS 4 + Radix UI + Lucide Icons
- **Validation**: Zod

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file with your database and Redis configuration.

### 3. Run Database Migrations

```bash
npx drizzle-kit push
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Access the Dashboard

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Usage

Evaluate a feature flag:

```bash
POST /api/evaluate
Content-Type: application/json

{
  "apiKey": "your-project-api-key",
  "featureKey": "dark-mode",
  "environment": "production",
  "user": {
    "id": "user-123",
    "country": "US",
    "plan": "pro"
  }
}
```

Response:

```json
{
  "enabled": true
}
```

---

## Dashboard Pages

| Page | Description |
|------|-------------|
| `/dashboard` | Overview with stats and recent flag activity |
| `/projects` | Manage projects and API keys |
| `/flags` | List, search, and filter feature flags |
| `/flags/[id]` | Flag details, targeting rules, and environment settings |
| `/environments` | Environment configuration |
| `/logs` | Activity and audit logs |
| `/settings` | Account, billing, and integrations |

---

## License

MIT

---

**Flagship** — Release with confidence, iterate with speed.
