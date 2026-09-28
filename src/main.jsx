import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleGauge,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Layers3,
  Library,
  Lightbulb,
  Lock,
  Mail,
  Menu,
  Network,
  Play,
  Puzzle,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
  X,
  Zap
} from 'lucide-react';
import './styles.css';

const siteUrl = 'https://aipe.uk';
const learnerAccessStorageKey = 'aipeLearnerAccess';
const rememberedLearnerAccessStorageKey = 'aipeRememberedLearnerAccess';

const routes = {
  '/': {
    title: 'AIPE | Training, Partnerships and AI Consultancy',
    description:
      'Choose the right AIPE route for training and provider partnerships, or AI consultancy, automation and practical AI systems.'
  },
  '/ai-consultancy': {
    title: 'AI Consultancy and Automation | AIPE',
    description:
      'AIPE helps individuals learn AI, helps teams adopt it safely, and helps organisations reduce repetitive work with practical AI systems.'
  },
  '/learn': {
    title: 'AI Training UK and Adult Digital Skills | AIPE',
    description:
      'Explore practical AI training UK, adult digital skills, AI for jobseekers, cyber safety, workplace productivity and learner support.'
  },
  '/adult-learning': {
    title: 'Online Adult Learning, AI and Digital Skills | AIPE',
    description:
      'AIPE supports online adult learning, adult digital skills, ESOL digital skills, AI for jobseekers and cybersecurity awareness in plain English.'
  },
  '/courses': {
    title: 'AIPE Courses | AI Training UK, ESOL Digital Skills and Cyber Safety',
    description:
      'Practical course outlines for AI training UK, adult digital skills, ESOL digital skills, AI for jobseekers, cybersecurity awareness and workplace AI productivity.'
  },
  '/learner-ai': {
    title: 'Learner Login | AIPE',
    description:
      'Sign in to the AIPE learner platform for lessons, assessments, progress, tutor feedback and completion records.'
  },
  '/lms': {
    title: 'Learner Portal Preview | AIPE',
    description:
      'Preview the AIPE learner portal for courses, lessons, assessments, progress, tutor feedback and completion records.'
  },
  '/admin': {
    title: 'Assessor Dashboard Preview | AIPE',
    description:
      'Preview the AIPE admin and assessor dashboard for learner progress, assessment review, cohorts and reporting.'
  },
  '/courses/practical-ai-skills-for-work': {
    title: 'Practical AI Skills for Work | AIPE',
    description:
      'A flagship introductory AI course helping people understand AI, prompt effectively and apply AI responsibly in everyday work.'
  },
  '/for-business': {
    title: 'AI for Business | Workforce Training and AI Adoption | AIPE',
    description:
      'AIPE helps employers and businesses understand AI, train teams, automate workflows, build useful AI systems and improve responsibly.'
  },
  '/corporate-ai-training': {
    title: 'Corporate AI Training | AIPE',
    description:
      'Practical AI workshops and workforce training programmes for teams, leaders and organisations adopting AI responsibly.'
  },
  '/ai-solutions': {
    title: 'AI Solutions | AIPE',
    description:
      'Plain-English AI automation, agents, RAG, integrations, workflow design, custom systems and managed AI support.'
  },
  '/ai-solutions/ai-automation': {
    title: 'AI Automation | AIPE',
    description:
      'Use AI automation to reduce repetitive work, connect tools and improve business workflows without unnecessary complexity.'
  },
  '/ai-solutions/ai-agents': {
    title: 'AI Agents | AIPE',
    description:
      'Design practical AI agents that use models, tools and rules to complete defined business tasks with human oversight.'
  },
  '/ai-solutions/ai-knowledge-rag': {
    title: 'AI Knowledge and RAG Systems | AIPE',
    description:
      'Turn documents, policies and business knowledge into searchable AI systems that provide more useful answers.'
  },
  '/ai-solutions/ai-integrations': {
    title: 'AI Integrations | AIPE',
    description:
      'Connect AI with APIs, databases, email, CRM, documents and other systems so AI can work inside real business processes.'
  },
  '/ai-solutions/workflow-design': {
    title: 'AI Workflow Design | AIPE',
    description:
      'Map and redesign work processes so AI automation and implementation projects solve the right business problem.'
  },
  '/ai-solutions/custom-ai-systems': {
    title: 'Custom AI Systems | AIPE',
    description:
      'Build tailored AI-enabled tools for organisations with specific workflows, users, data and governance needs.'
  },
  '/ai-solutions/managed-ai-support': {
    title: 'Managed AI Support | AIPE',
    description:
      'Ongoing support, monitoring and improvement for AI workflows, automations and practical AI systems.'
  },
  '/partners': {
    title: 'Training Provider Partner for AI, Digital Skills and Adult Learning | AIPE',
    description:
      'AIPE can support colleges, councils, employability providers and funded-training partners with online adult learning, AI, ESOL digital skills and cybersecurity awareness delivery.'
  },
  '/request-partnership-pack': {
    title: 'Start a Partnership Conversation | AIPE',
    description:
      'Start a conversation with AIPE about training, provider partnerships, digital inclusion and community delivery.'
  },
  '/compliance': {
    title: 'Compliance and Learner Support | Online Adult Learning | AIPE',
    description:
      'AIPE is preparing partner-ready online adult learning processes for safeguarding, Prevent, GDPR, learner support, evidence tracking and responsible AI delivery.'
  },
  '/resources': {
    title: 'AI Resources | AIPE',
    description:
      'Plain-English guides on AI for work, automation, agents, responsible AI and business adoption.'
  },
  '/resources/ai-glossary': {
    title: 'AI Glossary in Plain English | AIPE',
    description:
      'Simple definitions for artificial intelligence, LLMs, prompts, hallucinations, AI agents, RAG, APIs, MCP and automation.'
  },
  '/about': {
    title: 'About AIPE | AI in Plain English',
    description:
      'AIPE exists to make AI understandable, practical and responsible for people, organisations and delivery partners.'
  },
  '/contact': {
    title: 'Contact AIPE | Training, Business AI and Partnerships',
    description:
      'Contact AIPE about AI training, corporate workshops, AI automation projects or delivery partnerships.'
  },
  '/sectors': {
    title: 'AI by Sector | AIPE',
    description:
      'A scalable sector hub for future AI skills, automation and implementation guidance by industry.'
  },
  '/qualifications': {
    title: 'AI Training and Future Qualifications | AIPE',
    description:
      'How AIPE distinguishes professional training, certificates of completion and future regulated qualification pathways.'
  },
  '/automation-agent-visual': {
    title: 'AI Automation and Agents Visual Prototype | AIPE',
    description:
      'A local visual prototype showing how AIPE explains automation and AI agents as controlled, practical business workflows.'
  },
  '/trailer-storyboard': {
    title: 'AIPE Trailer Storyboard | AIPE',
    description:
      'A local storyboard concept for an AIPE visual trailer covering learning, team training, automation and AI systems.'
  },
  '/screen-preview': {
    title: 'AIPE Responsive Screen Preview | AIPE',
    description:
      'A local responsive preview page for checking the AIPE homepage across common screen sizes.'
  }
};

const nav = [
  { label: 'Home', href: '/' },
  { label: 'AI Consultancy', href: '/ai-consultancy' },
  { label: 'Learn', href: '/learn' },
  { label: 'Business', href: '/for-business' },
  { label: 'Partners', href: '/partners' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' }
];

const course = {
  title: 'Practical AI Skills for Work',
  subtitle: 'From AI basics to practical workplace use.',
  href: '/courses/practical-ai-skills-for-work',
  audience:
    'Employees, jobseekers, career changers, SME owners, professionals and organisations building basic workforce AI capability.',
  duration: ['Half-day introduction', 'One-day practical workshop', 'Two to six week supported programme'],
  delivery: ['Live online', 'In person', 'Blended delivery', 'Employer cohort'],
  outcomes: [
    'Explain common AI terms in plain English',
    'Use prompting techniques to improve AI outputs',
    'Apply AI to everyday workplace tasks',
    'Identify where automation could reduce repetitive work',
    'Understand simple AI agent concepts',
    'Use AI responsibly with privacy, accuracy and oversight in mind'
  ],
  modules: [
    {
      title: 'Understanding AI',
      items: ['What AI is', 'Generative AI', 'Large Language Models', 'Common AI tools', 'What AI can and cannot do']
    },
    {
      title: 'Prompting',
      items: ['Clear instructions', 'Context', 'Examples', 'Improving outputs', 'Iterative prompting']
    },
    {
      title: 'AI for Everyday Work',
      items: ['Emails', 'Documents', 'Research', 'Summaries', 'Meetings', 'Presentations', 'Planning', 'Data-related tasks']
    },
    {
      title: 'AI Automation',
      items: ['Triggers', 'Workflows', 'AI actions', 'Repetitive task automation', 'Introduction to workflow platforms']
    },
    {
      title: 'AI Agents',
      items: ['Goals', 'AI models', 'Tools', 'Decisions', 'Actions', 'Practical simple agent examples']
    },
    {
      title: 'Responsible AI',
      items: ['Privacy', 'Data protection awareness', 'Hallucinations', 'Bias', 'Confidential information', 'Checking outputs', 'Human oversight']
    }
  ],
  faqs: [
    ['Is this course suitable for beginners?', 'Yes. It is designed for people who need useful workplace AI skills without technical jargon.'],
    ['Is it a regulated qualification?', 'No regulated qualification is claimed at this stage. AIPE can provide certificates of completion where appropriate for non-regulated programmes.'],
    ['Can employers book this for a team?', 'Yes. The content can be contextualised around team roles, workflows and practical business use cases.'],
    ['Does it include automation and agents?', 'Yes, at an introductory practical level. It explains the concepts clearly and shows how they relate to real work.']
  ]
};

const courseCategories = [
  ['AI Foundations', ['Practical AI Skills for Work', 'Introduction to Generative AI', 'Prompting for Work']],
  ['AI Productivity', ['AI for Office Productivity', 'AI for Research', 'AI for Communication']],
  ['AI Automation', ['Introduction to AI Automation', 'Workflow Automation', 'n8n Fundamentals']],
  ['AI Agents', ['Introduction to AI Agents', 'Building Practical AI Agents']],
  ['Applied AI', ['AI for Business', 'Responsible AI', 'AI Adoption']]
];

const adultLearningCards = [
  {
    icon: BookOpen,
    title: 'Practical AI Skills for Work',
    text: 'AI fundamentals, prompting, productivity, responsible AI, privacy, automation basics and AI agents.'
  },
  {
    icon: Users,
    title: 'Digital Skills for ESOL Learners',
    text: 'Email, online forms, digital vocabulary, job search, device confidence and safe AI-supported English practice.'
  },
  {
    icon: BriefcaseBusiness,
    title: 'AI in Plain English for Jobseekers',
    text: 'CVs, cover letters, interview practice, LinkedIn, job search confidence and accurate use of AI.'
  },
  {
    icon: ShieldCheck,
    title: 'Cyber Safety for Everyday Life and Work',
    text: 'Passwords, phishing, scams, MFA, safe browsing, data privacy and safe use of AI tools.'
  },
  {
    icon: Network,
    title: 'Introduction to Cybersecurity Careers',
    text: 'Cyber roles, SOC analyst pathways, networking basics, threats, vulnerabilities and progression routes.'
  },
  {
    icon: Zap,
    title: 'Workplace AI Productivity',
    text: 'Meetings, notes, summaries, emails, spreadsheets, reports, workflows, responsible use and human checking.'
  }
];

const courseCards = [
  {
    title: 'Practical AI Skills for Work',
    audience: 'Adult learners, employees, jobseekers, career changers and professionals.',
    topics: ['AI fundamentals', 'Prompting', 'Workplace productivity', 'Responsible AI', 'Checking outputs', 'Privacy', 'Automation basics', 'AI agents'],
    href: '/courses/practical-ai-skills-for-work'
  },
  {
    title: 'Digital Skills for ESOL Learners',
    audience: 'ESOL learners, refugees, new arrivals and adults building digital confidence.',
    topics: ['Email', 'Online forms', 'Mobile and laptop confidence', 'Digital vocabulary', 'Job search', 'Translation support', 'Safe AI for English practice']
  },
  {
    title: 'AI in Plain English for Jobseekers',
    audience: 'Jobseekers, employability learners, returners and career changers.',
    topics: ['CVs', 'Cover letters', 'Interview practice', 'Job search', 'LinkedIn', 'Confidence', 'Ethical and accurate AI use']
  },
  {
    title: 'Cyber Safety for Everyday Life and Work',
    audience: 'Adult learners, employees, community learners and people using online services.',
    topics: ['Passwords', 'Phishing', 'Scams', 'MFA', 'Safe browsing', 'Data privacy', 'AI tool safety', 'Workplace cyber habits']
  },
  {
    title: 'Introduction to Cybersecurity Careers',
    audience: 'Learners exploring progression into cybersecurity, IT support or networking.',
    topics: ['Cyber roles', 'SOC analyst pathway', 'Networking basics', 'Threats and vulnerabilities', 'Progression to Level 2 or Level 3 cybersecurity']
  },
  {
    title: 'Workplace AI Productivity',
    audience: 'Employees, employers, SMEs and teams improving daily work.',
    topics: ['Meetings', 'Notes', 'Summaries', 'Emails', 'Spreadsheets', 'Reports', 'Workflows', 'Responsible use', 'Human checking']
  }
];

const partnerCapabilities = [
  'Specialist AI curriculum',
  'Online digital skills delivery',
  'Cyber safety and cybersecurity awareness',
  'ESOL-linked digital confidence',
  'Learner onboarding and digital access checks',
  'Attendance, progress and evidence tracking',
  'Practical project-based learning',
  'Employer and workplace-focused tasks'
];

const complianceItems = [
  ['Safeguarding and Prevent commitment', 'AIPE is developing safeguarding and Prevent-aware delivery processes suitable for partnership discussions with colleges, councils and employability providers.'],
  ['Equality, diversity and inclusion', 'AIPE aims to make practical AI and digital skills accessible, inclusive and relevant to learners from different backgrounds and confidence levels.'],
  ['GDPR and learner data protection', 'AIPE can work under appropriate privacy, GDPR and data-processing arrangements when partnering with providers or employers.'],
  ['Online delivery and attendance tracking', 'Delivery can be supported through Teams, Zoom or Google Meet, with attendance tracking, learner communications, session resources and a clear recordings policy where required.'],
  ['Learner onboarding and digital access checks', 'Onboarding can include initial assessment, digital access checks, accessibility needs, learner goals and support requirements.'],
  ['Accessibility and reasonable adjustments', 'AIPE can design learner support around accessibility needs and reasonable adjustments, subject to partner and programme requirements.'],
  ['Complaints and learner support', 'AIPE can provide clear learner support, escalation and complaints processes for online and partner-delivered provision.'],
  ['Tutor competence and CPD', 'Tutors should have relevant subject knowledge, delivery experience, CPD records and practical understanding of AI, digital tools and cyber-safe working.'],
  ['Evidence and progress tracking', 'AIPE can maintain evidence for attendance, learner progress, work samples, completion, feedback and employer or project outcomes.'],
  ['Responsible AI and cyber-safe delivery', 'AIPE teaches and models safe digital practice, including careful use of AI tools, secure passwords, MFA, approved software and human checking.']
];

const solutions = [
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    icon: Workflow,
    summary: 'Use AI to reduce repetitive manual work and move information between the tools your organisation already uses.',
    problem: 'Teams lose time copying information, triaging messages, creating routine documents and chasing small process steps.',
    improves: ['Email triage', 'Document processing', 'CRM updates', 'Task creation', 'Report drafting', 'Internal notifications'],
    workflow: ['Email arrives', 'AI understands request', 'Information extracted', 'CRM updated', 'Task created', 'Reply drafted'],
    usefulFor: 'Operations, sales, recruitment, support, administration, training teams and SMEs with repeatable processes.',
    delivery: 'AIPE maps the workflow, identifies risk points, designs the automation, tests it with real examples and documents how staff should use it.',
    next: 'Discuss an Automation Project'
  },
  {
    slug: 'ai-agents',
    title: 'AI Agents',
    icon: Sparkles,
    summary: 'Create controlled AI assistants that can use tools, follow rules and complete defined tasks with human oversight.',
    problem: 'Many tasks need more than one AI response. They require checking information, making a decision and taking an action.',
    improves: ['Lead qualification', 'Research workflows', 'Internal support', 'Document review', 'Knowledge retrieval', 'Routine coordination'],
    workflow: ['Goal defined', 'Agent checks context', 'Tool selected', 'Action proposed', 'Human approves', 'Outcome logged'],
    usefulFor: 'Organisations with repeatable knowledge work where a model needs access to tools, documents or business rules.',
    delivery: 'AIPE defines the agent boundary, tool access, escalation rules, logging, testing approach and responsible use guidance.',
    next: 'Plan an AI Agent'
  },
  {
    slug: 'ai-knowledge-rag',
    title: 'AI Knowledge / RAG',
    icon: Library,
    summary: 'Turn documents, policies and internal knowledge into a more useful AI question-answering system.',
    problem: 'Important information is spread across documents, drives and systems, making it hard for staff or learners to find the right answer.',
    improves: ['Policy lookup', 'Training content search', 'Customer support knowledge', 'Bid and proposal research', 'Internal procedure guidance'],
    workflow: ['Documents collected', 'Content indexed', 'Question asked', 'Relevant sources retrieved', 'Answer drafted', 'Sources checked'],
    usefulFor: 'Training providers, professional services, operations teams, support teams and organisations with large document libraries.',
    delivery: 'AIPE designs the knowledge structure, prepares content, builds retrieval workflows, tests answer quality and trains users to verify outputs.',
    next: 'Explore a Knowledge System'
  },
  {
    slug: 'ai-integrations',
    title: 'AI Integrations',
    icon: Puzzle,
    summary: 'Connect AI with APIs, databases, email, CRM, documents and other tools so it can work inside real processes.',
    problem: 'AI is often isolated in a chat window, separate from the systems where work actually happens.',
    improves: ['Data handovers', 'System updates', 'Document generation', 'Notifications', 'Approval flows'],
    workflow: ['Business system sends data', 'AI analyses context', 'API action prepared', 'Validation step', 'System updated'],
    usefulFor: 'Businesses that need AI connected to existing software rather than another standalone tool.',
    delivery: 'AIPE identifies the integration points, designs secure data flow, builds the connection and provides usage guidance.',
    next: 'Discuss Integrations'
  },
  {
    slug: 'workflow-design',
    title: 'AI Workflow Design',
    icon: Network,
    summary: 'Redesign messy work processes into clear human-and-AI workflows before investing in automation.',
    problem: 'Automation fails when the process is unclear, inconsistent or poorly understood.',
    improves: ['Process clarity', 'Decision points', 'Handoffs', 'Risk control', 'Measurement'],
    workflow: ['Current process mapped', 'Bottlenecks identified', 'AI opportunities selected', 'New workflow tested'],
    usefulFor: 'Teams that know AI could help but need a practical route from idea to implementation.',
    delivery: 'AIPE facilitates discovery, maps the process, writes plain-English workflow documentation and recommends next steps.',
    next: 'Map a Workflow'
  },
  {
    slug: 'custom-ai-systems',
    title: 'Custom AI Systems',
    icon: Layers3,
    summary: 'Build tailored AI tools where training, off-the-shelf software or a simple automation is not enough.',
    problem: 'Some organisations need a system that reflects their own workflow, data, users and governance requirements.',
    improves: ['Internal tools', 'Learner support systems', 'Employer portals', 'Assessment workflows', 'Knowledge assistants'],
    workflow: ['Need defined', 'Prototype built', 'Users test', 'System improved', 'Support plan agreed'],
    usefulFor: 'Organisations with a clear process, repeated use case and need for a tailored AI-enabled tool.',
    delivery: 'AIPE moves from discovery to prototype, testing, implementation and managed improvement.',
    next: 'Discuss a Custom System'
  },
  {
    slug: 'managed-ai-support',
    title: 'Managed AI Support',
    icon: ShieldCheck,
    summary: 'Keep AI workflows useful, monitored and improved after launch.',
    problem: 'AI systems need review as models, data, tools and business needs change.',
    improves: ['Monitoring', 'Documentation', 'Prompt updates', 'Workflow optimisation', 'User support', 'Risk review'],
    workflow: ['Usage reviewed', 'Issues logged', 'Improvements prioritised', 'Updates tested', 'Guidance refreshed'],
    usefulFor: 'Organisations that want AI systems to remain reliable and useful over time.',
    delivery: 'AIPE provides scheduled reviews, support, optimisation and clear reporting.',
    next: 'Talk About Support'
  }
];

