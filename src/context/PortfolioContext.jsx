import { createContext, useContext, useMemo } from 'react';

import { profile, stats } from '../data/profile';
import { skillCategories, learningItems, roadmap } from '../data/skills';
import { projects, projectCategories } from '../data/projects';
import {
  services, experiences, education, testimonials,
  navLinks, sectionIds, serviceTypes, budgetRanges, timelines,
} from '../data/content';

/**
 * ═══════════════════════════════════════════════════════════════
 *  PortfolioContext — Context API data layer
 * ═══════════════════════════════════════════════════════════════
 *  Every component reads portfolio content from this single
 *  provider instead of importing the data files directly. That
 *  means:
 *    • one place to swap static data for a CMS/API later
 *    • no prop drilling through the section tree
 *    • derived values (featured projects, counts) computed once
 *
 *  Usage:
 *    import { useProfile, useProjects } from '../context/PortfolioContext';
 *    const profile = useProfile();
 * ═══════════════════════════════════════════════════════════════
 */
const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  /* Memoised so consumers don't re-render when unrelated state changes.
     The dependency array is empty because the source data is static —
     swap this for state + useEffect when wiring a CMS. */
  const value = useMemo(() => {
    const featuredProjects = projects.filter((p) => p.featured);
    const liveProjects = projects.filter((p) => p.live);

    /* Live count badge next to each project filter tab. */
    const projectCounts = projectCategories.reduce(
      (acc, cat) => ({
        ...acc,
        [cat.id]: cat.id === 'all' ? projects.length : projects.filter((p) => p.category === cat.id).length,
      }),
      {},
    );

    /* Flat list used by the skills marquee strip. */
    const allSkills = skillCategories.flatMap((cat) =>
      cat.skills.map((s) => ({ ...s, category: cat.id })),
    );

    return {
      // Personal
      profile,
      stats,

      // Skills & learning
      skillCategories,
      allSkills,
      learningItems,
      roadmap,

      // Work
      projects,
      projectCategories,
      projectCounts,
      featuredProjects,
      liveProjects,

      // Content
      services,
      experiences,
      education,
      testimonials,
      navLinks,
      sectionIds,

      // Form option sets (fallbacks when the API is unreachable)
      formOptions: { serviceTypes, budgets: budgetRanges, timelines },

      /* Helpers */
      getProjectById: (id) => projects.find((p) => p.id === id) || null,
      getProjectsByCategory: (category) =>
        category === 'all' ? projects : projects.filter((p) => p.category === category),
      getSkillCategory: (id) => skillCategories.find((c) => c.id === id) || skillCategories[0],
    };
  }, []);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

/* ── Base consumer ─────────────────────────────────────────── */

/**
 * Access the full portfolio context.
 * Throws a helpful error if used outside the provider.
 */
export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio() must be used inside a <PortfolioProvider>. Wrap your app in main.jsx.');
  }
  return ctx;
}

/* ── Focused selector hooks ────────────────────────────────
   Prefer these in components: they document exactly which slice
   of the context a component depends on. */

export const useProfile = () => usePortfolio().profile;
export const useStats = () => usePortfolio().stats;
export const useSkills = () => {
  const { skillCategories: categories, allSkills } = usePortfolio();
  return { categories, allSkills };
};
export const useLearning = () => {
  const { learningItems: items, roadmap: path } = usePortfolio();
  return { items, roadmap: path };
};
export const useProjects = () => {
  const { projects: all, projectCategories: categories, projectCounts: counts, featuredProjects, liveProjects, getProjectsByCategory, getProjectById } = usePortfolio();
  return { projects: all, categories, counts, featuredProjects, liveProjects, getProjectsByCategory, getProjectById };
};
export const useServices = () => usePortfolio().services;
export const useExperiences = () => usePortfolio().experiences;
export const useEducation = () => usePortfolio().education;
export const useTestimonials = () => usePortfolio().testimonials;
export const useNavigation = () => {
  const { navLinks: links, sectionIds: sections } = usePortfolio();
  return { navLinks: links, sectionIds: sections };
};
export const useFormOptions = () => usePortfolio().formOptions;

export default PortfolioContext;
