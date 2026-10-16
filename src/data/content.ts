/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — single source of truth
 * ─────────────────────────────────────────────────────────────
 *  Every fact on the site lives in this file, so it can be
 *  updated without touching any component code.
 *
 *  Sources: CV Resume Olesia Dmytrush.pdf, Olesia Dmytrush.pdf,
 *  Olesia_Dmytrush_Master_Resume_Updated.xlsx, QC/QA diploma.
 *  Nothing here is invented — if a link is empty it is simply
 *  hidden on the site.
 */

export const profile = {
  name: 'Olesia Dmytrush',
  firstName: 'Olesia',
  roles: ['IT Audit & Assurance', 'QA & Testing', 'Business Analysis'],
  location: 'Vernon Hills, Illinois',
  locationShort: 'Chicago area, IL',
  email: 'olesia.dmytrush@gmail.com',
  /** Leave empty to keep the phone number off the public site. */
  phone: '',
  links: {
    /** Add the full URL, e.g. https://www.linkedin.com/in/your-name — hidden while empty. */
    linkedin: '',
    /** Add the full URL, e.g. https://github.com/your-name — hidden while empty. */
    github: '',
  },
  resume: {
    href: 'resume/Olesia-Dmytrush-Resume.pdf',
    fileName: 'Olesia-Dmytrush-Resume.pdf',
  },
  openTo: ['QA Analyst / Software Tester', 'IT Risk / GRC Analyst', 'Business / Product Analyst'],
  workStyle: 'Remote or hybrid',
};

export const hero = {
  greeting: "Hi, I'm Olesia.",
  headline: ['I look for what', 'could go wrong\u00a0—', 'so it doesn’t.'],
  lede:
    'Former IT Audit & Assurance consultant at KPMG Poland. Today I’m the Product & Business Analyst Lead on a client technology project at i.c.stars Chicago — moving into QA, IT risk and business analysis.',
  backdropWords: ['AUDIT.', 'TEST.', 'ANALYZE.', 'CREATE.'],
};

/** Captions for the interactive character story in the hero. */
export const storyCaptions = {
  idleLeft: 'Morning plan: coffee, then CREATE.',
  idleRight: 'What could possibly go wrong?',
  idleCenter: 'Careful…',
  trip: 'Plot twist.',
  tripEnd: 'Incident logged.',
  kneelHint: 'She needs a moment. Try the left, the right — or the center.',
  lookLeft: 'Did anyone on the left see that?',
  lookRight: '…anyone on the right?',
  greet: ['Oh — hi, it’s you!', 'Hello · Cześć · Привіт'],
  spill: 'Watch the spill.',
  glow: 'Spills become skills.',
  final: 'Leadership · Problem-solving · Connection · Creativity · Resilience',
  cta: 'See the evidence',
};

export const about = {
  intro:
    'I started in economics and finance in Poland, then spent 2022–2024 at KPMG analyzing how business processes depend on IT systems — identifying IT risks, testing controls and documenting the evidence.',
  paragraphs: [
    'After moving to Illinois I learned a very different side of work: keeping around five real-estate professionals, their clients, lenders, attorneys and inspectors on the same page — while also producing their social content, videos, flyers and presentations.',
    'Today I’m at i.c.stars in Chicago, leading product and business analysis on a client project for Medline. The thread through all of it: I’m the person who asks “what could go wrong here?” — and then writes it down clearly enough for the whole team to act on.',
  ],
  facts: [
    { label: 'Based in', value: 'Vernon Hills, IL' },
    { label: 'Experience', value: 'IT audit · Banking · Real estate ops' },
    { label: 'Now', value: 'i.c.stars Chicago, 2026' },
    { label: 'Languages', value: 'UA · PL · RU · EN' },
  ],
  offClock: 'Off the clock: travel, sports and fitness, and making visual content.',
};

/** The five strengths from the character animation — each tied to real evidence. */
export const strengths = [
  {
    name: 'Leadership',
    evidence: 'Product & Business Analyst Lead on the i.c.stars Medline client project.',
  },
  {
    name: 'Problem-solving',
    evidence: 'Identified and analyzed IT risks and tested business and IT controls at KPMG.',
  },
  {
    name: 'Connection',
    evidence: 'Coordinated agents, clients, lenders, attorneys and inspectors — in a fourth language.',
  },
  {
    name: 'Creativity',
    evidence: 'Designs social posts, videos, flyers and presentations in Canva, Photoshop and CapCut.',
  },
  {
    name: 'Resilience',
    evidence: 'New country, new industry, new program — and still building.',
  },
];

