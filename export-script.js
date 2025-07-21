#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exportDir = path.join(__dirname, 'export');

// Files to exclude from export
const excludePatterns = [
  'node_modules',
  '.git',
  'dist',
  '.replit',
  'export',
  '.env',
  '.env.local',
  'export-script.js'
];

// Create export directory
if (fs.existsSync(exportDir)) {
  fs.rmSync(exportDir, { recursive: true });
}
fs.mkdirSync(exportDir, { recursive: true });

// Copy files recursively
function copyDirectory(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    // Skip excluded patterns
    if (excludePatterns.some(pattern => entry.name.includes(pattern))) {
      continue;
    }
    
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Create environment template
const envTemplate = `# Stampede Onboarding Portal - Environment Configuration

# Database Configuration (Required)
DATABASE_URL="postgresql://username:password@host:port/database"
PGHOST="your-database-host"
PGPORT="5432"
PGUSER="your-username"
PGPASSWORD="your-password" 
PGDATABASE="your-database-name"

# Application Configuration
NODE_ENV="development"

# Session Security (Production)
SESSION_SECRET="generate-a-secure-random-string-for-production"

# Optional: Tawk.to Chat Widget
# VITE_TAWK_PROPERTY_ID="your-tawk-property-id"
`;

// Create Docker configuration
const dockerfile = `FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
`;

const dockerCompose = `version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
      - SESSION_SECRET=\${SESSION_SECRET}
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      - POSTGRES_DB=stampede_onboarding
      - POSTGRES_USER=\${POSTGRES_USER:-stampede}
      - POSTGRES_PASSWORD=\${POSTGRES_PASSWORD:-changeme}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
`;

// Copy project files
console.log('Copying project files...');
copyDirectory(__dirname, exportDir);

// Create configuration files
console.log('Creating configuration files...');
fs.writeFileSync(path.join(exportDir, '.env.template'), envTemplate);
fs.writeFileSync(path.join(exportDir, 'Dockerfile'), dockerfile);
fs.writeFileSync(path.join(exportDir, 'docker-compose.yml'), dockerCompose);

// Create README for export
const exportReadme = `# Stampede Onboarding Portal - Exported Version

This is an exported version of the Stampede onboarding portal.

## Quick Start

1. **Set up environment**:
   \`\`\`bash
   cp .env.template .env
   # Edit .env with your database credentials
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up database**:
   \`\`\`bash
   npm run db:push
   \`\`\`

4. **Start development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

## Default Admin Access
- Email: admin@stampede.ai
- Password: admin123
- CMS: http://localhost:5000/cms

## Docker Deployment
\`\`\`bash
docker-compose up -d
\`\`\`

For detailed setup instructions, see EXPORT_GUIDE.md
`;

fs.writeFileSync(path.join(exportDir, 'README.md'), exportReadme);

console.log(`\n✅ Export completed successfully!`);
console.log(`📁 Exported to: ${exportDir}`);
console.log(`\nNext steps:`);
console.log(`1. Copy the 'export' folder to your target environment`);
console.log(`2. Follow the README.md in the export folder`);
console.log(`3. Configure your database in .env file`);
console.log(`4. Run: npm install && npm run db:push && npm run dev`);