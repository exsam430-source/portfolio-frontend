import {
  TbStack2, TbBrandReact, TbApi, TbDeviceMobile, TbShoppingCart,
  TbBuildingStore, TbSchool, TbRobot, TbCode, TbDatabase,
} from 'react-icons/tb';

/* ── Services ─────────────────────────────────────────────── */
export const services = [
  {
    id: 'fullstack',
    icon: TbStack2,
    title: 'Full-Stack MERN Development',
    description:
      'Complete web applications built from database to UI — MongoDB schemas, secure Express APIs and fast React interfaces, delivered as one coherent product.',
    deliverables: ['Database & API architecture', 'Authentication & authorisation', 'Responsive React UI', 'Deployment & handover'],
    accent: '#3B82F6',
    serviceType: 'Full-Stack Web App',
  },
  {
    id: 'frontend',
    icon: TbBrandReact,
    title: 'React.js Development',
    description:
      'Modern, responsive React applications with clean component architecture, smooth interactions and accessibility built in from the start.',
    deliverables: ['Pixel-accurate implementation', 'Reusable component system', 'Tailwind CSS styling', 'Performance optimisation'],
    accent: '#06B6D4',
    serviceType: 'Frontend Only',
  },
  {
    id: 'backend',
    icon: TbApi,
    title: 'Node.js & REST API Development',
    description:
      'Scalable REST APIs with Node.js, Express.js and MongoDB — validated, secured with JWT, documented in Postman and ready for any client to consume.',
    deliverables: ['REST endpoint design', 'JWT authentication', 'Validation & error handling', 'Postman documentation'],
    accent: '#8B5CF6',
    serviceType: 'Backend API',
  },
  {
    id: 'ecommerce',
    icon: TbShoppingCart,
    title: 'E-Commerce Development',
    description:
      'Complete online stores with product management, cart, secure checkout and an owner dashboard — the same stack behind RB Jewellers, live in production today.',
    deliverables: ['Product & inventory system', 'Cart and checkout flow', 'Order management', 'Admin dashboard'],
    accent: '#F59E0B',
    serviceType: 'E-Commerce Store',
  },
  {
    id: 'management',
    icon: TbBuildingStore,
    title: 'Business Management Systems',
    description:
      'Custom office, restaurant and operations software: admissions, staff, attendance, billing and workflows — built around how your business actually runs.',
    deliverables: ['Custom workflow modelling', 'Role-based access control', 'Reporting & analytics', 'Staff and record management'],
    accent: '#10B981',
    serviceType: 'Admin Dashboard',
  },
  {
    id: 'education',
    icon: TbSchool,
    title: 'Educational Platforms',
    description:
      'Learning management systems with course catalogues, enrolment, student tracking and certification — proven on Mr Solver Learning Hub.',
    deliverables: ['Course & curriculum system', 'Student enrolment', 'Progress tracking', 'Certification management'],
    accent: '#3B82F6',
    serviceType: 'Other',
  },
  {
    id: 'mobile',
    icon: TbDeviceMobile,
    title: 'React Native Development',
    description:
      'Cross-platform mobile applications sharing one React codebase across iOS and Android, with native performance and a familiar development workflow.',
    deliverables: ['Cross-platform mobile app', 'API integration', 'Native device features', 'App store preparation'],
    accent: '#8B5CF6',
    serviceType: 'Other',
  },
  {
    id: 'ai',
    icon: TbRobot,
    title: 'AI-Powered Applications',
    description:
      'AI-assisted development and AI-powered product features — from intelligent automation to Python tooling that removes repetitive manual work.',
    deliverables: ['AI feature integration', 'Python automation tools', 'Prompt engineering', 'Workflow automation'],
    accent: '#EF4444',
    serviceType: 'Other',
  },
  {
    id: 'custom',
    icon: TbCode,
    title: 'Custom Software & SaaS',
    description:
      'Bespoke software and SaaS products designed around your specific business logic, with multi-tenant architecture and subscription-ready foundations.',
    deliverables: ['Requirements & architecture', 'Custom business logic', 'SaaS-ready structure', 'Ongoing support'],
    accent: '#06B6D4',
    serviceType: 'Other',
  },
];