const resources = [
  ['AI Explained', 'Clear guides that translate complex AI ideas into practical language.'],
  ['AI for Work', 'Useful examples for documents, meetings, research, planning and communication.'],
  ['AI Automation', 'Plain-English guides to triggers, workflows and automated actions.'],
  ['AI Agents', 'How agents use models, tools, goals and decisions.'],
  ['Responsible AI', 'Privacy, accuracy, bias, oversight and safe workplace use.'],
  ['AI for Business', 'Adoption, readiness, training plans and implementation guidance.'],
  ['Guides', 'Longer practical resources for teams and learners.'],
  ['Glossary', 'Short definitions for important AI terms.']
];

const glossary = [
  ['Artificial Intelligence', 'Computer systems that can perform tasks that normally need human intelligence, such as understanding language, recognising patterns or making suggestions.'],
  ['Generative AI', 'AI that can create new content, including text, images, code, summaries, plans and drafts.'],
  ['LLM', 'A Large Language Model. This is an AI model trained on large amounts of text so it can understand and generate language.'],
  ['Prompt', 'The instruction or question you give to an AI tool. A good prompt includes the task, context, format and any constraints.'],
  ['Hallucination', 'When an AI gives an answer that sounds confident but is wrong, unsupported or made up. Important outputs should be checked.'],
  ['AI Agent', 'An AI system given a goal, tools and rules so it can work through steps and take actions, usually with human oversight.'],
  ['Workflow', 'A sequence of steps that moves work from start to finish, such as receiving a request, checking details and sending a response.'],
  ['Automation', 'Using software to complete repeatable steps with less manual effort. AI automation adds understanding, drafting or decision support.'],
  ['RAG', 'Retrieval-Augmented Generation. A method where AI searches relevant documents or data before drafting an answer.'],
  ['API', 'A way for software systems to communicate with each other, such as sending data from a form into a CRM.'],
  ['MCP', 'Model Context Protocol. A developing standard that helps AI systems connect to tools and data sources in a more structured way.']
];

const sectors = ['Professional Services', 'Recruitment', 'Education & Training', 'Hospitality', 'Healthcare', 'SMEs', 'Technology'];
const protectedPages = {
  lms: ['Learner Login', 'Learner Dashboard', 'My Courses', 'Course Progress', 'Module View', 'Lesson View', 'Assessments', 'Assessment Submission', 'Results / Feedback', 'Certificates / Completion', 'Resources', 'Learner Profile', 'Support'],
  admin: ['Admin Login', 'Admin Dashboard', 'Learner Management', 'Employer Management', 'Course Management', 'Module Management', 'Lesson Management', 'Cohort Management', 'Assessment Review', 'Tutor / Assessor Feedback', 'Progress Reports', 'Attendance', 'Certificates', 'Enquiries', 'Analytics', 'Settings']
};

function hrefFor(label) {
  return label === 'Practical AI Skills for Work' ? course.href : '/courses';
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const page = routes[path] || routes['/'];
  useEffect(() => {
    document.title = page.title;
    setMeta('description', page.description);
    setMeta('og:title', page.title, 'property');
    setMeta('og:description', page.description, 'property');
    setMeta('og:url', `${siteUrl}${path}`, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('twitter:card', 'summary_large_image', 'name');
    setMeta('twitter:title', page.title, 'name');
    setMeta('twitter:description', page.description, 'name');
    setLink('canonical', `${siteUrl}${path}`);
    setStructuredData(path, page);
  }, [path, page]);

  function navigate(event, href) {
    if (!href.startsWith('/')) return;
    event.preventDefault();
    window.history.pushState({}, '', href);
    setPath(href);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const Page = useMemo(() => resolvePage(path), [path]);
  const standalonePage = path === '/learner-ai';

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      {!standalonePage && <Header path={path} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
      <main id="main" className={standalonePage ? 'standalone-main' : ''}>
        <Page navigate={navigate} />
      </main>
      {!standalonePage && <Footer navigate={navigate} />}
    </>
  );
}

function setMeta(name, content, attr = 'name') {
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function setStructuredData(path, page) {
  const graph = [
    {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'EducationalOrganization'],
      name: 'AIPE',
      alternateName: 'AI in Plain English',
      url: siteUrl,
      description: routes['/'].description
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbsFor(path).map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: `${siteUrl}${crumb.href}`
      }))
    }
  ];
  if (path === course.href) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.title,
      description: `${course.subtitle} ${routes[path].description}`,
      provider: { '@type': 'EducationalOrganization', name: 'AIPE', url: siteUrl },
      educationalCredentialAwarded: 'Certificate of completion may be available for non-regulated programmes where appropriate.'
    });
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: course.faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer }
      }))
    });
  }
  if (path.startsWith('/resources')) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.title,
      description: page.description,
      author: { '@type': 'Organization', name: 'AIPE' },
      publisher: { '@type': 'Organization', name: 'AIPE' }
    });
  }
  let tag = document.head.querySelector('script[data-aipe-structured-data]');
  if (!tag) {
    tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.setAttribute('data-aipe-structured-data', 'true');
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(graph);
}

function breadcrumbsFor(path) {
  const labels = {
    learn: 'Learn',
    'adult-learning': 'Adult Learning',
    courses: 'Courses',
    'practical-ai-skills-for-work': 'Practical AI Skills for Work',
    'for-business': 'For Business',
    'corporate-ai-training': 'Corporate AI Training',
    'ai-solutions': 'AI Solutions',
    'ai-automation': 'AI Automation',
    'ai-agents': 'AI Agents',
    'ai-knowledge-rag': 'AI Knowledge / RAG',
    partners: 'Partners',
    compliance: 'Compliance',
    resources: 'Resources',
    'ai-glossary': 'AI Glossary',
    about: 'About',
    contact: 'Contact',
    sectors: 'Sectors',
    qualifications: 'Qualifications',
    lms: 'Learner Area',
    admin: 'Admin Area'
  };
  const parts = path.split('/').filter(Boolean);
  const crumbs = [{ label: 'Home', href: '/' }];
  let href = '';
  parts.forEach((part) => {
    href += `/${part}`;
    crumbs.push({ label: labels[part] || titleCase(part), href });
  });
  return crumbs;
}

function titleCase(value) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function Link({ href, children, className = '', navigate, ...props }) {
  return (
    <a href={href} className={className} onClick={(event) => navigate?.(event, href)} {...props}>
      {children}
    </a>
  );
}

function Header({ path, navigate, menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" navigate={navigate} className="brand" aria-label="AIPE home">
          <img src="/aipe-logo-main-lockup.png" alt="AIPE - AI in Plain English" />
        </Link>
        <button className="icon-button menu-button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} navigate={navigate} className={path === item.href ? 'active' : ''}>
              {item.label}
            </Link>
          ))}
          <Link href="/learner-ai" navigate={navigate} className={path === '/learner-ai' ? 'active mobile-learner-link' : 'mobile-learner-link'}>
            Learner Platform
          </Link>
        </nav>
        <div className="header-actions">
          <Link href="/contact" navigate={navigate} className="button primary header-cta">Book a Consultation</Link>
          <Link href="/learner-ai" navigate={navigate} className="button learner-header-cta">
            <GraduationCap size={18} />
            Learner Platform
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-logo-wrap">
            <img src="/aipe-logo-main-lockup.png" alt="AIPE - AI in Plain English" />
          </div>
          <p>AI training, corporate upskilling, funded delivery support, AI engineering and managed AI services, explained in plain English.</p>
        </div>
        <FooterCol title="Explore" items={['Learn', 'For Business', 'AI Solutions', 'Partners']} navigate={navigate} />
        <FooterCol title="Resources" items={['AI Glossary', 'About', 'Sectors', 'Qualifications']} navigate={navigate} />
        <div>
          <h3>Future Policy Area</h3>
          <p>Privacy, cookies, terms, accessibility, complaints, safeguarding, EDI, data protection, health and safety, Prevent and quality assurance policies can be published when approved text is supplied.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} AIPE. Draft website prepared for aipe.uk.</span>
        <span>No regulated qualification, funding or accreditation claims are made.</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, navigate }) {
  const map = { Learn: '/learn', 'For Business': '/for-business', 'AI Solutions': '/ai-solutions', Partners: '/partners', 'AI Glossary': '/resources/ai-glossary', About: '/about', Sectors: '/sectors', Qualifications: '/qualifications' };
  return <div><h3>{title}</h3>{items.map((item) => <Link key={item} href={map[item]} navigate={navigate}>{item}</Link>)}</div>;
}

