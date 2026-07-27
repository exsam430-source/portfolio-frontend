import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SectionHeading from '../ui/SectionHeading';
import SkillCard from './SkillCard';
import { useSkills } from '../../context';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';
import { cn } from '../../utils/helpers';

/**
 * Categorised skill explorer with animated tabs.
 * Tabs follow the WAI-ARIA tab pattern including arrow-key navigation.
 */
export default function Skills() {
  const { categories: skillCategories } = useSkills();
  const [active, setActive] = useState(skillCategories[0].id);
  const category = skillCategories.find((c) => c.id === active) ?? skillCategories[0];

  const onTabKeyDown = (e) => {
    const idx = skillCategories.findIndex((c) => c.id === active);
    let next = null;
    if (e.key === 'ArrowRight') next = (idx + 1) % skillCategories.length;
    if (e.key === 'ArrowLeft') next = (idx - 1 + skillCategories.length) % skillCategories.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = skillCategories.length - 1;

    if (next !== null) {
      e.preventDefault();
      const id = skillCategories[next].id;
      setActive(id);
      document.getElementById(`skills-tab-${id}`)?.focus();
    }
  };

  return (
    <section id="skills" className="section relative overflow-hidden" aria-labelledby="skills-heading">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 size-[38rem] -translate-x-1/2 rounded-full bg-secondary/8 blur-[140px]"
      />

      <div className="container-x">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools I use to"
          highlight="ship products"
          subtitle="The technologies I work with daily — from the database layer all the way to the browser."
        />
        <h2 id="skills-heading" className="sr-only">Skills and technologies</h2>

        {/* Tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 flex justify-center"
        >
          <div
            role="tablist"
            aria-label="Skill categories"
            onKeyDown={onTabKeyDown}
            className="no-scrollbar flex max-w-full gap-1.5 overflow-x-auto rounded-2xl border border-line bg-surface/45 p-1.5 backdrop-blur"
          >
            {skillCategories.map((cat) => {
              const isActive = cat.id === active;
              return (
                <button
                  key={cat.id}
                  id={`skills-tab-${cat.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`skills-panel-${cat.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(cat.id)}
                  className={cn(
                    'relative shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200',
                    isActive ? 'text-white' : 'text-muted hover:text-content',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skills-tab-pill"
                      transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary to-secondary shadow-glow"
                      aria-hidden="true"
                    />
                  )}
                  {cat.label}
                  <span className="ml-1.5 text-[0.6875rem] opacity-65">{cat.skills.length}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            id={`skills-panel-${category.id}`}
            role="tabpanel"
            aria-labelledby={`skills-tab-${category.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <p className="mb-7 text-center text-sm text-muted">{category.blurb}</p>

            <motion.ul
              variants={stagger(0.055)}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              {category.skills.map((skill) => (
                <SkillCard key={`${category.id}-${skill.name}`} {...skill} />
              ))}
            </motion.ul>
          </motion.div>
        </AnimatePresence>

        {/* Marquee strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mask-fade-x mt-14 overflow-hidden"
          aria-hidden="true"
        >
          <div className="flex w-max animate-marquee gap-3">
            {[...skillCategories, ...skillCategories].flatMap((cat, ci) =>
              cat.skills.map((s, si) => (
                <span key={`${ci}-${si}-${s.name}`} className="chip-muted chip">
                  <s.icon size={13} style={{ color: s.brand }} />
                  {s.name}
                </span>
              )),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
