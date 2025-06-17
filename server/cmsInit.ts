import { cmsStorage } from './cmsStorage';
import { db } from './db';
import { 
  cmsAdmins, 
  contentTypes, 
  contentItems,
  contentVersions,
  contentLocks,
  cmsActivityLog 
} from '@shared/schema';

export async function initializeCms() {
  try {
    console.log('Initializing CMS database tables...');

    // Create default content types for the Stampede onboarding app
    const defaultContentTypes = [
      {
        name: 'page_content',
        displayName: 'Page Content',
        description: 'Main page content like hero sections, descriptions, and copy',
        schema: {
          type: 'object',
          properties: {
            title: { type: 'string', title: 'Title' },
            subtitle: { type: 'string', title: 'Subtitle' },
            description: { type: 'string', title: 'Description' },
            buttonText: { type: 'string', title: 'Button Text' },
            buttonUrl: { type: 'string', title: 'Button URL' }
          }
        }
      },
      {
        name: 'navigation',
        displayName: 'Navigation',
        description: 'Navigation menus, links, and routing configuration',
        schema: {
          type: 'object',
          properties: {
            label: { type: 'string', title: 'Label' },
            url: { type: 'string', title: 'URL' },
            target: { type: 'string', title: 'Target' },
            order: { type: 'number', title: 'Order' }
          }
        }
      },
      {
        name: 'media',
        displayName: 'Media',
        description: 'Images, videos, and other media assets',
        schema: {
          type: 'object',
          properties: {
            url: { type: 'string', title: 'Media URL' },
            alt: { type: 'string', title: 'Alt Text' },
            caption: { type: 'string', title: 'Caption' },
            type: { type: 'string', title: 'Media Type' }
          }
        }
      },
      {
        name: 'settings',
        displayName: 'Site Settings',
        description: 'Global site configuration and settings',
        schema: {
          type: 'object',
          properties: {
            value: { type: 'string', title: 'Value' },
            description: { type: 'string', title: 'Description' },
            type: { type: 'string', title: 'Setting Type' }
          }
        }
      }
    ];

    // Create content types if they don't exist
    for (const contentType of defaultContentTypes) {
      const existing = await cmsStorage.getContentTypeByName(contentType.name);
      if (!existing) {
        await cmsStorage.createContentType(contentType);
        console.log(`Created content type: ${contentType.displayName}`);
      }
    }

    // Create default admin user if none exists
    const existingAdmins = await cmsStorage.getAllAdmins();
    if (existingAdmins.length === 0) {
      await cmsStorage.createAdmin({
        email: 'admin@stampede.ai',
        password: 'admin123',
        name: 'Super Admin',
        role: 'super_admin',
        isActive: true
      });
      console.log('Created default admin user: admin@stampede.ai (password: admin123)');
    }

    // Create sample content items
    const pageContentType = await cmsStorage.getContentTypeByName('page_content');
    if (pageContentType) {
      const adminUser = await cmsStorage.getAdminByEmail('admin@stampede.ai');
      if (adminUser) {
        const existingContent = await cmsStorage.getContentItemByKey('home_hero');
        if (!existingContent) {
          const heroItem = await cmsStorage.createContentItem({
            key: 'home_hero',
            contentTypeId: pageContentType.id,
            title: 'Home Page Hero Section',
            content: {
              title: 'Kickstart Your Success with Stampede',
              subtitle: 'Your all-in-one hospitality partner',
              description: 'Transform your venue with powerful tools for bookings, loyalty, marketing, and more. Get started in minutes, not months.',
              buttonText: 'Get Started Now',
              buttonUrl: '#get-started'
            },
            isPublished: false,
            createdBy: adminUser.id,
            updatedBy: adminUser.id
          });
          await cmsStorage.publishContentItem(heroItem.id, adminUser.id);
          console.log('Created sample content: Home Hero Section');
        }

        const existingFooter = await cmsStorage.getContentItemByKey('footer_content');
        if (!existingFooter) {
          const footerItem = await cmsStorage.createContentItem({
            key: 'footer_content',
            contentTypeId: pageContentType.id,
            title: 'Footer Content',
            content: {
              companyName: 'Stampede',
              description: 'Your all-in-one hospitality partner helping venues grow and thrive.',
              copyright: '© 2025 Stampede. All rights reserved.',
              contactEmail: 'support@stampede.ai'
            },
            isPublished: false,
            createdBy: adminUser.id,
            updatedBy: adminUser.id
          });
          await cmsStorage.publishContentItem(footerItem.id, adminUser.id);
          console.log('Created sample content: Footer Content');
        }
      }
    }

    console.log('CMS initialization completed successfully');
    return true;
  } catch (error) {
    console.error('CMS initialization failed:', error);
    return false;
  }
}

// Clean up expired locks periodically
export function startLockCleanup() {
  setInterval(async () => {
    try {
      const cleaned = await cmsStorage.cleanupExpiredLocks();
      if (cleaned > 0) {
        console.log(`Cleaned up ${cleaned} expired content locks`);
      }
    } catch (error) {
      console.error('Lock cleanup failed:', error);
    }
  }, 5 * 60 * 1000); // Every 5 minutes
}