/* ── Experience timeline ──────────────────────────────────── */
export const experiences = [
  {
    id: 'mrsolver',
    role: 'Development Head & Full-Stack Developer',
    company: 'Mr Solver TECH IT Learning Hub & Software House',
    period: 'June 2025 — Present',
    current: true,
    description:
      'Leading the software development team while building complete MERN Stack applications end to end. I design scalable architectures, develop both frontend and backend, and collaborate with developers to ship high-quality software.',
    highlights: [
      'Lead the software development team and review all code',
      'Developed the Mr Solver Learning Hub education platform (live)',
      'Developed the Office Management Portal for admissions, staff and attendance (live)',
      'Design MongoDB databases and scalable backend APIs',
      'Build responsive React.js frontends and improve performance',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Git'],
  },
  {
    id: 'nextstep',
    role: 'MERN Stack Developer',
    company: 'NEXTSTEP',
    period: 'June 2024 — August 2025',
    current: false,
    description:
      'Developed full-stack MERN applications with a focus on responsive React interfaces and secure REST APIs, delivering management systems and dashboards for business clients.',
    highlights: [
      'Built full-stack MERN applications from scratch',
      'Developed responsive React interfaces and reusable components',
      'Built REST APIs with JWT authentication',
      'Designed and worked with MongoDB data models',
      'Delivered management systems and admin dashboards',
      'Debugged and optimised application performance',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST API'],
  },
  {
    id: 'maxtech',
    role: 'Junior Full-Stack Developer',
    company: 'MAXTECH',
    period: 'June 2024 — May 2025',
    current: false,
    description:
      'Started my professional journey contributing to MERN stack projects — building frontend components, integrating backend APIs and collaborating with the team through Git-based workflows.',
    highlights: [
      'Assisted in MERN stack development across client projects',
      'Developed reusable frontend components',
      'Integrated backend APIs with the React frontend',
      'Worked with MongoDB collections and queries',
      'Diagnosed and fixed bugs across the stack',
      'Collaborated with the team using Git and GitHub',
    ],
    tech: ['React.js', 'JavaScript', 'Node.js', 'MongoDB', 'Git', 'GitHub'],
  },
];

/* ── Education ────────────────────────────────────────────── */
export const education = [
  {
    id: 'school',
    degree: 'Secondary School Education — Matric (Science)',
    institution: 'The Learning Village School',
    period: 'Completed',
    location: 'Swat, Khyber Pakhtunkhwa, Pakistan',
    description:
      'Science stream with a focus on mathematics, physics and computer studies — where my problem-solving foundation and interest in technology began.',
    highlights: ['Mathematics', 'Physics', 'Computer Studies', 'Science Stream'],
  },
  {
    id: 'mern',
    degree: 'MERN Stack Development — Self-Directed & Professional',
    institution: 'Hands-on Industry Experience',
    period: '2024 — Present',
    location: 'Remote',
    description:
      'An intensive, project-driven path through the full MERN stack learned by building and shipping real production applications for real businesses.',
    highlights: ['React.js & Modern JavaScript', 'Node.js + Express APIs', 'MongoDB & Mongoose', 'Deployment & DevOps basics'],
  },
  {
    id: 'ai',
    degree: 'AI-Assisted Development & Python Automation',
    institution: 'Continuous Professional Development',
    period: '2025 — Present',
    location: 'Remote',
    description:
      'Applying AI tooling and prompt engineering to accelerate delivery of React applications, React Native apps and Python automation tools without compromising code quality.',
    highlights: ['Prompt Engineering', 'AI-Powered Features', 'Python Automation', 'React Native'],
  },
];

/* ── Testimonials ─────────────────────────────────────────── */
export const testimonials = [
  {
    id: 't1',
    name: 'RB Jewellers',
    role: 'Business Owner',
    company: 'Retail — Jewellery',
    rating: 5,
    text: 'Abdullah delivered our complete e-commerce platform with product management, secure checkout and an admin dashboard. The site is live, fast and our team manages everything themselves without any technical help.',
    initials: 'RB',
    accent: '#F59E0B',
  },
  {
    id: 't2',
    name: 'Mr Solver TECH',
    role: 'Management',
    company: 'IT Learning Hub & Software House',
    rating: 5,
    text: 'As Development Head, Abdullah built both our Learning Hub platform and the Office Management Portal. He leads the team well, writes maintainable code and consistently delivers what he commits to.',
    initials: 'MS',
    accent: '#3B82F6',
  },
  {
    id: 't3',
    name: 'Shan Biryani',
    role: 'Restaurant Owner',
    company: 'Hospitality',
    rating: 5,
    text: 'Our restaurant system handles the menu, online orders, reservations and billing in one place. It works perfectly on tablets in the restaurant, which is exactly what we needed.',
    initials: 'SB',
    accent: '#EF4444',
  },
  {
    id: 't4',
    name: 'NEXTSTEP',
    role: 'Project Lead',
    company: 'Software Company',
    rating: 5,
    text: 'Reliable full-stack developer. Built responsive React interfaces and clean REST APIs with JWT authentication, and was always quick to debug and optimise when issues came up.',
    initials: 'NS',
    accent: '#8B5CF6',
  },
];

/* ── Navigation ───────────────────────────────────────────── */
export const navLinks = [
  { id: 'home', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

/* Section ids observed by the scroll-spy for active-link highlighting. */
export const sectionIds = [
  'hero', 'about', 'skills', 'projects', 'services', 'order',
  'subscribe', 'experience', 'education', 'learning', 'testimonials', 'contact',
];

/* ── Order form option sets (mirrors the backend enums) ───── */
export const serviceTypes = [
  'Full-Stack Web App',
  'Frontend Only',
  'Backend API',
  'E-Commerce Store',
  'Admin Dashboard',
  'Other',
];

export const budgetRanges = [
  '$100 - $500',
  '$500 - $1000',
  '$1000 - $2000',
  '$2000 - $5000',
  '$5000+',
  'Discuss Later',
];

export const timelines = ['ASAP (1-2 weeks)', '1 Month', '2-3 Months', '3+ Months', 'Flexible'];