export const approach = [
  {
    step: '01',
    title: 'Understand the process',
    text: 'Map how the work actually happens and where technology supports it — before judging anything.',
    source: 'KPMG process analysis · i.c.stars discovery meetings',
  },
  {
    step: '02',
    title: 'Find the risk',
    text: 'Ask what could fail, who it would affect and which control is supposed to catch it.',
    source: 'IT risk identification at KPMG',
  },
  {
    step: '03',
    title: 'Test, don’t assume',
    text: 'Check the evidence instead of trusting the assumption — controls, requirements, data.',
    source: 'Control testing · QC/QA training',
  },
  {
    step: '04',
    title: 'Make it clear',
    text: 'Document findings and present them so people who weren’t in the room can still act.',
    source: 'Audit documentation · client presentations',
  },
];

/* ───────────────────────── SKILLS / TRACEABILITY ───────────────────────── */

export type SourceId = 'kpmg' | 'icstars' | 'qa' | 'realestate' | 'bank' | 'study';

export const sources: { id: SourceId; label: string; short: string; detail: string }[] = [
  { id: 'kpmg', label: 'KPMG Poland', short: 'KPMG', detail: 'IT Audit & Assurance, 2022–2024' },
  { id: 'icstars', label: 'i.c.stars · Medline', short: 'i.c.stars', detail: 'Client project, 2026' },
  { id: 'qa', label: 'QC/QA course', short: 'QA course', detail: 'TOMMY Online University' },
  { id: 'realestate', label: 'Real estate', short: 'Real estate', detail: 'Illinois, 2024–present' },
  { id: 'bank', label: 'Getin Noble Bank', short: 'Bank', detail: 'Customer Advisor, 2020–2022' },
  { id: 'study', label: 'Degrees & training', short: 'Study', detail: 'SGH · KUL · courses' },
];

export type Level = 'professional' | 'applied' | 'foundational';

export const levelLabels: Record<Level, { label: string; hint: string }> = {
  professional: { label: 'Professional', hint: 'A core part of a professional role' },
  applied: { label: 'Applied', hint: 'Used hands-on in a project or role' },
  foundational: { label: 'Foundational', hint: 'Trained / basic, actively practicing' },
};

