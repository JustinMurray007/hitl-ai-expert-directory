export interface BottleneckItem {
  id: string;
  label: string;
  description: string;
  badge?: string;
  recommendedWorkflow: {
    title: string;
    problemSolved: string;
    systemArchitecture: string;
    hitlSafeguard: string;
    typicalRoi: string;
    recommendedStack: string[];
    categorySlug: string;
    matchingExpertSlugs: string[];
  };
}

export interface IndustryRecommendation {
  id: string;
  industrySlug: string;
  industryName: string;
  industryDescription: string;
  iconName: string;
  commonBottlenecks: BottleneckItem[];
}

export const COMMON_GROWTH_BOTTLENECKS: BottleneckItem[] = [
  {
    id: 'bottleneck-marketing',
    label: 'Marketing',
    badge: 'Marketing',
    description: 'Struggling to stand out locally, consistently create content, or generate authentic 5-star customer reviews on Google.',
    recommendedWorkflow: {
      title: 'Automated Local SEO, Review Generation & Marketing Engine',
      problemSolved: 'Ranks your business higher on local Google search, auto-requests 5-star reviews from happy customers, and creates localized content.',
      systemArchitecture: 'Automated review request triggers via SMS/email synced with Google Business Profile, GA4 analytics, and local search optimization.',
      hitlSafeguard: 'Public content drafts and review campaign triggers are queued for 1-click owner approval before sending.',
      typicalRoi: 'Generates 25+ verified 5-star reviews monthly; organic local inbound search traffic increases by 65%.',
      recommendedStack: ['Google Gemini', 'GoHighLevel', 'Make', 'Zapier'],
      categorySlug: 'marketing-programmatic-content',
      matchingExpertSlugs: ['chloe-dupont', 'julian-mercier'],
    },
  },
  {
    id: 'bottleneck-advertising',
    label: 'Advertising',
    badge: 'Advertising',
    description: 'Wasting ad budget on Meta or Google Ads with unpredictable lead costs, creative fatigue, and poor conversion tracking.',
    recommendedWorkflow: {
      title: 'Targeted Ad Creative & Budget Spend-Protection Engine',
      problemSolved: 'Creates high-converting Meta and Google Ads, tests new creative angles, and protects your budget from wasted ad spend.',
      systemArchitecture: 'Automated performance tracking connecting Google Ads and Meta Marketing APIs with AI creative generation.',
      hitlSafeguard: 'Hard daily spend caps: any ad campaign launch or budget adjustment >15% requires owner email/SMS confirmation.',
      typicalRoi: 'Lowers customer acquisition cost (CAC) by 25%–38%; eliminates wasted spend on non-performing keywords.',
      recommendedStack: ['Meta Marketing API', 'Google Ads Scripts', 'Make', 'Claude 3.5 Sonnet'],
      categorySlug: 'ai-advertising-paid-media',
      matchingExpertSlugs: ['julian-mercier', 'chloe-dupont'],
    },
  },
  {
    id: 'bottleneck-lead-growth',
    label: 'General Lead / New Customer Growth',
    badge: 'Lead Growth',
    description: 'Missing inbound phone calls, slow response times to website inquiries, and losing hot leads to faster competitors.',
    recommendedWorkflow: {
      title: '24/7 Instant Lead Capture & High-Speed Follow-Up System',
      problemSolved: 'Instantly qualifies web form inquiries and phone calls within 60 seconds, booking hot prospects directly onto your calendar.',
      systemArchitecture: 'Multi-channel AI phone assistant and SMS qualifier integrated with your CRM, website forms, and booking calendar.',
      hitlSafeguard: 'Hot leads and high-value inquiries trigger an instant priority phone transfer or team alert to your live staff.',
      typicalRoi: 'Lead-to-appointment conversion increases by 45%; eliminates after-hours lost customer inquiries completely.',
      recommendedStack: ['Vapi', 'Retell AI', 'Twilio', 'HubSpot'],
      categorySlug: 'sales-lead-qualification',
      matchingExpertSlugs: ['elena-rostova', 'julian-mercier'],
    },
  },
  {
    id: 'bottleneck-customer-retention',
    label: 'Customer Retention',
    badge: 'Retention',
    description: 'Past customers drift away without re-booking, missing out on predictable recurring revenue and customer lifetime value.',
    recommendedWorkflow: {
      title: 'Automated Customer Re-Engagement & Churn Prevention System',
      problemSolved: 'Monitors customer service/purchase intervals, automatically reaching out to past clients at the exact right time to drive repeat business.',
      systemArchitecture: 'CRM webhook monitor tracking last interaction dates, triggering personalized check-in messages and VIP special offers.',
      hitlSafeguard: 'Any past customer expressing dissatisfaction or asking for a discount is instantly routed to a human account manager.',
      typicalRoi: 'Boosts repeat customer transactions by 30%–50%; cuts client churn rate in half.',
      recommendedStack: ['Make', 'HubSpot', 'OpenAI API', 'Python'],
      categorySlug: 'operations-workflow-automation',
      matchingExpertSlugs: ['marcus-vance', 'amara-okafor'],
    },
  },
];

