# Stampede Onboarding Portal - Export Guide

## Overview
This guide helps you export and set up the Stampede onboarding portal in another environment.

## Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Git (for version control)

## Environment Setup

### 1. Database Configuration
Create a PostgreSQL database and set these environment variables:
```bash
DATABASE_URL="postgresql://username:password@host:port/database"
PGHOST="your-host"
PGPORT="5432"
PGUSER="your-username"
PGPASSWORD="your-password"
PGDATABASE="your-database-name"
```

### 2. Required Environment Variables
```bash
# Database (required)
DATABASE_URL="postgresql://..."

# Development/Production
NODE_ENV="development"  # or "production"

# Optional: Session secret for production
SESSION_SECRET="your-secure-session-secret-here"
```

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
```bash
# Push database schema
npm run db:push

# The app will automatically initialize CMS tables and default data on first run
```

### 3. Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5000`

### 4. Production Build
```bash
npm run build
npm start
```

## Default Admin Access
- **Email**: admin@stampede.ai
- **Password**: admin123
- **CMS Access**: `/cms` route

## Key Features
- **Frontend**: Customer onboarding portal with dynamic feature selection
- **CMS**: Admin dashboard with analytics and venue management at `/cms`
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Mock Firebase for frontend, separate CMS auth system

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   └── lib/           # Utilities
├── server/                 # Express backend
│   ├── db.ts              # Database connection
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data layer
│   └── cms*/              # CMS-specific files
├── shared/                 # Shared types/schema
│   └── schema.ts          # Database schema
└── package.json
```

## Customization Options

### 1. Branding
- Colors defined in `client/src/index.css`
- Main theme: Black (#000000) with pink accents (#FF389A)
- Update logo and assets in `attached_assets/` folder

### 2. Onboarding Features
Configure available features in CMS:
- Account Setup
- Booking System  
- Loyalty Program
- Payment Processing
- Marketing Automation
- WiFi Marketing
- Review Management
- Analytics & Reporting

### 3. Content Management
- All content editable through CMS interface
- Supports rich text, images, and structured data
- Version control and content locking

## Deployment Considerations

### Database
- Ensure PostgreSQL is accessible from your hosting environment
- Connection pooling is configured for production workloads
- Database tables auto-create on first run

### Performance
- Frontend built with Vite for optimal performance
- Backend uses efficient Drizzle ORM queries
- Static assets served efficiently

### Security
- Set strong SESSION_SECRET in production
- Use HTTPS in production
- Database credentials should be properly secured

## Troubleshooting

### Common Issues
1. **Database Connection**: Verify DATABASE_URL format and credentials
2. **Missing Tables**: Tables auto-create on first run - check logs
3. **Admin Login**: Use default credentials: admin@stampede.ai / admin123
4. **Port Conflicts**: App runs on port 5000 by default

### Support
- Check `replit.md` for detailed architecture documentation
- Review console logs for specific error messages
- Ensure all environment variables are properly set

## Export Checklist
- [ ] Copy all project files
- [ ] Set up PostgreSQL database
- [ ] Configure environment variables
- [ ] Run `npm install`
- [ ] Run `npm run db:push`
- [ ] Start with `npm run dev`
- [ ] Access CMS at `/cms`
- [ ] Test onboarding flow at `/`

The app is designed to be portable and self-contained once the database is configured.