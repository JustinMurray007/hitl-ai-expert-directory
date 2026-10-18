import { Category, Tool, Expert, Application } from './types';

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    slug: 'operations-workflow-automation',
    name: 'Operations & Workflow Automation',
    description: 'CRM syncing, Jobber/GHL builds, proposal follow-up, internal handoffs, and business automation.',
    icon_name: 'Workflow',
    expert_count: 14,
  },
  {
    id: 'cat-2',
    slug: 'sales-lead-qualification',
    name: 'Sales & Lead Qualification',
    description: '24/7 AI voice reception, speed-to-lead sprints, missed-call text-back, and automated estimate booking.',
    icon_name: 'PhoneCall',
    expert_count: 16,
  },
  {
    id: 'cat-3',
    slug: 'customer-support-knowledge-base',
    name: 'Customer Support & Knowledge Bases',
    description: 'FAQ accuracy from job logs, route arrival lookups, and contractor documentation retrieval.',
    icon_name: 'LifeBuoy',
    expert_count: 6,
  },
  {
    id: 'cat-4',
    slug: 'marketing-programmatic-content',
    name: 'Marketing & Programmatic Content',
    description: 'Review generation, Google Business Profile optimization, seasonal renewals, and automated estimate follow-ups.',
    icon_name: 'Megaphone',
    expert_count: 8,
  },
  {
    id: 'cat-5',
    slug: 'executive-personal-ai-ops',
    name: 'Executive & Personal AI Ops',
    description: 'Claude Company Brain setups, contractor SOP digitization, and owner workflow delegation.',
    icon_name: 'UserCheck',
    expert_count: 4,
  },
  {
    id: 'cat-6',
    slug: 'ai-advertising-paid-media',
    name: 'AI Advertising & Paid Media Ops',
    description: 'Omnichannel appointment engines, dead-lead reactivation, and TCPA opt-in compliance management.',
    icon_name: 'Target',
    expert_count: 3,
  },
];

export const SEED_TOOLS: Tool[] = [
  { id: 'tool-1', slug: 'make', name: 'Make', category: 'Automation Engine' },
  { id: 'tool-2', slug: 'zapier', name: 'Zapier', category: 'Automation Engine' },
  { id: 'tool-3', slug: 'n8n', name: 'n8n', category: 'Automation Engine' },
  { id: 'tool-4', slug: 'openai-api', name: 'OpenAI API', category: 'LLM Provider' },
  { id: 'tool-5', slug: 'anthropic-claude', name: 'Anthropic Claude', category: 'LLM Provider' },
  { id: 'tool-6', slug: 'gemini', name: 'Google Gemini', category: 'LLM Provider' },
  { id: 'tool-7', slug: 'perplexity', name: 'Perplexity', category: 'LLM Provider' },
  { id: 'tool-8', slug: 'vapi', name: 'Vapi', category: 'Voice AI' },
  { id: 'tool-9', slug: 'retell-ai', name: 'Retell AI', category: 'Voice AI' },
  { id: 'tool-10', slug: 'bland-ai', name: 'Bland.ai', category: 'Voice AI' },
  { id: 'tool-11', slug: 'twilio', name: 'Twilio', category: 'Voice AI' },
  { id: 'tool-12', slug: 'supabase-postgres', name: 'Supabase / PostgreSQL', category: 'Database' },
  { id: 'tool-13', slug: 'pinecone', name: 'Pinecone', category: 'Vector DB' },
  { id: 'tool-14', slug: 'hubspot', name: 'HubSpot', category: 'CRM' },
  { id: 'tool-15', slug: 'zoho-crm', name: 'Zoho CRM', category: 'CRM' },
  { id: 'tool-16', slug: 'gohighlevel', name: 'GoHighLevel', category: 'CRM' },
  { id: 'tool-17', slug: 'jobber', name: 'Jobber', category: 'CRM' },
  { id: 'tool-18', slug: 'jobnimbus', name: 'JobNimbus', category: 'CRM' },
  { id: 'tool-19', slug: 'skimmer', name: 'Skimmer', category: 'CRM' },
  { id: 'tool-20', slug: 'wordpress', name: 'WordPress', category: 'Dev Tools' },
  { id: 'tool-21', slug: 'cursor', name: 'Cursor', category: 'Dev Tools' },
  { id: 'tool-22', slug: 'python', name: 'Python', category: 'Dev Tools' },
  { id: 'tool-23', slug: 'typescript', name: 'TypeScript', category: 'Dev Tools' },
  { id: 'tool-24', slug: 'google-calendar', name: 'Google Calendar', category: 'CRM' },
];