function HomeGateway({ navigate }) {
  const gatewayRoutes = [
    {
      icon: GraduationCap,
      label: 'Training & Partnerships',
      audience: 'Councils, colleges, adult learning services, providers, ESOL learners, jobseekers and career changers.',
      text: 'Practical AI, digital skills, cyber safety and partnership delivery aligned to provider requirements.',
      href: '/partners',
      cta: 'Training & Partnerships'
    },
    {
      icon: Workflow,
      label: 'AI Consultancy & Automation',
      audience: 'Employers, SMEs and teams improving work with AI.',
      text: 'AI training, automation, agents, RAG, workflow design and managed support.',
      href: '/ai-consultancy',
      cta: 'AI Consultancy'
    }
  ];

  return (
    <main>
      <section className="hero gateway-hero">
        <div className="modern-backdrop" aria-hidden="true">
          <span className="flow-line line-one" />
          <span className="flow-line line-two" />
          <span className="flow-line line-three" />
          <span className="flow-node node-one" />
          <span className="flow-node node-two" />
          <span className="flow-node node-three" />
          <span className="flow-node node-four" />
        </div>
        <div className="container gateway-hero-inner">
          <div className="gateway-copy">
            <p className="eyebrow">AIPE - AI in Plain English</p>
            <h1>Choose how <span className="brand-word"><span>AI</span><span>PE</span></span> can help.</h1>
          </div>
          <div className="gateway-route-grid" aria-label="Choose an AIPE route">
            {gatewayRoutes.map(({ icon: Icon, label, audience, text, href, cta }) => (
              <Link href={href} navigate={navigate} className="gateway-route-card" key={label}>
                <span className="gateway-icon"><Icon size={30} /></span>
                <span className="gateway-card-copy">
                  <strong>{label}</strong>
                  <small>{audience}</small>
                  <em>{text}</em>
                </span>
                <span className="gateway-card-cta">{cta}<ArrowRight size={18} /></span>
              </Link>
            ))}
          </div>
          <p className="gateway-trust-line">Training and partnership delivery can sit under lead provider funding, compliance and quality requirements where required.</p>
        </div>
      </section>
    </main>
  );
}

function Home({ navigate }) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  return (
    <>
      <section className="hero">
        <div className="modern-backdrop" aria-hidden="true">
          <span className="flow-line line-one" />
          <span className="flow-line line-two" />
          <span className="flow-line line-three" />
          <span className="flow-node node-one" />
          <span className="flow-node node-two" />
          <span className="flow-node node-three" />
          <span className="flow-node node-four" />
          <div className="hero-workflow" aria-label="AIPE visual explanation">
            <div className="holo-panel holo-learn">
              <span className="holo-kicker">Learn</span>
              <span className="holo-board">AI classroom</span>
              <span className="holo-desk desk-a" />
              <span className="holo-desk desk-b" />
            </div>
            <div className="holo-panel holo-apply">
              <span className="holo-kicker">Apply</span>
              <span className="holo-node n1" />
              <span className="holo-node n2" />
              <span className="holo-node n3" />
              <span className="holo-node n4" />
            </div>
            <div className="holo-core">
              <small>AIPE</small>
              <strong>Plain English</strong>
            </div>
            <div className="holo-panel holo-automate">
              <span className="holo-kicker">Automate</span>
              <span>Trigger</span>
              <span>Agent</span>
              <span>Action</span>
            </div>
            <div className="holo-panel holo-build">
              <span className="holo-kicker">Build</span>
              <span className="system-block large" />
              <span className="system-block" />
              <span className="system-block" />
              <span className="system-block wide" />
            </div>
          </div>
        </div>
        <div className="container minimal-hero">
          <div className="hero-copy">
            <p className="eyebrow">AIPE for work</p>
            <AipeTrailerPreview isOpen={isTrailerOpen} onOpen={() => setIsTrailerOpen(true)} onClose={() => setIsTrailerOpen(false)} />
            <div className="hero-visual-title" aria-label="Choose how AIPE can help">
              <Link href="/learn" navigate={navigate} className="visual-step">
                <span className="visual-icon"><GraduationCap size={26} /></span>
                <span><strong>Learn AI</strong><small>Build confidence and practical skills for everyday work.</small></span>
              </Link>
              <Link href="/ai-solutions/ai-automation" navigate={navigate} className="visual-step">
                <span className="visual-icon"><Workflow size={26} /></span>
                <span><strong>Automate work</strong><small>Reduce repetitive work and improve everyday processes.</small></span>
              </Link>
              <Link href="/corporate-ai-training" navigate={navigate} className="visual-step">
                <span className="visual-icon"><Users size={26} /></span>
                <span><strong>Train teams</strong><small>Give your workforce shared AI skills and safe habits.</small></span>
              </Link>
              <Link href="/ai-solutions/custom-ai-systems" navigate={navigate} className="visual-step">
                <span className="visual-icon"><Layers3 size={26} /></span>
                <span><strong>Build systems</strong><small>Create agents, RAG, integrations and practical AI tools.</small></span>
              </Link>
            </div>
            <p className="lead visual-lead">AIPE helps individuals learn AI, helps teams adopt it safely, and helps organisations reduce repetitive work with practical AI systems.</p>
            <div className="actions">
              <Link href="/learn" navigate={navigate} className="button primary">Explore Training <ArrowRight size={18} /></Link>
              <Link href="/for-business" navigate={navigate} className="button secondary bordered">AI for Business</Link>
            </div>
          </div>
        </div>
        <div className="hero-bottom-strip" aria-label="AIPE core pathways">
          <span>Learn AI</span>
          <span>Train teams</span>
          <span>Automate work</span>
          <span>Build AI systems</span>
        </div>
      </section>
    </>
  );
}

