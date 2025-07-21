import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { cmsStorage } from './cmsStorage';
import type { CmsAdmin } from '@shared/schema';

// Extend Request type to include cmsAdmin
declare global {
  namespace Express {
    interface Request {
      cmsAdmin?: CmsAdmin;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '24h';

export interface JwtPayload {
  adminId: number;
  email: string;
  role: string;
}

export class CmsAuthService {
  static generateToken(admin: CmsAdmin): string {
    return jwt.sign(
      {
        adminId: admin.id,
        email: admin.email,
        role: admin.role,
      } as JwtPayload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  static async login(email: string, password: string): Promise<{ admin: CmsAdmin; token: string } | null> {
    const admin = await cmsStorage.validateAdminPassword(email, password);
    if (!admin) return null;

    await cmsStorage.updateLastLogin(admin.id);
    const token = this.generateToken(admin);

    return { admin, token };
  }
}

// Middleware to authenticate CMS admin requests
export const authenticateCmsAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (!token) {
      return res.status(401).json({ error: 'Authentication token required' });
    }

    const payload = CmsAuthService.verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const admin = await cmsStorage.getAdminById(payload.adminId);
    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: 'Admin account not found or inactive' });
    }

    req.cmsAdmin = admin;
    next();
  } catch (error) {
    console.error('CMS Authentication error:', error);
    res.status(500).json({ error: 'Authentication service error' });
  }
};

// Middleware to check if admin has required role
export const requireCmsRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.cmsAdmin) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.cmsAdmin.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

// Middleware to log CMS activities
export const logCmsActivity = (action: string, resourceType: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cmsAdmin) {
      return next();
    }

    try {
      await cmsStorage.logActivity({
        adminId: req.cmsAdmin.id,
        action,
        resourceType,
        resourceId: req.params.id ? parseInt(req.params.id) : 0,
        details: {
          method: req.method,
          url: req.url,
          body: req.body,
        },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      });
    } catch (error) {
      console.error('Failed to log CMS activity:', error);
    }

    next();
  };
};