export type SkillGroup = {
  id: string;
  name: string;
  /** Where the skill is evidenced, and at what depth in that context. */
  skills: { name: string; sources: Partial<Record<SourceId, Level>>; note: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'risk',
    name: 'IT Risk & Assurance',
    skills: [
      {
        name: 'IT risk identification & analysis',
        sources: { kpmg: 'professional' },
        note: 'Identified and analyzed IT risk in business processes supported by IT systems.',
      },
      {
        name: 'Business & IT control testing',
        sources: { kpmg: 'professional' },
        note: 'Tested control mechanisms in business and IT areas.',
      },
      {
        name: 'Compliance review',
        sources: { kpmg: 'professional' },
        note: 'Analyzed IT solutions for compliance with legal regulations and good practices.',
      },
      {
        name: 'Audit evidence & documentation',
        sources: { kpmg: 'professional' },
        note: 'Documented audit evidence and findings for client engagements.',
      },
    ],
  },
  {
    id: 'qa',
    name: 'QA & Testing',
    skills: [
      {
        name: 'Test cases, checklists & defects',
        sources: { qa: 'foundational' },
        note: 'QC/QA Engineer course modules: test cases, checklists, defects, levels of testing, test-design techniques.',
      },
      {
        name: 'QA / QE input for an application',
        sources: { icstars: 'applied' },
        note: 'Supported QA/QE thinking for the Medline application concept.',
      },
      {
        name: 'API testing with Postman · JSON',
        sources: { qa: 'foundational' },
        note: 'Basic Postman and API/JSON familiarity from QA and IT-tester training.',
      },
      {
        name: 'SQL',
        sources: { qa: 'foundational', icstars: 'foundational' },
        note: 'Basic; actively practicing queries (databases module, i.c.stars coursework).',
      },
    ],
  },
  {
    id: 'ba',
    name: 'Business & Product Analysis',
    skills: [
      {
        name: 'Requirements gathering',
        sources: { icstars: 'applied' },
        note: 'Discovery meetings and documented requirements for a client technology project.',
      },
      {
        name: 'Workflow & persona materials',
        sources: { icstars: 'applied' },
        note: 'Workflow and persona materials for the Medline application concept.',
      },
      {
        name: 'Business-process analysis',
        sources: { kpmg: 'professional', icstars: 'applied' },
        note: 'Analysis of IT-supported business processes; client workflow analysis.',
      },
      {
        name: 'Presentations & storytelling',
        sources: { icstars: 'applied', realestate: 'professional' },
        note: 'Client presentations at i.c.stars; marketing presentations for real-estate agents.',
      },
    ],
  },
  {
    id: 'data',
    name: 'Data & Tools',
    skills: [
      {
        name: 'Analysis of large data sets',
        sources: { kpmg: 'professional' },
        note: 'Analyzed large data sets as part of audit and assurance work.',
      },
      {
        name: 'Microsoft Excel',
        sources: { kpmg: 'professional', study: 'applied' },
        note: 'Professional and academic use.',
      },
      {
        name: 'MS Office · PowerPoint · Word',
        sources: { kpmg: 'professional', icstars: 'applied', realestate: 'professional' },
        note: 'Everyday tools across consulting, project and coordination work.',
      },
    ],
  },
  {
    id: 'people',
    name: 'People & Communication',
    skills: [
      {
        name: 'Stakeholder coordination',
        sources: { kpmg: 'professional', icstars: 'applied', realestate: 'professional' },
        note: 'Agents, clients, lenders, attorneys, inspectors; client consulting; project team.',
      },
      {
        name: 'Client relationships & support',
        sources: { bank: 'professional', realestate: 'professional' },
        note: 'Long-term customer relationships and ongoing technical assistance at the bank.',
      },
      {
        name: 'Multilingual communication',
        sources: { bank: 'professional', kpmg: 'professional', icstars: 'applied', realestate: 'professional' },
        note: 'Ukrainian (native), Polish, Russian (fluent), English (professional).',
      },
    ],
  },
  {
    id: 'creative',
    name: 'Creative & Content',
    skills: [
      {
        name: 'Canva · Adobe Photoshop',
        sources: { realestate: 'applied' },
        note: 'Posts, flyers, presentations and branded marketing materials.',
      },
      {
        name: 'Video content · VN · CapCut',
        sources: { realestate: 'applied' },
        note: 'Videos promoting agents and their listings.',
      },
      {
        name: 'Marketing & sales strategy',
        sources: { study: 'foundational' },
        note: 'Marketing master’s studies; L’Oréal marketing & sales strategy course.',
      },
    ],
  },
];

export const toolbelt = [
  'Excel',
  'SQL',
  'Postman',
  'JSON / API',
  'Fiddler',
  'BlueStacks',
  'SPSS',
  'PowerPoint',
  'Word',
  'Canva',
  'Photoshop',
  'CapCut',
  'VN',
  'Aseprite',
];

/* ───────────────────────── EXPERIENCE ───────────────────────── */

export type Role = {
  period: string;
  title: string;
  org: string;
  place: string;
  current?: boolean;
  summary: string;
  bullets: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    period: 'Aug 2026 — Dec 2026',
    title: 'Product & Business Analyst Lead · Client project',
    org: 'i.c.stars Chicago',
    place: 'Chicago, IL',
    current: true,
    summary:
      'Technology and leadership program. Team-based client technology project for Medline, translating a business problem into an application concept.',
    bullets: [
      'Lead product and business-analysis contributions for the team.',
      'Participate in client discovery meetings and document requirements and workflow ideas.',
      'Contribute to web/application design and QA/QE thinking for the application.',
      'Create and refine client-facing presentation materials.',
    ],
    tags: ['Business analysis', 'Requirements', 'QA mindset', 'Presentations'],
  },
  {
    period: 'Apr 2026 — Present',
    title: 'Marketing & Administrative Coordinator',
    org: 'Self-employed',
    place: 'Illinois',
    current: true,
    summary:
      'Independent administrative, marketing and client support for real-estate agents.',
    bullets: [
      'Manage calls, emails, texts, appointments, schedules, reminders and client documents.',
      'Coordinate communication between agents, clients, lenders, attorneys and inspectors.',
      'Create social media posts, videos, flyers and presentations for agents and listings.',
    ],
    tags: ['Coordination', 'Content', 'Canva', 'Video'],
  },
  {
    period: 'Oct 2024 — Apr 2026',
    title: 'Real Estate Administrative Assistant / Marketing Coordinator',
    org: 'Real estate industry',
    place: 'Illinois',
    summary:
      'Supported around five real-estate professionals across administration, client service, marketing and transaction coordination.',
    bullets: [
      'Managed calendars and appointments; sent reminders and documents; followed up with clients.',
      'Managed Instagram and Facebook content; created flyers, presentations and videos.',
      'Supported listing promotion, online visibility and transaction coordination.',
    ],
    tags: ['Transaction support', 'Instagram', 'Facebook', 'Photoshop'],
  },
  {
    period: '2022 — 2024',
    title: 'Consultant — IT Audit and Assurance',
    org: 'KPMG Poland',
    place: 'Poland',
    summary:
      'Professional-services engagements evaluating IT-supported business processes, technology risk, controls and compliance.',
    bullets: [
      'Analyzed business processes supported by IT systems.',
      'Identified and analyzed IT risk; reviewed IT solutions for compliance with regulations and good practices.',
      'Tested control mechanisms in the business and IT areas.',
      'Analyzed large data sets and documented audit evidence and findings.',
    ],
    tags: ['IT audit', 'IT risk', 'Control testing', 'Compliance', 'Data analysis'],
  },
  {
    period: '2020 — 2022',
    title: 'Customer Advisor',
    org: 'Getin Noble Bank S.A.',
    place: 'Poland',
    summary: 'Client-facing role in financial services.',
    bullets: [
      'Maintained long-term relationships with customers.',
      'Presented the bank’s products and services and maintained a positive company image.',
      'Provided ongoing technical assistance and customer support.',
    ],
    tags: ['Financial services', 'Customer support', 'Relationships'],
  },
];