function AdultLearningHome({ navigate }) {
  return (
    <section className="section adult-learning-home">
      <div className="container">
        <div className="adult-home-head">
          <div>
            <p className="eyebrow">Adult Learning & Community Skills</p>
            <h2>Practical online learning for adults, employers and delivery partners.</h2>
          </div>
          <p>AIPE is a UK-based online training organisation delivering practical AI, digital skills, cyber safety and ESOL-linked employability support for adult learners, jobseekers, career changers, employers and training-provider partners.</p>
        </div>
        <div className="adult-card-grid">
          {adultLearningCards.map(({ icon: Icon, title, text }) => (
            <article className="adult-skill-card" key={title}>
              <Icon size={24} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="actions adult-home-actions">
          <Link href="/partners" navigate={navigate} className="button primary">Discuss a Delivery Partnership <ArrowRight size={18} /></Link>
          <Link href="/courses" navigate={navigate} className="button secondary bordered">Request a Course Outline</Link>
        </div>
      </div>
    </section>
  );
}

function AipeTrailerPreview({ isOpen, onOpen, onClose }) {
  const trailerVideos = [
    { title: 'AIPE engineer arrives', src: '/aipe-trailer-engineer-entrance.mp4' },
    { title: 'AI workshop training', src: '/aipe-trailer-workshop-motion.mp4' },
    { title: 'Automation in motion', src: '/aipe-trailer-office-motion.mp4' }
  ];
  const [activeVideo, setActiveVideo] = useState(0);
  const currentVideo = trailerVideos[activeVideo];
  const playNext = () => setActiveVideo((index) => (index + 1) % trailerVideos.length);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <button className="trailer-chip" type="button" onClick={onOpen} aria-label={`Open AIPE video trailer: ${currentVideo.title}`} aria-haspopup="dialog" aria-expanded={isOpen}>
        <video className="trailer-chip-video" src={currentVideo.src} autoPlay muted playsInline onEnded={playNext} />
        <span className="trailer-chip-overlay">
          <span className="trailer-play"><Play size={15} fill="currentColor" /></span>
        </span>
      </button>

      {isOpen && (
        <div className="trailer-overlay" role="presentation" onMouseDown={onClose}>
          <section className="trailer-modal" role="dialog" aria-modal="true" aria-labelledby="trailer-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="trailer-close" type="button" onClick={onClose} aria-label="Close AIPE trailer"><X size={20} /></button>
            <div className="trailer-video-stage" aria-label="AIPE video trailer preview">
              <video key={currentVideo.src} className="trailer-main-video" src={currentVideo.src} autoPlay controls playsInline onEnded={playNext} />
              <div className="trailer-video-badge">
                <small>AIPE</small>
                <strong>{currentVideo.title}</strong>
              </div>
            </div>
            <div className="trailer-caption">
              <p className="eyebrow">Video trailer</p>
              <h2 id="trailer-title">AIPE in motion.</h2>
              <p>A small homepage trailer showing AIPE entering an organisation, teaching practical AI and turning repeated work into clearer systems.</p>
              <div className="trailer-playlist" aria-label="Choose trailer scene">
                {trailerVideos.map((video, index) => (
                  <button type="button" className={index === activeVideo ? 'active' : ''} onClick={() => setActiveVideo(index)} key={video.src}>
                    <span>0{index + 1}</span>
                    {video.title}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function WorkflowSection() {
  const workflows = [
    {
      icon: GraduationCap,
      title: 'Learn AI for everyone',
      text: 'A clear entry point for individuals, jobseekers, professionals and teams who need confidence with everyday AI.',
      steps: ['Understand AI', 'Prompt clearly', 'Use AI at work', 'Check outputs']
    },
    {
      icon: Users,
      title: 'Train teams',
      text: 'Workforce training and workshops that help organisations move from curiosity to responsible use.',
      steps: ['Map roles', 'Train staff', 'Set guardrails', 'Embed habits']
    },
    {
      icon: Workflow,
      title: 'Automate with agents',
      text: 'Practical automation, AI agents and workflow design for repetitive tasks and service processes.',
      steps: ['Find process', 'Design workflow', 'Add AI actions', 'Monitor results']
    },
    {
      icon: Layers3,
      title: 'Build AI systems',
      text: 'RAG, knowledge tools, API integrations and custom systems for organisations ready to implement.',
      steps: ['Define problem', 'Connect data', 'Build system', 'Improve safely']
    }
  ];

  return (
    <section className="section workflow-section">
      <div className="container">
        <SectionIntro eyebrow="How it grows" title="From AI skills to working AI systems." text="AIPE can start with plain-English training, then support the practical next steps: team adoption, automation, agents and custom systems." />
        <div className="workflow-card-grid">
          {workflows.map(({ icon: Icon, ...workflow }) => (
            <article className="workflow-card" key={workflow.title}>
              <div>
                <Icon size={26} aria-hidden="true" />
                <h3>{workflow.title}</h3>
                <p>{workflow.text}</p>
              </div>
              <WorkflowVisual steps={workflow.steps} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlainEnglishPanel() {
  return (
    <div className="concept-card" aria-label="AIPE plain English process visual">
      <div className="concept-header">
        <span>AIPE method</span>
        <strong>Plain English to practical systems</strong>
      </div>
      <div className="signal-grid">
        <span /><span /><span /><span /><span /><span /><span /><span /><span />
      </div>
      <div className="process-line">
        <MiniStep icon={Lightbulb} label="Understand" />
        <MiniStep icon={BookOpen} label="Learn" />
        <MiniStep icon={Zap} label="Apply" />
        <MiniStep icon={Workflow} label="Automate" />
        <MiniStep icon={Layers3} label="Build" />
      </div>
      <div className="plain-box">
        <strong>Complex idea</strong>
        <ArrowRight size={18} />
        <strong>Useful action</strong>
      </div>
    </div>
  );
}

function MiniStep({ icon: Icon, label }) {
  return <div><Icon size={18} /><span>{label}</span></div>;
}

function PathCard({ icon: Icon, title, text, cta, href, navigate }) {
  return (
    <article className="card path-card">
      <Icon size={28} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{text}</p>
      <Link href={href} navigate={navigate} className="card-link">{cta} <ArrowRight size={16} /></Link>
    </article>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return <div className="section-intro"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function Checklist({ items }) {
  return <ul className="checklist">{items.map((item, index) => <li key={typeof item === 'string' ? item : index}><CheckCircle2 size={18} /><span>{item}</span></li>)}</ul>;
}

function Learn({ navigate }) {
  const workshops = [
    {
      icon: BookOpen,
      title: 'Practical AI Skills for Work',
      text: 'The flagship starting point: understand AI, prompt clearly, use tools at work and build responsible habits.',
      href: course.href
    },
    {
      icon: Sparkles,
      title: 'Prompting for Work',
      text: 'Learn how to give AI better instructions, add context, improve outputs and work iteratively.',
      href: course.href
    },
    {
      icon: Zap,
      title: 'AI Productivity',
      text: 'Use AI for emails, documents, research, summaries, planning, meetings and everyday work tasks.',
      href: course.href
    },
    {
      icon: ShieldCheck,
      title: 'Responsible AI',
      text: 'Know what to check, what not to share, where AI can go wrong and how to stay in control.',
      href: course.href
    }
  ];
  const journey = [
    ['Start', 'Understand what AI is and what it can realistically do.'],
    ['Practise', 'Use prompts, examples and real workplace tasks.'],
    ['Apply', 'Turn learning into better documents, research, planning and communication.'],
    ['Progress', 'Track lessons, assessments, feedback and completion.']
  ];

  return (
    <>
      <section className="learn-hero">
        <div className="container learn-hero-grid">
          <div>
            <p className="eyebrow">Learn AI for individuals</p>
            <h1>Build practical AI confidence for real work.</h1>
            <p className="lead">AIPE helps individuals learn AI in plain English, from the first prompt to everyday productivity, responsible use and a pathway towards automation and AI engineering skills.</p>
            <div className="actions">
              <Link href={course.href} navigate={navigate} className="button primary">Start With Practical AI Skills <ArrowRight size={18} /></Link>
              <Link href="/learner-ai" navigate={navigate} className="button secondary">Learner Dashboard</Link>
            </div>
            <div className="learn-audience">
              <span>Employees</span>
              <span>Jobseekers</span>
              <span>Career changers</span>
              <span>Freelancers</span>
            </div>
          </div>
          <div className="workshop-visual" aria-label="AIPE learner workshop preview">
            <div className="workshop-screen">
              <span className="workshop-tag">Live workshop</span>
              <h2>Practical AI Skills for Work</h2>
              <WorkflowVisual steps={['AI basics', 'Prompting', 'Productivity', 'Responsible use']} />
            </div>
            <div className="workshop-card floating-card-one"><GraduationCap size={20} />Lessons</div>
            <div className="workshop-card floating-card-two"><ClipboardCheck size={20} />Assessment</div>
            <div className="workshop-card floating-card-three"><CircleGauge size={20} />Progress</div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionIntro eyebrow="Workshop training" title="Focused courses for practical AI use." text="The first Learn AI offer is intentionally focused. It gives individuals a credible route into workplace AI before moving into automation, agents or engineering." />
          <div className="workshop-grid">
            {workshops.map(({ icon: Icon, title, text, href }) => (
              <Link href={href} navigate={navigate} className="workshop-course" key={title}>
                <Icon size={26} aria-hidden="true" />
                <h2>{title}</h2>
                <p>{text}</p>
                <span>Explore <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section tinted" id="catalogue">
        <div className="container learner-preview">
          <div>
            <p className="eyebrow">Learner journey</p>
            <h2>Lessons, assessments, certificates and personal progress.</h2>
            <p>AIPE’s learner area is designed around practical activity: learn the idea, try it on a real task, submit work, get feedback and track progress.</p>
            <div className="journey-list">
              {journey.map(([title, text]) => <span key={title}><strong>{title}</strong>{text}</span>)}
            </div>
            <div className="actions">
              <Link href="/learner-ai" navigate={navigate} className="button primary">View Learner Platform</Link>
              <Link href="/lms" navigate={navigate} className="button secondary">Learner Login</Link>
            </div>
          </div>
          <ProgressPanel />
        </div>
      </section>
    </>
  );
}

function CatalogueCard({ title, items, navigate }) {
  return <article className="card"><h3>{title}</h3>{items.map((item) => <Link key={item} href={hrefFor(item)} navigate={navigate} className="course-row"><span>{item}</span><ArrowRight size={15} /></Link>)}</article>;
}

function LearnIndividual({ navigate }) {
  const learnCycle = [
    {
      icon: Users,
      title: 'Who it is for',
      text: 'Individuals, employees, jobseekers, career changers, freelancers and professionals.'
    },
    {
      icon: BookOpen,
      title: 'What they learn',
      text: 'AI basics, prompting, productivity, responsible AI, automation and agents.'
    },
    {
      icon: Zap,
      title: 'How they learn',
      text: 'Workshop-style lessons, examples, practical tasks, assessments and feedback.'
    },
    {
      icon: ShieldCheck,
      title: 'Why it matters',
      text: 'Use AI confidently, save time, improve work and avoid unsafe use.'
    },
    {
      icon: CircleGauge,
      title: 'Learner platform',
      text: 'Login, lessons, assessments, progress charts, certificates and saved resources.'
    }
  ];

  return (
    <>
      <section className="learn-clean-page">
        <div className="container">
          <div className="learn-clean-intro">
            <p className="eyebrow">Learn AI for individuals</p>
            <h1>Learn AI is for individuals who want practical AI skills for work.</h1>
            <p>AIPE helps people build confidence with AI in plain English, from everyday productivity to responsible use and a pathway towards automation or AI engineering skills.</p>
            <div className="actions">
              <Link href={course.href} navigate={navigate} className="button primary">Start With Practical AI Skills <ArrowRight size={18} /></Link>
              <Link href="/learner-ai" navigate={navigate} className="button secondary">Learner Platform</Link>
            </div>
          </div>
          <div className="learn-block-cycle">
            <div className="learn-block-centre">
              <span>AIPE</span>
              <strong>Learn AI in Plain English</strong>
              <small>Practical skills for real work</small>
            </div>
            {learnCycle.map(({ icon: Icon, title, text }, index) => (
              <article className={`learn-block-step block-step-${index + 1}`} key={title}>
                <Icon size={24} aria-hidden="true" />
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CoursePage({ navigate }) {
  return (
    <>
      <PageHero eyebrow="Flagship course" title={course.title} text={`${course.subtitle} This programme helps learners understand AI, use prompting techniques, apply AI to everyday work and recognise where automation and agents fit.`}>
        <div className="actions"><Link href="/contact?intent=learner" navigate={navigate} className="button primary">Enquire About This Course</Link><Link href="/corporate-ai-training" navigate={navigate} className="button secondary">Employer Cohort</Link></div>
      </PageHero>
      <section className="section">
        <div className="container two-col">
          <div>
            <h2>Overview</h2>
            <p>{course.audience}</p>
            <h3>Learning outcomes</h3>
            <Checklist items={course.outcomes} />
          </div>
          <aside className="side-panel">
            <h3>Delivery options</h3>
            <TagList items={course.delivery} />
            <h3>Duration options</h3>
            <TagList items={course.duration} />
            <h3>Practical project</h3>
            <p>Learners identify a real workplace task and demonstrate how AI could improve it, with responsible use and human checking built in.</p>
          </aside>
        </div>
      </section>
      <section className="section tinted">
        <div className="container">
          <SectionIntro eyebrow="Modules" title="From basics to practical workplace use." />
          <div className="module-grid">
            {course.modules.map((module, index) => <ModuleCard key={module.title} module={module} index={index + 1} />)}
          </div>
        </div>
      </section>
      <FAQ items={course.faqs} />
      <LeadBand navigate={navigate} />
    </>
  );
}

function TagList({ items }) {
  return <div className="tag-list">{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function ModuleCard({ module, index }) {
  return <article className="card module-card"><span className="module-number">Module {index}</span><h3>{module.title}</h3><ul>{module.items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
}

function FAQ({ items }) {
  return <section className="section"><div className="container narrow"><SectionIntro eyebrow="FAQs" title="Straight answers." />{items.map(([q, a]) => <details key={q} className="faq"><summary>{q}<ChevronDown size={18} /></summary><p>{a}</p></details>)}</div></section>;
}

function Business({ navigate }) {
  const services = ['AI Readiness / Discovery', 'Workforce AI Training', 'Corporate AI Workshops', 'AI Adoption Programmes', 'Process Automation', 'AI Agents', 'Knowledge & RAG Systems', 'AI Integrations', 'Managed AI Support'];
  return (
    <>
      <PageHero eyebrow="For business" title="Move from AI curiosity to practical capability." text="AIPE helps employers and businesses understand what AI can do, train people responsibly, automate useful workflows and build systems that improve real work.">
        <div className="actions"><Link href="/contact?intent=employer" navigate={navigate} className="button primary">Book AI Consultation</Link><Link href="/corporate-ai-training" navigate={navigate} className="button secondary">Request AI Training Plan</Link></div>
      </PageHero>
      <BusinessProcess navigate={navigate} />
      <section className="section tinted"><div className="container"><SectionIntro eyebrow="Services" title="Training, adoption and implementation." /><div className="service-grid">{services.map((s) => <article className="card service-card" key={s}><CheckCircle2 size={20} /><h3>{s}</h3><p>{serviceCopy(s)}</p></article>)}</div></div></section>
      <LeadBand navigate={navigate} />
    </>
  );
}

function serviceCopy(title) {
  const copy = {
    'AI Readiness / Discovery': 'Identify where AI could create genuine value and where it should be avoided or carefully controlled.',
    'Workforce AI Training': 'Give employees practical, responsible AI skills they can use in everyday work.',
    'Corporate AI Workshops': 'Focused programmes for teams, managers and leaders who need shared understanding quickly.',
    'AI Adoption Programmes': 'Structured support that moves teams from experimentation to useful implementation.',
    'Process Automation': 'Reduce repetitive workflow steps across email, documents, CRM, spreadsheets and internal systems.',
    'AI Agents': 'Design task-focused agents that combine models, tools, rules and human oversight.',
    'Knowledge & RAG Systems': 'Make organisational documents and knowledge easier to search, understand and apply.',
    'AI Integrations': 'Connect AI with business systems, APIs, databases, email, documents and other tools.',
    'Managed AI Support': 'Monitor, improve and support AI systems and automations after launch.'
  };
  return copy[title];
}

function CorporateTraining({ navigate }) {
  return (
    <>
      <PageHero eyebrow="Corporate AI training" title="Practical AI training for teams and leaders." text="Workshops and programmes that help employees understand AI, use it safely and apply it to the work they actually do.">
        <Link href="/contact?intent=employer" navigate={navigate} className="button primary">Request an AI Training Plan</Link>
      </PageHero>
      <section className="section"><div className="container three-col">
        <InfoCard icon={Users} title="Team workshops" text="Short, practical sessions for departments, project teams and frontline staff." />
        <InfoCard icon={BriefcaseBusiness} title="Leadership briefings" text="Plain-English sessions on opportunity, risk, adoption and governance." />
        <InfoCard icon={Target} title="Role-based programmes" text="Training contextualised for sales, operations, admin, learning, support or management teams." />
      </div></section>
      <section className="section tinted"><div className="container split"><div><h2>What a training plan can include</h2><p>AIPE can combine awareness, prompting, workflow discovery, responsible AI, productivity tasks and practical project work into one programme.</p></div><Checklist items={['Current AI usage review', 'Role-specific examples', 'Responsible AI guidance', 'Practical workplace exercises', 'Manager follow-up session']} /></div></section>
    </>
  );
}

function SolutionsHub({ navigate }) {
  return (
    <>
      <PageHero eyebrow="AI solutions" title="AI systems explained clearly and built carefully." text="AIPE designs automations, agents, knowledge systems and integrations in plain English, with enough technical depth to make them useful." />
      <section className="section"><div className="container solution-list">{solutions.map((s) => <SolutionTeaser key={s.slug} solution={s} navigate={navigate} />)}</div></section>
    </>
  );
}

function SolutionTeaser({ solution, navigate }) {
  const Icon = solution.icon;
  return <article className="card solution-teaser"><Icon size={26} /><div><h2>{solution.title}</h2><p>{solution.summary}</p></div><Link href={`/ai-solutions/${solution.slug}`} navigate={navigate} className="button secondary">View Solution</Link></article>;
}

function SolutionPage({ solution, navigate }) {
  const Icon = solution.icon;
  return (
    <>
      <PageHero eyebrow="AI solution" title={solution.title} text={solution.summary}>
        <Link href="/contact?intent=project" navigate={navigate} className="button primary">{solution.next}</Link>
      </PageHero>
      <section className="section"><div className="container two-col">
        <div className="answer-stack">
          <InfoBlock title="What is it?" text={solution.summary} icon={Icon} />
          <InfoBlock title="What business problem does it solve?" text={solution.problem} icon={CircleGauge} />
          <InfoBlock title="Who is it useful for?" text={solution.usefulFor} icon={Users} />
          <InfoBlock title="How does AIPE deliver it?" text={solution.delivery} icon={ShieldCheck} />
        </div>
        <aside className="side-panel">
          <h3>What could it improve?</h3>
          <Checklist items={solution.improves} />
          <h3>Example workflow</h3>
          <WorkflowVisual steps={solution.workflow} />
        </aside>
      </div></section>
      <LeadBand navigate={navigate} />
    </>
  );
}

function WorkflowVisual({ steps }) {
  return <ol className="workflow-visual">{steps.map((step) => <li key={step}>{step}</li>)}</ol>;
}

function InfoBlock({ title, text, icon: Icon }) {
  return <article className="info-block"><Icon size={22} /><div><h2>{title}</h2><p>{text}</p></div></article>;
}

function Partners({ navigate }) {
  const supportGroups = [
    'Councils and adult learning services',
    'Colleges and training providers',
    'Employability and community organisations',
    'Employers supporting workforce skills',
    'ESOL learners, refugees and migrant learners',
    'Older adults and adults with low digital confidence',
    'Jobseekers and career changers'
  ];
  const deliveryOffer = [
    'ESOL and English for Work',
    'Digital Skills for ESOL Learners',
    'Age-Friendly Digital Confidence and Online Safety',
    'Digital Inclusion for Refugees and Migrant Learners',
    'AI Confidence for Jobseekers',
    'AI for Career Changers',
    'Cyber Safety for Everyday Life and Work',
    'Introductory Networking and Cybersecurity pathways',
    'Digital confidence and employability workshops'
  ];
  const formats = [
    'Online live sessions',
    'Short workshops',
    '3 x 2-hour short courses',
    '2-week intensive cohorts',
    '6-8 week part-time cohorts',
    'Specialist modules inside wider funded programmes',
    'Introductory sessions available at a reduced or accessible rate where appropriate'
  ];
  const reasons = [
    'Adult learner and ESOL experience',
    'Practical AI and digital skills focus',
    'Career-change and employability angle',
    'Digital inclusion experience with older adults, refugees, migrant learners and adults with lower digital confidence',
    'Flexible online delivery',
    'Tutor-led support',
    <>Our delivery team brings experience from education, technology and public-service environments, including work connected to <strong>Google</strong>, <strong>the NHS</strong> and <strong>Pearson</strong>.</>,
    'Ability to work under lead provider quality, safeguarding and compliance requirements where required'
  ];
  const readiness = [
    'Attendance tracking',
    'Learner feedback',
    'Progress reviews',
    'Work samples',
    'Portfolio evidence',
    'Safeguarding and inclusive delivery awareness',
    'Delivery aligned to partner requirements'
  ];
  const partnershipOptions = [
    'Subcontracted delivery',
    'Specialist workshops',
    'Pilot cohort',
    'Add-on modules inside existing programmes',
    'Community learning sessions',
    'Employer-funded training',
    'Referral partnership'
  ];
  const featuredCourses = [
    ['Digital Skills for ESOL Learners', 'Build everyday digital confidence, online forms, email, vocabulary and safe AI-supported English practice.'],
    ['Age-Friendly Digital Confidence and Online Safety', 'Support older adults with everyday devices, online services, safer browsing and confidence using digital tools.'],
    ['Digital Inclusion for Refugees and Migrant Learners', 'Practical digital access, online forms, English for digital life and safe use of AI-supported learning tools.'],
    ['AI Confidence for Jobseekers and Career Changers', 'Use AI safely and practically for CVs, job search, interview preparation, planning and workplace confidence.'],
    ['Cyber Safety for Everyday Life and Work', 'Passwords, phishing, scams, MFA, data privacy and safe online habits for learners and staff.']
  ];
  const partnershipWhatsAppMessage = 'Hello AIPE, I’d like to start a partnership conversation about training and delivery for my organisation.';
  const partnershipWhatsAppHref = `https://wa.me/447708910946?text=${encodeURIComponent(partnershipWhatsAppMessage)}`;

  return (
    <>
      <PageHero eyebrow="Provider partnerships" title="Training & Partnerships" text="AIPE supports councils, colleges, providers and community organisations with practical AI, digital inclusion, ESOL, cyber safety and employability-focused training for adult learners, jobseekers, career changers and digitally excluded communities.">
        <div className="partner-hero-cta">
          <div className="actions">
            <Link href="/request-partnership-pack" navigate={navigate} className="button primary">Start a Partnership Conversation</Link>
            <a href={partnershipWhatsAppHref} className="button secondary bordered" target="_blank" rel="noreferrer">Message AIPE on WhatsApp</a>
          </div>
          <p>Prefer email? Contact <a href="mailto:ai@aipe.uk">ai@aipe.uk</a></p>
        </div>
      </PageHero>
      <section className="section partner-provider-section">
        <div className="container split">
          <div>
            <p className="eyebrow">Who we support</p>
            <h2>Practical delivery for providers, communities and employers.</h2>
            <p>AIPE works with organisations that need accessible training for adults building confidence with AI, digital tools, English for work, online safety and career progression.</p>
            <p className="careful-claim">Delivery can sit inside a wider programme, pilot cohort, community learning offer or employer-funded skills plan.</p>
            <p className="credibility-note">AIPE is a member of the National Digital Inclusion Network.</p>
          </div>
          <div className="provider-capability-grid">
            {supportGroups.map((item) => <span key={item}><CheckCircle2 size={18} />{item}</span>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container two-col partnership-panel-grid">
          <div className="partnership-panel"><h2>What AIPE can deliver</h2><Checklist items={deliveryOffer} /></div>
          <div className="partnership-panel"><h2>Delivery formats</h2><Checklist items={formats} /></div>
        </div>
      </section>
      <section className="section tinted">
        <div className="container two-col partnership-panel-grid">
          <div className="partnership-panel"><h2>Why partner with AIPE</h2><Checklist items={reasons} /></div>
          <div className="partnership-panel"><h2>Provider readiness</h2><Checklist items={readiness} /></div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionIntro eyebrow="Partnership options" title="Flexible routes for different programmes." text="AIPE can support a small pilot, a specialist module, a community learning session or a wider provider partnership." />
          <div className="provider-capability-grid partnership-option-grid">
            {partnershipOptions.map((item) => <span key={item}><CheckCircle2 size={18} />{item}</span>)}
          </div>
        </div>
      </section>
      <section className="section tinted">
        <div className="container">
          <SectionIntro eyebrow="Featured course cards" title="Practical starting points for adult learners." text="These course areas can be delivered as standalone workshops, short cohorts or specialist modules inside a wider programme." />
          <div className="course-catalogue-grid">
            {featuredCourses.map(([title, text]) => (
              <article className="course-catalogue-card partnership-course-card" key={title}>
                <span className="course-type">Partner course</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="lead-band partner-final-band">
        <div className="container lead-band-inner">
          <div>
            <p className="eyebrow">Want to explore a partnership?</p>
            <h2>Start with a conversation.</h2>
            <p>Tell us what you are exploring, even if it is still early. Start with the learner group, programme idea or problem you are trying to solve.</p>
            <p className="partner-final-note">If useful, AIPE can then follow up with a capability statement, course sheets, tutor information or a short introductory call.</p>
          </div>
          <div className="actions">
            <Link href="/request-partnership-pack" navigate={navigate} className="button primary">Start a Partnership Conversation</Link>
            <a href="mailto:ai@aipe.uk" className="button secondary bordered">Email ai@aipe.uk</a>
          </div>
        </div>
      </section>
    </>
  );
}

function RequestPartnershipPack() {
  const organisationTypes = [
    'Council / local authority',
    'College',
    'Adult learning service',
    'Training provider',
    'Employability organisation',
    'Charity / community organisation',
    'Employer',
    'Digital inclusion partner',
    'Other'
  ];
  const interestOptions = [
    'ESOL / English for Work',
    'Digital Skills for ESOL Learners',
    'Age-Friendly Digital Confidence',
    'Refugee/Migrant Digital Inclusion',
    'AI for Jobseekers',
    'Cyber Safety / Online Safety',
    'Career-change tech pathways',
    'Employer/team training',
    'Not sure yet'
  ];
  const packIncludes = [
    'Capability statement',
    'Course sheets',
    'Tutor profile',
    'Compliance and learner support summary',
    'Delivery formats',
    'Partnership options',
    'Pricing/options if relevant',
    'Introductory call option'
  ];
  const audiences = [
    { label: 'Councils and adult learning services', icon: Building2 },
    { label: 'Colleges and training providers', icon: GraduationCap },
    { label: 'Employability providers', icon: BriefcaseBusiness },
    { label: 'Community organisations and charities', icon: Users },
    { label: 'Employers and workforce development teams', icon: Library },
    { label: 'Digital inclusion partners', icon: Network }
  ];
  const [form, setForm] = useState({
    name: '',
    organisation: '',
    role: '',
    email: '',
    phone: '',
    organisationType: '',
    interests: [],
    message: ''
  });
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    if (submitState.status !== 'idle') setSubmitState({ status: 'idle', message: '' });
  }

  function toggleInterest(interest) {
    setForm((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest]
    }));
  }

  function buildPartnershipEmailBody() {
    return [
      'Hello AIPE,',
      '',
      'I would like to start a partnership conversation with AIPE.',
      '',
      `Name: ${form.name}`,
      `Organisation: ${form.organisation}`,
      `Role/job title: ${form.role}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || 'Not provided'}`,
      `Organisation type: ${form.organisationType || 'Not selected'}`,
      `Areas of interest: ${form.interests.length ? form.interests.join(', ') : 'Not selected'}`,
      '',
      'Message / what I am looking for:',
      form.message || 'Not provided'
    ].join('\n');
  }

  function partnershipMailtoHref() {
    return `mailto:ai@aipe.uk?subject=${encodeURIComponent('Start a Partnership Conversation')}&body=${encodeURIComponent(buildPartnershipEmailBody())}`;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitState({ status: 'sending', message: 'Sending your enquiry...' });
    try {
      const response = await fetch('/api/partnership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'The enquiry could not be sent automatically.');
      setSubmitState({ status: 'sent', message: 'Thank you. AIPE has received your enquiry and will usually respond within 1-2 working days.' });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: 'Automatic sending is not connected yet. Please use the email draft below to send your enquiry.'
      });
    }
  }

  return (
    <>
      <PageHero eyebrow="Partnership conversation" title="Start a Partnership Conversation" text="Tell AIPE a little about your organisation, learner group or programme idea. We will respond personally and, where useful, share a capability statement, course sheets, tutor information or relevant partnership options." />
      <section className="section request-pack-section">
        <div className="container request-pack-layout">
          <div className="request-pack-copy">
            <SectionIntro eyebrow="For provider conversations" title="Clear information for partnership review." text="This page is for organisations exploring practical AI, digital inclusion, ESOL, cyber safety and employability-focused delivery with AIPE." />
            <div className="request-card-grid">
              {audiences.map(({ label, icon: AudienceIcon }) => (
                <article className="request-mini-card" key={label}>
                  <AudienceIcon size={20} aria-hidden="true" />
                  <span>{label}</span>
                </article>
              ))}
            </div>
            <article className="partnership-panel request-pack-includes">
              <h2>What AIPE can share where useful</h2>
              <Checklist items={packIncludes} />
            </article>
            <p className="request-contact-line">Prefer email? Contact <a href="mailto:ai@aipe.uk">ai@aipe.uk</a></p>
          </div>

          <form className="request-pack-form" onSubmit={handleSubmit}>
            {submitState.status === 'sent' ? (
              <div className="form-success-panel">
                <p className="eyebrow">Request received</p>
                <h2>Thank you. AIPE has received your enquiry.</h2>
                <p>We will usually respond within 1-2 working days.</p>
              </div>
            ) : (
              <>
                <div>
                  <p className="eyebrow">Request form</p>
                  <h2>Tell AIPE what you are exploring.</h2>
                  <p>This short form helps AIPE understand the conversation before replying personally.</p>
                </div>
                <div className="request-form-grid">
                  <label>Name<input required value={form.name} onChange={(event) => updateField('name', event.target.value)} /></label>
                  <label>Organisation<input required value={form.organisation} onChange={(event) => updateField('organisation', event.target.value)} /></label>
                  <label>Role/job title<input value={form.role} onChange={(event) => updateField('role', event.target.value)} /></label>
                  <label>Email<input required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} /></label>
                  <label>Phone optional<input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} /></label>
                  <label>Organisation type<select value={form.organisationType} onChange={(event) => updateField('organisationType', event.target.value)}><option value="">Select one</option>{organisationTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
                </div>
                <fieldset>
                  <legend>Area of interest</legend>
                  <div className="interest-grid">
                    {interestOptions.map((interest) => (
                      <label key={interest}>
                        <input type="checkbox" checked={form.interests.includes(interest)} onChange={() => toggleInterest(interest)} />
                        <span>{interest}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label>Message / what you are looking for<textarea rows="5" value={form.message} onChange={(event) => updateField('message', event.target.value)} /></label>
                <p className="privacy-note">AIPE will use your details only to respond to your enquiry. We usually respond within 1-2 working days.</p>
                {submitState.message && <p className={`form-status ${submitState.status}`}>{submitState.message}</p>}
                {submitState.status === 'error' && <a href={partnershipMailtoHref()} className="button secondary bordered">Open Email Draft</a>}
                <button className="button primary" type="submit" disabled={submitState.status === 'sending'}>{submitState.status === 'sending' ? 'Sending...' : 'Start a Partnership Conversation'}</button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function AdultLearning({ navigate }) {
  const learners = ['Adult learners', 'Jobseekers', 'Career changers', 'ESOL learners', 'Refugees and new arrivals', 'People on benefits', 'Economically disadvantaged learners', 'Employees needing digital upskilling'];
  const progression = ['Cybersecurity', 'Coding', 'IT support', 'Networking', 'Workplace automation', 'AI productivity roles'];

  return (
    <>
      <PageHero eyebrow="Online adult learning" title="Adult AI, digital skills and cyber safety." text="AIPE helps adults build useful digital confidence in plain English, with learning that connects to work, employability, everyday online life and future progression.">
        <div className="actions">
          <Link href="/courses" navigate={navigate} className="button primary">View Courses <ArrowRight size={18} /></Link>
          <Link href="/partners" navigate={navigate} className="button secondary">Delivery Partnerships</Link>
        </div>
      </PageHero>
      <section className="section adult-offer-section">
        <div className="container">
          <SectionIntro eyebrow="Adult learning offer" title="Clear, practical routes into digital confidence." text="The page is intentionally simple: it shows what learners can study, who it supports and where learners can progress next." />
          <div className="adult-offer-grid">
            <InfoCard icon={Sparkles} title="AI skills for adult learners" text="Plain-English AI fundamentals, prompting, productivity, responsible use and confidence with everyday tools." />
            <InfoCard icon={Users} title="Digital skills for ESOL learners" text="Digital vocabulary, online forms, email, job search, device confidence and safe AI-supported English practice." />
            <InfoCard icon={ShieldCheck} title="Cyber safety for life and work" text="Passwords, phishing, scams, MFA, safe browsing, data privacy and safe habits for online platforms." />
            <InfoCard icon={BriefcaseBusiness} title="Employability with AI tools" text="CVs, cover letters, interview practice, job search, LinkedIn and responsible checking of AI outputs." />
            <InfoCard icon={BookOpen} title="Returning to study" text="Supportive workshop-style learning for people who need confidence before moving into technical pathways." />
            <InfoCard icon={Workflow} title="Progression pathways" text="A foundation route towards cybersecurity, coding, IT support, networking and workplace automation." />
          </div>
        </div>
      </section>
      <section className="section tinted">
        <div className="container two-col">
          <div>
            <h2>Target learners</h2>
            <Checklist items={learners} />
          </div>
          <div>
            <h2>Progression can lead towards</h2>
            <Checklist items={progression} />
          </div>
        </div>
      </section>
      <LeadBand navigate={navigate} />
    </>
  );
}

function Courses({ navigate }) {
  return (
    <>
      <PageHero eyebrow="Courses" title="Focused AI, digital skills and cyber safety courses." text="AIPE’s course catalogue is intentionally practical and credible: a focused set of adult learning and workforce programmes that can be delivered online or in partnership where required.">
        <Link href="/contact?intent=learner" navigate={navigate} className="button primary">Request a Course Outline</Link>
      </PageHero>
      <section className="section">
        <div className="container course-catalogue-grid">
          {courseCards.map((item) => (
            <article className="course-catalogue-card" key={item.title}>
              <div>
                <span className="course-type">AIPE course</span>
                <h2>{item.title}</h2>
                <p>{item.audience}</p>
              </div>
              <div className="compact-tags">
                {item.topics.map((topic) => <span key={topic}>{topic}</span>)}
              </div>
              {item.href ? (
                <Link href={item.href} navigate={navigate} className="card-link">View full course <ArrowRight size={16} /></Link>
              ) : (
                <Link href="/contact?intent=learner" navigate={navigate} className="card-link">Request outline <ArrowRight size={16} /></Link>
              )}
            </article>
          ))}
        </div>
      </section>
      <section className="section tinted">
        <div className="container narrow">
          <h2>Qualifications and partner delivery</h2>
          <p>Can be aligned to accredited qualifications or delivered alongside a lead provider’s approved qualification route where required.</p>
          <p>AIPE does not currently claim to be an awarding body, approved centre, funded provider or regulated qualification provider.</p>
        </div>
      </section>
    </>
  );
}

function Compliance({ navigate }) {
  return (
    <>
      <PageHero eyebrow="Compliance & learner support" title="Preparing a partner-ready delivery model." text="AIPE is developing online delivery and learner support processes suitable for discussions with colleges, councils, employers, employability providers and funded-training partners.">
        <Link href="/partners" navigate={navigate} className="button primary">Discuss Partnership Delivery</Link>
      </PageHero>
      <section className="section">
        <div className="container compliance-grid">
          {complianceItems.map(([title, text]) => (
            <article className="compliance-card" key={title}>
              <ShieldCheck size={22} aria-hidden="true" />
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section tinted">
        <div className="container narrow disclaimer-panel">
          <h2>Current status</h2>
          <p>AIPE does not currently claim to be an Ofsted-regulated provider, awarding body, approved centre or funded provider. Where funded or accredited provision is required, AIPE works under the relevant lead provider, awarding organisation or funder requirements.</p>
        </div>
      </section>
    </>
  );
}

function Resources({ navigate }) {
  const learningSections = [
    {
      number: '1',
      title: 'Start with confidence',
      text: 'Plain-English AI foundations for adults, ESOL learners, jobseekers and teams who want a calm starting point.',
      items: ['What AI means in everyday language', 'Where people already meet AI online', 'What AI can help with', 'What AI cannot reliably do'],
      icon: Lightbulb
    },
    {
      number: '2',
      title: 'Use AI for real tasks',
      text: 'Practical examples for writing, planning, research, job search, interviews, learning support and workplace communication.',
      items: ['Write clearer prompts', 'Draft and improve documents', 'Prepare for interviews or meetings', 'Use AI without losing your own voice'],
      icon: Sparkles
    },
    {
      number: '3',
      title: 'Stay safe and critical',
      text: 'Guidance for checking AI answers, protecting personal data and recognising online risks such as scams, bias and deepfakes.',
      items: ['Check accuracy before using outputs', 'Know what not to share', 'Recognise scams and misleading content', 'Understand bias and fairness'],
      icon: ShieldCheck
    },
    {
      number: '4',
      title: 'Build skills for work and progression',
      text: 'Resources that connect AI and digital skills to employability, career change, provider delivery and workplace confidence.',
      items: ['Jobseekers and career changers', 'Provider and community learning', 'Team training and adoption', 'Useful next steps after basic confidence'],
      icon: BriefcaseBusiness
    }
  ];
  const [activeSection, setActiveSection] = useState(0);
  const selectedSection = learningSections[activeSection];
  const SelectedIcon = selectedSection.icon;

  return (
    <>
      <section className="resource-gateway-hero">
        <div className="container resource-gateway-top">
          <div>
            <p className="eyebrow">Resources</p>
            <h1>Practical AI resources, in plain English.</h1>
            <p>Use this hub to explore AI confidence, digital inclusion, online safety and practical work skills in a way that feels clear, human and useful.</p>
          </div>
          <div className="resource-gateway-mark">
            <Lightbulb size={28} aria-hidden="true" />
            <span>AIPE Learning</span>
          </div>
        </div>
      </section>

      <section className="resource-learning-section">
        <div className="container resource-learning-layout">
          <aside className="resource-section-menu" aria-label="Resources sections">
            <h2>Explore resources</h2>
            <ol>
              {learningSections.map((section, index) => (
                <li key={section.title}>
                  <button
                    type="button"
                    className={activeSection === index ? 'active' : ''}
                    aria-current={activeSection === index ? 'page' : undefined}
                    onClick={() => setActiveSection(index)}
                  >
                    <span>{section.number}</span>
                    {section.title}
                  </button>
                </li>
              ))}
              <li><Link href="/resources/ai-glossary" navigate={navigate}>AI glossary</Link></li>
            </ol>
          </aside>

          <div className="resource-learning-main">
            <div className="resource-active-kicker">
              <span>{selectedSection.number}</span>
              <SelectedIcon size={22} aria-hidden="true" />
              <p className="eyebrow">AIPE resource hub</p>
            </div>
            <h2>{selectedSection.title}</h2>
            <p className="lead">{selectedSection.text}</p>
            <p>This resource can help you:</p>
            <ul className="resource-learning-bullets">
              {selectedSection.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="resource-learning-note">Choose another topic from the menu to change this panel, or open the glossary for quick definitions.</p>
          </div>
        </div>
      </section>

      <section className="resource-next-band">
        <div className="container">
          <span>Useful next step</span>
          <Link href="/resources/ai-glossary" navigate={navigate}>Open the AI glossary <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}

function Glossary() {
  return (
    <>
      <PageHero eyebrow="AI Glossary" title="AI Glossary — In Plain English" text="Simple definitions for important AI terms. No hype, no unnecessary jargon." />
      <section className="section"><div className="container glossary-grid">{glossary.map(([term, definition]) => <article className="glossary-item" key={term}><h2>{term}</h2><p>{definition}</p></article>)}</div></section>
    </>
  );
}

function About() {
  const principles = [
    ['Plain English', 'Explain technology clearly so people can make informed decisions.'],
    ['Practical First', 'Learning should lead to useful action, not just awareness.'],
    ['Responsible AI', 'Use AI thoughtfully, safely and ethically.'],
    ['Human + AI', 'AI should improve human capability rather than be presented as magic.'],
    ['Continuous Learning', 'AI changes rapidly, so learning and support must evolve.']
  ];
  return (
    <>
      <PageHero eyebrow="About AIPE" title="Making AI understandable and practical." text="AI is changing work quickly, but much of the information around it is overly technical, full of hype or difficult to apply. AIPE exists to make AI clearer, safer and more useful." />
      <section className="section"><div className="container split"><div><h2>Our mission</h2><p>AIPE helps people and organisations understand AI, use it responsibly and apply it to real work through training, corporate upskilling, funded training delivery support and practical AI engineering.</p><h2>How we work</h2><p>The long-term model is simple: teach people how to use AI, then help organisations apply it through automation, agents, knowledge systems, integrations and managed support.</p><h2>How we teach</h2><p>We explain concepts in plain English, use realistic workplace tasks and connect learning to action.</p></div><div className="principles">{principles.map(([title, text]) => <InfoCard key={title} icon={CheckCircle2} title={title} text={text} />)}</div></div></section>
    </>
  );
}

function Contact({ navigate }) {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [contactSubmitState, setContactSubmitState] = useState({ status: 'idle', message: '' });
  const contactRoutes = [
    {
      icon: Building2,
      title: 'Training & partnerships',
      text: 'For councils, colleges, providers, community organisations, employers and digital inclusion partners.',
      href: '/request-partnership-pack',
      action: 'Start a partnership conversation'
    },
    {
      icon: BriefcaseBusiness,
      title: 'AI consultancy & automation',
      text: 'For employers and teams exploring AI training, automation, agents, RAG, workflows or managed support.',
      href: '/ai-consultancy',
      action: 'Explore consultancy'
    },
    {
      icon: GraduationCap,
      title: 'Learner enquiries',
      text: 'For adult learners, jobseekers, career changers and people interested in practical AI or digital skills.',
      href: '/learn',
      action: 'Explore learning'
    }
  ];
  const whatsappMessage = 'Hello AIPE, I would like to make an enquiry.';
  const whatsappHref = `https://wa.me/447708910946?text=${encodeURIComponent(whatsappMessage)}`;
  const contactEmailBody = [
    'Hello AIPE,',
    '',
    'I would like to make an enquiry.',
    '',
    `Name: ${contactForm.name}`,
    `Email: ${contactForm.email}`,
    `Phone: ${contactForm.phone || 'Not provided'}`,
    '',
    'Message:',
    contactForm.message || 'Not provided'
  ].join('\n');
  const contactMailtoHref = `mailto:ai@aipe.uk?subject=${encodeURIComponent('AIPE enquiry')}&body=${encodeURIComponent(contactEmailBody)}`;

  function updateContactField(field, value) {
    setContactForm((current) => ({ ...current, [field]: value }));
    if (contactSubmitState.status !== 'idle') setContactSubmitState({ status: 'idle', message: '' });
  }

  async function handleContactSubmit(event) {
    event.preventDefault();
    setContactSubmitState({ status: 'sending', message: 'Sending your enquiry...' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'The enquiry could not be sent automatically.');
      setContactSubmitState({ status: 'sent', message: 'Thank you. AIPE has received your enquiry and will usually respond within 1-2 working days.' });
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setContactSubmitState({
        status: 'error',
        message: 'Automatic sending is not connected yet. Please use the email draft below to send your enquiry.'
      });
    }
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Start the right conversation with AIPE." text="Whether you are exploring learner support, provider partnerships or AI consultancy, choose the route that best matches your enquiry.">
        <form className="contact-hero-form" onSubmit={handleContactSubmit}>
          {contactSubmitState.status === 'sent' ? (
            <div className="form-success-panel compact">
              <p className="eyebrow">Enquiry received</p>
              <h2>Thank you. AIPE has received your enquiry.</h2>
              <p>We will usually respond within 1-2 working days.</p>
            </div>
          ) : (
            <>
              <p className="eyebrow">Company enquiry</p>
              <label>Name<input required value={contactForm.name} onChange={(event) => updateContactField('name', event.target.value)} /></label>
              <label>Email<input required type="email" value={contactForm.email} onChange={(event) => updateContactField('email', event.target.value)} /></label>
              <label>Phone<input value={contactForm.phone} onChange={(event) => updateContactField('phone', event.target.value)} /></label>
              <label>Message<textarea required rows="3" value={contactForm.message} onChange={(event) => updateContactField('message', event.target.value)} /></label>
              {contactSubmitState.message && <p className={`form-status ${contactSubmitState.status}`}>{contactSubmitState.message}</p>}
              {contactSubmitState.status === 'error' && <a className="button secondary bordered" href={contactMailtoHref}>Open Email Draft</a>}
              <button className="button primary" type="submit" disabled={contactSubmitState.status === 'sending'}>{contactSubmitState.status === 'sending' ? 'Sending...' : 'Send Enquiry'}</button>
            </>
          )}
        </form>
      </PageHero>
      <section className="section contact-section">
        <div className="container contact-layout">
          <aside className="contact-panel">
            <p className="eyebrow">Contact AIPE</p>
            <h2>Speak to us directly.</h2>
            <p>For general enquiries, partnership conversations or AI consultancy questions, email AIPE and we will reply personally.</p>
            <div className="contact-methods">
              <a href="mailto:ai@aipe.uk">
                <Mail size={22} aria-hidden="true" />
                <span>
                  <strong>Email</strong>
                  ai@aipe.uk
                </span>
              </a>
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageIcon size={22} aria-hidden="true" />
                <span>
                  <strong>WhatsApp</strong>
                  +44 7708 910946
                </span>
              </a>
            </div>
            <p className="contact-note">AIPE usually responds within 1-2 working days. Please avoid sending sensitive personal data until an appropriate arrangement is in place.</p>
          </aside>

          <div className="contact-route-area">
            <SectionIntro eyebrow="Choose a route" title="Help us understand what you need." text="The quickest way to reach the right conversation is to start with the route closest to your situation." />
            <div className="contact-route-grid">
              {contactRoutes.map(({ icon: Icon, title, text, href, action }) => (
                <article className="contact-route-card" key={title}>
                  <Icon size={24} aria-hidden="true" />
                  <div>
                    <h2>{title}</h2>
                    <p>{text}</p>
                    <Link href={href} navigate={navigate} className="card-link">{action} <ArrowRight size={16} /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LeadForm({ title, fields }) {
  return <form className="lead-form" onSubmit={(e) => e.preventDefault()}><h2>{title}</h2><p>Submissions are currently prepared for front-end capture only. Connect to email, CRM or a form service before public launch.</p>{fields.map((field) => <label key={field}>{field}{field === 'Message' || field.includes('needs') || field.includes('usage') || field.includes('process') || field.includes('outcome') || field.includes('delivery') ? <textarea rows="3" /> : <input type={field === 'Email' ? 'email' : 'text'} />}</label>)}<button className="button primary" type="submit">Prepare Enquiry</button></form>;
}

function Sectors() {
  return <><PageHero eyebrow="Sectors" title="A future-ready sector structure." text="These pages are scaffolded for expansion without creating thin placeholder content." /><section className="section"><div className="container category-grid">{sectors.map((sector) => <article className="card" key={sector}><h2>{sector}</h2><p>Future content can cover AI skills, automation opportunities, AI solutions, relevant training and a sector AI plan CTA.</p></article>)}</div></section></>;
}

function Qualifications() {
  return <><PageHero eyebrow="Qualifications" title="Clear distinction between training and future regulated pathways." text="AIPE can support professional training now, while keeping space for recognised regulated qualification data if approvals are secured later." /><section className="section"><div className="container three-col"><InfoCard icon={BookOpen} title="AIPE Training" text="AIPE-developed professional training for practical AI capability." /><InfoCard icon={ClipboardCheck} title="Certificates of Completion" text="Can be used for internal or non-regulated programmes where appropriate." /><InfoCard icon={Lock} title="Regulated Qualifications" text="A future area only if awarding-body partnerships or approvals are secured." /></div></section><section className="section tinted"><div className="container narrow"><h2>Future data model</h2><TagList items={['Awarding organisation', 'Qualification number', 'Level', 'Guided learning hours', 'Total qualification time', 'Assessment method', 'Units', 'Eligibility', 'Funding status']} /></div></section></>;
}

function LearnerAIPlatform({ navigate }) {
  const learnerTools = [
    ['Lessons', 'Structured lessons for AI basics, prompting, productivity, automation and responsible use.'],
    ['Assessments', 'Practical tasks where learners show how AI can improve a real workplace activity.'],
    ['Progress', 'Individual progress charts, next lessons, completion status and saved resources.'],
    ['Certificates', 'Completion records for AIPE professional training when certificate rules are approved.']
  ];

  return (
    <>
      <section className="learner-platform-hero">
        <div className="container learner-platform-grid">
          <div>
            <p className="eyebrow">Learner AI</p>
            <h1>Your personal AI learning workspace.</h1>
            <p className="lead">A future learner area for practical AI lessons, assessments, progress tracking, feedback and completion records, designed for individuals building confidence for real work.</p>
            <div className="actions">
              <Link href="/lms" navigate={navigate} className="button primary">Learner Login</Link>
              <Link href="/learn" navigate={navigate} className="button secondary">Explore Courses</Link>
            </div>
          </div>
          <LearnerWorkspaceMock />
        </div>
      </section>
      <section className="section">
        <div className="container learner-product-grid">
          <div>
            <SectionIntro eyebrow="What learners can do" title="Everything organised around progress." text="Learner AI should feel simple: know what to study next, complete practical tasks, receive feedback and see progress build over time." />
            <div className="learner-tool-list">
              {learnerTools.map(([title, text]) => <article key={title}><strong>{title}</strong><p>{text}</p></article>)}
            </div>
          </div>
          <ProgressPanel />
        </div>
      </section>
      <section className="section tinted">
        <div className="container">
          <SectionIntro eyebrow="Learning flow" title="From lesson to evidence to feedback." text="The platform is designed to support practical learning rather than passive course watching." />
          <div className="learner-flow-grid">
            <InfoCard icon={BookOpen} title="Learn" text="Short lessons explain the idea in plain English and show how it applies to work." />
            <InfoCard icon={Zap} title="Practise" text="Learners use prompts and AI tools on realistic workplace activities." />
            <InfoCard icon={ClipboardCheck} title="Submit" text="Assessments capture the practical project, reflection and evidence." />
            <InfoCard icon={MessageIcon} title="Improve" text="Feedback helps learners refine outputs, check risks and build confidence." />
          </div>
          <p className="future-note">Frontend preview only: live accounts, uploads, assessment records, certificates and permissions require backend implementation.</p>
        </div>
      </section>
    </>
  );
}

function MessageIcon(props) {
  return <Mail {...props} />;
}

function LearnerLoginPage({ navigate }) {
  const [learnerLogin, setLearnerLogin] = useState({
    email: '',
    accessCode: ''
  });
  const [rememberLearner, setRememberLearner] = useState(false);
  const [rememberedAccess, setRememberedAccess] = useState(null);
  const [learnerLoginState, setLearnerLoginState] = useState({
    status: 'idle',
    message: ''
  });

  useEffect(() => {
    try {
      const storedRememberedAccess = window.localStorage.getItem(rememberedLearnerAccessStorageKey);
      if (storedRememberedAccess) {
        const parsedAccess = JSON.parse(storedRememberedAccess);
        setRememberedAccess(parsedAccess);
        setLearnerLogin((current) => ({ ...current, email: parsedAccess.email || '' }));
      }
    } catch {
      // If browser storage is blocked, the normal sign-in flow still works.
    }
  }, []);

  function updateLearnerLogin(field, value) {
    setLearnerLogin((current) => ({ ...current, [field]: value }));
    if (learnerLoginState.status !== 'idle') setLearnerLoginState({ status: 'idle', message: '' });
  }

  async function handleLearnerLogin(event) {
    event.preventDefault();
    setLearnerLoginState({ status: 'sending', message: 'Checking learner access...' });

    try {
      const learnerAccessEndpoint = ['127.0.0.1', 'localhost'].includes(window.location.hostname)
        ? 'https://aipe.uk/api/learner-access'
        : '/api/learner-access';
      const response = await fetch(learnerAccessEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(learnerLogin)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || 'Learner access could not be checked.');
      }

      const learnerCourses = Array.isArray(result.courses) && result.courses.length
        ? result.courses
        : result.course
          ? [{ course: result.course, status: 'Active' }]
          : [];
      const learnerAccess = JSON.stringify({
        email: learnerLogin.email,
        learnerName: result.learnerName || '',
        course: learnerCourses[0]?.course || result.course || '',
        courses: learnerCourses,
        signedInAt: new Date().toISOString()
      });

      setLearnerLoginState({ status: 'sent', message: 'Access confirmed. Opening your learner portal...' });
      window.sessionStorage.setItem(learnerAccessStorageKey, learnerAccess);
      if (rememberLearner) {
        window.localStorage.setItem(rememberedLearnerAccessStorageKey, learnerAccess);
      } else {
        window.localStorage.removeItem(rememberedLearnerAccessStorageKey);
      }
      window.location.assign('/lms');
    } catch (error) {
      setLearnerLoginState({
        status: 'error',
        message: error.message || 'We could not find active learner access for those details.'
      });
    }
  }

  function continueWithRememberedAccess() {
    try {
      window.sessionStorage.setItem(learnerAccessStorageKey, JSON.stringify(rememberedAccess));
      window.location.assign('/lms');
    } catch {
      setLearnerLoginState({
        status: 'error',
        message: 'This browser could not open the remembered learner access. Please sign in again.'
      });
    }
  }

  function forgetRememberedAccess() {
    try {
      window.localStorage.removeItem(rememberedLearnerAccessStorageKey);
      window.sessionStorage.removeItem(learnerAccessStorageKey);
    } catch {
      // If storage is blocked, still reset the visible page state.
    }

    setRememberedAccess(null);
    setRememberLearner(false);
    setLearnerLogin({ email: '', accessCode: '' });
    setLearnerLoginState({ status: 'idle', message: '' });
  }

  return (
    <section className="learner-login-page">
      <div className="learner-login-shell">
        <div className="learner-login-brands">
          <Link href="/" navigate={navigate} className="login-brand-card" aria-label="AIPE home">
            <img src="/aipe-logo-main-lockup.png" alt="AIPE - AI in Plain English" />
          </Link>
          <div className="login-product-card">
            <GraduationCap size={28} />
            <div>
              <strong>Learner Portal</strong>
              <span>AIPE Academy</span>
            </div>
          </div>
        </div>

        <article className="learner-login-card">
          <p>Sign in to continue your AIPE course. Use the email address provided when you joined your programme or learner cohort.</p>
          {rememberedAccess && (
            <div className="remembered-learner-panel">
              <span>Remembered on this device</span>
              <strong>{rememberedAccess.learnerName || rememberedAccess.email || 'Learner'}</strong>
              <div>
                <button className="button secondary bordered" type="button" onClick={continueWithRememberedAccess}>Continue as {getLearnerFirstName(rememberedAccess.learnerName)}</button>
                <button className="remembered-learner-clear" type="button" onClick={forgetRememberedAccess}>Use another learner</button>
              </div>
            </div>
          )}
          <form onSubmit={handleLearnerLogin}>
            <label htmlFor="learner-email">Email</label>
            <input id="learner-email" type="email" placeholder="you@example.com" autoComplete="email" required value={learnerLogin.email} onChange={(event) => updateLearnerLogin('email', event.target.value)} />
            <label htmlFor="learner-access-code">Access code</label>
            <input id="learner-access-code" type="password" placeholder="Enter your access code" autoComplete="one-time-code" required value={learnerLogin.accessCode} onChange={(event) => updateLearnerLogin('accessCode', event.target.value)} />
            <label className="remember-device">
              <input type="checkbox" checked={rememberLearner} onChange={(event) => setRememberLearner(event.target.checked)} />
              <span>
                <strong>Remember me</strong>
                <small>Only use this on a device you trust.</small>
              </span>
            </label>
            {learnerLoginState.message && <p className={`learner-login-status ${learnerLoginState.status}`}>{learnerLoginState.message}</p>}
            <button className="button login-magic-link" type="submit" disabled={learnerLoginState.status === 'sending'}>
              {learnerLoginState.status === 'sending' ? 'Checking access...' : 'Continue to Learner Portal'}
            </button>
          </form>
          <Link href="/contact" navigate={navigate} className="login-request-link">Need learner access? Contact AIPE</Link>
        </article>

        <div className="learner-login-feature-grid">
          <article>
            <span><BookOpen size={18} /> Course Access</span>
            <h2>Everything for your current course</h2>
            <p>Continue lessons, view resources, prepare evidence and see what needs attention next.</p>
          </article>
          <article>
            <span><CircleGauge size={18} /> Progress Workspace</span>
            <h2>Clear progress without clutter</h2>
            <p>Track modules, assessment status, saved resources and completion steps in one calm place.</p>
          </article>
        </div>

        <footer className="learner-login-footer">
          <strong>AIPE</strong>
          <span><Link href="/" navigate={navigate}>Home</Link> · <Link href="/contact" navigate={navigate}>Support</Link></span>
        </footer>
      </div>
    </section>
  );
}

function LearnerWorkspaceMock() {
  return (
    <article className="learner-workspace">
      <div className="workspace-top">
        <span>AIPE LMS</span>
        <strong>Practical AI Skills for Work</strong>
      </div>
      <div className="workspace-body">
        <div className="lesson-panel">
          <span>Next lesson</span>
          <h2>AI for meetings, notes and summaries</h2>
          <WorkflowVisual steps={['Watch', 'Try', 'Submit', 'Reflect']} />
        </div>
        <div className="workspace-side">
          <div><strong>68%</strong><span>Course progress</span></div>
          <div><strong>1</strong><span>Assessment due</span></div>
          <div><strong>3</strong><span>Saved resources</span></div>
        </div>
      </div>
      <div className="workspace-tabs">
        <span>Lessons</span>
        <span>Assessment</span>
        <span>Feedback</span>
        <span>Certificate</span>
      </div>
    </article>
  );
}

function LoginMock({ title, text }) {
  return (
    <article className="login-mock">
      <Lock size={22} />
      <h2>{title}</h2>
      <p>{text}</p>
      <label>Email</label>
      <span className="input-placeholder">name@example.com</span>
      <label>Password</label>
      <span className="input-placeholder">********</span>
      <button type="button" className="button primary">Preview Access</button>
    </article>
  );
}

function ProgressPanel() {
  return (
    <article className="progress-panel">
      <div className="progress-ring" aria-label="68 percent course progress"><strong>68%</strong><span>complete</span></div>
      <div>
        <p className="eyebrow">Current course</p>
        <h3>Practical AI Skills for Work</h3>
        <p>Next lesson: AI for meetings, notes and summaries</p>
        <div className="progress-bars">
          <span style={{ '--value': '100%' }}><b>Understanding AI</b></span>
          <span style={{ '--value': '86%' }}><b>Prompting</b></span>
          <span style={{ '--value': '58%' }}><b>Everyday work</b></span>
          <span style={{ '--value': '24%' }}><b>Automation</b></span>
        </div>
      </div>
    </article>
  );
}

function ProtectedSkeleton({ kind }) {
  return kind === 'lms' ? <LearnerDashboard /> : <EngineerDashboard />;
}

function getStoredLearnerAccess() {
  if (typeof window === 'undefined') return null;

  try {
    const storedAccess = window.sessionStorage.getItem(learnerAccessStorageKey)
      || window.localStorage.getItem(rememberedLearnerAccessStorageKey);
    return JSON.parse(storedAccess || 'null');
  } catch {
    return null;
  }
}

function getLearnerFirstName(name) {
  return String(name || '').trim().split(/\s+/)[0] || 'Learner';
}

function normalizeLearnerCourses(access) {
  if (Array.isArray(access?.courses) && access.courses.length) {
    return access.courses;
  }

  if (access?.course) {
    return [{ course: access.course, status: 'Active' }];
  }

  return [];
}

function LearnerDashboard() {
  const learnerAccess = getStoredLearnerAccess();
  const learnerName = learnerAccess?.learnerName || '';
  const learnerCourses = normalizeLearnerCourses(learnerAccess);
  const courseCount = learnerCourses.length;

  return (
    <main className="lms-flavour-page">
      <section className="lms-flavour-hero">
        <div className="container lms-hero-grid">
          <div>
            <p className="eyebrow">Learner dashboard</p>
            <h1>Welcome, {getLearnerFirstName(learnerName)}.</h1>
            <p className="lead">
              {courseCount
                ? 'Your active AIPE course access is ready. Continue from your course card below, review your next steps and keep your learning evidence in one calm place.'
                : 'Sign in through the learner portal to view your active AIPE course access, resources and next steps.'}
            </p>
            <div className="actions">
              <a href="#my-courses" className="button primary">View My Courses <Play size={18} /></a>
              <a href="/contact" className="button secondary bordered">Learner Support</a>
            </div>
          </div>
          <LearnerWorkspaceMock />
        </div>
      </section>
      <section className="section lms-dashboard-section">
        <div className="container dashboard-layout">
          <aside className="dashboard-nav">{protectedPages.lms.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>)}</aside>
          <div className="dashboard-main">
            <div className="dashboard-stats"><Stat label="Active courses" value={courseCount || '0'} /><Stat label="Portal access" value={courseCount ? 'Active' : 'Login'} /><Stat label="Next step" value={courseCount ? 'Continue' : 'Sign in'} /></div>
            <div className="lms-focus-grid">
              <ProgressPanel />
              <LearnerSupportPanel />
            </div>
            <article className="dashboard-panel lms-course-panel" id="my-courses"><h2>My Courses</h2><LearnerCourseCards courses={learnerCourses} /></article>
            <LessonPlayerPanel />
            <AssessmentPanel />
            <article className="dashboard-panel certificate-panel" id="certificates"><h2>Certificates / Completion</h2><p>Certificate preview unlocks when all required lessons, evidence and tutor sign-off are complete.</p><div className="certificate-preview"><span>AIPE</span><strong>Certificate of Completion</strong><small>Practical AI Skills for Work</small></div></article>
          </div>
        </div>
      </section>
    </main>
  );
}

function LearnerCourseCards({ courses }) {
  if (!courses.length) {
    return (
      <div className="learner-course-empty">
        <strong>No active course access found in this session.</strong>
        <span>Please sign in again with the email and access code provided by AIPE, or contact AIPE if you believe this is incorrect.</span>
        <a href="/learner-ai" className="button secondary bordered">Back to Learner Login</a>
      </div>
    );
  }

  return (
    <div className="learner-course-grid">
      {courses.map((course, index) => (
        <article className="learner-course-card" key={`${course.course || 'course'}-${index}`}>
          <span className="learner-course-kicker">Course {index + 1}</span>
          <h3>{course.course || 'AIPE course'}</h3>
          <div className="learner-course-meta">
            <span><strong>Status</strong>{course.status || 'Active'}</span>
            {course.startDate && <span><strong>Start</strong>{course.startDate}</span>}
            {course.endDate && <span><strong>End</strong>{course.endDate}</span>}
          </div>
          {course.notes && <p>{course.notes}</p>}
          <a href="#lesson-view" className="button secondary bordered">Continue course</a>
        </article>
      ))}
    </div>
  );
}

function LearnerSupportPanel() {
  return (
    <article className="dashboard-panel support-panel" id="support">
      <div><span className="mentor-avatar">AI</span><p className="eyebrow">Tutor note</p></div>
      <h2>Good start. Strengthen your evidence with one real workplace example.</h2>
      <p>Next action: add a before-and-after prompt example and explain how you checked accuracy, privacy and bias.</p>
      <TagList items={['Evidence', 'Reflection', 'Responsible use']} />
    </article>
  );
}

function LessonPlayerPanel() {
  return (
    <article className="dashboard-panel lesson-player-panel" id="lesson-view">
      <div className="lesson-player">
        <div className="lesson-video">
          <Play size={34} />
          <span>Lesson 3.2</span>
          <strong>AI for meetings, notes and summaries</strong>
        </div>
        <div className="lesson-outline">
          <p className="eyebrow">Today</p>
          <h2>Turn messy notes into useful work outputs.</h2>
          <p>Watch the lesson, try the guided prompt, then upload a short reflection on where AI helped and where human checking mattered.</p>
          <WorkflowVisual steps={['Watch lesson', 'Try prompt', 'Save output', 'Reflect', 'Submit']} />
        </div>
      </div>
    </article>
  );
}

function AssessmentPanel() {
  return (
    <article className="dashboard-panel assessment-panel" id="assessments">
      <div>
        <p className="eyebrow">Assessment due</p>
        <h2>Workplace AI improvement project</h2>
        <p>Identify one repeated task, show the prompt or workflow you tested, and explain the checks needed before using the output at work.</p>
      </div>
      <div className="assessment-checklist">
        {['Task chosen', 'Prompt draft saved', 'Evidence upload needed', 'Tutor feedback pending'].map((item, index) => (
          <span key={item} className={index < 2 ? 'done' : ''}><CheckCircle2 size={18} />{item}</span>
        ))}
      </div>
    </article>
  );
}

function EngineerDashboard() {
  return (
    <>
      <PageHero eyebrow="AI engineer / assessor area" title="Progress review dashboard preview." text="Frontend-only view for checking learner progress, assessment evidence, feedback, cohorts and employer reporting. Live permissions and data are future backend work." />
      <section className="section">
        <div className="container dashboard-layout">
          <aside className="dashboard-nav">{protectedPages.admin.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>)}</aside>
          <div className="dashboard-main">
            <div className="dashboard-stats"><Stat label="Active learners" value="24" /><Stat label="Reviews due" value="7" /><Stat label="At risk" value="3" /></div>
            <article className="dashboard-panel" id="assessment-review"><h2>Assessment Review</h2><LearnerTable /></article>
            <article className="dashboard-panel" id="progress-reports"><h2>Progress Reports</h2><ProgressPanel /></article>
            <article className="dashboard-panel" id="tutor-assessor-feedback"><h2>Tutor / Assessor Feedback</h2><p>Structured comments, improvement actions and sign-off states will sit here once backend records are connected.</p></article>
          </div>
        </div>
      </section>
    </>
  );
}

function CourseProgressList() {
  return <div className="course-progress-list">{['Understanding AI', 'Prompting', 'AI for Everyday Work', 'AI Automation', 'AI Agents', 'Responsible AI'].map((item, index) => <span key={item}><b>Module {index + 1}</b>{item}<em>{index < 2 ? 'Complete' : index === 2 ? 'In progress' : 'Locked'}</em></span>)}</div>;
}

function LearnerTable() {
  const rows = [
    ['A. Patel', '82%', 'Project draft', 'On track'],
    ['S. Williams', '61%', 'Evidence missing', 'Needs support'],
    ['M. Khan', '74%', 'Feedback due', 'Review'],
    ['J. Clarke', '39%', 'Not started', 'At risk']
  ];
  return <div className="learner-table">{rows.map(([name, progress, assessment, status]) => <div key={name}><strong>{name}</strong><span>{progress}</span><span>{assessment}</span><em>{status}</em></div>)}</div>;
}

function Stat({ label, value }) {
  return <div className="stat"><strong>{value}</strong><span>{label}</span></div>;
}

function AcademyModel() {
  return <section className="section"><div className="container"><SectionIntro eyebrow="Learning structure" title="Built for future academies." text="The hierarchy supports future learning areas without exposing unfinished academies as if they already exist." /><WorkflowVisual steps={['Home', 'Learning Area', 'Academy / Subject', 'Course', 'Module', 'Lesson', 'Assessment', 'Completion']} /><TagList items={['AI Academy', 'Digital Skills Academy', 'Automation Academy', 'Business Technology Academy']} /></div></section>;
}

function BusinessProcess({ navigate }) {
  return <section className="section"><div className="container"><SectionIntro eyebrow="Business pathway" title="Understand → Train → Automate → Build → Improve" text="A practical adoption route for organisations that need clarity before implementation." /><div className="process-grid">{['Understand', 'Train', 'Automate', 'Build', 'Improve'].map((step) => <article key={step}><span>{step}</span></article>)}</div><div className="actions centred"><Link href="/contact?intent=project" navigate={navigate} className="button primary">Discuss an AI Project</Link><Link href="/corporate-ai-training" navigate={navigate} className="button secondary">Request AI Training Plan</Link></div></div></section>;
}

function LeadBand({ navigate }) {
  return <section className="lead-band"><div className="container lead-band-inner"><div><p className="eyebrow">Next step</p><h2>Start with a clear conversation.</h2><p>Tell AIPE whether you want to learn, train a team, automate a process, build a system or explore a delivery partnership.</p></div><Link href="/contact" navigate={navigate} className="button primary">Book a Consultation <ArrowRight size={18} /></Link></div></section>;
}

function AutomationAgentVisual() {
  const manualItems = [
    { label: 'Emails', icon: Mail },
    { label: 'Forms', icon: FileText },
    { label: 'CRM notes', icon: ClipboardCheck },
    { label: 'Spreadsheets', icon: Library }
  ];
  const outcomes = [
    { label: 'CRM updated', icon: CheckCircle2 },
    { label: 'Task created', icon: Target },
    { label: 'Reply drafted', icon: Mail },
    { label: 'Team notified', icon: Users }
  ];
  const agentTools = ['Knowledge base', 'Business rules', 'APIs', 'Human approval'];

  return (
    <main className="agent-demo-page">
      <section className="agent-demo-hero">
        <div className="container">
          <p className="eyebrow">Visual prototype</p>
          <h1>AI automation should feel controlled, not mysterious.</h1>
          <p className="lead">AIPE turns repeated work into clear workflows, with AI agents that use the right tools, follow rules and keep people in control.</p>
          <div className="agent-demo-board" aria-label="AIPE automation and AI agent visual explanation">
            <div className="agent-column manual-column">
              <span className="agent-column-label">Before</span>
              <h2>Manual work</h2>
              <p>Repeated admin across disconnected tools.</p>
              <div className="agent-stack">
                {manualItems.map(({ label, icon: Icon }) => (
                  <span key={label}><Icon size={18} />{label}</span>
                ))}
              </div>
            </div>

            <div className="agent-engine">
              <div className="agent-rings" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="agent-core">
                <small>AIPE</small>
                <strong>Workflow + Agent</strong>
                <p>Reads, decides, acts and escalates within agreed rules.</p>
              </div>
              <div className="agent-tool-grid">
                {agentTools.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </div>

            <div className="agent-column outcome-column">
              <span className="agent-column-label">After</span>
              <h2>Useful outcomes</h2>
              <p>Work is completed, checked and visible.</p>
              <div className="agent-stack">
                {outcomes.map(({ label, icon: Icon }) => (
                  <span key={label}><Icon size={18} />{label}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="agent-example-flow">
            {['Email arrives', 'AI understands request', 'Information extracted', 'CRM updated', 'Human approves', 'Reply prepared'].map((step, index) => (
              <React.Fragment key={step}>
                <span>{step}</span>
                {index < 5 && <ArrowRight size={18} aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function TrailerStoryboard() {
  const scenes = [
    {
      time: '00:00',
      title: 'The Organisation',
      caption: 'A team is busy with repeated admin, scattered tools and unclear AI options.',
      visual: 'Wide office shot: inboxes, spreadsheets, forms and dashboards floating around the team.',
      icon: Building2
    },
    {
      time: '00:08',
      title: 'AIPE Engineer Arrives',
      caption: 'An AIPE engineer walks in, listens first and explains the opportunity in plain English.',
      visual: 'Clearly tagged AIPE engineer enters the organisation with a calm diagnostic dashboard.',
      icon: BriefcaseBusiness
    },
    {
      time: '00:16',
      title: 'Diagnose the Work',
      caption: 'The team maps what should be taught, improved, automated or built.',
      visual: 'Tasks are sorted into four lanes: Learn AI, Train Teams, Automate Work, Build Systems.',
      icon: Search
    },
    {
      time: '00:25',
      title: 'Teach and Train',
      caption: 'People learn practical AI skills, prompting, productivity and responsible use.',
      visual: 'Workshop-style learning: live examples, tasks, assessments and visible progress.',
      icon: GraduationCap
    },
    {
      time: '00:36',
      title: 'Automate the Repetition',
      caption: 'Everyday processes become clear workflows with human approval where needed.',
      visual: 'Email arrives, AI extracts data, CRM updates, task is created, reply is drafted.',
      icon: Workflow
    },
    {
      time: '00:50',
      title: 'Build the System',
      caption: 'Agents, RAG, APIs and integrations support the organisation’s real work.',
      visual: 'Finished AI operations dashboard resolves into: AIPE - AI in Plain English.',
      icon: Layers3
    }
  ];

  return (
    <main className="storyboard-page">
      <section className="storyboard-hero">
        <div className="container storyboard-grid">
          <div>
            <p className="eyebrow">Trailer storyboard</p>
            <h1>An AIPE engineer walks in and fixes the work.</h1>
            <p className="lead">This trailer concept makes the service tangible: an AIPE engineer enters an organisation, finds the repetitive work, teaches the team, designs the workflow and helps build the system.</p>
            <div className="storyboard-actions">
              <span>Designed as a visual brief before production</span>
              <span>No production deployment yet</span>
            </div>
          </div>

          <div className="storyboard-preview" aria-label="Animated AIPE trailer storyboard preview">
            <div className="preview-toolbar">
              <span />
              <span />
              <span />
              <strong>AIPE Trailer Preview</strong>
            </div>
            <div className="preview-stage">
              <div className="engineer-tag" aria-hidden="true">
                <span>AIPE</span>
                <strong>AI Engineer</strong>
              </div>
              <div className="engineer-figure" aria-hidden="true">
                <span className="figure-head" />
                <span className="figure-body" />
                <span className="figure-badge">AIPE</span>
              </div>
              {scenes.map(({ title, caption, icon: Icon }, index) => (
                <article className="preview-scene" style={{ '--scene-index': index }} key={title}>
                  <div className="preview-orbit" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="preview-icon"><Icon size={30} /></span>
                  <h2>{title}</h2>
                  <p>{caption}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="storyboard-strip">
        <div className="container">
          <div className="scene-rail">
            {scenes.map(({ time, title, caption, visual, icon: Icon }, index) => (
              <article className="scene-card" key={title}>
                <div className="scene-card-top">
                  <span>{time}</span>
                  <Icon size={22} />
                </div>
                <h2>{index + 1}. {title}</h2>
                <p>{caption}</p>
                <small>{visual}</small>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ScreenPreview() {
  const screens = [
    { label: 'Mobile', size: '390 x 844', width: 390, height: 844, scale: 0.74 },
    { label: 'Tablet', size: '768 x 900', width: 768, height: 900, scale: 0.52 },
    { label: 'Laptop', size: '1280 x 720', width: 1280, height: 720, scale: 0.38 },
    { label: 'Large screen', size: '1920 x 1080', width: 1920, height: 1080, scale: 0.28 }
  ];

  return (
    <main className="screen-preview-page">
      <section className="screen-preview-hero">
        <div className="container">
          <p className="eyebrow">Local design check</p>
          <h1>AIPE responsive screen preview.</h1>
          <p className="lead">Compare the homepage hero across common screen sizes before pushing changes live.</p>
          <div className="actions">
            <Link href="/" className="button primary">Open Homepage <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="screen-preview-grid-section">
        <div className="screen-preview-grid">
          {screens.map((screen) => (
            <article className="screen-frame-card" key={screen.label}>
              <div className="screen-frame-meta">
                <div>
                  <h2>{screen.label}</h2>
                  <p>{screen.size}</p>
                </div>
                <a href="/" target="_blank" rel="noreferrer">Open</a>
              </div>
              <div className="screen-frame-shell">
                <iframe
                  title={`Homepage preview - ${screen.label}`}
                  src="/"
                  width={screen.width}
                  height={screen.height}
                  style={{
                    '--preview-width': `${screen.width}px`,
                    '--preview-height': `${screen.height}px`,
                    '--preview-scale': screen.scale
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function InfoCard({ icon: Icon, title, text }) {
  return <article className="card info-card"><Icon size={24} /><h3>{title}</h3><p>{text}</p></article>;
}

function PageHero({ eyebrow, title, text, children }) {
  return <section className="page-hero"><div className="container page-hero-inner"><Breadcrumbs /><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{text}</p>{children}</div></section>;
}

function Breadcrumbs() {
  const crumbs = breadcrumbsFor(window.location.pathname);
  if (crumbs.length < 2) return null;
  return <nav className="breadcrumbs" aria-label="Breadcrumb">{crumbs.map((crumb, index) => <React.Fragment key={crumb.href}>{index > 0 && <span>/</span>}<a href={crumb.href}>{crumb.label}</a></React.Fragment>)}</nav>;
}

function NotFound({ navigate }) {
  return <PageHero eyebrow="Page not found" title="This page is not available yet." text="The AIPE platform is structured for growth, but this address does not have a public page in the current release."><Link href="/" navigate={navigate} className="button primary">Return Home</Link></PageHero>;
}

function resolvePage(path) {
  if (path === '/') return HomeGateway;
  if (path === '/ai-consultancy') return Home;
  if (path === '/learn') return LearnIndividual;
  if (path === '/adult-learning') return AdultLearning;
  if (path === '/courses') return Courses;
  if (path === '/learner-ai') return LearnerLoginPage;
  if (path === course.href) return CoursePage;
  if (path === '/for-business') return Business;
  if (path === '/corporate-ai-training') return CorporateTraining;
  if (path === '/ai-solutions') return SolutionsHub;
  if (path === '/partners') return Partners;
  if (path === '/request-partnership-pack') return RequestPartnershipPack;
  if (path === '/compliance') return Compliance;
  if (path === '/resources') return Resources;
  if (path === '/resources/ai-glossary') return Glossary;
  if (path === '/about') return About;
  if (path === '/contact') return Contact;
  if (path === '/sectors') return Sectors;
  if (path === '/qualifications') return Qualifications;
  if (path === '/automation-agent-visual') return AutomationAgentVisual;
  if (path === '/trailer-storyboard') return TrailerStoryboard;
  if (path === '/screen-preview') return ScreenPreview;
  if (path.startsWith('/lms')) return () => <ProtectedSkeleton kind="lms" />;
  if (path.startsWith('/admin')) return () => <ProtectedSkeleton kind="admin" />;
  const solution = solutions.find((s) => path === `/ai-solutions/${s.slug}`);
  if (solution) return (props) => <SolutionPage solution={solution} {...props} />;
  return NotFound;
}

createRoot(document.getElementById('root')).render(<App />);