export const INDUSTRY_RECOMMENDATIONS: IndustryRecommendation[] = [
  {
    id: 'ind-healthcare',
    industrySlug: 'healthcare-dental',
    industryName: 'Healthcare, Dental & Medical Clinics',
    industryDescription: 'Private practices, dental groups, physical therapy clinics, and specialized medical offices.',
    iconName: 'Activity',
    commonBottlenecks: [
      {
        id: 'after-hours-calls',
        label: 'Missing after-hours patient calls & emergency inquiries',
        description: 'Prospective patients with acute pain or urgent needs call after 5 PM and hang up when hitting voicemail.',
        recommendedWorkflow: {
          title: '24/7 Voice AI Receptionist with Live Call Transfer to On-Call Staff',
          problemSolved: 'Eliminates missed patient appointments and captures urgent procedures with zero wait time.',
          systemArchitecture: 'Voice AI phone assistant (Vapi/Retell) trained on clinic FAQs, accepted insurances, and direct calendar appointment booking.',
          hitlSafeguard: 'Emergency safety transfer: acute pain, trauma, or bleeding immediately transfers the phone call directly to the on-call doctor with a live screen pop-up of caller details.',
          typicalRoi: '$15,000–$40,000 in monthly recovered new-patient procedures; zero lost emergency calls.',
          recommendedStack: ['Vapi', 'Retell AI', 'Twilio', 'OpenAI API'],
          categorySlug: 'sales-lead-qualification',
          matchingExpertSlugs: ['elena-rostova'],
        },
      },
      {
        id: 'patient-intake-docs',
        label: 'Manual medical chart abstraction & insurance verification',
        description: 'Staff spend 15–20 hours/week cross-referencing insurance policy codes and scanning patient history.',
        recommendedWorkflow: {
          title: 'Automated Billing Code Verification & EHR Document Abstraction',
          problemSolved: 'Accelerates chart prep, eliminates billing rejections, and extracts clinical history from patient records.',
          systemArchitecture: 'Automated AI document reader checking EHR session notes against CMS/CPT billing tables.',
          hitlSafeguard: 'Certified Professional Coder (CPC) must approve flagged code mismatches before claims transmit to clearinghouse.',
          typicalRoi: 'First-pass claim acceptance improves to 98.4%; reduces Accounts Receivable DSO by 21 days.',
          recommendedStack: ['Anthropic Claude', 'Supabase / PostgreSQL', 'Python'],
          categorySlug: 'operations-workflow-automation',
          matchingExpertSlugs: ['amara-okafor', 'marcus-vance'],
        },
      },
    ],
  },
  {
    id: 'ind-home-services',
    industrySlug: 'home-services-trades',
    industryName: 'Home Services & Specialty Contractors',
    industryDescription: 'Roofing contractors, HVAC technicians, plumbers, electricians, and landscaping companies.',
    iconName: 'Wrench',
    commonBottlenecks: [
      {
        id: 'estimate-followup',
        label: 'Unconverted 5-figure estimates & slow sales follow-up',
        description: 'Estimators send out $8k–$25k proposals, but salespeople forget to follow up, resulting in sub-25% closing rates.',
        recommendedWorkflow: {
          title: 'Automated Multi-Channel Estimate Nurture & Review Engine',
          problemSolved: 'Follows up systematically with homeowners via personalized SMS/email, handling objections and gathering 5-star Google reviews.',
          systemArchitecture: 'GoHighLevel + Zapier automation triggered by CRM estimate status; dynamic follow-up copy tailored to homeowner project scope.',
          hitlSafeguard: 'Sentiment analyzer pauses automation and alerts owner directly if customer raises pricing friction or asks for custom negotiation.',
          typicalRoi: 'Closes 35%–45% more outstanding quotes; generates 20+ verified 5-star Google reviews monthly.',
          recommendedStack: ['GoHighLevel', 'Zapier', 'Google Gemini', 'HubSpot'],
          categorySlug: 'marketing-programmatic-content',
          matchingExpertSlugs: ['chloe-dupont', 'julian-mercier'],
        },
      },
      {
        id: 'peak-phone-overflow',
        label: 'Summer/winter call spikes overwhelming office staff',
        description: 'During extreme weather, 200+ inbound calls swamp phone lines, causing callers to hang up and call competitors.',
        recommendedWorkflow: {
          title: 'High-Volume Emergency Intake & Automated Dispatch Gateway',
          problemSolved: 'Screens caller location, issue urgency, and equipment type before staging into dispatcher calendar.',
          systemArchitecture: 'Retell AI voice gateway integrated with ServiceTitan/Housecall Pro booking API.',
          hitlSafeguard: 'Dispatches are held in a 10-minute provisional queue where an experienced dispatcher confirms technician licensing and route efficiency.',
          typicalRoi: 'Zero abandoned calls during seasonal surges; booking conversion jumps from 55% to 82%.',
          recommendedStack: ['Retell AI', 'Twilio', 'Zapier'],
          categorySlug: 'sales-lead-qualification',
          matchingExpertSlugs: ['elena-rostova'],
        },
      },
    ],
  },
  {
    id: 'ind-logistics',
    industrySlug: 'logistics-freight',
    industryName: 'Logistics, Freight & Distribution',
    industryDescription: '3PLs, freight brokerages, trucking fleets, cold storage facilities, and wholesale distributors.',
    iconName: 'Truck',
    commonBottlenecks: [
      {
        id: 'freight-invoice-backlog',
        label: 'Massive PDF freight bill & Bill of Lading (BOL) backlog',
        description: 'Receiving hundreds of carrier invoices weekly in different PDF formats creates accounting delays and double-payments.',
        recommendedWorkflow: {
          title: 'Multi-Carrier Invoice Extraction with Slack Quarantine Queue',
          problemSolved: 'Extracts line items, fuels surcharges, and detention fees automatically with instant accounting system synchronization.',
          systemArchitecture: 'n8n workflow with Claude 3.5 Sonnet JSON extraction, Supabase document hashing, and NetSuite/QuickBooks posting.',
          hitlSafeguard: 'Math calculation mismatch > $0.05 or OCR confidence < 92% immediately freezes insertion and posts a PDF preview to a Slack approval channel.',
          typicalRoi: '90% drop in invoice cycle time; prevents tens of thousands in carrier duplicate payments.',
          recommendedStack: ['n8n', 'Anthropic Claude', 'Supabase / PostgreSQL', 'Python'],
          categorySlug: 'operations-workflow-automation',
          matchingExpertSlugs: ['marcus-vance'],
        },
      },
    ],
  },
  {
    id: 'ind-professional-legal',
    industrySlug: 'legal-finance-consulting',
    industryName: 'Legal, Accounting & Financial Firms',
    industryDescription: 'Law practices, CPA firms, commercial insurance brokerages, and advisory consultancies.',
    iconName: 'Briefcase',
    commonBottlenecks: [
      {
        id: 'policy-contract-search',
        label: 'Hours lost reading 100+ page contracts & compliance specs',
        description: 'Associates spend hours cross-referencing policy jackets, SEC filings, or lease clauses to find specific exclusions.',
        recommendedWorkflow: {
          title: 'Zero-Hallucination Enterprise RAG with Mandatory Source Citations',
          problemSolved: 'Instantly surfaces exact exclusionary clauses and answers with verbatim citations directly linking to source PDF paragraphs.',
          systemArchitecture: 'Hybrid vector + BM25 keyword search on Supabase pgvector with Claude cross-encoder re-ranking.',
          hitlSafeguard: 'System highlights source snippets; human licensed professional must click "Confirm Verification" before document is released to client.',
          typicalRoi: 'Turnaround time drops from 36 hours to under 3 hours; associates handle 2.5x case volume without additional headcount.',
          recommendedStack: ['Anthropic Claude', 'Supabase / PostgreSQL', 'Pinecone', 'TypeScript'],
          categorySlug: 'customer-support-knowledge-base',
          matchingExpertSlugs: ['samir-patel', 'sophia-alvarez'],
        },
      },
      {
        id: 'inbox-executive-overload',
        label: 'Partners buried in 250+ actionable emails daily',
        description: 'Deal-makers miss crucial follow-ups or work until midnight drafting client updates and meeting notes.',
        recommendedWorkflow: {
          title: 'Executive Inbox Draft Assistant with Never-Auto-Send Security Policy',
          problemSolved: 'Classifies incoming correspondence against client matters and synthesizes ready-to-review draft replies in your inbox.',
          systemArchitecture: 'Claude 3.5 Sonnet processing email context against internal SOPs, placing drafts into email client.',
          hitlSafeguard: 'Strict cryptographic permission: API key possesses draft-only scope, never send permissions. Executive reviews, edits, and clicks Send.',
          typicalRoi: 'Reclaims 2+ hours every day; eliminates communication lag on high-stakes deals.',
          recommendedStack: ['Anthropic Claude', 'Perplexity', 'Cursor', 'Ollama / Local LLM'],
          categorySlug: 'executive-personal-ai-ops',
          matchingExpertSlugs: ['david-chen'],
        },
      },
    ],
  },
  {
    id: 'ind-real-estate',
    industrySlug: 'real-estate-property',
    industryName: 'Real Estate & Property Management',
    industryDescription: 'Commercial brokerages, residential property management companies, and real estate developers.',
    iconName: 'Building2',
    commonBottlenecks: [
      {
        id: 'lease-abstracting',
        label: 'Manual lease abstraction & rent escalation calculations',
        description: 'Property managers manually review 50-page commercial lease agreements to calculate CAM expenses and renewal terms.',
        recommendedWorkflow: {
          title: 'Commercial Lease Agreement Abstraction & Rent Roll Sync',
          problemSolved: 'Automatically abstracts rent schedules, options, and expense terms directly into Yardi or AppFolio.',
          systemArchitecture: 'Claude 3.5 Sonnet structured JSON extraction with Python data normalization and validation rules.',
          hitlSafeguard: 'Extracted rent escalation clauses are exported to a staging table where property managers verify renewal commencement dates before database sync.',
          typicalRoi: '75% reduction in lease abstraction overhead; onboards hundreds of new units without administrative hires.',
          recommendedStack: ['n8n', 'Python', 'Anthropic Claude'],
          categorySlug: 'operations-workflow-automation',
          matchingExpertSlugs: ['sophia-alvarez', 'marcus-vance'],
        },
      },
    ],
  },
  {
    id: 'ind-b2b-sales',
    industrySlug: 'b2b-saas-agencies',
    industryName: 'B2B Tech, SaaS & Marketing Agencies',
    industryDescription: 'Software companies, growth agencies, recruiting firms, and professional service providers.',
    iconName: 'BarChart3',
    commonBottlenecks: [
      {
        id: 'lead-qualification-lag',
        label: 'Inbound demo requests waiting hours for manual SDR triage',
        description: 'High-value enterprise leads submit inquiries on web forms and go cold before an SDR qualifies them.',
        recommendedWorkflow: {
          title: 'Instant Lead Qualification & High-Ticket Follow-Up System',
          problemSolved: 'Enriches inbound leads with company revenue and tech stack data within 60 seconds of form submission.',
          systemArchitecture: 'Webhook listener triggering Clearbit/LinkedIn enrichment into GPT-4o mini lead scoring table in HubSpot.',
          hitlSafeguard: 'High-scoring enterprise leads instantly trigger a Slack alert to the senior account executive with a 1-click calendar bridge.',
          typicalRoi: 'Average response time for Tier-1 accounts cut from 19 hours to 4 minutes; demo completion up 44%.',
          recommendedStack: ['HubSpot', 'Make', 'OpenAI API'],
          categorySlug: 'sales-lead-qualification',
          matchingExpertSlugs: ['julian-mercier', 'chloe-dupont'],
        },
      },
      {
        id: 'proposal-rfp-writing',
        label: 'Weeks of engineer time lost writing RFP proposals',
        description: 'Bidding on commercial and government contracts requires cross-referencing hundreds of compliance specifications.',
        recommendedWorkflow: {
          title: 'B2B RFP Proposal Copilot with Compliance Matrix Check',
          problemSolved: 'Matches past winning project deliverables and certifications to new RFP requirements.',
          systemArchitecture: 'Next.js application with Supabase pgvector and Claude 3.5 Sonnet proposal generation.',
          hitlSafeguard: 'Drafted proposal sections remain locked in draft state until designated Compliance Officer signs off on verification matrix.',
          typicalRoi: 'Proposal drafting time cut by 60%, enabling submission of 3x additional competitive bids.',
          recommendedStack: ['Supabase / PostgreSQL', 'TypeScript', 'Anthropic Claude'],
          categorySlug: 'operations-workflow-automation',
          matchingExpertSlugs: ['amara-okafor'],
        },
      },
    ],
  },
  {
    id: 'ind-ecommerce',
    industrySlug: 'ecommerce-retail',
    industryName: 'E-Commerce & DTC Brands',
    industryDescription: 'Shopify brands, multichannel Amazon sellers, apparel retailers, and subscription commerce.',
    iconName: 'ShoppingBag',
    commonBottlenecks: [
      {
        id: 'ad-creative-fatigue',
        label: 'Ad creative fatigue & skyrocketing customer acquisition cost (CAC)',
        description: 'Meta & TikTok ad performance decays every 10 days, requiring constant copy, angle, and video hook testing.',
        recommendedWorkflow: {
          title: 'Autonomous Ad Creative Iteration & ROAS Pacing Engine',
          problemSolved: 'Generates variations of top-performing ad copy, headlines, and angles with automated budget reallocation.',
          systemArchitecture: 'Make + Meta Marketing API + Claude 3.5 Sonnet analyzing daily blended ROAS and scaling winning variants.',
          hitlSafeguard: 'Daily budget increases over 15% or any creative launch require marketing director sign-off in a dedicated Slack channel.',
          typicalRoi: 'Cuts customer acquisition cost by 28%; generates 30+ validated ad creative variations per week.',
          recommendedStack: ['Make', 'OpenAI API', 'Anthropic Claude', 'Python'],
          categorySlug: 'ai-advertising-paid-media',
          matchingExpertSlugs: ['julian-mercier', 'chloe-dupont'],
        },
      },
      {
        id: 'returns-inventory-delta',
        label: 'Multi-warehouse return backlogs & inventory ledger mismatches',
        description: 'Damaged returns and RMA tracking take 14 business days to inspect and reflect in warehouse inventories.',
        recommendedWorkflow: {
          title: 'Automated Return Triage & Inventory Ledger Reconciliation',
          problemSolved: 'Validates return tracking numbers, flags restock conditions, and credits customer accounts instantly.',
          systemArchitecture: 'Shopify webhooks feeding n8n and Supabase with automated condition scoring and NetSuite inventory sync.',
          hitlSafeguard: 'Damaged items or returns over $250 require warehouse manager photo sign-off before inventory restock approval.',
          typicalRoi: 'Cuts return cycle time from 14 days to 4 hours; eliminates $45k in annual misplaced returned merchandise.',
          recommendedStack: ['n8n', 'Supabase / PostgreSQL', 'Python'],
          categorySlug: 'operations-workflow-automation',
          matchingExpertSlugs: ['marcus-vance'],
        },
      },
    ],
  },
  {
    id: 'ind-automotive',
    industrySlug: 'automotive-dealerships',
    industryName: 'Automotive Dealerships & Repair Centers',
    industryDescription: 'Franchise auto dealers, independent service centers, collision repair shops, and fleet mechanics.',
    iconName: 'Car',
    commonBottlenecks: [
      {
        id: 'missed-service-bookings',
        label: 'Missed inbound service calls & trade-in quote lead leakage',
        description: 'Customers calling for recall work or emergency brake service hang up during morning rush hours.',
        recommendedWorkflow: {
          title: '24/7 Dealership Voice Service Scheduler & Trade-In Qualifier',
          problemSolved: 'Transcribes customer symptoms, verifies VIN lookup, and schedules appointments directly into DealerSocket or Reynolds.',
          systemArchitecture: 'Voice AI assistant answering service calls, checking schedule availability, and booking directly into your dealership software.',
          hitlSafeguard: 'Urgent calls mentioning safety recalls, brake failure, or engine issues immediately transfer to a live service advisor with caller summary.',
          typicalRoi: 'Recovers $32,000 monthly in billable repair orders; appointment booking rate increases from 48% to 79%.',
          recommendedStack: ['Retell AI', 'Twilio', 'OpenAI API'],
          categorySlug: 'sales-lead-qualification',
          matchingExpertSlugs: ['elena-rostova'],
        },
      },
    ],
  },
  {
    id: 'ind-hospitality',
    industrySlug: 'hospitality-restaurants',
    industryName: 'Restaurants, Hotels & Event Venues',
    industryDescription: 'Boutique hotels, fine dining groups, wedding venues, and corporate catering operations.',
    iconName: 'UtensilsCrossed',
    commonBottlenecks: [
      {
        id: 'private-dining-leads',
        label: 'Slow private dining & corporate buyout quote turnarounds',
        description: 'Event organizers inquiring for 50-person buyouts wait 48 hours for event coordinators to check calendar and calculate minimum spends.',
        recommendedWorkflow: {
          title: 'Instant Private Dining Inquiry Estimator & Availability Gate',
          problemSolved: 'Calculates food & beverage minimums, checks private room capacity, and drafts custom proposals in under 5 minutes.',
          systemArchitecture: 'Tripleseat/OpenTable API connected to Claude 3.5 Sonnet with automated deposit payment links.',
          hitlSafeguard: 'All custom contracts exceeding $5,000 require General Manager 1-click Slack authorization before sending to client.',
          typicalRoi: 'Private dining bookings increase 40%; response latency drops from 48 hours to under 6 minutes.',
          recommendedStack: ['Make', 'Anthropic Claude', 'Zapier'],
          categorySlug: 'sales-lead-qualification',
          matchingExpertSlugs: ['julian-mercier'],
        },
      },
    ],
  },
  {
    id: 'ind-manufacturing',
    industrySlug: 'manufacturing-industrial',
    industryName: 'Manufacturing & Industrial Supply',
    industryDescription: 'Precision CNC shops, custom fabrication, packaging manufacturers, and industrial suppliers.',
    iconName: 'Factory',
    commonBottlenecks: [
      {
        id: 'bom-spec-extraction',
        label: 'Engineers buried in multi-vendor Bill of Materials (BOM) cross-referencing',
        description: 'Estimating custom jobs requires manually checking 500-line parts lists against supplier inventory and lead times.',
        recommendedWorkflow: {
          title: 'Automated BOM Extraction & Supplier Lead-Time Reconciler',
          problemSolved: 'Parses CAD and Excel BOM sheets, queries vendor inventories, and flags obsolete or long lead-time components.',
          systemArchitecture: 'Python + Claude 3.5 Sonnet processing vendor catalogs with Supabase pgvector tolerance matching.',
          hitlSafeguard: 'Lead Manufacturing Engineer must verify component substitutions and tolerance ratings before quote is certified.',
          typicalRoi: 'Quoting time slashed from 5 days to 4 hours; eliminates costly production delays due to overlooked lead times.',
          recommendedStack: ['Python', 'Supabase / PostgreSQL', 'Anthropic Claude'],
          categorySlug: 'operations-workflow-automation',
          matchingExpertSlugs: ['marcus-vance', 'amara-okafor'],
        },
      },
    ],
  },
  {
    id: 'ind-insurance',
    industrySlug: 'insurance-brokerages',
    industryName: 'Insurance Agencies & Risk Brokerages',
    industryDescription: 'Commercial P&C agencies, life/health brokerages, and employee benefit consultancies.',
    iconName: 'FileText',
    commonBottlenecks: [
      {
        id: 'fnol-claims-intake',
        label: 'First Notice of Loss (FNOL) claims triage & policy quote shopping',
        description: 'When accidents or claims occur, account managers spend hours manually gathering police reports and policy coverages.',
        recommendedWorkflow: {
          title: 'Automated FNOL Claims Intake & Carrier Submission System',
          problemSolved: 'Ingests accident details via voice/SMS, extracts police report data, and formats claims for carrier submission.',
          systemArchitecture: 'Vapi telephony intake with Claude extraction, generating standardized ACORD loss notices.',
          hitlSafeguard: 'Licensed claims adjuster conducts mandatory review of extracted liability assessments before carrier dispatch.',
          typicalRoi: 'Reduces claims intake overhead by 70%; speeds emergency claim resolution by 4 full business days.',
          recommendedStack: ['Vapi', 'Anthropic Claude', 'Twilio', 'Python'],
          categorySlug: 'customer-support-knowledge-base',
          matchingExpertSlugs: ['samir-patel', 'elena-rostova'],
        },
      },
    ],
  },
  {
    id: 'ind-education',
    industrySlug: 'education-academies',
    industryName: 'Education, Tutoring & Training Academies',
    industryDescription: 'Test-prep centers, coding bootcamps, vocational institutes, and professional certification academies.',
    iconName: 'GraduationCap',
    commonBottlenecks: [
      {
        id: 'student-enrollment-triage',
        label: 'Student enrollment qualification & instructor schedule matching',
        description: 'Admissions staff waste hours calling unqualified leads while high-intent students wait days for course placement.',
        recommendedWorkflow: {
          title: 'Conversational Enrollment Counselor & Skill Placement Matcher',
          problemSolved: 'Assesses prospective student background, verifies schedule availability, and recommends appropriate course tracks.',
          systemArchitecture: 'Conversational AI screening bot integrated with student information system (SIS) and instructor calendar.',
          hitlSafeguard: 'All course enrollments and scholarship allocations require academic advisor approval before final charge.',
          typicalRoi: 'Enrollment completion rates increase by 33%; admissions staff focus 100% on high-touch closing interviews.',
          recommendedStack: ['OpenAI API', 'Retell AI', 'HubSpot'],
          categorySlug: 'sales-lead-qualification',
          matchingExpertSlugs: ['chloe-dupont'],
        },
      },
    ],
  },
  {
    id: 'ind-retail-shops',
    industrySlug: 'retail-boutiques-shops',
    industryName: 'Retail, Boutiques & Local Stores',
    industryDescription: 'Independent retail stores, clothing boutiques, hardware shops, and local merchant storefronts.',
    iconName: 'Store',
    commonBottlenecks: [
      {
        id: 'retail-inventory-sync',
        label: 'In-Store POS & Online Inventory Desynchronization',
        badge: 'Inventory',
        description: 'In-store point of sale and online website stocks get out of sync, causing accidental overselling and stockout cancellations.',
        recommendedWorkflow: {
          title: 'Real-Time POS & E-Commerce Inventory Reconciliation',
          problemSolved: 'Synchronizes in-store point of sale with online Shopify/WooCommerce inventory automatically without manual reconciliations.',
          systemArchitecture: 'Square/Clover POS webhooks feeding inventory sync into online storefront with automated low-stock warnings.',
          hitlSafeguard: 'Any inventory discrepancy >3 units flags an immediate count request to the store manager before writing off.',
          typicalRoi: 'Eliminates stockout cancellation losses; saves 10+ hours of manual counting weekly.',
          recommendedStack: ['Shopify', 'Make', 'Supabase / PostgreSQL', 'Python'],
          categorySlug: 'operations-workflow-automation',
          matchingExpertSlugs: ['marcus-vance', 'amara-okafor'],
        },
      },
    ],
  },
  {
    id: 'ind-personal-wellness',
    industrySlug: 'salons-spas-wellness',
    industryName: 'Salons, Spas & Personal Wellness',
    industryDescription: 'Hair salons, barbershops, day spas, massage therapy clinics, and personal wellness studios.',
    iconName: 'Sparkles',
    commonBottlenecks: [
      {
        id: 'cancellation-empty-chairs',
        label: 'Last-Minute Cancellations & Empty Stylist Chairs',
        badge: 'Scheduling',
        description: 'No-shows and cancellations leave expensive stylists and therapists idle with zero revenue for that hour.',
        recommendedWorkflow: {
          title: 'Automated Waitlist Fill & 24/7 Booking Assistant',
          problemSolved: 'Instantly texts waitlisted clients when a cancellation occurs, filling open chair slots within minutes.',
          systemArchitecture: 'Booking software webhooks triggering automated SMS waitlist offers with 1-click confirmation.',
          hitlSafeguard: 'VIP clients or sensitive rescheduling requests are immediately forwarded to the front desk coordinator.',
          typicalRoi: 'Fills 80%+ of last-minute cancellations; recovers $4,000–$8,000 in monthly lost billable service revenue.',
          recommendedStack: ['Retell AI', 'Twilio', 'Zapier', 'Google Gemini'],
          categorySlug: 'sales-lead-qualification',
          matchingExpertSlugs: ['elena-rostova', 'julian-mercier'],
        },
      },
    ],
  },
  {
    id: 'ind-cleaning-services',
    industrySlug: 'cleaning-facility-services',
    industryName: 'Cleaning & Facility Services',
    industryDescription: 'Commercial janitorial, residential house cleaning, carpet care, and facility maintenance.',
    iconName: 'CheckCircle2',
    commonBottlenecks: [
      {
        id: 'cleaning-quote-nurture',
        label: 'Unconverted Cleaning Estimates & Slow Quote Follow-Up',
        badge: 'Estimates',
        description: 'Prospective residential and commercial clients ask for estimates but go cold without regular, professional follow-up.',
        recommendedWorkflow: {
          title: 'Instant Square-Footage Estimator & Quote Nurture System',
          problemSolved: 'Calculates cleaning estimates from property specs and follows up automatically via SMS/email until booked.',
          systemArchitecture: 'Website intake calculator with automated SMS/email quote nurture and calendar dispatch.',
          hitlSafeguard: 'Quotes over $1,500/month or specialized facility requests require manager verification before dispatch.',
          typicalRoi: 'Increases quote conversion by 38%; onboards 15+ new recurring commercial contracts quarterly.',
          recommendedStack: ['Make', 'GoHighLevel', 'Zapier', 'OpenAI API'],
          categorySlug: 'sales-lead-qualification',
          matchingExpertSlugs: ['chloe-dupont', 'julian-mercier'],
        },
      },
    ],
  },
  {
    id: 'ind-not-listed',
    industrySlug: 'other-business-type',
    industryName: 'My Business Type is Not Listed Here',
    industryDescription: 'Custom business operations, specialized trades, or mixed service and product business models.',
    iconName: 'HelpCircle',
    commonBottlenecks: [
      {
        id: 'custom-business-ops',
        label: 'Repetitive Data Entry & Disconnected Software Tools',
        badge: 'Custom Ops',
        description: 'Staff spend hours manually typing information between software tools, copying spreadsheets, and sending repetitive status emails.',
        recommendedWorkflow: {
          title: 'Custom Business Workflow Automation & Database Bridge',
          problemSolved: 'Eliminates repetitive data entry, connects incompatible software tools, and automates daily reporting.',
          systemArchitecture: 'Custom webhook triggers connecting your business software, document processors, and database tables.',
          hitlSafeguard: 'All automated actions include verification checkpoints where staff confirm data accuracy before live sync.',
          typicalRoi: 'Saves 20–30 hours of administrative labor weekly; prevents human data-entry errors.',
          recommendedStack: ['Make', 'n8n', 'Python', 'Anthropic Claude', 'Supabase / PostgreSQL'],
          categorySlug: 'operations-workflow-automation',
          matchingExpertSlugs: ['marcus-vance', 'amara-okafor'],
        },
      },
    ],
  },
];
