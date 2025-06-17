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
        name: 'training_modules',
        displayName: 'Training Modules',
        description: 'Interactive training modules with checkboxes and completion tracking',
        schema: {
          type: 'object',
          properties: {
            title: { type: 'string', title: 'Module Title' },
            description: { type: 'string', title: 'Description' },
            estimatedTime: { type: 'string', title: 'Estimated Time' },
            completed: { type: 'boolean', title: 'Completed' },
            icon: { type: 'string', title: 'Icon Name' },
            order: { type: 'number', title: 'Display Order' }
          }
        }
      },
      {
        name: 'platform_features',
        displayName: 'Master Platform Features',
        description: 'Feature-focused blocks for the Master Your Platform section',
        schema: {
          type: 'object',
          properties: {
            title: { type: 'string', title: 'Feature Title' },
            description: { type: 'string', title: 'Description' },
            icon: { type: 'string', title: 'Icon Name' },
            category: { type: 'string', title: 'Category' },
            difficulty: { type: 'string', title: 'Difficulty Level' },
            estimatedTime: { type: 'string', title: 'Estimated Time' },
            order: { type: 'number', title: 'Display Order' }
          }
        }
      },
      {
        name: 'live_examples',
        displayName: 'Live Feature Examples',
        description: 'Interactive live examples and demonstrations',
        schema: {
          type: 'object',
          properties: {
            title: { type: 'string', title: 'Example Title' },
            description: { type: 'string', title: 'Description' },
            demoUrl: { type: 'string', title: 'Demo URL' },
            thumbnailUrl: { type: 'string', title: 'Thumbnail Image URL' },
            category: { type: 'string', title: 'Category' },
            tags: { type: 'array', title: 'Tags' },
            order: { type: 'number', title: 'Display Order' }
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

        // Create training modules content
        const trainingContentType = await cmsStorage.getContentTypeByName('training_modules');
        if (trainingContentType) {
          const trainingModules = [
            {
              key: 'training_bookings',
              title: 'Bookings Training',
              content: {
                title: 'Master Table Bookings',
                description: 'Learn to manage reservations, walk-ins, and customer preferences efficiently.',
                estimatedTime: '45 mins',
                completed: false,
                icon: 'Calendar',
                order: 1
              }
            },
            {
              key: 'training_loyalty',
              title: 'Loyalty Program Training',
              content: {
                title: 'Build Customer Loyalty',
                description: 'Set up rewards, track customer engagement, and drive repeat business.',
                estimatedTime: '30 mins',
                completed: false,
                icon: 'Star',
                order: 2
              }
            },
            {
              key: 'training_marketing',
              title: 'Marketing Automation Training',
              content: {
                title: 'Automate Your Marketing',
                description: 'Create campaigns, segment customers, and track marketing performance.',
                estimatedTime: '60 mins',
                completed: false,
                icon: 'Target',
                order: 3
              }
            }
          ];

          for (const module of trainingModules) {
            const existing = await cmsStorage.getContentItemByKey(module.key);
            if (!existing) {
              const moduleItem = await cmsStorage.createContentItem({
                key: module.key,
                contentTypeId: trainingContentType.id,
                title: module.title,
                content: module.content,
                isPublished: false,
                createdBy: adminUser.id,
                updatedBy: adminUser.id
              });
              await cmsStorage.publishContentItem(moduleItem.id, adminUser.id);
            }
          }
          console.log('Created training modules content');
        }

        // Create platform features content
        const platformContentType = await cmsStorage.getContentTypeByName('platform_features');
        if (platformContentType) {
          const platformFeatures = [
            {
              key: 'feature_reservations',
              title: 'Reservation Management',
              content: {
                title: 'Smart Reservation System',
                description: 'Manage table bookings, waitlists, and customer preferences with ease.',
                icon: 'Calendar',
                category: 'Core Features',
                difficulty: 'Beginner',
                estimatedTime: '15 mins',
                order: 1
              }
            },
            {
              key: 'feature_loyalty_program',
              title: 'Loyalty Program',
              content: {
                title: 'Customer Retention Tools',
                description: 'Build lasting relationships with automated loyalty rewards and personalized offers.',
                icon: 'Star',
                category: 'Marketing',
                difficulty: 'Intermediate',
                estimatedTime: '20 mins',
                order: 2
              }
            },
            {
              key: 'feature_analytics',
              title: 'Business Analytics',
              content: {
                title: 'Data-Driven Insights',
                description: 'Track performance metrics, customer behavior, and revenue trends in real-time.',
                icon: 'BarChart3',
                category: 'Analytics',
                difficulty: 'Advanced',
                estimatedTime: '25 mins',
                order: 3
              }
            }
          ];

          for (const feature of platformFeatures) {
            const existing = await cmsStorage.getContentItemByKey(feature.key);
            if (!existing) {
              const featureItem = await cmsStorage.createContentItem({
                key: feature.key,
                contentTypeId: platformContentType.id,
                title: feature.title,
                content: feature.content,
                isPublished: false,
                createdBy: adminUser.id,
                updatedBy: adminUser.id
              });
              await cmsStorage.publishContentItem(featureItem.id, adminUser.id);
            }
          }
          console.log('Created platform features content');
        }

        // Create live examples content
        const liveExamplesContentType = await cmsStorage.getContentTypeByName('live_examples');
        if (liveExamplesContentType) {
          const liveExamples = [
            {
              key: 'example_booking_flow',
              title: 'Interactive Booking Demo',
              content: {
                title: 'Customer Booking Journey',
                description: 'Experience the complete booking process from a customer\'s perspective.',
                demoUrl: '/demo/booking',
                thumbnailUrl: '/images/booking-demo.jpg',
                category: 'Bookings',
                tags: ['interactive', 'customer-journey', 'reservations'],
                order: 1
              }
            },
            {
              key: 'example_loyalty_dashboard',
              title: 'Loyalty Dashboard Demo',
              content: {
                title: 'Loyalty Program Management',
                description: 'See how easy it is to manage customer rewards and track engagement.',
                demoUrl: '/demo/loyalty',
                thumbnailUrl: '/images/loyalty-demo.jpg',
                category: 'Loyalty',
                tags: ['dashboard', 'rewards', 'analytics'],
                order: 2
              }
            }
          ];

          for (const example of liveExamples) {
            const existing = await cmsStorage.getContentItemByKey(example.key);
            if (!existing) {
              const exampleItem = await cmsStorage.createContentItem({
                key: example.key,
                contentTypeId: liveExamplesContentType.id,
                title: example.title,
                content: example.content,
                isPublished: false,
                createdBy: adminUser.id,
                updatedBy: adminUser.id
              });
              await cmsStorage.publishContentItem(exampleItem.id, adminUser.id);
            }
          }
          console.log('Created live examples content');
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