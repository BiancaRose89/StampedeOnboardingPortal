# Replit.md - Stampede Onboarding Portal

## Overview

This is a full-stack web application for Stampede's customer onboarding journey. It provides a comprehensive platform for new customers to learn about and configure their hospitality management system features including bookings, loyalty programs, and marketing automation.

The application is built with a modern tech stack featuring React frontend, Express backend, and PostgreSQL database, designed to deliver a seamless onboarding experience with progress tracking and personalized content.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query for server state, React Context for authentication
- **Routing**: Wouter for client-side routing
- **Theme Support**: Custom theme provider with light/dark/system modes
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Session Management**: Express sessions with PostgreSQL storage
- **Development**: Hot reloading with Vite integration

### Database Layer
- **Database**: PostgreSQL 16 with Neon serverless connection
- **ORM**: Drizzle ORM with TypeScript schema definitions
- **Migration**: Drizzle Kit for schema management
- **Connection**: Connection pooling with @neondatabase/serverless

## Key Components

### Authentication System
- Mock Firebase authentication for development
- Role-based access control (admin/client roles)
- Protected routes and API endpoints
- User session management with PostgreSQL storage

### Onboarding Flow Management
- Multi-step onboarding process tracking
- Progress persistence across sessions
- Step-by-step guides for different features
- Customizable guide configurations

### Admin Dashboard
- User management and role assignment
- Guide configuration management
- Progress monitoring and analytics
- System settings and customization

### Feature Guides
- **Bookings Guide**: Table reservation system setup
- **Loyalty Guide**: Customer loyalty program configuration
- **Marketing Guide**: Email campaigns and automation setup
- **WiFi Guide**: Guest network and marketing capture
- **Reviews Guide**: Review collection and management

### UI Components
- Comprehensive shadcn/ui component library
- Custom onboarding components
- Progress tracking visualizations
- Responsive design with mobile support

## Data Flow

1. **User Authentication**: Users authenticate through mock Firebase system
2. **Database Sync**: User data synced with PostgreSQL via Drizzle ORM
3. **Progress Tracking**: Onboarding steps tracked in real-time
4. **Guide Management**: Admins configure guides through REST API
5. **Activity Logging**: User interactions logged for analytics
6. **Session Management**: Secure session handling with PostgreSQL

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection handling
- **drizzle-orm**: Database ORM with TypeScript support
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast bundling for production

### Third-Party Integrations
- **Tawk.to**: Live chat support (configurable)
- **HubSpot**: External knowledge base links
- **Social Media**: Platform integration for marketing

## Deployment Strategy

### Development Environment
- **Replit**: Cloud development with hot reloading
- **PostgreSQL**: Managed database with automatic provisioning
- **Node.js 20**: Runtime environment with ES modules support

### Production Build
- **Frontend**: Vite build to dist/public directory
- **Backend**: esbuild compilation to dist/index.js
- **Database**: Drizzle migrations applied automatically
- **Deployment**: Autoscale deployment target on Replit

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **Port Configuration**: Internal port 5000, external port 80

## Changelog

```
Changelog:
- June 17, 2025. Initial setup
- June 17, 2025. Built comprehensive collaborative CMS admin dashboard with multi-user authentication, real-time content locking, version control, and flexible content schema. Default admin: admin@stampede.ai / admin123. Access at /cms route.
- June 17, 2025. Implemented unified venue management system with custom onboarding feature selection. Admins can create venues and select specific features (Account Setup, Booking System, Loyalty Program, Payment Processing, Marketing Automation, WiFi Marketing, Review Management, Analytics & Reporting) that determine which tasks/modules appear in each venue's onboarding flow. Features are categorized as core, advanced, or premium with dynamic content visibility based on venue configuration.
- June 17, 2025. Built organization-level onboarding with multi-venue support. Organizations can contain multiple venues with independent feature assignments. CMS now supports hierarchical structure where admins create organizations, then add venues under each org with custom feature selection. Progress tracking rolls up from venue to organization level (e.g., "Org A - 2 of 10 venues live"). Front-end dynamically displays venue data from CMS with smart logic for single/multiple venue organizations.
- June 17, 2025. Restructured CMS interface for analytics-first approach: Created new "Dashboard" tab with comprehensive onboarding analytics (performance metrics, stage analysis, feature adoption rates, completion heatmaps, organization comparisons). Renamed organizations tab to "Venues Onboarded" focused on operational venue management. Dashboard is now the primary landing tab with data-driven insights for optimization.
- June 17, 2025. Implemented hierarchical CMS navigation with Admin (Dashboard, Venues Onboarded, Activity, Users) and Content (Content, Master Platform, Onboarding Setup Tasks) top-level sections. Restored detailed venue onboarding task management interface with individual task tracking, assignment controls, status management, and progress monitoring similar to Master Platform structure.
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```