/* ───────────────────────── PROJECTS ───────────────────────── */

export type Project = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  role: string;
  period: string;
  status: string;
  challenge: string;
  goal: string;
  did: string[];
  deliverables: string[];
  outcome: string;
  whyItMatters: string;
  tags: string[];
  confidential?: string;
  visual: 'pipeline' | 'controls' | 'hub';
};

export const projects: Project[] = [
  {
    id: 'medline',
    index: '01',
    kicker: 'i.c.stars Chicago · Client project',
    title: 'Medline client application concept',
    role: 'Product & Business Analyst Lead',
    period: 'Aug 31 — Dec 4, 2026',
    status: 'In progress',
    challenge:
      'The team needed to understand a client problem, organize requirements, shape an application concept and present the solution clearly.',
    goal: 'Translate the client’s needs into understandable requirements, workflows and a practical application concept.',
    did: [
      'Led the product and business-analysis contributions for the team.',
      'Helped organize requirements and workflow ideas from discovery meetings.',
      'Contributed to web/application design and supported QA/QE thinking for the application.',
      'Created and refined client-facing presentation materials and solution storytelling.',
    ],
    deliverables: [
      'Client presentations',
      'Workflow & persona materials',
      'Application / web design concepts',
      'QA / QE design input',
      'Project documentation',
    ],
    outcome:
      'Client-facing project materials, and hands-on experience in business analysis, QA-oriented thinking, solution design and team leadership.',
    whyItMatters:
      'This is where audit habits meet product work: requirements are the controls of a project — if they’re unclear, everything downstream breaks.',
    tags: ['Business analysis', 'Product thinking', 'Requirements', 'QA mindset', 'Teamwork'],
    visual: 'pipeline',
  },
  {
    id: 'kpmg',
    index: '02',
    kicker: 'KPMG Poland · IT Audit & Assurance',
    title: 'Testing the controls behind business processes',
    role: 'Consultant',
    period: '2022 — 2024',
    status: 'Completed',
    challenge:
      'Client business processes depended on IT systems — and needed an independent assessment of risk, controls and compliance.',
    goal: 'Evaluate whether IT-related controls and processes were designed and operating appropriately.',
    did: [
      'Analyzed business processes supported by IT systems.',
      'Identified and analyzed IT risks.',
      'Reviewed IT solutions for compliance with legal regulations and good practices.',
      'Tested control mechanisms in business and IT areas, and analyzed large data sets.',
      'Documented audit evidence and findings for the engagement.',
    ],
    deliverables: ['Risk analysis', 'Control-testing documentation', 'Audit evidence & findings'],
    outcome:
      'Structured analysis that supported audit and assurance work and helped evaluate whether IT-related controls and processes were operating appropriately.',
    whyItMatters:
      'Control testing is testing: define the expected behavior, gather evidence, compare, and document the gap. It’s the same loop QA runs on software.',
    tags: ['IT audit', 'IT risk', 'Control testing', 'Compliance', 'Excel', 'Documentation'],
    confidential: 'Client names and engagement details are confidential.',
    visual: 'controls',
  },
  {
    id: 'realestate',
    index: '03',
    kicker: 'Real estate · Illinois',
    title: 'Keeping multi-party transactions on track',
    role: 'Administrative Assistant / Marketing Coordinator → Freelance',
    period: 'Oct 2024 — Present',
    status: 'Ongoing',
    challenge:
      'Real-estate transactions involve many people and documents — and agents also needed consistent, professional content to promote their listings.',
    goal: 'Keep every party informed and every document on time, while giving agents a steady stream of branded marketing.',
    did: [
      'Supported around five real-estate professionals with administration and client service.',
      'Managed calls, emails, texts, calendars, appointments, reminders and documents.',
      'Coordinated communication among clients, agents, lenders, attorneys and inspectors.',
      'Created social posts, videos, flyers and presentations to promote agents and listings.',
    ],
    deliverables: ['Social media content', 'Listing flyers & presentations', 'Short-form videos', 'Scheduling & follow-up system'],
    outcome:
      'Multi-party real-estate activities kept organized through scheduling, follow-up, document handling and clear communication — alongside branded marketing content.',
    whyItMatters:
      'Same instincts as testing: track every open item, follow up until it’s closed, and document what happened.',
    tags: ['Coordination', 'Client service', 'Canva', 'Photoshop', 'Video', 'Documentation'],
    visual: 'hub',
  },
];

