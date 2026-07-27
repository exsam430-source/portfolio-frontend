/**
 * Barrel export for the Context API layer.
 * Import providers and hooks from one place:
 *
 *   import { AppProviders, useProfile, useUI } from '../context';
 */
export {
  default as PortfolioContext,
  PortfolioProvider,
  usePortfolio,
  useProfile,
  useStats,
  useSkills,
  useLearning,
  useProjects,
  useServices,
  useExperiences,
  useEducation,
  useTestimonials,
  useNavigation,
  useFormOptions,
} from './PortfolioContext';

export { default as UIContext, UIProvider, useUI } from './UIContext';

export { default as AppProviders } from './AppProviders';
