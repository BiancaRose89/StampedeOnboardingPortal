import {
  cmsAdmins,
  contentTypes,
  contentItems,
  contentVersions,
  contentLocks,
  cmsActivityLog,
  type CmsAdmin,
  type InsertCmsAdmin,
  type ContentType,
  type InsertContentType,
  type ContentItem,
  type InsertContentItem,
  type ContentVersion,
  type InsertContentVersion,
  type ContentLock,
  type InsertContentLock,
  type CmsActivityLog,
  type InsertCmsActivityLog,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, lt, gte } from "drizzle-orm";
import bcrypt from "bcrypt";
import crypto from "crypto";

export interface ICmsStorage {
  // Admin management
  createAdmin(admin: InsertCmsAdmin & { password: string }): Promise<CmsAdmin>;
  getAdminByEmail(email: string): Promise<CmsAdmin | undefined>;
  getAdminById(id: number): Promise<CmsAdmin | undefined>;
  getAllAdmins(): Promise<CmsAdmin[]>;
  updateAdmin(id: number, updates: Partial<CmsAdmin>): Promise<CmsAdmin | undefined>;
  validateAdminPassword(email: string, password: string): Promise<CmsAdmin | null>;
  updateLastLogin(id: number): Promise<void>;

  // Content type management
  createContentType(contentType: InsertContentType): Promise<ContentType>;
  getAllContentTypes(): Promise<ContentType[]>;
  getContentTypeByName(name: string): Promise<ContentType | undefined>;
  updateContentType(id: number, updates: Partial<ContentType>): Promise<ContentType | undefined>;

  // Content item management
  createContentItem(item: InsertContentItem): Promise<ContentItem>;
  getAllContentItems(): Promise<ContentItem[]>;
  getContentItemByKey(key: string): Promise<ContentItem | undefined>;
  getContentItemsByType(contentTypeId: number): Promise<ContentItem[]>;
  updateContentItem(id: number, updates: Partial<ContentItem>, adminId: number): Promise<ContentItem | undefined>;
  deleteContentItem(id: number): Promise<boolean>;
  publishContentItem(id: number, adminId: number): Promise<ContentItem | undefined>;
  unpublishContentItem(id: number, adminId: number): Promise<ContentItem | undefined>;

  // Version control
  createContentVersion(version: InsertContentVersion): Promise<ContentVersion>;
  getContentVersions(contentItemId: number): Promise<ContentVersion[]>;
  getContentVersion(id: number): Promise<ContentVersion | undefined>;
  restoreContentVersion(contentItemId: number, versionId: number, adminId: number): Promise<ContentItem | undefined>;

  // Content locking for collaboration
  acquireLock(contentItemId: number, adminId: number, durationMinutes?: number): Promise<ContentLock | null>;
  releaseLock(lockToken: string, adminId: number): Promise<boolean>;
  renewLock(lockToken: string, adminId: number, durationMinutes?: number): Promise<ContentLock | null>;
  getActiveLock(contentItemId: number): Promise<ContentLock | undefined>;
  cleanupExpiredLocks(): Promise<number>;

  // Activity logging
  logActivity(activity: InsertCmsActivityLog): Promise<CmsActivityLog>;
  getActivityLog(limit?: number): Promise<CmsActivityLog[]>;
  getAdminActivity(adminId: number, limit?: number): Promise<CmsActivityLog[]>;
}

export class DatabaseCmsStorage implements ICmsStorage {
  // Admin management
  async createAdmin(adminData: InsertCmsAdmin & { password: string }): Promise<CmsAdmin> {
    const { password, ...admin } = adminData;
    const passwordHash = await bcrypt.hash(password, 12);
    
    const [newAdmin] = await db
      .insert(cmsAdmins)
      .values({ ...admin, passwordHash })
      .returning();
    
    return newAdmin;
  }

  async getAdminByEmail(email: string): Promise<CmsAdmin | undefined> {
    const [admin] = await db
      .select()
      .from(cmsAdmins)
      .where(eq(cmsAdmins.email, email));
    return admin;
  }

  async getAdminById(id: number): Promise<CmsAdmin | undefined> {
    const [admin] = await db
      .select()
      .from(cmsAdmins)
      .where(eq(cmsAdmins.id, id));
    return admin;
  }

