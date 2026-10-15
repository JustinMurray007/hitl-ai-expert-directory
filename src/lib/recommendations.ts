export interface IndustryRecommendation {
  id: string;
  industrySlug: string;
  industryName: string;
  industryDescription: string;
  iconName: string;
  commonBottlenecks: {
    id: string;
    label: string;
    description: string;
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
  }[];
}

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
          title: '24/7 Conversational Voice Receptionist with Live SIP Forwarding',
          problemSolved: 'Eliminates missed patient appointments and captures urgent procedures with zero wait time.',
          systemArchitecture: 'Voice AI agent (Vapi/Retell) trained on clinic FAQs, insurance carriers, and appointment scheduling via Twilio SIP trunking.',
          hitlSafeguard: 'Real-time symptom severity analyzer: acute pain, trauma, or bleeding immediately triggers a warm SIP transfer to the on-call doctor with a live transcript pop-up.',
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
          systemArchitecture: 'Claude 3.5 Sonnet extraction pipeline checking EHR session notes against CMS/CPT billing tables on Supabase.',
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
          title: 'Instant Lead Enrichment & High-Ticket Triage Pipeline',
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
];
