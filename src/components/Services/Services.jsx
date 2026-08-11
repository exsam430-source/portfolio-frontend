import { motion } from 'framer-motion';
import { TbArrowRight, TbCircleCheck, TbSparkles } from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import { useServices, useUI } from '../../context';
import { scrollToSection } from '../../utils/helpers';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';

export default function Services() {
  const services = useServices();
  const { setPrefilledService } = useUI();

  const order = (serviceType) => {
    setPrefilledService(serviceType);
    scrollToSection('order');
  };

  return (
    <section
      id="services"
      className="section relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Ambient glow */}
      <div
  aria-hidden="true"
  className="pointer-events-none absolute right-0 top-1/3 -z-10 rounded-full hidden md:block"
  style={{
    width: '32rem',
    height: '32rem',
    background:
      'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
    filter: 'blur(80px)',
  }}
/>

      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title="What I can"
          highlight="build for you"
          subtitle="From a single API endpoint to a complete platform — pick what you need."
        />
        <h2 id="services-heading" className="sr-only">Services offered</h2>

        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.li
                key={service.id}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="card card-gradient-edge group relative flex flex-col overflow-hidden p-6"
              >
                {/* Hover wash */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(110% 80% at 50% 0%, ${service.accent}14, transparent 70%)`,
                  }}
                />

                <div className="relative">
                  <span
                    className="mb-5 grid size-12 place-items-center rounded-2xl transition-all duration-400 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `${service.accent}1a`,
                      color: service.accent,
                      boxShadow: `0 0 0 0 ${service.accent}00`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${service.accent}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 0 ${service.accent}00`;
                    }}
                  >
                    <Icon size={24} aria-hidden="true" />
                  </span>

                  <h3
                    className="text-lg font-bold leading-snug"
                    style={{ color: 'var(--text)' }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="mt-2.5 text-[0.875rem] leading-relaxed"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[0.8125rem]"
                        style={{ color: 'var(--text)', opacity: 0.8 }}
                      >
                        <TbCircleCheck
                          size={15}
                          className="mt-0.5 shrink-0"
                          style={{ color: service.accent }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => order(service.serviceType)}
                  className="btn btn-ghost relative mt-6 w-full"
                  style={{ marginTop: 'auto', paddingTop: '1.5rem' }}
                  aria-label={`Order ${service.title}`}
                >
                  <span className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                    Order Now
                    <TbArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="card card-gradient-edge mt-8 flex flex-col items-center gap-5 p-7 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex items-center gap-4">
            <span
              className="hidden size-12 shrink-0 place-items-center rounded-2xl text-white sm:grid"
              style={{
                background:
                  'linear-gradient(135deg, var(--primary), var(--secondary))',
                boxShadow: '0 0 20px rgba(108,99,255,0.5)',
              }}
            >
              <TbSparkles size={22} aria-hidden="true" />
            </span>
            <div>
              <h3
                className="text-lg font-bold"
                style={{ color: 'var(--text)' }}
              >
                Not sure which one you need?
              </h3>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                Describe the problem and I'll recommend the right scope — free of charge.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => order('')}
            className="btn btn-primary shrink-0"
          >
            Discuss my project
            <TbArrowRight size={16} aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}