import { PortfolioProvider } from './PortfolioContext';
import { UIProvider } from './UIContext';
import { ThemeProvider } from './ThemeContext';

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <UIProvider>{children}</UIProvider>
      </PortfolioProvider>
    </ThemeProvider>
  );
}