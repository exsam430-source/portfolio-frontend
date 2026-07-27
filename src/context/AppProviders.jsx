import { PortfolioProvider } from './PortfolioContext';
import { UIProvider } from './UIContext';

/**
 * Composes every context provider in the correct order so `main.jsx`
 * stays readable and new providers are added in exactly one place.
 *
 *   <AppProviders>
 *     <App />
 *   </AppProviders>
 */
export default function AppProviders({ children }) {
  return (
    <PortfolioProvider>
      <UIProvider>{children}</UIProvider>
    </PortfolioProvider>
  );
}
