# Stampede Onboarding Portal - Exported Version

This is an exported version of the Stampede onboarding portal.

## Quick Start

1. **Set up environment**:
   ```bash
   cp .env.template .env
   # Edit .env with your database credentials
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up database**:
   ```bash
   npm run db:push
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## Default Admin Access
- Email: admin@stampede.ai
- Password: admin123
- CMS: http://localhost:5000/cms

## Docker Deployment
```bash
docker-compose up -d
```

For detailed setup instructions, see EXPORT_GUIDE.md
