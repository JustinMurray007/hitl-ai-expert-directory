export const GUIDE_DATE = '2026-11-13';

export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
}

export const GUIDES: Guide[] = [
  {
    slug: 'ai-consultant-cost',
    title: 'How much does an AI consultant cost?',
    description:
      'Hourly and project ranges published by Upwork, ZipRecruiter, and Clutch, read on November 13, 2026, and how they differ from a $49.99 introduction.',
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'There is no single AI consultant price. On November 13, 2026, Upwork’s hiring page said freelance AI consultants on that marketplace generally run $35 to $60 an hour, with the most experienced people at $100 an hour or more. ZipRecruiter’s salary page, dated the same day, put the average U.S. AI consultant pay at $86,430 a year, about $41.55 an hour, which is an employed role rather than a freelance invoice. Clutch’s AI consulting directory, with ratings updated November 11, 2026, shows firm rates one profile at a time: Azumo listed $25 to $49 an hour and a $10,000 minimum, and ISBX Corp listed $150 to $199 an hour and a $25,000 minimum.',
          'Those three sources are measuring different things. An hourly freelance range, a salary converted to an hour, and two firm profiles will not line up, and none of them is a quote for your job. Find AI Pros charges $49.99 for a concierge introduction. That fee is not the consultant’s project price.',
        ],
      },
      {
        heading: 'Hourly rates, and what each site is counting',
        paragraphs: [
          'Upwork’s page, titled for November 2026, says hiring an AI consultant there generally ranges from $35 to $60 per hour, similar to AI engineers, and that the most experienced consultants charge $100 per hour or more. The page also shows individual freelancers with posted rates well below that band, including profiles at $10, $15, and $20 an hour. Treat the $35 to $60 sentence as Upwork’s summary, not as a floor that every profile respects.',
          'ZipRecruiter says that as of November 13, 2026 the average annual pay for an AI consultant in the United States is $86,430, which it converts to about $41.55 an hour, $1,662 a week, or $7,202 a month. The same page says the majority of salaries currently range between $61,000 (25th percentile) and $103,000 (75th percentile), with the 90th percentile at $151,500. A nearby job on that page, an on-site AI agentic architect, was posted at $60 an hour. That single posting is an example, not an average.',
          'Clutch does not publish one hourly band for the whole directory on the page that was read. It lists each company’s average hourly rate and minimum project size. Azumo, in San Francisco, with a 4.9 rating from 27 reviews, shows $25 to $49 an hour and a $10,000+ minimum. ISBX Corp, in Los Angeles, with a 5 rating from 14 reviews, shows $150 to $199 an hour and a $25,000+ minimum. Using either number as “the Clutch rate” would misread the page.',
          'Glassdoor and Indeed did not load on November 13, 2026, so this guide does not include their salary figures.',
        ],
      },
      {
        heading: 'Project ranges Upwork actually published',
        paragraphs: [
          'The same Upwork page publishes four project bands. An AI readiness audit is $1,500 to $4,000. An AI strategy and roadmap is $4,000 to $10,000. A proof of concept build is $8,000 to $20,000. Ongoing advisory and deployment is $3,000 to $12,000. Upwork describes the readiness audit as a data and infrastructure review, a use-case shortlist, and a readiness scorecard. The strategy row is a prioritized use-case list, an implementation roadmap, and a budget and KPI plan. The proof of concept is a working prototype, model evaluation, and a deployment recommendation. Ongoing advisory covers model fine tuning, performance monitoring, and team training.',
          'A strategy engagement maps cleanly onto the $4,000 to $10,000 row, because that is the label Upwork used. A small automation might fit the readiness audit if you only want a written plan, or the proof-of-concept row if you want something that runs. This guide does not assign a separate dollar range to a chatbot or a voice receptionist. None of the pages read on November 13, 2026 published one. Inventing a “typical voice agent is $X” figure would be a guess.',
          'Clutch’s minimums are another way firms talk about project size. Azumo’s $10,000 minimum and ISBX’s $25,000 minimum are entry points those two profiles chose to display. They are not the price of a finished system, and other firms on the same directory show average project costs from under $10,000 to well into six figures. The page is a list, not a survey with a single median.',
        ],
      },
      {
        heading: 'How to use the ranges without treating them as a bid',
        paragraphs: [
          'Start by deciding whether you are buying time or a finished outcome. An hourly rate from Upwork tells you what a freelancer lists. It does not tell you how many hours the work will take. A $50 an hour consultant who needs 40 hours is $2,000. The same rate over 200 hours is $10,000. The project bands are more useful when the deliverable matches the row: a written roadmap is not a deployed phone system.',
          'Ask whoever you talk to which of those deliverables they are pricing. A readiness audit that ends in a document is a different purchase from a proof of concept that has to run on your data. If the scope is “make the phones get answered,” that is not one of Upwork’s four labeled rows, so you should expect a custom number rather than forcing the work into the $1,500 to $4,000 audit band.',
          'The employed salary from ZipRecruiter is a poor stand-in for a project invoice. $86,430 a year is what the site estimates an AI consultant job pays, including the conversion to $41.55 an hour. A freelancer billing $41.55 an hour does not have the same overhead, and a firm billing $150 to $199 an hour is selling a team, not a salary. Put the three numbers in separate columns when you compare them.',
          'Find AI Pros is a directory plus a $49.99 introduction. The cost guide at /ai-consultant-cost repeats the third-party ranges above and links each source. After you have a range in mind, you can browse /experts or pay for the match. You do not have to hire anyone you meet.',
        ],
      },
      {
        heading: 'What to put next to the number',
        paragraphs: [
          'A useful proposal names the system, the accounts you will own, the deadline, and what “done” means. For a strategy engagement, done might be the roadmap Upwork describes: prioritized use cases, an implementation sequence, and a budget. For a proof of concept, done is a working prototype plus a recommendation about whether to deploy it. For ongoing advisory, done is a period of monitoring and training, which is why that row is a range rather than a single build price.',
          'Write down who will operate the system after the consultant leaves. A phone workflow, a CRM automation, and a one-time audit have different handoff needs. The price should say whether training and a written operating note are inside the fee. If they are not, the $3,000 to $12,000 advisory row is a reminder that support is often priced separately from the first build.',
          'If two proposals are far apart, check the scope before you decide one person is expensive. A $4,000 strategy and a $20,000 prototype can both sit inside Upwork’s published table. They are not competing bids for the same thing.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What hourly range did Upwork publish?',
        answer:
          'On the AI consultants hiring page read November 13, 2026, Upwork said $35 to $60 an hour in general, and $100 an hour or more for the most experienced consultants.',
      },
      {
        question: 'Is ZipRecruiter’s $41.55 an hour a freelance rate?',
        answer:
          'No. ZipRecruiter presents it as the hourly equivalent of an $86,430 average annual salary for an AI consultant job in the United States, as of November 13, 2026.',
      },
      {
        question: 'Does the $49.99 match include the project?',
        answer: 'No. It pays for introductions. The project price is separate.',
      },
    ],
  },
  {
    slug: 'hire-ai-consultant-small-business',
    title: 'How to hire an AI consultant for a small business',
    description:
      'A practical way for a small business to define the job, compare public price ranges, and use a directory or a $49.99 introduction.',
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'Write down the job, the tools you already pay for, and the result you want, then compare that brief with public price ranges and with people who say they do that work. On November 13, 2026, Upwork’s AI consultant page put a general freelance hourly band at $35 to $60, with experienced people at $100 or more, and published project bands from a $1,500 to $4,000 readiness audit up to an $8,000 to $20,000 proof of concept. Find AI Pros lets you browse profiles by industry, category, and city, or pay $49.99 to be introduced to at least three people within 48 hours. You do not have to hire any of them.',
        ],
      },
      {
        heading: 'Name the job before you name a person',
        paragraphs: [
          'Small businesses usually do not need “an AI person” in the abstract. They need a phone answered, a lead followed up, a spreadsheet stopped, or a decision about whether a tool is worth buying. Those are different projects, and the public price tables split them up. Upwork’s readiness audit is a review and a shortlist. The strategy and roadmap row, $4,000 to $10,000, is a plan with a budget and measures. The proof of concept, $8,000 to $20,000, is a working prototype. If you cannot say which of those you want, you will get proposals that are not comparable.',
          'Write one paragraph that a stranger could price. Include the volume (calls a day, leads a week, invoices a month), the software you already use, and what must not happen. “Do not book a job outside our service area” is a requirement. “Make us more efficient” is not. The paragraph is also what you would paste into a concierge match form.',
          'Industry pages on this site group common bottlenecks by business type, from dental offices to contractors to shops. Start there if you are not sure which category name matches your problem. The category hubs then list people who tagged that kind of work and the tools they use. That list is not an average this site calculated, and it is not one of the Upwork rows.',
        ],
      },
      {
        heading: 'Where to look, and what each place is',
        paragraphs: [
          'A freelance marketplace, a firm directory, a salary site, and this directory answer different questions. Upwork is a place to hire an individual and to read the rate guide quoted above. Clutch is a directory of firms. On November 11, 2026 its AI consulting list showed Azumo at $25 to $49 an hour with a $10,000 minimum and ISBX Corp at $150 to $199 an hour with a $25,000 minimum. ZipRecruiter, as of November 13, 2026, was estimating what an employed AI consultant is paid: $86,430 a year on average, about $41.55 an hour. Hiring an employee is a different decision from hiring a project.',
          'Find AI Pros is a listing site. Experts can list free for 30 days and then pay a flat monthly fee of $9.99, $29.99, or $59.99. The site does not take a commission on the work. Buyers can browse for free. The paid buyer product is the $49.99 match, which is an introduction, not a build. If you only need to see who says they work in your city or your trade, start with /experts, /locations, or the industry page. If you would rather describe the job once and get names back, use the match.',
          'None of these sites replaces the conversation about scope. A profile, a Clutch card, and an Upwork rate are advertisements of a range. The proposal is the document that says what you will get for a specific number.',
        ],
      },
      {
        heading: 'A short hiring sequence',
        paragraphs: [
          'First, pick the Upwork-style deliverable that matches your brief: audit, roadmap, prototype, or ongoing help. If none of them match, say so in the brief and expect a custom price. Second, decide the ceiling you can spend before you like anyone. A ceiling stops a $20,000 prototype conversation when you only budgeted for a $4,000 plan. Third, look at two or three people or firms whose public materials mention your tools and your kind of business. On this directory that means category, tools, and city. On Clutch it means the hourly band, the minimum, and the services mix the firm lists.',
          'Fourth, ask each person to restate the job in their own words and to price one deliverable. If one proposal is a roadmap and another is a deployed system, you are not choosing between two prices for the same thing. Fifth, ask what you will own when they stop: the accounts, the phone numbers, the workflows, and a short note on how to change them. That question is about the handoff of the work, not about a badge on a directory.',
          'Sixth, decide. You can hire no one. The match fee, if you paid it, purchased introductions. It does not obligate a contract. If the proposals are all above the ceiling, shrink the deliverable to the audit row and learn from that before you fund a prototype.',
        ],
      },
      {
        heading: 'What a small business can skip',
        paragraphs: [
          'You do not need a salary survey to hire a project. ZipRecruiter’s $41.55 figure is useful only if you are considering an employee. You also do not need every tool in a category’s “typical stack.” The stack is a list of software people often use for that job. Your shortlist should be the tools you already have, plus whatever the proposal says it will add.',
          'You do not need a dozen vendors. Two or three comparable proposals are enough to see whether your brief is clear. If the prices differ by a factor of five, the brief is probably still ambiguous. Fix the brief before you add more names.',
          'Keep the public ranges next to the proposals, with the date you read them. Upwork, ZipRecruiter, and Clutch change their pages. The figures in this guide were read on November 13, 2026, except the Clutch ratings line, which the directory itself dated November 11, 2026. If you read them later, use the live pages rather than this article.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Should a small business start with an audit or a build?',
        answer:
          'If you cannot name the workflow, Upwork’s readiness audit row ($1,500 to $4,000) is the smaller published step. A proof of concept is the $8,000 to $20,000 row and assumes you want a working prototype.',
      },
      {
        question: 'What does Find AI Pros charge the business?',
        answer:
          'Browsing is free. Concierge Match is $49.99 for at least three introductions within 48 hours. The consultant’s fee is separate.',
      },
      {
        question: 'Do I have to hire someone local?',
        answer:
          'No. City pages list people who put that city on a profile. People in other cities can still do the work. The location pages say that remote experts can serve your city.',
      },
    ],
  },
  {
    slug: 'ai-voice-receptionist-local-business',
    title: 'AI voice receptionist for a local business',
    description:
      'What an AI phone receptionist is expected to do for a local business, which tools show up on this directory, and which prices were not published.',
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'An AI voice receptionist is a phone system that answers calls, asks a few questions, and can book or text, instead of sending every caller to voicemail. On this directory, the sales and lead category describes that job as answering, qualifying, booking, and texting back missed calls, and it names Retell, Vapi, Bland, and Twilio as tools people in that category use. This article does not give a price for that build. The Upwork, ZipRecruiter, and Clutch pages read on November 13, 2026 did not publish a voice-receptionist project range, so none is invented here.',
        ],
      },
      {
        heading: 'What the phone workflow usually includes',
        paragraphs: [
          'Local businesses lose calls when the owner is on a job, in a treatment room, or with another customer. The workflow people ask for is straightforward: pick up, find out what the caller wants, and either book a time or hand the caller a next step they can see, such as a text. The category page on this site describes the experts there as building on voice platforms and transferring urgent or unclear calls to a person. That is a product description of the category, not a test this site ran on every listing.',
          'The tools named on that page do different parts of the job. Twilio is the phone network layer many systems sit on. Vapi, Retell, and Bland are voice-agent products. A proposal should say which of those, if any, it will use, and whose account the phone number will live in. If the number stays in the consultant’s account, you do not control it when the contract ends. Ask that question before you compare prices.',
          'A voice project is not the same document as a strategy roadmap. Upwork’s strategy row, $4,000 to $10,000, is a plan: use cases, a sequence, and a budget. Its proof-of-concept row, $8,000 to $20,000, is a working prototype. A receptionist that answers your real number is closer to a deployed system than to a slide deck, but this guide will not relabel either Upwork row as “the voice agent price.” If a consultant quotes you, ask which deliverable the number buys: a demo on their number, or your number, your calendar, and a written note on how to change the questions.',
        ],
      },
      {
        heading: 'What to specify so the quotes match',
        paragraphs: [
          'Count the calls. A shop that misses three calls a week and a clinic that misses thirty are different builds, even if both say “receptionist.” Write the hours you want covered, the questions the caller should be asked, and the appointments that are allowed to be booked without a person. Also write the calls that should not be handled by the software: emergencies, billing disputes, or anything you want a person to hear first.',
          'Name the calendar or CRM the booking has to land in. A voice agent that sends you an email is a different system from one that writes into the software your front desk already uses. The tools directory on this site has separate pages for voice products and for CRMs such as HubSpot, Zoho, and GoHighLevel. You do not need all of them. You need the ones in the proposal.',
          'Decide what “text back” means. Some businesses want a text when a call is missed. Some want a text that offers two appointment times. Those are different messages and different failure modes. Put the exact message, or a close draft, in the brief so you are not paying for a surprise script.',
        ],
      },
      {
        heading: 'How this directory fits',
        paragraphs: [
          'Open the sales and lead category if the job is inbound calls and follow-up. Open the home-services industry page if you are a contractor, or the healthcare industry page if you are a clinic. The pages list people who selected those categories and the tools they use. That list is not a market study, and it is not a substitute for the Upwork bands, which cover audits, roadmaps, prototypes, and advisory rather than a named voice product.',
          'If you do not want to browse, Concierge Match is $49.99 and introduces at least three people within 48 hours after you describe the process and the tools. You can decline all of them. The match does not include the phone build.',
          'Experts who list here pay a flat fee after 30 free days: $9.99, $29.99, or $59.99 a month, with no commission on the client work. That fee is how the directory is paid. It is not a rating of the phone system they will build for you. Read the profile, ask for the scope in writing, and compare it with at least one other proposal.',
        ],
      },
      {
        heading: 'Questions that change the price',
        paragraphs: [
          'Who owns the phone number and the voice-platform account? How are after-hours calls treated? What happens when the caller asks for a person? Which calendar is written to? What is included after launch: a week of changes, or a separate support fee? Those questions do not require a published “average voice agent” price. They stop you from comparing a demo with a system that answers your line.',
          'If someone gives you a single number with no scope, ask them to map it to a deliverable you can recognize: a written recommendation, a prototype on a test number, or a launch on your number. You can then see whether it even sits near Upwork’s audit, roadmap, or prototype bands. If it does not, that is fine. It means the work is a custom scope, and the public table was never going to price it.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much does an AI receptionist cost?',
        answer:
          'This guide does not state a price. The Upwork, ZipRecruiter, and Clutch pages read on November 13, 2026 did not publish a voice-receptionist project range.',
      },
      {
        question: 'Which tools does the directory mention for this job?',
        answer:
          'The sales and lead category page names Retell, Vapi, Bland, and Twilio as a typical stack for call answering and follow-up. A proposal may use a different set.',
      },
      {
        question: 'Does the $49.99 match build the receptionist?',
        answer: 'No. It pays for introductions within 48 hours. The build is a separate agreement.',
      },
    ],
  },
  {
    slug: 'ai-consultant-vs-freelance-marketplace',
    title: 'AI consultant vs a freelance marketplace',
    description:
      'How Upwork’s published rates, Clutch firm cards, ZipRecruiter salaries, and a flat-fee directory differ when you are hiring AI help.',
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'A freelance marketplace, a firm directory, a salary site, and Find AI Pros are not the same product. Upwork, on the page read November 13, 2026, publishes both a freelance hourly summary ($35 to $60 an hour in general, $100 or more for the most experienced) and project bands from $1,500 to $20,000 depending on the row. Clutch lists firms with their own hourly rates and minimums. ZipRecruiter estimates employee pay. Find AI Pros lists consultants for a flat fee paid by the expert and charges a business $49.99 if that business wants introductions. Pick the place that matches the decision you are making.',
        ],
      },
      {
        heading: 'What you are looking at on each site',
        paragraphs: [
          'On Upwork you are looking at individuals who set a rate and at Upwork’s own hiring guide. The guide’s project table is specific: readiness audit $1,500 to $4,000, strategy and roadmap $4,000 to $10,000, proof of concept $8,000 to $20,000, ongoing advisory $3,000 to $12,000. The page also says 89% of first-time clients complete a contract. That statistic is about clients finishing a contract on Upwork, not about the quality of an AI system. The page tells readers that rates vary and that they should confirm current numbers, which is why this article dates the reading.',
          'On Clutch you are looking at companies. The AI consulting directory updated ratings on November 11, 2026. Azumo’s card showed $25 to $49 an hour, a $10,000+ minimum, 50 to 249 employees, and a services mix that includes AI consulting and AI development. ISBX Corp’s card showed $150 to $199 an hour and a $25,000+ minimum. The page also says Clutch may earn a fee for some placements. A firm card is a sales profile with reviews, not a bid.',
          'On ZipRecruiter you are looking at pay for a job title. As of November 13, 2026 the AI consultant average was $86,430 a year, about $41.55 an hour, with a stated majority range of $61,000 to $103,000. Use that when you are deciding whether to hire an employee. Do not subtract it from a freelancer’s project quote and call the difference savings. The overhead, the hours, and the deliverable are different.',
          'On Find AI Pros you are looking at listings. Experts pay $9.99, $29.99, or $59.99 a month after 30 free days, and the site does not take a commission on their client work. You can browse by category, tool, and city. The $49.99 match is optional. It introduces at least three people within 48 hours. It does not rank them, and it does not set their project price.',
        ],
      },
      {
        heading: 'When a marketplace is the simpler tool',
        paragraphs: [
          'If you already know you want one freelancer, a marketplace is built for that. You can read a rate, post a job, and use the project bands as a sanity check on the shape of the work. A $2,000 request that is really a proof of concept is outside Upwork’s $8,000 to $20,000 prototype row, so either the scope is smaller than a prototype or the budget is short. That comparison is the useful part of the table.',
          'If you want a firm with a stated minimum, Clutch’s cards show the minimum before you book a call. A $10,000 minimum and a $25,000 minimum tell you not to send a $1,500 audit request to those two companies and expect the card’s hourly rate to apply. The hourly rate and the minimum are both on the card. Read both.',
          'If you want someone on payroll, stop shopping freelance rates and read a salary page. ZipRecruiter’s $41.55 an hour is the figure to put next to a job offer, along with the annual range, not next to a two-week automation.',
        ],
      },
      {
        heading: 'When a directory is the simpler tool',
        paragraphs: [
          'If you want to see who already says they work with your kind of business, a directory is a filter. Industry pages and category pages on this site are those filters. You are not posting a job into a feed. You are reading profiles that list tools, then contacting people or paying for an introduction.',
          'The economic difference for the expert is the fee structure. A flat monthly listing fee is not a percentage of the project. This article does not state what percentage any marketplace keeps, because that number was not on the pages read on November 13, 2026. What this site charges experts is on the apply and for-experts pages: 30 free days, then the three monthly prices above, with no commission on the work.',
          'The economic difference for you is mostly time. Browsing is free and slower if you do not know the category. The match is $49.99 and faster if your brief is clear. Neither one is a substitute for a written scope. A directory introduction and an Upwork contract can both end in a bad fit if the deliverable was never named.',
        ],
      },
      {
        heading: 'A way to choose without mixing the numbers',
        paragraphs: [
          'Write the deliverable in one line. If it matches an Upwork row, write that row’s range next to it, with the date you read it. If it is a voice receptionist, a chatbot, or another job those pages did not price, leave that cell blank rather than borrowing the audit price. Then get one or two proposals. Put the proposal next to the public range only when the deliverables match.',
          'Decide the channel second. Marketplace if you want to hire a freelancer in that product. Firm directory if you want a company and can meet its minimum. Salary site if you want an employee. This directory if you want to filter listings or pay $49.99 for names. You can use more than one. Just do not average a salary, a firm hourly rate, and a project band into a single “fair price.” They are not the same unit.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Upwork’s $35 to $60 an hour the price of a project?',
        answer:
          'No. It is the hourly summary on Upwork’s AI consultant hiring page. The same page lists separate project bands for an audit, a roadmap, a proof of concept, and ongoing advisory.',
      },
      {
        question: 'Does Find AI Pros take a cut of the project?',
        answer: 'No. Experts pay a flat listing fee. The business pays $49.99 only if it wants the match.',
      },
      {
        question: 'Which number is an employee salary?',
        answer:
          'ZipRecruiter’s $86,430 a year, about $41.55 an hour, as of November 13, 2026. The Upwork and Clutch figures cited here are freelance or firm rates.',
      },
    ],
  },
];

export function guideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
