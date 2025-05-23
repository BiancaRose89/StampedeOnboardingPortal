export const DEFAULT_GUIDE_CONFIGS = {
  bookings: {
    title: "Table Bookings Readiness Guide",
    description: "Learn how to set up and manage your booking system effectively",
    url: "https://h.stampede.ai/table-bookings-readiness?hs_preview=XqvGJPfp-224913439982"
  },
  loyalty: {
    title: "Loyalty Program Setup",
    description: "Configure your customer loyalty and rewards system",
    url: "https://h.stampede.ai/loyalty"
  },
  marketing: {
    title: "Marketing Readiness Guide",
    description: "Set up campaigns and customer communication tools",
    url: "https://h.stampede.ai/marketing-readiness?hs_preview=ivCspIml-224924145856"
  }
};

export const APP_CONFIG = {
  onboardingJourneyUrl: "https://h.stampede.ai/stampede-onboarding-journey?hs_preview=OnvXWaAM-218573123802",
  knowledgeBaseUrl: "https://help.stampede.ai/hc/en-gb",
  tawkToPropertyId: "YOUR_TAWK_ID", // Replace with your Tawk.to Property ID
  
  // Chat Widget Setup Instructions
  chatSetupInstructions: {
    steps: [
      "Go to tawk.to and create a free account",
      "Create a new property for your onboarding portal",
      "Copy your Property ID from the admin panel",
      "Update the tawkToPropertyId in this config file",
      "The chat widget will automatically appear on your portal"
    ],
    helpUrl: "https://help.tawk.to/article/getting-started-with-tawk-to"
  }
};
