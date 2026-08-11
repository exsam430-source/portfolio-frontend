import { motion } from 'framer-motion';

import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Services from '../components/Services/Services';
import OrderForm from '../components/OrderForm/OrderForm';
import Subscribe from '../components/Subscribe/Subscribe';
import Experience from '../components/Experience/Experience';
import Education from '../components/Education/Education';
import Learning from '../components/Learning/Learning';
import Testimonials from '../components/Testimonials/Testimonials';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import BackToTop from '../components/ui/BackToTop';
import ErrorBoundary from '../components/ui/ErrorBoundary';

import useScrollSpy from '../hooks/useScrollSpy';
import { useUI, useNavigation } from '../context';

const SECTIONS = [
  { name: 'about', Component: About },
  { name: 'skills', Component: Skills },
  { name: 'projects', Component: Projects },
  { name: 'services', Component: Services },
  { name: 'order form', Component: OrderForm },
  { name: 'newsletter', Component: Subscribe },
  { name: 'experience', Component: Experience },
  { name: 'education', Component: Education },
  { name: 'learning', Component: Learning },
  { name: 'testimonials', Component: Testimonials },
  { name: 'contact', Component: Contact },
];

export default function Home() {
  const { isLoading } = useUI();
  const { sectionIds } = useNavigation();
  useScrollSpy(sectionIds);

  return (
    <>
      <Navbar />
      <motion.main
        id="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.7, delay: isLoading ? 0 : 0.15 }}
        style={{ background: 'var(--bg)' }}
      >
        <ErrorBoundary name="hero">
          <Hero />
        </ErrorBoundary>

        {SECTIONS.map(({ name, Component }) => (
          <ErrorBoundary key={name} name={name} compact>
            <Component />
          </ErrorBoundary>
        ))}
      </motion.main>

      <Footer />
      <BackToTop />
    </>
  );
}