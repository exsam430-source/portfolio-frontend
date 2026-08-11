import { motion } from 'framer-motion';
import { TbStarFilled, TbQuote } from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import { useTestimonials } from '../../context';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';

export default function Testimonials() {
  const testimonials = useTestimonials();

  return (
    <section
      id="testimonials"
      className="section !pt-0"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients"
          highlight="say about working with me"
          subtitle="Feedback from the people who trusted me with their products."
        />
        <h2 id="testimonials-heading" className="sr-only">
          Client testimonials
        </h2>

        <motion.ul
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {testimonials.map((item) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -7 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="card card-gradient-edge relative overflow-hidden p-6 sm:p-7"
            >
              {/* Quote icon */}
              <TbQuote
                size={78}
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-3"
                style={{ color: item.accent, opacity: 0.07 }}
              />

              {/* Neon accent top border */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
                style={{
                  background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                  opacity: 0.6,
                }}
                aria-hidden="true"
              />

              {/* Rating */}
              <div
                className="flex gap-0.5"
                role="img"
                aria-label={`${item.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <TbStarFilled
                    key={i}
                    size={15}
                    style={{
                      color: i < item.rating ? '#f59e0b' : 'var(--border)',
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote
                className="relative mt-4 text-[0.9375rem] leading-relaxed"
                style={{ color: 'var(--text)', opacity: 0.88 }}
              >
                "{item.text}"
              </blockquote>

              <figcaption
                className="mt-6 flex items-center gap-3 border-t pt-5"
                style={{ borderColor: 'var(--border)' }}
              >
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-xl text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${item.accent}, ${item.accent}88)`,
                    boxShadow: `0 0 15px ${item.accent}40`,
                  }}
                  aria-hidden="true"
                >
                  {item.initials}
                </span>
                <div>
                  <p
                    className="text-[0.875rem] font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="text-[0.75rem]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.role} · {item.company}
                  </p>
                </div>
              </figcaption>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}