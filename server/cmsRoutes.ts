import type { Express } from "express";
import { cmsStorage } from "./cmsStorage";
import { CmsAuthService, authenticateCmsAdmin, requireCmsRole, logCmsActivity } from "./cmsAuth";
import { insertCmsAdminSchema, insertContentTypeSchema, insertContentItemSchema } from "@shared/schema";
import { z } from "zod";

export function registerCmsRoutes(app: Express) {
  // Authentication routes
  app.post('/api/cms/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      const result = await CmsAuthService.login(email, password);
      if (!result) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const { admin, token } = result;
      res.json({
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
        token,
      });
    } catch (error) {
      console.error('CMS login error:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  });

  app.post('/api/cms/auth/verify', authenticateCmsAdmin, (req, res) => {
    res.json({
      admin: {
        id: req.cmsAdmin!.id,
        email: req.cmsAdmin!.email,
        name: req.cmsAdmin!.name,
        role: req.cmsAdmin!.role,
      },
    });
  });

  // Admin management routes (super admin only)
  app.get('/api/cms/admins', 
    authenticateCmsAdmin, 
    requireCmsRole(['super_admin']), 
    async (req, res) => {
      try {
        const admins = await cmsStorage.getAllAdmins();
        res.json(admins.map(admin => ({
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          isActive: admin.isActive,
          lastLogin: admin.lastLogin,
          createdAt: admin.createdAt,
        })));
      } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Failed to fetch admins' });
      }
    }
  );

  app.post('/api/cms/admins',
    authenticateCmsAdmin,
    requireCmsRole(['super_admin']),
    logCmsActivity('create', 'admin'),
    async (req, res) => {
      try {
        const adminData = insertCmsAdminSchema.extend({
          password: z.string().min(8),
        }).parse(req.body);

        const admin = await cmsStorage.createAdmin(adminData);
        res.status(201).json({
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          isActive: admin.isActive,
          createdAt: admin.createdAt,
        });
      } catch (error) {
        console.error('Error creating admin:', error);
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: 'Invalid admin data', details: error.errors });
        }
        res.status(500).json({ error: 'Failed to create admin' });
      }
    }
  );

  // Content type management
  app.get('/api/cms/content-types', authenticateCmsAdmin, async (req, res) => {
    try {
      const contentTypes = await cmsStorage.getAllContentTypes();
      res.json(contentTypes);
    } catch (error) {
      console.error('Error fetching content types:', error);
      res.status(500).json({ error: 'Failed to fetch content types' });
    }
  });

  app.post('/api/cms/content-types',
    authenticateCmsAdmin,
    requireCmsRole(['super_admin', 'admin']),
    logCmsActivity('create', 'content_type'),
    async (req, res) => {
      try {
        const contentTypeData = insertContentTypeSchema.parse(req.body);
        const contentType = await cmsStorage.createContentType(contentTypeData);
        res.status(201).json(contentType);
      } catch (error) {
        console.error('Error creating content type:', error);
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: 'Invalid content type data', details: error.errors });
        }
        res.status(500).json({ error: 'Failed to create content type' });
      }
    }
  );

  app.put('/api/cms/content-types/:id',
    authenticateCmsAdmin,
    requireCmsRole(['super_admin', 'admin']),
    logCmsActivity('update', 'content_type'),
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const updates = insertContentTypeSchema.partial().parse(req.body);
        
        const contentType = await cmsStorage.updateContentType(id, updates);
        if (!contentType) {
          return res.status(404).json({ error: 'Content type not found' });
        }
        
        res.json(contentType);
      } catch (error) {
        console.error('Error updating content type:', error);
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: 'Invalid content type data', details: error.errors });
        }
        res.status(500).json({ error: 'Failed to update content type' });
      }
    }
  );

  // Content item management
  app.get('/api/cms/content', authenticateCmsAdmin, async (req, res) => {
    try {
      const { type } = req.query;
      let contentItems;

      if (type && typeof type === 'string') {
        const contentType = await cmsStorage.getContentTypeByName(type);
        if (!contentType) {
          return res.status(404).json({ error: 'Content type not found' });
        }
        contentItems = await cmsStorage.getContentItemsByType(contentType.id);
      } else {
        contentItems = await cmsStorage.getAllContentItems();
      }

      res.json(contentItems);
    } catch (error) {
      console.error('Error fetching content items:', error);
      res.status(500).json({ error: 'Failed to fetch content items' });
    }
  });

  app.get('/api/cms/content/:key', authenticateCmsAdmin, async (req, res) => {
    try {
      const contentItem = await cmsStorage.getContentItemByKey(req.params.key);
      if (!contentItem) {
        return res.status(404).json({ error: 'Content item not found' });
      }
      res.json(contentItem);
    } catch (error) {
      console.error('Error fetching content item:', error);
      res.status(500).json({ error: 'Failed to fetch content item' });
    }
  });

  app.post('/api/cms/content',
    authenticateCmsAdmin,
    logCmsActivity('create', 'content_item'),
    async (req, res) => {
      try {
        const contentData = insertContentItemSchema.parse({
          ...req.body,
          createdBy: req.cmsAdmin!.id,
          updatedBy: req.cmsAdmin!.id,
        });

        const contentItem = await cmsStorage.createContentItem(contentData);
        res.status(201).json(contentItem);
      } catch (error) {
        console.error('Error creating content item:', error);
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: 'Invalid content data', details: error.errors });
        }
        res.status(500).json({ error: 'Failed to create content item' });
      }
    }
  );

  app.put('/api/cms/content/:id',
    authenticateCmsAdmin,
    logCmsActivity('update', 'content_item'),
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const updates = insertContentItemSchema.partial().parse(req.body);
        
        const contentItem = await cmsStorage.updateContentItem(id, updates, req.cmsAdmin!.id);
        if (!contentItem) {
          return res.status(404).json({ error: 'Content item not found' });
        }
        
        res.json(contentItem);
      } catch (error) {
        console.error('Error updating content item:', error);
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: 'Invalid content data', details: error.errors });
        }
        res.status(500).json({ error: 'Failed to update content item' });
      }
    }
  );

  app.delete('/api/cms/content/:id',
    authenticateCmsAdmin,
    requireCmsRole(['super_admin', 'admin']),
    logCmsActivity('delete', 'content_item'),
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const success = await cmsStorage.deleteContentItem(id);
        
        if (!success) {
          return res.status(404).json({ error: 'Content item not found' });
        }
        
        res.json({ success: true });
      } catch (error) {
        console.error('Error deleting content item:', error);
        res.status(500).json({ error: 'Failed to delete content item' });
      }
    }
  );

  // Publishing control
  app.post('/api/cms/content/:id/publish',
    authenticateCmsAdmin,
    requireCmsRole(['super_admin', 'admin', 'editor']),
    logCmsActivity('publish', 'content_item'),
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const contentItem = await cmsStorage.publishContentItem(id, req.cmsAdmin!.id);
        
        if (!contentItem) {
          return res.status(404).json({ error: 'Content item not found' });
        }
        
        res.json(contentItem);
      } catch (error) {
        console.error('Error publishing content item:', error);
        res.status(500).json({ error: 'Failed to publish content item' });
      }
    }
  );

  app.post('/api/cms/content/:id/unpublish',
    authenticateCmsAdmin,
    requireCmsRole(['super_admin', 'admin']),
    logCmsActivity('unpublish', 'content_item'),
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const contentItem = await cmsStorage.unpublishContentItem(id, req.cmsAdmin!.id);
        
        if (!contentItem) {
          return res.status(404).json({ error: 'Content item not found' });
        }
        
        res.json(contentItem);
      } catch (error) {
        console.error('Error unpublishing content item:', error);
        res.status(500).json({ error: 'Failed to unpublish content item' });
      }
    }
  );

  // Version control
  app.get('/api/cms/content/:id/versions', authenticateCmsAdmin, async (req, res) => {
    try {
      const contentItemId = parseInt(req.params.id);
      const versions = await cmsStorage.getContentVersions(contentItemId);
      res.json(versions);
    } catch (error) {
      console.error('Error fetching content versions:', error);
      res.status(500).json({ error: 'Failed to fetch content versions' });
    }
  });

  app.post('/api/cms/content/:id/restore/:versionId',
    authenticateCmsAdmin,
    requireCmsRole(['super_admin', 'admin', 'editor']),
    logCmsActivity('restore', 'content_item'),
    async (req, res) => {
      try {
        const contentItemId = parseInt(req.params.id);
        const versionId = parseInt(req.params.versionId);
        
        const contentItem = await cmsStorage.restoreContentVersion(contentItemId, versionId, req.cmsAdmin!.id);
        if (!contentItem) {
          return res.status(404).json({ error: 'Content item or version not found' });
        }
        
        res.json(contentItem);
      } catch (error) {
        console.error('Error restoring content version:', error);
        res.status(500).json({ error: 'Failed to restore content version' });
      }
    }
  );

  // Content locking for collaboration
  app.post('/api/cms/content/:id/lock', authenticateCmsAdmin, async (req, res) => {
    try {
      const contentItemId = parseInt(req.params.id);
      const { durationMinutes = 30 } = req.body;
      
      const lock = await cmsStorage.acquireLock(contentItemId, req.cmsAdmin!.id, durationMinutes);
      if (!lock) {
        return res.status(409).json({ error: 'Content is already locked by another user' });
      }
      
      res.json(lock);
    } catch (error) {
      console.error('Error acquiring content lock:', error);
      res.status(500).json({ error: 'Failed to acquire content lock' });
    }
  });

  app.delete('/api/cms/content/lock/:lockToken', authenticateCmsAdmin, async (req, res) => {
    try {
      const { lockToken } = req.params;
      const success = await cmsStorage.releaseLock(lockToken, req.cmsAdmin!.id);
      
      if (!success) {
        return res.status(404).json({ error: 'Lock not found or not owned by you' });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error('Error releasing content lock:', error);
      res.status(500).json({ error: 'Failed to release content lock' });
    }
  });

  app.put('/api/cms/content/lock/:lockToken/renew', authenticateCmsAdmin, async (req, res) => {
    try {
      const { lockToken } = req.params;
      const { durationMinutes = 30 } = req.body;
      
      const lock = await cmsStorage.renewLock(lockToken, req.cmsAdmin!.id, durationMinutes);
      if (!lock) {
        return res.status(404).json({ error: 'Lock not found or not owned by you' });
      }
      
      res.json(lock);
    } catch (error) {
      console.error('Error renewing content lock:', error);
      res.status(500).json({ error: 'Failed to renew content lock' });
    }
  });

  // Activity logging
  app.get('/api/cms/activity', 
    authenticateCmsAdmin, 
    requireCmsRole(['super_admin', 'admin']), 
    async (req, res) => {
      try {
        const limit = parseInt(req.query.limit as string) || 50;
        const activities = await cmsStorage.getActivityLog(limit);
        res.json(activities);
      } catch (error) {
        console.error('Error fetching activity log:', error);
        res.status(500).json({ error: 'Failed to fetch activity log' });
      }
    }
  );

  app.get('/api/cms/activity/my', authenticateCmsAdmin, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const activities = await cmsStorage.getAdminActivity(req.cmsAdmin!.id, limit);
      res.json(activities);
    } catch (error) {
      console.error('Error fetching admin activity:', error);
      res.status(500).json({ error: 'Failed to fetch admin activity' });
    }
  });

  // Public content API (for fetching published content in the main app)
  app.get('/api/content/:key', async (req, res) => {
    try {
      const contentItem = await cmsStorage.getContentItemByKey(req.params.key);
      if (!contentItem || !contentItem.isPublished) {
        return res.status(404).json({ error: 'Content not found' });
      }
      
      res.json({
        key: contentItem.key,
        title: contentItem.title,
        content: contentItem.content,
        publishedAt: contentItem.publishedAt,
      });
    } catch (error) {
      console.error('Error fetching public content:', error);
      res.status(500).json({ error: 'Failed to fetch content' });
    }
  });

  // Bulk content API for main app
  app.get('/api/content', async (req, res) => {
    try {
      const { keys } = req.query;
      let contentItems;

      if (keys && typeof keys === 'string') {
        const keyArray = keys.split(',');
        const allItems = await cmsStorage.getAllContentItems();
        contentItems = allItems.filter(item => 
          item.isPublished && keyArray.includes(item.key)
        );
      } else {
        const allItems = await cmsStorage.getAllContentItems();
        contentItems = allItems.filter(item => item.isPublished);
      }

      const result = contentItems.reduce((acc, item) => {
        acc[item.key] = {
          title: item.title,
          content: item.content,
          publishedAt: item.publishedAt,
        };
        return acc;
      }, {} as Record<string, any>);

      res.json(result);
    } catch (error) {
      console.error('Error fetching bulk content:', error);
      res.status(500).json({ error: 'Failed to fetch content' });
    }
  });
}