  async getAllAdmins(): Promise<CmsAdmin[]> {
    return await db.select().from(cmsAdmins).orderBy(desc(cmsAdmins.createdAt));
  }

  async updateAdmin(id: number, updates: Partial<CmsAdmin>): Promise<CmsAdmin | undefined> {
    const [updated] = await db
      .update(cmsAdmins)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(cmsAdmins.id, id))
      .returning();
    return updated;
  }

  async validateAdminPassword(email: string, password: string): Promise<CmsAdmin | null> {
    const admin = await this.getAdminByEmail(email);
    if (!admin || !admin.isActive) return null;

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    return isValid ? admin : null;
  }

  async updateLastLogin(id: number): Promise<void> {
    await db
      .update(cmsAdmins)
      .set({ lastLogin: new Date() })
      .where(eq(cmsAdmins.id, id));
  }

  // Content type management
  async createContentType(contentType: InsertContentType): Promise<ContentType> {
    const [newType] = await db
      .insert(contentTypes)
      .values(contentType)
      .returning();
    return newType;
  }

  async getAllContentTypes(): Promise<ContentType[]> {
    return await db
      .select()
      .from(contentTypes)
      .where(eq(contentTypes.isActive, true))
      .orderBy(contentTypes.displayName);
  }

  async getContentTypeByName(name: string): Promise<ContentType | undefined> {
    const [type] = await db
      .select()
      .from(contentTypes)
      .where(eq(contentTypes.name, name));
    return type;
  }

  async updateContentType(id: number, updates: Partial<ContentType>): Promise<ContentType | undefined> {
    const [updated] = await db
      .update(contentTypes)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(contentTypes.id, id))
      .returning();
    return updated;
  }

  // Content item management
  async createContentItem(item: InsertContentItem): Promise<ContentItem> {
    const [newItem] = await db
      .insert(contentItems)
      .values(item)
      .returning();

    // Create initial version
    await this.createContentVersion({
      contentItemId: newItem.id,
      versionNumber: 1,
      content: item.content,
      changeDescription: "Initial version",
      createdBy: item.createdBy,
    });

    return newItem;
  }

  async getAllContentItems(): Promise<ContentItem[]> {
    return await db
      .select()
      .from(contentItems)
      .orderBy(desc(contentItems.updatedAt));
  }

  async getContentItemByKey(key: string): Promise<ContentItem | undefined> {
    const [item] = await db
      .select()
      .from(contentItems)
      .where(eq(contentItems.key, key));
    return item;
  }

  async getContentItemsByType(contentTypeId: number): Promise<ContentItem[]> {
    return await db
      .select()
      .from(contentItems)
      .where(eq(contentItems.contentTypeId, contentTypeId))
      .orderBy(desc(contentItems.updatedAt));
  }

  async updateContentItem(id: number, updates: Partial<ContentItem>, adminId: number): Promise<ContentItem | undefined> {
    const currentItem = await db.select().from(contentItems).where(eq(contentItems.id, id));
    if (!currentItem[0]) return undefined;

    // Create version before updating
    const versions = await this.getContentVersions(id);
    const nextVersion = Math.max(...versions.map(v => v.versionNumber), 0) + 1;

    if (updates.content) {
      await this.createContentVersion({
        contentItemId: id,
        versionNumber: nextVersion,
        content: updates.content,
        changeDescription: `Updated by admin ${adminId}`,
        createdBy: adminId,
      });
    }

    const [updated] = await db
      .update(contentItems)
      .set({ ...updates, updatedBy: adminId, updatedAt: new Date() })
      .where(eq(contentItems.id, id))
      .returning();

    return updated;
  }

  async deleteContentItem(id: number): Promise<boolean> {
    const result = await db.delete(contentItems).where(eq(contentItems.id, id));
    return result.rowCount > 0;
  }

  async publishContentItem(id: number, adminId: number): Promise<ContentItem | undefined> {
    const [updated] = await db
      .update(contentItems)
      .set({
        isPublished: true,
        publishedAt: new Date(),
        updatedBy: adminId,
        updatedAt: new Date(),
      })
      .where(eq(contentItems.id, id))
      .returning();

    return updated;
  }

  async unpublishContentItem(id: number, adminId: number): Promise<ContentItem | undefined> {
    const [updated] = await db
      .update(contentItems)
      .set({
        isPublished: false,
        publishedAt: null,
        updatedBy: adminId,
        updatedAt: new Date(),
      })
      .where(eq(contentItems.id, id))
      .returning();

    return updated;
  }

  // Version control
  async createContentVersion(version: InsertContentVersion): Promise<ContentVersion> {
    const [newVersion] = await db
      .insert(contentVersions)
      .values(version)
      .returning();
    return newVersion;
  }

  async getContentVersions(contentItemId: number): Promise<ContentVersion[]> {
    return await db
      .select()
      .from(contentVersions)
      .where(eq(contentVersions.contentItemId, contentItemId))
      .orderBy(desc(contentVersions.versionNumber));
  }

  async getContentVersion(id: number): Promise<ContentVersion | undefined> {
    const [version] = await db
      .select()
      .from(contentVersions)
      .where(eq(contentVersions.id, id));
    return version;
  }

  async restoreContentVersion(contentItemId: number, versionId: number, adminId: number): Promise<ContentItem | undefined> {
    const version = await this.getContentVersion(versionId);
    if (!version || version.contentItemId !== contentItemId) return undefined;

    return await this.updateContentItem(contentItemId, {
      content: version.content,
    }, adminId);
  }

  // Content locking for collaboration
  async acquireLock(contentItemId: number, adminId: number, durationMinutes: number = 30): Promise<ContentLock | null> {
    // Check for existing locks
    await this.cleanupExpiredLocks();
    const existingLock = await this.getActiveLock(contentItemId);
    
    if (existingLock && existingLock.lockedBy !== adminId) {
      return null; // Content is locked by another admin
    }

    const lockToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000);

    const [lock] = await db
      .insert(contentLocks)
      .values({
        contentItemId,
        lockedBy: adminId,
        lockToken,
        expiresAt,
      })
      .returning();

    return lock;
  }

  async releaseLock(lockToken: string, adminId: number): Promise<boolean> {
    const result = await db
      .delete(contentLocks)
      .where(and(
        eq(contentLocks.lockToken, lockToken),
        eq(contentLocks.lockedBy, adminId)
      ));
    
    return result.rowCount > 0;
  }

  async renewLock(lockToken: string, adminId: number, durationMinutes: number = 30): Promise<ContentLock | null> {
    const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000);
    
    const [updated] = await db
      .update(contentLocks)
      .set({ expiresAt })
      .where(and(
        eq(contentLocks.lockToken, lockToken),
        eq(contentLocks.lockedBy, adminId)
      ))
      .returning();

    return updated || null;
  }

  async getActiveLock(contentItemId: number): Promise<ContentLock | undefined> {
    const [lock] = await db
      .select()
      .from(contentLocks)
      .where(and(
        eq(contentLocks.contentItemId, contentItemId),
        gte(contentLocks.expiresAt, new Date())
      ));
    
    return lock;
  }

  async cleanupExpiredLocks(): Promise<number> {
    const result = await db
      .delete(contentLocks)
      .where(lt(contentLocks.expiresAt, new Date()));
    
    return result.rowCount;
  }

  // Activity logging
  async logActivity(activity: InsertCmsActivityLog): Promise<CmsActivityLog> {
    const [log] = await db
      .insert(cmsActivityLog)
      .values(activity)
      .returning();
    return log;
  }

  async getActivityLog(limit: number = 50): Promise<CmsActivityLog[]> {
    return await db
      .select()
      .from(cmsActivityLog)
      .orderBy(desc(cmsActivityLog.createdAt))
      .limit(limit);
  }

  async getAdminActivity(adminId: number, limit: number = 50): Promise<CmsActivityLog[]> {
    return await db
      .select()
      .from(cmsActivityLog)
      .where(eq(cmsActivityLog.adminId, adminId))
      .orderBy(desc(cmsActivityLog.createdAt))
      .limit(limit);
  }
}

export const cmsStorage = new DatabaseCmsStorage();