export const SEED_EXPERTS: Expert[] = [
  // 1. Koby (Yaakov) Oranski - Yotomations LLC
  {
    id: 'exp-1',
    slug: 'koby-oranski',
    full_name: 'Koby (Yaakov) Oranski',
    professional_title: 'GoHighLevel Practice Lead & Automation Architect',
    agency_name: 'Yotomations LLC',
    tagline: 'GHL builds, speed-to-lead sprints, and AI voice/chat agents with 1-tap human handoff for remodeling and trade contractors.',
    bio: 'Koby Oranski leads Yotomations LLC in Tampa, Florida, focusing on home service contractors, roofers, HVAC teams, and remodeling specialists. He scopes every project with fixed written scopes, clear milestone checkpoints, detailed handoff documentation, and Loom video walkthroughs. His systems link lead channels like Yelp and Google directly into GoHighLevel, Jobber, and JobNimbus while keeping a human team member one tap away from automated interactions.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    city: 'Tampa',
    state_region: 'FL',
    country: 'United States',
    timezone: 'America/New_York (EST)',
    website_url: 'https://ghl.yotomations.com/',
    booking_url: 'https://ghl.yotomations.com/',
    primary_engagement: 'fixed_sprint',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-03-10T12:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 1,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[0], // Operations & Workflow Automation
      SEED_CATEGORIES[1], // Sales & Lead Qualification
    ],
    tools: [
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[16], // Jobber
      SEED_TOOLS[17], // JobNimbus
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[0],  // Make
    ],
    case_studies: [
      {
        id: 'cs-koby-1',
        expert_id: 'exp-1',
        title: 'Yelp-to-GoHighLevel Lead Integration & Speed-to-Lead for Remodeling Contractor',
        client_industry: 'Kitchen & Bath Remodeling / General Contracting',
        problem_statement: 'High-intent homeowner renovation inquiries from Yelp and web forms were going unread for hours while project managers were active on job sites, resulting in lost $20K+ kitchen and bath remodeling contracts.',
        solution_architecture: 'Direct webhook architecture connecting Yelp lead generation directly to GoHighLevel with immediate missed-call text-back, instant 60-second SMS qualification, and automated JobNimbus project creation.',
        hitl_oversight_mechanism: 'Keeps a human one tap away from the AI: every automated conversation alerts the lead coordinator via push notification, allowing instant live call takeover before any estimate is booked.',
        failure_safeguards: 'If a prospect mentions custom architectural specs or asks for immediate pricing outside preset ranges, the AI conversation halts instantly and notifies the general contractor with a call-back summary.',
        outcomes_roi: 'Under 60-second speed-to-lead response time; 42% increase in booked in-home remodeling estimate consultations.',
        demo_video_url: 'https://ghl.yotomations.com/case-studies/yelp-gohighlevel-lead-integration-remodeling-contractor/',
        reviewer_confirmed: true,
        is_featured: true,
      },
    ],
  },

  // 2. Ikram Rana - Barrana.ai
  {
    id: 'exp-2',
    slug: 'ikram-rana',
    full_name: 'Ikram Rana',
    professional_title: 'AI Systems & Control Layer Architect',
    agency_name: 'Barrana.ai',
    tagline: 'Lead response, quote follow-up, and after-hours voice capture with an explicit governance and stop-loss control layer.',
    bio: 'Ikram Rana is the founder of Barrana.ai, based in the Greater Toronto Area and serving contractors across the US and Canada. He specializes in renovation contractor workflows, quote follow-up pipelines, and after-hours voice capture. His signature strength is engineering a formal governance layer—including stop-loss rules, mandatory owner approval on high-value jobs, real-time escalation, and full audit logging across Jobber, GoHighLevel, and Make.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    city: 'Toronto',
    state_region: 'ON',
    country: 'Canada',
    timezone: 'America/Toronto (EST)',
    website_url: 'https://barrana.ai/',
    booking_url: 'https://ikramrana.com/about',
    primary_engagement: 'fixed_sprint',
    starting_budget: '5000_to_15000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-03-08T10:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 2,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[0], // Operations & Workflow Automation
      SEED_CATEGORIES[1], // Sales & Lead Qualification
    ],
    tools: [
      SEED_TOOLS[0],  // Make
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[16], // Jobber
      SEED_TOOLS[8],  // Retell AI
      SEED_TOOLS[11], // Supabase / PostgreSQL
    ],
    case_studies: [
      {
        id: 'cs-ikram-1',
        expert_id: 'exp-2',
        title: 'Mississauga Renovation Contractor Lead Pipeline with Governance & Control Layer',
        client_industry: 'Residential Renovation & Home Remodeling',
        problem_statement: 'Unanswered evening calls and delayed quote follow-ups caused qualified residential renovation prospects to hire competing contractors before quotes could be sent.',
        solution_architecture: 'Multi-stage automation combining after-hours Retell AI voice answering, Jobber client synchronization, and automated quote nurture sequences orchestrated via Make.',
        hitl_oversight_mechanism: 'Formal governance and control layer: quotes over $10,000, scope alterations, and custom customer requests require explicit owner sign-off with stop-loss rules and full audit logging before dispatch.',
        failure_safeguards: 'Circuit breakers monitor AI confidence scores; any ambiguity immediately routes callers to live staff and tags the Jobber record for manual review.',
        outcomes_roi: 'Recovers 15+ after-hours customer inquiries monthly; increases quote acceptance rate by 34% within 45 days.',
        demo_video_url: 'https://barrana.ai/case-studies/contractor-mississauga',
        reviewer_confirmed: true,
        is_featured: true,
      },
    ],
  },

  // 3. Matt Aponte - Voxe AI
  {
    id: 'exp-3',
    slug: 'matt-aponte',
    full_name: 'Matt Aponte',
    professional_title: 'Voice AI & Inbound Automation Specialist',
    agency_name: 'Voxe AI',
    tagline: 'Human + AI telephony systems supporting home service teams, answering every inbound call without replacing human accountability.',
    bio: 'Matt Aponte is the founder of Voxe AI, designing conversational voice agents, inbound lead automation, long-term customer nurture, and dead-lead reactivation for home service trades including painting, plumbing, HVAC, and roofing. Matt frames every deployment as a Human + AI collaborative system that removes repetitive intake tasks from receptionists while elevating customer service standards.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    city: 'Orlando',
    state_region: 'FL',
    country: 'United States',
    timezone: 'America/New_York (EST)',
    website_url: 'https://voxeai.com/about',
    booking_url: 'https://voxeai.com/about',
    primary_engagement: 'monthly_retainer',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-03-05T14:30:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 3,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[1], // Sales & Lead Qualification
      SEED_CATEGORIES[0], // Operations & Workflow Automation
    ],
    tools: [
      SEED_TOOLS[7],  // Vapi
      SEED_TOOLS[8],  // Retell AI
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[0],  // Make
    ],
    case_studies: [
      {
        id: 'cs-matt-1',
        expert_id: 'exp-3',
        title: 'Clean Cut Painting & Handyman: 2-Year Human + AI Telephony Deployment',
        client_industry: 'Painting & Handyman Home Services',
        problem_statement: 'High inbound call volume during peak painting season overwhelmed office staff, leading to 25% dropped calls and frustrated repeat clients.',
        solution_architecture: 'Custom voice AI answering assistant integrated with Twilio and GoHighLevel that answers peak-hour overflow calls, qualifies painting specs, and checks booking calendars.',
        hitl_oversight_mechanism: 'Human + AI model: the voice agent handles routine service scoping and scheduling, but immediately transfers any complex estimate or returning VIP client to the front-desk coordinator with caller notes pre-populated.',
        failure_safeguards: 'Automated fallback to live office transfer upon detecting caller urgency or repeated questions outside the painting service manual.',
        outcomes_roi: 'Zero missed inbound calls across 2+ years of continuous production; captured over $85,000 in seasonal painting jobs that previously went to voicemail.',
        demo_video_url: 'https://voxeai.com/case-studies/clean-cut-painting',
        reviewer_confirmed: true,
        is_featured: true,
      },
    ],
  },

  // 4. Naveen Aggarwal - Explained Consulting
  {
    id: 'exp-4',
    slug: 'naveen-aggarwal',
    full_name: 'Naveen Aggarwal',
    professional_title: 'AI Voice Reception & Local Services Consultant',
    agency_name: 'Explained Consulting',
    tagline: 'Transparent AI voice front desk, fast web-lead callbacks, and verified answer/booking funnels for local service businesses.',
    bio: 'Naveen Aggarwal leads Explained Consulting in Naperville, IL. He specializes in AI voice agent front desks, high-speed web-lead callbacks, website chatbots, and automated customer follow-ups for local service businesses. His case deployments, including work with Grout Medic running over a year, are recognized for transparent performance reporting that details exact first-call answer and booking rates.',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    city: 'Naperville',
    state_region: 'IL',
    country: 'United States',
    timezone: 'America/Chicago (CST)',
    website_url: 'https://www.explained.consulting/about',
    linkedin_url: 'https://linkedin.com/in/naveen-aggarwal-2401032',
    booking_url: 'https://www.explained.consulting/about',
    primary_engagement: 'fixed_sprint',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-03-01T09:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 4,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[1], // Sales & Lead Qualification
      SEED_CATEGORIES[2], // Customer Support & Knowledge Bases
    ],
    tools: [
      SEED_TOOLS[7],  // Vapi
      SEED_TOOLS[8],  // Retell AI
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[1],  // Zapier
      SEED_TOOLS[3],  // OpenAI API
    ],
    case_studies: [
      {
        id: 'cs-naveen-1',
        expert_id: 'exp-4',
        title: 'The Grout Medic: 1-Year AI Front Desk & Web-Lead Callback Engine',
        client_industry: 'Tile & Grout Restoration / Home Services',
        problem_statement: 'Homeowners requesting tile restoration quotes frequently booked with competitors if they did not receive a phone callback within 5 minutes of submitting online forms.',
        solution_architecture: 'Dual-action system combining website form webhook triggers that initiate instant automated phone callbacks, backed by an AI voice receptionist managing peak call overflow.',
        hitl_oversight_mechanism: 'Callers can request a human specialist at any point; complex square-footage quotes trigger an automatic SMS summary to the franchise owner for personalized review.',
        failure_safeguards: 'Strict scheduling guardrails: the AI only books consultations within verified zip code service radiuses and business hours.',
        outcomes_roi: '94% first-call answer rate; 51% appointment booking conversion on incoming web inquiries over 12 months.',
        demo_video_url: 'https://www.explained.consulting/case-studies/grout-medic',
        reviewer_confirmed: true,
        is_featured: true,
      },
    ],
  },

  // 5. Jake Read - Read Laboratories
  {
    id: 'exp-5',
    slug: 'jake-read',
    full_name: 'Jake Read',
    professional_title: 'Workflow Automation & Field Systems Architect',
    agency_name: 'Read Laboratories',
    tagline: 'Workflow automation, Jobber/Make pipelines, automated lead follow-up, and weather-delay notifications for landscaping companies.',
    bio: 'Jake Read is the founder of Read Laboratories in Westlake Village, California. He designs end-to-end workflow automations specifically for landscaping and outdoor service companies using Jobber and Make. His solutions solve major operational headaches including automated lead follow-up, automated 5-star review requests, and automated weather-delay notifications when rain impacts scheduled crew dispatch.',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    city: 'Westlake Village',
    state_region: 'CA',
    country: 'United States',
    timezone: 'America/Los_Angeles (PST)',
    website_url: 'https://readlaboratories.com/about',
    booking_url: 'https://readlaboratories.com/timeline/workflow-automation/landscaping-companies',
    primary_engagement: 'fixed_sprint',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-02-25T11:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 5,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[0], // Operations & Workflow Automation
      SEED_CATEGORIES[3], // Marketing & Programmatic Content
    ],
    tools: [
      SEED_TOOLS[0],  // Make
      SEED_TOOLS[16], // Jobber
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[1],  // Zapier
      SEED_TOOLS[5],  // Google Gemini
    ],
    case_studies: [
      {
        id: 'cs-jake-1',
        expert_id: 'exp-5',
        title: 'Landscaping Workflow Automation: Weather-Delay Triggers & Jobber Sync',
        client_industry: 'Commercial & Residential Landscaping Maintenance',
        problem_statement: 'Rainy days required landscape office managers to spend 3–4 hours manually calling and texting 60+ property owners to reschedule lawn and maintenance visits.',
        solution_architecture: 'Make.com webhook integration linking weather forecast APIs to Jobber customer route schedules, auto-generating personalized reschedule notices via SMS with 1-click confirmation.',
        hitl_oversight_mechanism: 'Weather broadcast delay triggers display a 1-click preview modal for the dispatch manager to verify before batch notifications are sent to clients.',
        failure_safeguards: 'Opt-out safeguards ensure any homeowner with special commercial service contracts is excluded from automated batch reschedules.',
        outcomes_roi: 'Reduces weather rescheduling administrative labor from 4 hours to under 2 minutes per weather event.',
        demo_video_url: 'https://readlaboratories.com/timeline/workflow-automation/landscaping-companies',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 6. Vortox Lab
  {
    id: 'exp-6',
    slug: 'vortox-lab',
    full_name: 'Vortox Lab Practice',
    professional_title: 'Speed-to-Lead & Field Software Specialists',
    agency_name: 'Vortox Lab',
    tagline: 'Speed-to-lead AI receptionists routing into Jobber, Aspire, LMN, and Service Autopilot with 100% client-owned accounts.',
    bio: 'Vortox Lab builds speed-to-lead automations, missed-call follow-ups, and AI receptionists for commercial landscaping, lawn care, and design-build contractors. Their operating standard centers on client-owned accounts, transparent written routing rules, named account managers per lead, and routing directly into Jobber, Aspire, LMN, and Service Autopilot.',
    avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
    city: 'Dallas',
    state_region: 'TX',
    country: 'United States',
    timezone: 'America/Chicago (CST)',
    website_url: 'https://vortoxlab.com/',
    booking_url: 'https://vortoxlab.com/ai-automation/agents/speed-to-lead/',
    primary_engagement: 'fixed_sprint',
    starting_budget: '5000_to_15000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-02-20T16:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 6,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[1], // Sales & Lead Qualification
      SEED_CATEGORIES[0], // Operations & Workflow Automation
    ],
    tools: [
      SEED_TOOLS[16], // Jobber
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[0],  // Make
      SEED_TOOLS[7],  // Vapi
    ],
    case_studies: [
      {
        id: 'cs-vortox-1',
        expert_id: 'exp-6',
        title: 'Speed-to-Lead Engine for Multi-Crew Lawn Care & Commercial Maintenance',
        client_industry: 'Commercial Lawn Care & Landscape Maintenance',
        problem_statement: 'High inbound estimate volume during spring rush resulted in 48-hour response delays, losing commercial maintenance bids to faster competitors.',
        solution_architecture: 'Speed-to-lead conversational assistant that answers calls within 2 rings, gathers property square footage, and logs qualified bids into Jobber/Service Autopilot.',
        hitl_oversight_mechanism: 'Client-owned accounts and written rules: all bids above $5,000/year require explicit human review by the commercial estimating director.',
        failure_safeguards: 'If caller property requirements exceed standard lawn maintenance (e.g. grading, tree removal), the AI schedules a live phone consultation rather than generating an automated quote.',
        outcomes_roi: 'Lead response time lowered from 48 hours to under 30 seconds; 38% increase in commercial property contract conversions.',
        demo_video_url: 'https://vortoxlab.com/ai-automation/agents/speed-to-lead/',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 7. Alan Debs - Alan Debs Consulting
  {
    id: 'exp-7',
    slug: 'alan-debs',
    full_name: 'Alan Debs',
    professional_title: 'Pool & Outdoor Living AI Systems Consultant',
    agency_name: 'Alan Debs Consulting',
    tagline: '15 years of pool renovation operator experience applied to contractor AI lead engines, instant proposals, and review requests.',
    bio: 'Alan Debs operated a successful pool renovation company for 15 years before applying his hands-on contractor knowledge to building AI systems for pool, patio, and outdoor living contractors. Having managed crews, sub-contractors, and homeowner expectations, he designs AI lead engines, instant proposal workflows, milestone client update automations, and review generation funnels built around the real complexities of outdoor construction.',
    avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    city: 'Phoenix',
    state_region: 'AZ',
    country: 'United States',
    timezone: 'America/Phoenix (MST)',
    website_url: 'https://alandebsconsulting.com/',
    booking_url: 'https://alandebsconsulting.com/',
    primary_engagement: 'fixed_sprint',
    starting_budget: '5000_to_15000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-02-18T10:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[1], // Sales & Lead Qualification
      SEED_CATEGORIES[3], // Marketing & Programmatic Content
    ],
    tools: [
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[0],  // Make
      SEED_TOOLS[1],  // Zapier
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[3],  // OpenAI API
    ],
    case_studies: [
      {
        id: 'cs-alan-1',
        expert_id: 'exp-7',
        title: 'Outdoor Living & Pool Renovation Lead-to-Proposal Automated Engine',
        client_industry: 'Custom Swimming Pool Construction & Patio Renovation',
        problem_statement: 'Pool contractors spend 10+ hours a week driving to unqualified properties only to discover the homeowner has an unrealistic $15K budget for a $90K custom pool build.',
        solution_architecture: 'Interactive outdoor living design intake funnel with automated budget pre-qualification, 3D style questionnaire, and milestone proposal follow-up sequences in GoHighLevel.',
        hitl_oversight_mechanism: 'Operator-backed qualification: only leads with verified budgets and lot dimensions are forwarded to the owner for on-site design consultations.',
        failure_safeguards: 'Automated disqualification rules filter out out-of-territory homeowners and send courteous referral links without wasting contractor driving time.',
        outcomes_roi: 'Saves owners 8+ hours weekly in wasted drive time; increases proposal close rate from 22% to 41%.',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 8. Nikhil Gautam - Annexal
  {
    id: 'exp-8',
    slug: 'nikhil-gautam',
    full_name: 'Nikhil Gautam',
    professional_title: 'Contractor CRM & Multi-Pipeline Engineer',
    agency_name: 'Annexal',
    tagline: 'Custom pool cost estimators, multi-pipeline GHL setups, and seasonal nurture for outdoor construction contractors.',
    bio: 'Nikhil Gautam is the founder of Annexal, developing custom website architectures, interactive pricing calculators, and GoHighLevel CRM pipelines for pool installers and North American service contractors. His portfolio includes multi-stage pipelines and pool cost calculators for Lake Geneva Pool & Spa that qualify high-intent buyers prior to discovery calls.',
    avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    city: 'Chicago',
    state_region: 'IL',
    country: 'United States',
    timezone: 'America/Chicago (CST)',
    website_url: 'https://www.annexal.com/about-us/',
    linkedin_url: 'https://linkedin.com/in/nikhil-gautam-205743a2',
    booking_url: 'https://www.annexal.com/about-us/',
    primary_engagement: 'fixed_sprint',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-02-15T15:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[0], // Operations & Workflow Automation
      SEED_CATEGORIES[1], // Sales & Lead Qualification
    ],
    tools: [
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[19], // WordPress
      SEED_TOOLS[1],  // Zapier
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[21], // Python
    ],
    case_studies: [
      {
        id: 'cs-nikhil-1',
        expert_id: 'exp-8',
        title: 'Lake Geneva Pool & Spa: 5-Stage GHL Pipeline with Interactive Cost Estimator',
        client_industry: 'Inground Swimming Pool Installation & Hot Tub Retail',
        problem_statement: 'High consumer interest led to hundreds of website form submissions, but sales reps spent excessive hours answering basic pricing questions for tire-kickers.',
        solution_architecture: 'Interactive pool cost calculator embedded into WordPress that syncs with 5 distinct GoHighLevel pipeline stages depending on pool size, equipment package, and timeline.',
        hitl_oversight_mechanism: 'Lead scoring threshold: only buyers who complete the 6-question budget estimator and request an in-person site survey are booked onto the owner calendar.',
        failure_safeguards: 'Seasonal nurture automations automatically pause whenever a prospect replies via SMS or schedules an in-person showroom visit.',
        outcomes_roi: 'Generated 140+ qualified pool installation inquiries in the first spring season; tripled showroom consultation conversion.',
        demo_video_url: 'https://www.annexal.com/portfolio/lake-geneva-pool-spa/',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 9. Natalie Novoa - Rockitgo Digital
  {
    id: 'exp-9',
    slug: 'natalie-novoa',
    full_name: 'Natalie Novoa',
    professional_title: 'Contractor GHL Pipeline Specialist',
    agency_name: 'Rockitgo Digital',
    tagline: 'Full 8-stage design-build pipelines in GoHighLevel with missed-call text-back and review automation for pool builders.',
    bio: 'Natalie Novoa is the founder of Rockitgo Digital, specializing in GoHighLevel CRM workflows tailored for contractors, pool builders, and roofers. Natalie maps the entire 8-stage design-build sales pipeline, from initial inquiry triage to automated proposal follow-ups, design consultation bookings, and post-project review requests.',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    city: 'Miami',
    state_region: 'FL',
    country: 'United States',
    timezone: 'America/New_York (EST)',
    website_url: 'https://rockitgodigital.com/',
    linkedin_url: 'https://linkedin.com/in/natalianovoa',
    booking_url: 'https://rockitgodigital.com/',
    primary_engagement: 'fixed_sprint',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-02-12T13:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[0], // Operations & Workflow Automation
      SEED_CATEGORIES[3], // Marketing & Programmatic Content
    ],
    tools: [
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[1],  // Zapier
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[5],  // Google Gemini
    ],
    case_studies: [
      {
        id: 'cs-natalie-1',
        expert_id: 'exp-9',
        title: '8-Stage Design-Build Pipeline Architecture for Pool Builders',
        client_industry: 'Custom Swimming Pool Design & Construction',
        problem_statement: 'The average pool sales cycle spans 60–120 days; contractors regularly lose touch with interested homeowners during the permitting and design phase.',
        solution_architecture: 'Full 8-stage automated GoHighLevel workflow tracking clients from initial lead to 3D design review, engineering deposit, permitting, and final review generation.',
        hitl_oversight_mechanism: 'Every stage transition requires project manager confirmation inside GHL before automated homeowner milestone updates are released.',
        failure_safeguards: 'Automated 14-day inactivity triggers alert the general contractor if a proposal has sat without client interaction.',
        outcomes_roi: 'Reduces lost proposals during the 90-day design cycle by 45%; collected 28 five-star Google reviews in 6 months.',
        demo_video_url: 'https://rockitgodigital.com/post/gohighlevel-pool-builders',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 10. Barq Digital Team - Barq Digital AI
  {
    id: 'exp-10',
    slug: 'barq-digital-ai',
    full_name: 'Barq Digital AI Practice',
    professional_title: 'Voice AI & Lead Follow-Up Practice',
    agency_name: 'Barq Digital AI',
    tagline: 'Vapi voice AI inbound/outbound systems with instant escalation to the owner\'s personal phone for pool builders.',
    bio: 'Barq Digital AI builds automated voice and lead follow-up systems for specialty contractors. Their verified deployment for American Pool & Spa in Kentucky utilizes Vapi AI voice agents for inbound/outbound calls, n8n automated follow-ups, and Google Calendar scheduling, with a mandatory human fallback that rings the owner\'s phone whenever the AI cannot answer.',
    avatar_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
    city: 'Louisville',
    state_region: 'KY',
    country: 'United States',
    timezone: 'America/New_York (EST)',
    website_url: 'https://barqdigitalai.com',
    booking_url: 'mailto:contact@barqdigitalai.com',
    primary_engagement: 'fixed_sprint',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-02-10T12:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[1], // Sales & Lead Qualification
      SEED_CATEGORIES[0], // Operations & Workflow Automation
    ],
    tools: [
      SEED_TOOLS[7],  // Vapi
      SEED_TOOLS[2],  // n8n
      SEED_TOOLS[23], // Google Calendar
      SEED_TOOLS[10], // Twilio
    ],
    case_studies: [
      {
        id: 'cs-barq-1',
        expert_id: 'exp-10',
        title: 'American Pool & Spa (KY): Voice AI Inbound/Outbound with Owner Phone Escalation',
        client_industry: 'Swimming Pool & Spa Contracting',
        problem_statement: 'Prospective pool owners calling during field work hours reached voicemail, resulting in high churn to local competitors.',
        solution_architecture: 'Vapi conversational voice AI agent handling inbound calls and outbound form follow-ups, integrated with n8n and Google Calendar.',
        hitl_oversight_mechanism: 'Immediate phone escalation: whenever a caller asks technical structural questions or expresses concern, the call instantly transfers to the owner\'s cell phone.',
        failure_safeguards: 'Full call audio and transcripts are emailed to the owner within 60 seconds with actionable summary bullets.',
        outcomes_roi: 'Captured 22 new pool installation appointments within 60 days of launch; zero lost phone calls.',
        demo_video_url: 'https://barqdigitalai.com/case-studies/how-a-pool-building-company-automated-lead-follow-up-and-appointment-booking/',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 11. Field Studio
  {
    id: 'exp-11',
    slug: 'field-studio',
    full_name: 'Field Studio Practice',
    professional_title: 'Done-For-You Speed-to-Lead Automation Team',
    agency_name: 'Field Studio',
    tagline: 'Done-for-you speed-to-lead AI, lead qualification, and estimate booking with transparent weekly reporting for landscape & trade contractors.',
    bio: 'Field Studio delivers done-for-you speed-to-lead AI systems, lead qualification, and estimate scheduling for outdoor and trade contractors including landscaping, roofing, and HVAC. They provide transparent weekly reporting metrics on all automated interactions and estimate conversions.',
    avatar_url: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80',
    city: 'Atlanta',
    state_region: 'GA',
    country: 'United States',
    timezone: 'America/New_York (EST)',
    website_url: 'https://getfieldstudio.com/landscape/',
    booking_url: 'mailto:hello@getfieldstudio.com',
    primary_engagement: 'monthly_retainer',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-02-08T14:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[1], // Sales & Lead Qualification
      SEED_CATEGORIES[0], // Operations & Workflow Automation
    ],
    tools: [
      SEED_TOOLS[0],  // Make
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[3],  // OpenAI API
    ],
    case_studies: [
      {
        id: 'cs-field-1',
        expert_id: 'exp-11',
        title: 'Speed-to-Lead & Transparent Weekly Reporting for Residential Landscapers',
        client_industry: 'Residential Landscape Maintenance & Design',
        problem_statement: 'Landscape business owners struggled to verify whether third-party marketing leads were being contacted quickly by office staff.',
        solution_architecture: 'Autonomous SMS and phone speed-to-lead workflow answering new inquiries within 90 seconds, logging all responses with weekly automated scorecard reports.',
        hitl_oversight_mechanism: 'Monday morning executive summary reports detailing total leads, contact speeds, human intervention counts, and booked estimate numbers.',
        failure_safeguards: 'If a homeowner expresses dissatisfaction or custom requirements, automated messaging immediately stops and alerts the business owner.',
        outcomes_roi: 'Maintained an average 78-second initial lead contact speed; boosted estimate booking conversion by 31%.',
        demo_video_url: 'https://getfieldstudio.com/landscape/',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 12. Withn Team (Jake)
  {
    id: 'exp-12',
    slug: 'withn-tech',
    full_name: 'Withn Practice',
    professional_title: 'Pool & Route Service Automation Practice',
    agency_name: 'Withn',
    tagline: 'AI voice receptionist & dispatcher with Skimmer, Jobber, and GHL integrations answering route status calls.',
    bio: 'Withn builds AI voice receptionists, dispatchers, and SMS lead qualification pipelines tailored for route-based service contractors. Their deployment for Ventura County pool service professionals connects directly to Skimmer and Jobber, enabling the AI to answer client "when is my technician arriving?" inquiries directly from live route logs.',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    city: 'Westlake Village',
    state_region: 'CA',
    country: 'United States',
    timezone: 'America/Los_Angeles (PST)',
    website_url: 'https://withn.tech/case-studies/pool-service-companies',
    booking_url: 'mailto:jake@withn.tech',
    primary_engagement: 'fixed_sprint',
    starting_budget: '5000_to_15000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-02-05T10:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[0], // Operations & Workflow Automation
      SEED_CATEGORIES[2], // Customer Support & Knowledge Bases
    ],
    tools: [
      SEED_TOOLS[18], // Skimmer
      SEED_TOOLS[16], // Jobber
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[7],  // Vapi
    ],
    case_studies: [
      {
        id: 'cs-withn-1',
        expert_id: 'exp-12',
        title: 'Ventura County Pool Service: Skimmer Integration for Automated Route Status Inquiries',
        client_industry: 'Pool Cleaning, Chemical Maintenance & Route Services',
        problem_statement: 'Route managers received 30+ daily phone calls from homeowners asking when their pool tech would arrive, pulling managers away from scheduling and billing.',
        solution_architecture: 'Vapi voice AI integration reading real-time GPS check-in logs from Skimmer and Jobber, providing homeowners with accurate technician ETAs.',
        hitl_oversight_mechanism: 'Any equipment repair quote or chemical imbalance warning is immediately flagged and transferred to the lead field technician.',
        failure_safeguards: 'If route tracking is unavailable or tech is delayed by traffic, the system sends an SMS with the tech\'s direct office phone contact.',
        outcomes_roi: 'Eliminates 85% of "where is my tech" inbound phone calls; saves 18 dispatcher hours weekly.',
        demo_video_url: 'https://withn.tech/case-studies/pool-service-companies',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 13. Vic Sun - Channel Automation
  {
    id: 'exp-13',
    slug: 'vic-sun',
    full_name: 'Vic Sun',
    professional_title: 'Home Improvement Omnichannel AI Architect',
    agency_name: 'Channel Automation',
    tagline: 'Omnichannel AI appointment setting across SMS, video, email, and IVR with built-in TCPA opt-in compliance.',
    bio: 'Vic Sun is the co-founder of Channel Automation. As former home services business operators, his team designs omnichannel AI appointment-setting systems spanning SMS, video, email, and interactive voice response (IVR). The platform features dead-lead reactivation engines and automated TCPA compliance guardrails built directly into every communication sequence.',
    avatar_url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
    city: 'San Francisco',
    state_region: 'CA',
    country: 'United States',
    timezone: 'America/Los_Angeles (PST)',
    website_url: 'https://power100.io/how-vic-sun-and-channel-automation-turn-leads-into-booked-appointments-for-home-improvement-contractors/',
    booking_url: 'https://power100.io/how-vic-sun-and-channel-automation-turn-leads-into-booked-appointments-for-home-improvement-contractors/',
    primary_engagement: 'monthly_retainer',
    starting_budget: '5000_to_15000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-02-01T15:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[1], // Sales & Lead Qualification
      SEED_CATEGORIES[5], // AI Advertising & Paid Media Ops
    ],
    tools: [
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[0],  // Make
      SEED_TOOLS[13], // HubSpot
      SEED_TOOLS[3],  // OpenAI API
    ],
    case_studies: [
      {
        id: 'cs-vic-1',
        expert_id: 'exp-13',
        title: 'Omnichannel Lead Reactivation & TCPA Compliance for Home Improvement Contractors',
        client_industry: 'Home Improvement & Specialty Contracting',
        problem_statement: 'Contractors sitting on 5,000+ past homeowner leads had no compliant way to re-engage past bids without risking TCPA fines or spam complaints.',
        solution_architecture: 'Omnichannel outreach system utilizing AI SMS, personalized video snippets, and email sequences with strict opt-in verification and double consent check.',
        hitl_oversight_mechanism: 'Built-in TCPA compliance checkpoint: automated outreach only triggers on verified consent records, instantly halting upon opt-out request.',
        failure_safeguards: 'Any homeowner expressing dissatisfaction or requesting cost adjustments is routed immediately to a dedicated senior sales representative.',
        outcomes_roi: 'Reactivated $140,000 in booked home improvement projects from dormant customer databases within 90 days.',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 14. Bilal Umrani - Enumsol
  {
    id: 'exp-14',
    slug: 'bilal-umrani',
    full_name: 'Bilal Umrani',
    professional_title: 'Contractor AI Receptionist & CRM Architect',
    agency_name: 'Enumsol',
    tagline: 'Custom AI receptionists with hardscape-specific qualification criteria and direct CRM scheduling.',
    bio: 'Bilal Umrani is the co-founder of Enumsol. He designs custom AI voice receptionists and lead qualification systems specifically calibrated for landscaping and hardscaping contractors, understanding the distinct quoting differences between routine maintenance and complex paver/hardscape installations.',
    avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    city: 'Houston',
    state_region: 'TX',
    country: 'United States',
    timezone: 'America/Chicago (CST)',
    website_url: 'https://enumsol.com/about',
    linkedin_url: 'https://linkedin.com/in/bilalkumrani',
    booking_url: 'https://enumsol.com/ai-answering-for-landscapers',
    primary_engagement: 'fixed_sprint',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-01-28T12:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[1], // Sales & Lead Qualification
      SEED_CATEGORIES[0], // Operations & Workflow Automation
    ],
    tools: [
      SEED_TOOLS[8],  // Retell AI
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[0],  // Make
      SEED_TOOLS[10], // Twilio
    ],
    case_studies: [
      {
        id: 'cs-bilal-1',
        expert_id: 'exp-14',
        title: 'Hardscape & Paver Qualification AI Voice Assistant for Landscape Contractors',
        client_industry: 'Hardscaping, Paver Patios & Retaining Walls',
        problem_statement: 'Office staff spent hours answering calls for small lawn mows when the business primary revenue driver was $15K+ hardscape installations.',
        solution_architecture: 'Retell AI voice assistant trained on hardscape project scopes, material selections, and square-footage thresholds, directly booking on-site consultations.',
        hitl_oversight_mechanism: 'Hardscape project parameters are verified by the estimator before booking confirmations are dispatched to the homeowner.',
        failure_safeguards: 'If the caller describes retaining walls over 4 feet (requiring structural engineering permits), the AI routes the call to the master builder.',
        outcomes_roi: 'Filtered out 70% of low-margin lawn maintenance calls; increased hardscape contract booking rate by 38%.',
        demo_video_url: 'https://enumsol.com/ai-answering-for-landscapers',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 15. NodeVision Team
  {
    id: 'exp-15',
    slug: 'nodevision',
    full_name: 'NodeVision Practice',
    professional_title: 'Seasonal Demand & Cleanup-to-Contract Automation',
    agency_name: 'NodeVision',
    tagline: 'Instant follow-up workflows turning one-time yard cleanups into recurring maintenance contracts.',
    bio: 'NodeVision builds lead capture, instant follow-up, and automated booking systems for outdoor service providers. Their landscaping workflows specialize in the cleanup-to-contract renewal cycle, turning seasonal one-off cleanups into predictable recurring maintenance agreements.',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    city: 'Denver',
    state_region: 'CO',
    country: 'United States',
    timezone: 'America/Denver (MST)',
    website_url: 'https://nodevision.ai/',
    booking_url: 'https://nodevision.ai/services/landscaping',
    primary_engagement: 'fixed_sprint',
    starting_budget: '5000_to_15000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-01-25T11:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[0], // Operations & Workflow Automation
      SEED_CATEGORIES[3], // Marketing & Programmatic Content
    ],
    tools: [
      SEED_TOOLS[0],  // Make
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[3],  // OpenAI API
    ],
    case_studies: [
      {
        id: 'cs-nodevision-1',
        expert_id: 'exp-15',
        title: 'Cleanup-to-Contract Automated Conversion Sequence for Landscapers',
        client_industry: 'Seasonal Yard Cleanup & Lawn Care',
        problem_statement: 'Landscaping contractors do spring cleanups for hundreds of homeowners but fail to follow up consistently to convert them into recurring monthly clients.',
        solution_architecture: 'Automated 3-touch post-service SMS and email sequence triggered 5 days after cleanup completion, presenting tailored recurring mowing packages.',
        hitl_oversight_mechanism: 'Any custom property request or pricing pushback alerts the account manager for direct personalized outreach.',
        failure_safeguards: 'Automatic suppression stops marketing messages if a customer has already signed a recurring contract or requested to opt out.',
        outcomes_roi: 'Converted 29% of one-time cleanup clients into recurring full-season maintenance agreements.',
        demo_video_url: 'https://nodevision.ai/services/landscaping',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 16. Aegis Automations Team
  {
    id: 'exp-16',
    slug: 'aegis-automations',
    full_name: 'Aegis Automations Practice',
    professional_title: 'Estimate Nurture & Review Practice',
    agency_name: 'Aegis Automations',
    tagline: 'Smart 5-touch estimate follow-up that automatically pauses when a homeowner replies.',
    bio: 'Aegis Automations designs inbound lead capture, five-touch estimate nurture sequences, and automated Google review requests for landscaping companies. Their follow-up automation incorporates intelligent pause logic that immediately stops automated sequences the moment a homeowner responds, handing the conversation to staff.',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    city: 'Charlotte',
    state_region: 'NC',
    country: 'United States',
    timezone: 'America/New_York (EST)',
    website_url: 'https://www.aegisautomations.com/',
    booking_url: 'https://www.aegisautomations.com/industries/landscaping',
    primary_engagement: 'fixed_sprint',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-01-20T14:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[3], // Marketing & Programmatic Content
      SEED_CATEGORIES[1], // Sales & Lead Qualification
    ],
    tools: [
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[1],  // Zapier
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[5],  // Google Gemini
    ],
    case_studies: [
      {
        id: 'cs-aegis-1',
        expert_id: 'exp-16',
        title: 'Smart 5-Touch Estimate Follow-Up with Automatic Response Pausing',
        client_industry: 'Residential Landscape Installation & Irrigation',
        problem_statement: 'Over 60% of issued landscaping estimates went unaccepted simply because estimators were too busy in the field to follow up with homeowners consistently.',
        solution_architecture: '5-touch automated sequence across 14 days combining polite check-in SMS, project photo links, and scheduling prompts inside GoHighLevel.',
        hitl_oversight_mechanism: 'Zero robotic overlap: the instant a prospect replies via text or phone call, all future automated messages pause permanently and alert the estimator.',
        failure_safeguards: 'Estimates marked "Declined" or "Under Renegotiation" in the CRM are instantly removed from automated follow-up.',
        outcomes_roi: '32% increase in estimate acceptance; recovered $48,000 in pending irrigation and planting quotes.',
        demo_video_url: 'https://www.aegisautomations.com/industries/landscaping',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 17. Cortex Team (buildcortex.dev)
  {
    id: 'exp-17',
    slug: 'buildcortex',
    full_name: 'Cortex Practice',
    professional_title: 'Masonry & Hardscaping AI Workflow Practice',
    agency_name: 'Cortex',
    tagline: 'Dedicated AI agents with ongoing management for masonry, hardscaping, and outdoor stone contractors.',
    bio: 'Cortex builds specialized AI workflows, custom inquiry receptionists, and automated estimating pipelines for masonry and hardscaping contractors. They manage the full lifecycle from audit and architectural design to ongoing system monitoring and adjustment.',
    avatar_url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80',
    city: 'Boston',
    state_region: 'MA',
    country: 'United States',
    timezone: 'America/New_York (EST)',
    website_url: 'https://buildcortex.dev/',
    booking_url: 'https://buildcortex.dev/industries/masonry',
    primary_engagement: 'monthly_retainer',
    starting_budget: '5000_to_15000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-01-18T10:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[0], // Operations & Workflow Automation
      SEED_CATEGORIES[1], // Sales & Lead Qualification
    ],
    tools: [
      SEED_TOOLS[21], // Python
      SEED_TOOLS[22], // TypeScript
      SEED_TOOLS[0],  // Make
      SEED_TOOLS[10], // Twilio
    ],
    case_studies: [
      {
        id: 'cs-cortex-1',
        expert_id: 'exp-17',
        title: 'Custom Masonry & Stone Project Inquiry Triage with Ongoing AI Management',
        client_industry: 'Architectural Masonry, Stone Retaining Walls & Hardscaping',
        problem_statement: 'High-end stone masonry inquiries require detailed architectural drawings and site specifications that standard form bots could not parse or qualify accurately.',
        solution_architecture: 'Custom Python & Make workflow that ingests homeowner photo uploads, extracts stone type and linear footage specs, and pre-populates estimating sheets.',
        hitl_oversight_mechanism: 'Ongoing human management: Cortex technical managers review incoming project spec extractions daily to refine model accuracy.',
        failure_safeguards: 'If project specs indicate historical restoration or structural retaining walls, the system routes directly to senior masonry estimators.',
        outcomes_roi: 'Decreased bid preparation turnaround time from 5 days to 24 hours.',
        demo_video_url: 'https://buildcortex.dev/industries/masonry',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 18. Zentive AI Consulting
  {
    id: 'exp-18',
    slug: 'zentive-ai',
    full_name: 'Zentive AI Consulting',
    professional_title: 'Field Service Estimating Systems Practice',
    agency_name: 'Zentive',
    tagline: 'Custom AI estimators and receptionists built alongside field-service workflow tools for lawn and landscaping contractors.',
    bio: 'Zentive AI Consulting creates custom AI receptionists, property square-footage estimators, and automated CRM follow-up systems for outdoor contractors, helping lawn and landscaping businesses streamline bidding and customer intake.',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    city: 'Boulder',
    state_region: 'CO',
    country: 'United States',
    timezone: 'America/Denver (MST)',
    website_url: 'https://zentive.io/ai-consulting/',
    booking_url: 'https://zentive.io/ai-consulting/',
    primary_engagement: 'fixed_sprint',
    starting_budget: 'under_2500',
    status: 'published',
    is_verified: true,
    verified_at: '2026-01-15T16:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[0], // Operations & Workflow Automation
      SEED_CATEGORIES[1], // Sales & Lead Qualification
    ],
    tools: [
      SEED_TOOLS[16], // Jobber
      SEED_TOOLS[1],  // Zapier
      SEED_TOOLS[21], // Python
      SEED_TOOLS[3],  // OpenAI API
    ],
    case_studies: [
      {
        id: 'cs-zentive-1',
        expert_id: 'exp-18',
        title: 'GIS Lot Size Square-Footage Estimating Assistant for Lawn Service Bidding',
        client_industry: 'Residential Lawn Maintenance & Lawn Care',
        problem_statement: 'Quoting residential properties required manual satellite map measurements and driving to properties, capping company growth at 150 accounts.',
        solution_architecture: 'Automated intake tool that pulls parcel square footage from property databases, applies turf-density algorithms, and produces draft mowing estimates.',
        hitl_oversight_mechanism: 'All automated estimates require dispatcher 1-click confirmation before customer pricing is delivered.',
        failure_safeguards: 'Properties with steep topography, fences, or corner lot anomalies trigger a site visit flag rather than instant price quotes.',
        outcomes_roi: 'Cut bidding turnaround from 48 hours to 3 minutes; expanded active recurring client base by 40%.',
        demo_video_url: 'https://zentive.io/ai-consulting/',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 19. SkillMammoth
  {
    id: 'exp-19',
    slug: 'skillmammoth',
    full_name: 'SkillMammoth Team',
    professional_title: 'Official Jobber & Make.com Automation Partner',
    agency_name: 'SkillMammoth',
    tagline: 'Official Jobber Partner connecting field service CRM workflows to Make.com automations for contractors.',
    bio: 'SkillMammoth is an official Jobber Partner specializing in connecting Jobber field service management software to custom Make.com automations, invoicing systems, and client communication channels for service contractors.',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    city: 'New York',
    state_region: 'NY',
    country: 'United States',
    timezone: 'America/New_York (EST)',
    website_url: 'https://skillmammoth.com/',
    booking_url: 'https://skillmammoth.com/partners',
    primary_engagement: 'fixed_sprint',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-01-12T11:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[0], // Operations & Workflow Automation
      SEED_CATEGORIES[2], // Customer Support & Knowledge Bases
    ],
    tools: [
      SEED_TOOLS[16], // Jobber
      SEED_TOOLS[0],  // Make
      SEED_TOOLS[1],  // Zapier
    ],
    case_studies: [
      {
        id: 'cs-skillmammoth-1',
        expert_id: 'exp-19',
        title: 'Jobber to Make.com Accounting & Subcontractor Payout Synchronization',
        client_industry: 'Field Service & Specialty Trade Contracting',
        problem_statement: 'Completed jobs in Jobber required manual double-entry into accounting software and manual calculations for subcontractor commission splits.',
        solution_architecture: 'Webhook bridge linking completed job triggers in Jobber to Make.com, auto-generating vendor payout invoices with itemized material cost deductions.',
        hitl_oversight_mechanism: 'Bookkeeper confirmation dashboard: all automated payout slips remain in "Pending Review" status until the finance manager verifies receipts.',
        failure_safeguards: 'Discrepancies exceeding $50 between Jobber logged hours and GPS timesheet tracking halt automatic processing and flag the manager.',
        outcomes_roi: 'Saved 12 hours of weekly administrative data entry; eliminated manual bookkeeping calculation errors.',
        demo_video_url: 'https://skillmammoth.com/partners',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 20. Techfektor (BuilderBot Pro)
  {
    id: 'exp-20',
    slug: 'techfektor',
    full_name: 'Techfektor Practice',
    professional_title: 'BuilderBot Pro Practice Lead',
    agency_name: 'Techfektor',
    tagline: 'BuilderBot Pro: conversational voice agents configured for pool builders, outdoor living, and remodelers.',
    bio: 'Techfektor designs BuilderBot Pro, a specialized conversational voice AI agent engineered specifically for pool builders, outdoor living contractors, and remodelers to answer inquiries, qualify project timelines, and book site visits.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    city: 'Austin',
    state_region: 'TX',
    country: 'United States',
    timezone: 'America/Chicago (CST)',
    website_url: 'https://techfektor.com/',
    booking_url: 'https://techfektor.com/',
    primary_engagement: 'fixed_sprint',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-01-10T14:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[1], // Sales & Lead Qualification
      SEED_CATEGORIES[0], // Operations & Workflow Automation
    ],
    tools: [
      SEED_TOOLS[8],  // Retell AI
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[0],  // Make
      SEED_TOOLS[15], // GoHighLevel
    ],
    case_studies: [
      {
        id: 'cs-techfektor-1',
        expert_id: 'exp-20',
        title: 'BuilderBot Pro Voice Agent Deployment for Custom Inground Pool Builders',
        client_industry: 'Custom Inground Swimming Pool Construction',
        problem_statement: 'High advertising spend generated dozens of homeowner phone inquiries while the general contractor was inspecting excavations, resulting in missed calls.',
        solution_architecture: 'BuilderBot Pro voice assistant answering within 2 rings, collecting backyard dimensions and design preferences, and setting up design appointments.',
        hitl_oversight_mechanism: 'Call audio and transcript summary are dispatched via SMS to the contractor within 30 seconds for immediate follow-up.',
        failure_safeguards: 'If caller inquiries involve existing pool warranty claims or leaks, the system immediately rings the warranty desk.',
        outcomes_roi: 'Zero missed inbound sales calls; 35% higher appointment hold rate.',
        demo_video_url: 'https://techfektor.com/',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 21. David Mill - AI for Contractors
  {
    id: 'exp-21',
    slug: 'david-mill',
    full_name: 'David Mill',
    professional_title: 'Contractor AI Systems Educator & Implementer',
    agency_name: 'AI for Contractors (Scelta)',
    tagline: 'Claude Company Brain setups, weekly implementation templates, and 24-hour response SLAs for trade contractors.',
    bio: 'David Mill leads the AI for Contractors community and implementation practice. He guides trade contractors through deploying custom Claude "Company Brain" models, standardized SOPs, and automated quoting templates with a strict anti-hype, no-nonsense methodology and guaranteed 24-hour response SLAs.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    city: 'Nashville',
    state_region: 'TN',
    country: 'United States',
    timezone: 'America/Chicago (CST)',
    website_url: 'https://www.skool.com/ai-for-contractors/about',
    booking_url: 'https://www.skool.com/ai-for-contractors/about',
    primary_engagement: 'consulting_audit',
    starting_budget: 'under_2500',
    status: 'published',
    is_verified: true,
    verified_at: '2026-01-08T13:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[4], // Executive & Personal AI Ops
      SEED_CATEGORIES[0], // Operations & Workflow Automation
    ],
    tools: [
      SEED_TOOLS[4], // Anthropic Claude
      SEED_TOOLS[0], // Make
      SEED_TOOLS[1], // Zapier
    ],
    case_studies: [
      {
        id: 'cs-david-1',
        expert_id: 'exp-21',
        title: 'Claude "Company Brain" Implementation for 20-Person Trade Contractor',
        client_industry: 'Commercial & Residential Roofing / Trade Services',
        problem_statement: 'New project managers spent hours searching through scattered Google Drive folders and email threads to find material specifications and safety guidelines.',
        solution_architecture: 'Centralized Claude Project repository indexing 150+ company standard operating procedures, safety rules, and estimating pricing formulas.',
        hitl_oversight_mechanism: 'Strict source citations: the Company Brain only outputs answers referenced directly in company manuals with page citations.',
        failure_safeguards: 'Safety-critical procedures (fall protection, high-voltage) output mandatory reminders that verbal safety manager sign-off is required.',
        outcomes_roi: 'Shortened project manager onboarding time by 60%; eliminated material ordering discrepancies.',
        demo_video_url: 'https://www.skool.com/ai-for-contractors/about',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 22. Tim Newton
  {
    id: 'exp-22',
    slug: 'tim-newton',
    full_name: 'Tim Newton',
    professional_title: 'Local Contractor Tech & Automation Consultant',
    agency_name: 'Independent Contractor Specialist',
    tagline: 'High-converting websites, Google Business Profile optimization, and missed-call text-back built in the right order for contractors.',
    bio: 'Tim Newton works directly with local contractors and home service businesses to implement reliable foundational tech stacks: high-converting web presences, local Google Business Profile rank optimization, and automated missed-call text-back systems that preserve homeowner leads.',
    avatar_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    city: 'Los Angeles',
    state_region: 'CA',
    country: 'United States',
    timezone: 'America/Los_Angeles (PST)',
    website_url: 'https://x.com/thetimnewton',
    booking_url: 'https://x.com/thetimnewton',
    primary_engagement: 'fixed_sprint',
    starting_budget: 'under_2500',
    status: 'published',
    is_verified: true,
    verified_at: '2026-01-05T12:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[3], // Marketing & Programmatic Content
      SEED_CATEGORIES[1], // Sales & Lead Qualification
    ],
    tools: [
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[19], // WordPress
    ],
    case_studies: [
      {
        id: 'cs-tim-1',
        expert_id: 'exp-22',
        title: 'Foundational Stack: Google Business Profile Optimization & Missed-Call Text-Back',
        client_industry: 'Residential Plumbing & HVAC Repair',
        problem_statement: 'Plumbing contractor relied entirely on paid lead generation services, paying $80+ per shared lead while missing 30% of direct phone inquiries.',
        solution_architecture: 'Optimized Google Business Profile with automated review generation, combined with instant missed-call text-back sequence via Twilio and GoHighLevel.',
        hitl_oversight_mechanism: 'When a caller replies to the missed-call text, the dispatcher receives an instant phone buzz with 1-click dial back.',
        failure_safeguards: 'Messages clearly identify as the contractor\'s automated front desk, providing emergency on-call numbers.',
        outcomes_roi: 'Recovers 12–18 emergency repair calls each month; reduced third-party shared lead spend by 50%.',
        demo_video_url: 'https://x.com/thetimnewton/status/2111134829849059756',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 23. Velogics Team
  {
    id: 'exp-23',
    slug: 'velogics-ai',
    full_name: 'Velogics AI Practice',
    professional_title: 'Front-Office AI Telephony Practice',
    agency_name: 'Velogics',
    tagline: 'Transparent AI front office for calls, chat, forms, and texts with honest AI disclosure for service businesses.',
    bio: 'Velogics AI designs front-office AI communication infrastructure handling phone calls, web chats, quote request forms, and SMS follow-ups for landscaping and trade contractors. They emphasize ethical AI disclosure and realistic voice flows.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    city: 'Ottawa',
    state_region: 'ON',
    country: 'Canada',
    timezone: 'America/Toronto (EST)',
    website_url: 'https://x.com/velogics_ai',
    booking_url: 'https://x.com/velogics_ai',
    primary_engagement: 'fixed_sprint',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2026-01-03T16:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[1], // Sales & Lead Qualification
      SEED_CATEGORIES[2], // Customer Support & Knowledge Bases
    ],
    tools: [
      SEED_TOOLS[8],  // Retell AI
      SEED_TOOLS[7],  // Vapi
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[0],  // Make
    ],
    case_studies: [
      {
        id: 'cs-velogics-1',
        expert_id: 'exp-23',
        title: 'Front-Office Telephony & Chat with Transparent AI Disclosure',
        client_industry: 'Lawn Care, Landscaping & Property Maintenance',
        problem_statement: 'Callers hung up when feeling deceived by robotic phone trees or fake human pretenses.',
        solution_architecture: 'Conversational voice assistant that introduces itself transparently as the company AI booking assistant, answers pricing FAQs, and books service visits.',
        hitl_oversight_mechanism: 'Callers can press 0 or say "human" at any point to transfer directly to the office manager.',
        failure_safeguards: 'If the caller mentions billing disputes or damage claims, the AI transfers the call immediately to the owner.',
        outcomes_roi: '91% caller completion rate; captured 34 seasonal cleanup inquiries in 30 days.',
        demo_video_url: 'https://x.com/velogics_ai/status/2111132563959935428',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 24. VidDazzle Agency Team
  {
    id: 'exp-24',
    slug: 'viddazzle-agency',
    full_name: 'VidDazzle Agency Practice',
    professional_title: 'Local Business AI Receptionist Practice',
    agency_name: 'VidDazzle Agency',
    tagline: 'Transparent "Evolve" AI receptionists that disclose they are AI assistants to callers up front.',
    bio: 'VidDazzle Agency in Pensacola, FL deploys the "Evolve" AI receptionist alongside website and digital marketing systems for local contractors. Their voice setups prioritize transparency by immediately letting callers know they are speaking with an AI assistant ready to dispatch a team member.',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    city: 'Pensacola',
    state_region: 'FL',
    country: 'United States',
    timezone: 'America/Chicago (CST)',
    website_url: 'https://x.com/VidDazzleAgency',
    booking_url: 'https://x.com/VidDazzleAgency',
    primary_engagement: 'fixed_sprint',
    starting_budget: 'under_2500',
    status: 'published',
    is_verified: true,
    verified_at: '2026-01-02T10:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[1], // Sales & Lead Qualification
      SEED_CATEGORIES[3], // Marketing & Programmatic Content
    ],
    tools: [
      SEED_TOOLS[8],  // Retell AI
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[19], // WordPress
      SEED_TOOLS[15], // GoHighLevel
    ],
    case_studies: [
      {
        id: 'cs-viddazzle-1',
        expert_id: 'exp-24',
        title: '"Evolve" AI Voice Receptionist Deployment for Local Trade Contractors',
        client_industry: 'Local Home Service & Repair Contractors',
        problem_statement: 'Solopreneur contractors working on roofs or in crawl spaces cannot pick up incoming phone calls, losing valuable local repair jobs.',
        solution_architecture: 'Evolve AI receptionist connected to Twilio that answers after 3 rings, takes detailed customer job descriptions, and texts caller details to the technician.',
        hitl_oversight_mechanism: 'Instant SMS dispatch alert sent to the contractor with 1-tap call-back button.',
        failure_safeguards: 'If a caller reports an active water leak or electrical hazard, the AI triggers an emergency high-priority phone notification.',
        outcomes_roi: 'Eliminates lost emergency calls; generates an additional $4,500 monthly in captured service jobs.',
        demo_video_url: 'https://x.com/VidDazzleAgency/status/2110415345152651591',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 25. Moinuddin Gholam - AI & Marketing For Contractors
  {
    id: 'exp-25',
    slug: 'moinuddin-gholam',
    full_name: 'Moinuddin Gholam',
    professional_title: 'Contractor Systems & Ownership Architect',
    agency_name: 'AI & Marketing For Contractors',
    tagline: 'AI call, SMS, and follow-up systems built on platforms that contractors own, not rent.',
    bio: 'Moinuddin Gholam leads AI & Marketing For Contractors, creating automated call, SMS, and lead follow-up systems, Google Business Profile local SEO, and CRM architectures. He emphasizes building in client-owned software accounts so contractors maintain full control over their customer data and assets.',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    city: 'Houston',
    state_region: 'TX',
    country: 'United States',
    timezone: 'America/Chicago (CST)',
    website_url: 'https://www.skool.com/ai-marketing-for-contractors-4380/about',
    booking_url: 'https://www.skool.com/ai-marketing-for-contractors-4380/about',
    primary_engagement: 'fixed_sprint',
    starting_budget: 'under_2500',
    status: 'published',
    is_verified: true,
    verified_at: '2026-01-01T15:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[0], // Operations & Workflow Automation
      SEED_CATEGORIES[3], // Marketing & Programmatic Content
    ],
    tools: [
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[1],  // Zapier
      SEED_TOOLS[0],  // Make
    ],
    case_studies: [
      {
        id: 'cs-moinuddin-1',
        expert_id: 'exp-25',
        title: 'Client-Owned AI CRM & Local Lead Follow-Up Engine for Trade Contractors',
        client_industry: 'Residential General Contracting & Remodeling',
        problem_statement: 'Contractors previously locked into proprietary agency software lost all customer data and automations when parting ways with marketing agencies.',
        solution_architecture: 'Complete GoHighLevel, Twilio, and Zapier setup built directly inside the contractor\'s own corporate accounts, ensuring permanent data ownership.',
        hitl_oversight_mechanism: 'Automated weekly pipeline review ensures contractor staff remain comfortable managing day-to-day leads.',
        failure_safeguards: 'Full database backups scheduled weekly to prevent accidental data deletion.',
        outcomes_roi: '100% data independence; saved contractor $1,200/month in agency platform markup fees.',
        demo_video_url: 'https://www.skool.com/ai-marketing-for-contractors-4380/about',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },

  // 26. Veloxa Team
  {
    id: 'exp-26',
    slug: 'veloxa',
    full_name: 'Veloxa Practice',
    professional_title: 'Outdoor Trades AI Renewal & Speed-to-Lead Practice',
    agency_name: 'Veloxa',
    tagline: 'Speed-to-lead, photo+voice memo proposals, and seasonal renewal engines for outdoor trade contractors.',
    bio: 'Veloxa builds AI receptionist pipelines, speed-to-lead automations, and seasonal renewal engines for outdoor trade contractors including landscaping, pool service, and pest control. Their systems streamline proposal creation from on-site photo and voice memos, and automate seasonal re-booking for spring cleanups and pool openings.',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    city: 'Miami',
    state_region: 'FL',
    country: 'United States',
    timezone: 'America/New_York (EST)',
    website_url: 'https://veloxaagency.com/',
    booking_url: 'mailto:contact@veloxaagency.com',
    primary_engagement: 'fixed_sprint',
    starting_budget: '2500_to_5000',
    status: 'published',
    is_verified: true,
    verified_at: '2025-12-28T14:00:00Z',
    verified_case_study_count: 1,
    sponsor_rank: 0,
    is_demo: false,
    categories: [
      SEED_CATEGORIES[0], // Operations & Workflow Automation
      SEED_CATEGORIES[1], // Sales & Lead Qualification
    ],
    tools: [
      SEED_TOOLS[15], // GoHighLevel
      SEED_TOOLS[0],  // Make
      SEED_TOOLS[10], // Twilio
      SEED_TOOLS[3],  // OpenAI API
    ],
    case_studies: [
      {
        id: 'cs-veloxa-1',
        expert_id: 'exp-26',
        title: 'Seasonal Renewal Engine & Voice-Memo Proposal Generator for Outdoor Contractors',
        client_industry: 'Outdoor Services: Landscaping, Pool Opening & Pest Control',
        problem_statement: 'Contractors take notes and photos on their phones while surveying job sites, but delay drafting written estimates by several days after getting home exhausted.',
        solution_architecture: 'Mobile voice memo workflow where contractor records a 60-second audio description and uploads 3 site photos, automatically generating an itemized PDF estimate draft.',
        hitl_oversight_mechanism: 'Draft estimates are sent to the contractor via SMS for 1-tap approval before being delivered to the homeowner.',
        failure_safeguards: 'Pricing margins and minimum trip fees are hardcoded into the algorithm to prevent underbidding.',
        outcomes_roi: 'Same-day estimate delivery increased from 15% to 88%; boosted close rate by 28%.',
        demo_video_url: 'https://veloxaagency.com/',
        reviewer_confirmed: true,
        is_featured: false,
      },
    ],
  },
];

export const SEED_APPLICATIONS: Application[] = [];
