import {
  SiHtml5, SiCss as SiCss3, SiJavascript, SiReact, SiVite, SiTailwindcss, SiReactrouter,
  SiNodedotjs, SiExpress, SiJsonwebtokens, SiCloudinary, SiMongodb, SiMongoose,
  SiGit, SiGithub, SiPostman, SiNpm, SiPython, SiVercel,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import {
  TbApi, TbTopologyStar3, TbDeviceMobile, TbDatabaseCog, TbDeviceDesktop,
  TbUsersGroup, TbBug, TbBulb, TbSparkles, TbRefresh, TbRobot,
} from 'react-icons/tb';

/**
 * Skill catalogue rendered by the Skills section.
 * `level` drives the proficiency bar (0–100).
 * `brand` is used for the icon colour + hover glow.
 */
export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    blurb: 'Responsive, user-focused interfaces built with the React ecosystem.',
    skills: [
      { name: 'React.js', icon: SiReact, brand: '#61DAFB', level: 93 },
      { name: 'JavaScript ES6+', icon: SiJavascript, brand: '#F7DF1E', level: 92 },
      { name: 'HTML5', icon: SiHtml5, brand: '#E34F26', level: 95 },
      { name: 'CSS3', icon: SiCss3, brand: '#1572B6', level: 92 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, brand: '#06B6D4', level: 93 },
      { name: 'React Router', icon: SiReactrouter, brand: '#CA4245', level: 89 },
      { name: 'Vite', icon: SiVite, brand: '#646CFF', level: 88 },
      { name: 'Responsive Design', icon: TbDeviceDesktop, brand: '#3B82F6', level: 94 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    blurb: 'Secure, well-structured APIs with predictable contracts.',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, brand: '#5FA04E', level: 91 },
      { name: 'Express.js', icon: SiExpress, brand: '#F8FAFC', level: 91 },
      { name: 'REST APIs', icon: TbApi, brand: '#3B82F6', level: 90 },
      { name: 'JWT Authentication', icon: SiJsonwebtokens, brand: '#D63AFF', level: 89 },
      { name: 'API Development', icon: TbTopologyStar3, brand: '#8B5CF6', level: 90 },
      { name: 'CRUD Operations', icon: TbRefresh, brand: '#10B981', level: 93 },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    blurb: 'Schemas modelled around real query patterns.',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, brand: '#47A248', level: 90 },
      { name: 'Mongoose', icon: SiMongoose, brand: '#880000', level: 89 },
      { name: 'Database Design', icon: TbDatabaseCog, brand: '#10B981', level: 86 },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile & Languages',
    blurb: 'Cross-platform apps and automation beyond the browser.',
    skills: [
      { name: 'React Native', icon: SiReact, brand: '#61DAFB', level: 82 },
      { name: 'JavaScript', icon: SiJavascript, brand: '#F7DF1E', level: 92 },
      { name: 'Python', icon: SiPython, brand: '#3776AB', level: 78 },
      { name: 'Mobile Development', icon: TbDeviceMobile, brand: '#8B5CF6', level: 80 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Deployment',
    blurb: 'The daily workflow behind every shipped feature.',
    skills: [
      { name: 'Git', icon: SiGit, brand: '#F05032', level: 90 },
      { name: 'GitHub', icon: SiGithub, brand: '#F8FAFC', level: 91 },
      { name: 'VS Code', icon: VscVscode, brand: '#0078D4', level: 95 },
      { name: 'Postman', icon: SiPostman, brand: '#FF6C37', level: 89 },
      { name: 'npm', icon: SiNpm, brand: '#CB3837', level: 91 },
      { name: 'Vercel', icon: SiVercel, brand: '#F8FAFC', level: 87 },
      { name: 'Cloudinary', icon: SiCloudinary, brand: '#3448C5', level: 85 },
    ],
  },
  {
    id: 'professional',
    label: 'Professional',
    blurb: 'The skills that turn code into delivered products.',
    skills: [
      { name: 'AI-Assisted Dev', icon: TbRobot, brand: '#10A37F', level: 90 },
      { name: 'Prompt Engineering', icon: TbSparkles, brand: '#8B5CF6', level: 88 },
      { name: 'Team Leadership', icon: TbUsersGroup, brand: '#3B82F6', level: 85 },
      { name: 'Problem Solving', icon: TbBulb, brand: '#F59E0B', level: 92 },
      { name: 'Debugging', icon: TbBug, brand: '#EF4444', level: 90 },
    ],
  },
];

/** "Currently learning" grid — Learning section. */
export const learningItems = [
  { name: 'React Native', icon: SiReact, brand: '#61DAFB', progress: 65, status: 'In Progress',
    note: 'Shipping cross-platform mobile apps from the same React mental model.' },
  { name: 'Python Automation', icon: SiPython, brand: '#3776AB', progress: 60, status: 'In Progress',
    note: 'Scripting practical automation and data tooling for business workflows.' },
  { name: 'AI-Assisted Development', icon: TbRobot, brand: '#10A37F', progress: 75, status: 'In Progress',
    note: 'Building AI-powered features and accelerating delivery without losing code quality.' },
  { name: 'SaaS Architecture', icon: TbTopologyStar3, brand: '#8B5CF6', progress: 50, status: 'In Progress',
    note: 'Multi-tenant design, subscription billing and scalable product structure.' },
  { name: 'Cloud Technologies', icon: SiVercel, brand: '#F8FAFC', progress: 45, status: 'In Progress',
    note: 'Deployment pipelines, edge hosting and cloud storage strategies.' },
  { name: 'UI/UX Design', icon: TbDeviceDesktop, brand: '#06B6D4', progress: 55, status: 'In Progress',
    note: 'Designing interfaces that convert, not just interfaces that look good.' },
  { name: 'Software Architecture', icon: TbDatabaseCog, brand: '#10B981', progress: 48, status: 'Planned',
    note: 'Scaling patterns, caching layers and maintainable system boundaries.' },
  { name: 'Open Source', icon: SiGithub, brand: '#F8FAFC', progress: 35, status: 'Planned',
    note: 'Contributing reusable tooling back to the JavaScript community.' },
];

/** Career roadmap shown under the learning grid. */
export const roadmap = [
  { phase: 'Done', title: 'MERN Mastery', detail: 'Production MERN apps: e-commerce, education, management systems.', done: true },
  { phase: 'Now', title: 'Development Head', detail: 'Leading a team, reviewing code and owning architecture decisions.', done: true },
  { phase: 'Next', title: 'Mobile + AI Products', detail: 'React Native apps and AI-powered SaaS solutions.', done: false },
  { phase: 'Goal', title: 'Senior Software Engineer', detail: 'Architecting scalable products and mentoring engineering teams.', done: false },
];
