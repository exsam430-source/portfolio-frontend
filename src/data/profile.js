/* ═══════════════════════════════════════════════════════════════
   PERSONAL INFORMATION — single source of truth
   Consumed through PortfolioContext (see src/context/).
   ═══════════════════════════════════════════════════════════════ */

export const profile = {
  // ── Identity ────────────────────────────────────────────────
  name: 'Muhammad Abdullah',
  firstName: 'Abdullah',
  initials: 'MA',
  title: 'Full-Stack MERN Developer',
  subtitle: 'React.js • Node.js • Express.js • MongoDB',
  longTitle:
    'Full-Stack MERN Developer | React.js • Node.js • Express.js • MongoDB | React Native Developer | AI-Assisted Development',
  role: 'Development Head & Full-Stack Developer',
  company: 'Mr Solver TECH IT Learning Hub & Software House',
  location: 'Swat District, Khyber Pakhtunkhwa, Pakistan',
  locationShort: 'Swat, KPK, Pakistan',
  availability: 'Open to Full-Time, Remote & Freelance',
  availabilityShort: 'Available for work',
  yearsExperience: 2,

  /* Engagement types shown as chips in the hero / contact section. */
  openTo: ['Full-Time', 'Remote Jobs', 'Freelance Projects', 'Contract Opportunities'],

  // ── Contact ─────────────────────────────────────────────────
  email: 'exsam430@gmail.com',
  phone: '+92 349 5589669',
  phoneHref: 'tel:+923495589669',
  // Drop your PDF in /public and keep this filename.
  resumeUrl: '/Muhammad_Abdullah_CV.pdf',
  // Optional: profile photo in /public (e.g. '/profile.jpg').
  // Leave null to render the animated monogram placeholder.
  photoUrl: null,

  // ── Social ──────────────────────────────────────────────────
  socials: {
  github:   'https://github.com/exsam430-source',
  linkedin: 'https://www.linkedin.com/in/muhammad-abdullah-44a90b342/',
  email:    'mailto:exsam430@gmail.com',
  phone:    'tel:+923495589669',
  whatsapp: 'https://wa.me/923495589669',  // ← ADD THIS
},

  // ── Copy ────────────────────────────────────────────────────
  roles: [
    'Full-Stack MERN Developer',
    'React.js Developer',
    'Node.js & Express Developer',
    'React Native Developer',
    'AI-Assisted Developer',
  ],

  heroBio:
    'I build modern, scalable and user-focused web applications end to end — from MongoDB schemas and secure Express APIs to fast React interfaces. Currently leading development at Mr Solver TECH Software House.',

  aboutBio: [
    'I am a passionate Full-Stack MERN Developer specializing in building modern, scalable, and user-focused web applications. I develop complete solutions from frontend to backend using React.js, Node.js, Express.js, MongoDB, JavaScript, Tailwind CSS, HTML5 and CSS3.',
    'Over the past year I have worked on real-world projects including e-commerce platforms, educational platforms, office management systems, restaurant management software and custom business applications — most of them live and serving real users today.',
    'Currently I serve as the Development Head at Mr Solver TECH IT Learning Hub & Software House, where I lead development projects, design scalable applications, and collaborate with developers to deliver high-quality software.',
    'Alongside traditional web development, I also use AI-assisted development to rapidly create React applications, React Native apps, Python automation tools and practical AI-powered solutions — while keeping the code clean, maintainable and production-ready.',
  ],

  careerObjective:
    'My goal is to build high-quality software that solves real-world problems while continuously improving my skills as a Full-Stack Developer. I enjoy working with modern web technologies, leading development teams, and exploring AI-assisted software development to create innovative and scalable solutions.',

  values: [
    {
      title: 'Solve real problems',
      description: 'Software should create measurable value for a business, not just look impressive.',
    },
    {
      title: 'Clean & maintainable',
      description: 'Production-ready code the next developer can read, extend and trust.',
    },
    {
      title: 'Lead and collaborate',
      description: 'I review code, mentor developers and keep a team moving in one direction.',
    },
    {
      title: 'Keep learning',
      description: 'From React Native to AI-assisted workflows — the stack evolves and so do I.',
    },
  ],

  languages: ['English', 'Urdu', 'Pashto'],

  interests: [
    'Full-Stack Web Development', 'React Ecosystem', 'Node.js', 'Artificial Intelligence',
    'Python Automation', 'Mobile App Development', 'UI/UX Design', 'SaaS Products',
    'E-Commerce', 'Cloud Technologies', 'Open Source', 'Software Architecture',
  ],

  // ── SEO / branding ──────────────────────────────────────────
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://muhammadabdullah.dev',
  tagline: 'Building modern, scalable and user-focused software with the MERN stack.',
};

/* Animated counters shown in the About section. */
export const stats = [
  { id: 'projects', label: 'Projects Delivered', value: 5, suffix: '+' },
  { id: 'experience', label: 'Years Experience', value: 2, suffix: '+' },
  { id: 'technologies', label: 'Technologies', value: 30, suffix: '+' },
  { id: 'live', label: 'Live Products', value: 4, suffix: '' },
];

export default profile;
