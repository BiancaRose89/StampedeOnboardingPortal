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
        name: 'venue_onboarding',
        displayName: 'Venue Onboarding Tasks',
        description: 'Complete venue onboarding task management with progress tracking and team assignments',
        schema: {
          type: 'object',
          properties: {
            venueNumber: { type: 'number', title: 'Venue Number' },
            totalTasks: { type: 'number', title: 'Total Tasks' },
            completedTasks: { type: 'number', title: 'Completed Tasks' },
            progressPercentage: { type: 'number', title: 'Progress Percentage' },
            goLiveDate: { type: 'string', title: 'Go-Live Date (YYYY-MM-DD)' },
            pageTitle: { type: 'string', title: 'Page Title' },
            tasksOutstandingText: { type: 'string', title: 'Tasks Outstanding Text' },
            goLiveDateText: { type: 'string', title: 'Go-Live Date Text' },
            venueProgressTitle: { type: 'string', title: 'Venue Progress Title' },
            tasks: {
              type: 'array',
              title: 'Task List',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number', title: 'Task ID' },
                  name: { type: 'string', title: 'Task Name' },
                  description: { type: 'string', title: 'Task Description' },
                  timeEstimate: { type: 'string', title: 'Time Estimate' },
                  status: { type: 'string', title: 'Status (pending/in-progress/completed)' },
                  assignedTo: { type: 'string', title: 'Assigned Team Member' },
                  icon: { type: 'string', title: 'Icon Name' },
                  category: { type: 'string', title: 'Task Category' },
                  priority: { type: 'string', title: 'Priority Level' },
                  dueDate: { type: 'string', title: 'Due Date' },
                  notes: { type: 'string', title: 'Additional Notes' }
                }
              }
            }
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

        // Create venue onboarding content
        const venueOnboardingContentType = await cmsStorage.getContentTypeByName('venue_onboarding');
        if (venueOnboardingContentType) {
          const existing = await cmsStorage.getContentItemByKey('venue_1_onboarding');
          if (!existing) {
            const venueOnboardingItem = await cmsStorage.createContentItem({
              key: 'venue_1_onboarding',
              contentTypeId: venueOnboardingContentType.id,
              title: 'Complete the onboarding for each of your 1 venue',
              content: {
                venueNumber: 1,
                totalTasks: 8,
                completedTasks: 0,
                progressPercentage: 0,
                goLiveDate: '2025-01-07',
                pageTitle: 'Complete the onboarding for each of your 1 venue',
                tasksOutstandingText: 'Tasks Outstanding: 8 tasks across all venues',
                goLiveDateText: 'Go-Live Date (Target launch: 07/01/2025)',
                venueProgressTitle: 'Venue 1 Onboarding Progress',
                tasks: [
                  {
                    id: 1,
                    name: 'Account Setup',
                    description: 'Complete basic account configuration and admin setup',
                    timeEstimate: '15 minutes',
                    status: 'pending',
                    assignedTo: 'Admin Team',
                    icon: 'Settings',
                    category: 'Setup',
                    priority: 'High',
                    dueDate: '2024-12-20',
                    notes: 'Must be completed first before other tasks'
                  },
                  {
                    id: 2,
                    name: 'Booking System Configuration',
                    description: 'Set up table management, reservation settings, and availability',
                    timeEstimate: '45 minutes',
                    status: 'pending',
                    assignedTo: 'Operations Manager',
                    icon: 'Calendar',
                    category: 'Bookings',
                    priority: 'High',
                    dueDate: '2024-12-22',
                    notes: 'Include table layout and capacity settings'
                  },
                  {
                    id: 3,
                    name: 'Loyalty Program Setup',
                    description: 'Configure rewards structure, point values, and customer tiers',
                    timeEstimate: '30 minutes',
                    status: 'pending',
                    assignedTo: 'Marketing Team',
                    icon: 'Star',
                    category: 'Marketing',
                    priority: 'Medium',
                    dueDate: '2024-12-25',
                    notes: 'Define reward categories and redemption rules'
                  },
                  {
                    id: 4,
                    name: 'Payment Processing',
                    description: 'Connect payment gateways and configure billing settings',
                    timeEstimate: '20 minutes',
                    status: 'pending',
                    assignedTo: 'Finance Team',
                    icon: 'CreditCard',
                    category: 'Finance',
                    priority: 'High',
                    dueDate: '2024-12-24',
                    notes: 'Test all payment methods before go-live'
                  },
                  {
                    id: 5,
                    name: 'Staff Training',
                    description: 'Train team members on system usage and best practices',
                    timeEstimate: '2 hours',
                    status: 'pending',
                    assignedTo: 'Training Coordinator',
                    icon: 'Users',
                    category: 'Training',
                    priority: 'Medium',
                    dueDate: '2025-01-02',
                    notes: 'Schedule multiple training sessions for different shifts'
                  },
                  {
                    id: 6,
                    name: 'Menu Integration',
                    description: 'Upload menu items, pricing, and dietary information',
                    timeEstimate: '60 minutes',
                    status: 'pending',
                    assignedTo: 'Operations Manager',
                    icon: 'Book',
                    category: 'Content',
                    priority: 'Medium',
                    dueDate: '2024-12-28',
                    notes: 'Include high-quality images for each item'
                  },
                  {
                    id: 7,
                    name: 'Testing & Quality Assurance',
                    description: 'Comprehensive testing of all system features and workflows',
                    timeEstimate: '90 minutes',
                    status: 'pending',
                    assignedTo: 'QA Team',
                    icon: 'CheckCircle',
                    category: 'Testing',
                    priority: 'High',
                    dueDate: '2025-01-05',
                    notes: 'Test with real-world scenarios and edge cases'
                  },
                  {
                    id: 8,
                    name: 'Go-Live Preparation',
                    description: 'Final checks, backup procedures, and launch coordination',
                    timeEstimate: '30 minutes',
                    status: 'pending',
                    assignedTo: 'Project Manager',
                    icon: 'Rocket',
                    category: 'Launch',
                    priority: 'Critical',
                    dueDate: '2025-01-07',
                    notes: 'Ensure all stakeholders are ready for launch'
                  }
                ]
              },
              isPublished: false,
              createdBy: adminUser.id,
              updatedBy: adminUser.id
            });
            await cmsStorage.publishContentItem(venueOnboardingItem.id, adminUser.id);
            console.log('Created venue onboarding content');
          }
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