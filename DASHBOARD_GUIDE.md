# Flagship - Feature Flag Management Dashboard

A modern, professional SaaS dashboard built with Next.js, TypeScript, Tailwind CSS, and Shadcn/UI components. Inspired by design patterns from Vercel, Linear, and Stripe.

## ✨ Features Implemented

### 1. **Global Layout**
- Left sidebar navigation (collapsible with icon-only mode)
- Top header bar with search and notifications
- Main content area with responsive design
- Clean, minimal SaaS aesthetic with light theme

### 2. **Sidebar Navigation**
- Project switcher with quick access to projects (Web Platform, Mobile App, Backend API)
- Navigation menu with 6 main sections:
  - Dashboard
  - Projects
  - Feature Flags
  - Environments
  - Logs
  - Settings
- User profile section at bottom
- Icons from lucide-react for visual clarity

### 3. **Dashboard Page** (`/dashboard`)
- 4 stat cards showing:
  - Total Projects
  - Total Feature Flags
  - Active Flags (ON)
  - Flags with Partial Rollout (< 100%)
- Recently Updated Flags table with:
  - Feature key and name
  - Type badge (release/experiment/ops)
  - Status (ON/OFF)
  - Rollout percentage with visual progress bar
  - Last updated timestamp
  - View action button

### 4. **Projects Page** (`/projects`)
- Table of all projects with columns:
  - Project Name (with description)
  - API Key (masked for security with copy button)
  - Created Date
  - Actions (View, Settings)
- "Create Project" button with modal dialog
- Professional styling with subtle hover effects

### 5. **Feature Flags Page** (`/flags`)
- Dynamic filtering by project (dropdown)
- Search functionality by flag key or name
- Comprehensive flags table with:
  - Feature key and name
  - Type badge (color-coded: blue/purple/orange)
  - Environments (dev/staging/prod badges)
  - Status toggle (ON/OFF)
  - Rollout percentage with progress bar
  - Last updated timestamp
  - Edit action button (links to details page)

### 6. **Feature Details Page** (`/flags/[id]`)
Four tabs with rich content:

#### Overview Tab
- Basic information (name, key, type)
- Metadata (created date, last updated, description)

#### Targeting Rules Tab
- Placeholder for rule management interface
- "Add Rule" button for future implementation

#### Environments Tab
Three environment cards (Dev, Staging, Production):
- Environment name and color-coded badge
- Status toggle switch
- Rollout percentage slider (0-100%)
- Edit Rules button for each environment

#### Audit Logs Tab
- Chronological activity log with:
  - Action description
  - Details of change
  - User who made the change
  - Timestamp

### 7. **Environments Page** (`/environments`)
- Cards for Dev, Staging, and Production environments
- Environment descriptions
- Configure and Settings buttons for each

### 8. **Activity Logs Page** (`/logs`)
- Filterable activity log table
- Columns: Timestamp, Event, Flag, User, Action, Environment
- Color-coded badges for different log types

### 9. **Settings Page** (`/settings`)
Four configuration tabs:
- **Account**: Profile info, email, timezone, password change
- **Billing**: Current plan display and upgrade options
- **Notifications**: Toggle for different notification types
- **Integrations**: Connect with Slack, GitHub, Datadog

## 🎨 Design System

### Colors & Styling
- **Primary**: Blue (#3B82F6) for actions and highlights
- **Backgrounds**: Light slate (slate-50) for main background
- **Cards**: White with subtle borders and shadows
- **Badges**: Color-coded by type:
  - Release: Blue
  - Experiment: Purple
  - Ops: Orange
  - Environments: Dev (Gray), Staging (Yellow), Prod (Green)

### Components Used
- **UI Components**:
  - Cards with header/footer support
  - Tables with striped rows
  - Badges for categorization
  - Buttons (default, ghost, outline variants)
  - Input fields with search icon
  - Switches (toggles)
  - Sliders for rollout percentage
  - Tabs with smooth transitions
  - Dialogs/modals for forms
  - Select dropdowns

- **Icons**: Lucide React (Flag, Settings, Bell, Search, etc.)

### Typography & Spacing
- Clean, professional typography with proper hierarchy
- Consistent spacing and padding throughout
- Responsive grid layouts
- Accessible color contrast ratios

## 📊 Mock Data

The app includes comprehensive mock data:
- **3 Projects**: Web Platform, Mobile App, Backend API
- **6 Feature Flags**: Dark Mode, New Dashboard, AI Suggestions, Performance Optimization, Social Sharing, Push Notifications
- **Activity logs** with user actions and timestamps
- Realistic API keys (masked for display)

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge for class composition
- **Authentication**: Better Auth (configured)
- **Database**: Drizzle ORM with PostgreSQL (configured)

## 📁 Project Structure

```
flagship/
├── app/
│   ├── layout.tsx           # Root layout with sidebar & header
│   ├── page.tsx            # Redirects to dashboard
│   ├── dashboard/          # Dashboard page
│   ├── projects/           # Projects page
│   ├── flags/              # Feature flags page
│   ├── flags/[id]/         # Flag details page
│   ├── environments/       # Environments page
│   ├── logs/               # Activity logs page
│   ├── settings/           # Settings page
│   ├── globals.css         # Global styles
│   └── api/                # API routes
├── components/
│   ├── header.tsx          # Top header with search
│   ├── sidebar.tsx         # Left navigation sidebar
│   ├── ui/                 # Shadcn UI components
│   └── sessionProvider.tsx # Auth provider
├── lib/
│   ├── mock-data.ts        # Mock data and utilities
│   └── utils.ts            # Helper utilities (cn function)
├── public/                 # Static assets
├── package.json            # Dependencies
└── tailwind.config.js      # Tailwind configuration
```

## 🚀 Running the Application

```bash
# Install dependencies
npm install

# Start development server (runs on localhost:3001)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Notes

- The UI is fully functional and responsive
- All navigation links work and route correctly
- Mock data is used throughout - ready for API integration
- The sidebar is collapsible for compact mode
- Search and filtering work on the flags page
- Dialogs and modals are interactive
- Responsive design works on different screen sizes

## 🎯 Future Enhancements

- Backend API integration for real data
- User authentication and authorization
- Real-time updates using WebSockets
- Advanced targeting rules editor
- A/B testing analytics
- Integration with monitoring services
- Team collaboration features