/* ───────────────────────── JOURNEY ───────────────────────── */

export const journey = [
  {
    year: '2015',
    place: 'Lublin, Poland',
    title: 'Economics & marketing studies',
    text: 'The John Paul II Catholic University of Lublin — Bachelor’s and Master’s in Economics; Master’s in Marketing (2016–2020).',
    kind: 'study',
  },
  {
    year: '2020',
    place: 'Warsaw, Poland',
    title: 'Master’s in Finance & Accounting',
    text: 'SGH Warsaw School of Economics (2020–2022) — while starting in financial services as a Customer Advisor at Getin Noble Bank.',
    kind: 'study',
  },
  {
    year: '2022',
    place: 'Poland',
    title: 'KPMG — IT Audit & Assurance',
    text: 'Consultant testing controls, analyzing IT risk and reviewing compliance for client engagements.',
    kind: 'work',
  },
  {
    year: '2024',
    place: 'Illinois, USA',
    title: 'New country, new industry',
    text: 'Moved to the U.S. and began coordinating real-estate operations and marketing — completing ESL training along the way.',
    kind: 'move',
  },
  {
    year: '2026',
    place: 'Chicago, IL',
    title: 'i.c.stars Chicago',
    text: 'Technology and leadership program — Product & Business Analyst Lead on a client project for Medline.',
    kind: 'work',
  },
  {
    year: 'Next',
    place: 'Remote or hybrid',
    title: 'QA · IT Risk · Business Analysis',
    text: 'Looking for a team where careful testing, risk thinking and clear communication make the product better.',
    kind: 'next',
  },
] as const;

export const credentials = [
  {
    title: 'QC/QA Engineer',
    issuer: 'TOMMY Online University',
    detail:
      'IT methodologies, test cases, checklists, defects, testing types & levels, test-design techniques, requirements, metrics, versions, performance evaluation, databases, API.',
    hasDiploma: true,
  },
  { title: 'Marketing & Sales Strategy', issuer: 'L’Oréal', detail: 'Developing a winning marketing and sales strategy.' },
  { title: 'Content Specialist', issuer: 'Practima online university', detail: 'Content creation and digital communication.' },
  { title: 'IT & Data Analysis Training', issuer: '', detail: 'Data analysis and IT concepts.' },
];

export const education = [
  { years: '2020 — 2022', degree: 'Master’s, Finance and Accounting', school: 'SGH Warsaw School of Economics' },
  { years: '2016 — 2020', degree: 'Master’s, Marketing', school: 'The John Paul II Catholic University of Lublin' },
  { years: '2015 — 2020', degree: 'Bachelor’s and Master’s, Economics', school: 'The John Paul II Catholic University of Lublin' },
];

export const languages = [
  { name: 'Ukrainian', level: 'Native', hello: 'Привіт' },
  { name: 'Polish', level: 'Fluent', hello: 'Cześć' },
  { name: 'Russian', level: 'Fluent', hello: 'Привет' },
  { name: 'English', level: 'Professional', hello: 'Hello' },
];

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];
