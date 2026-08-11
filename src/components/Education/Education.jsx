import { motion } from 'framer-motion';
import {
  TbSchool, TbMapPin, TbCalendar, TbCircleCheck,
} from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import { useEducation } from '../../context';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';

export default function Education() {
  const education = useEducation();

  return (
    <section
      id="education"
      className="section !pt-0"
      aria-labelledby="education-heading"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Education"
          title="Academic &"
          highlight="professional training"
          subtitle="The formal groundwork behind the practical engineering."
        />
        <h2 id="education-heading" className="sr-only">Education</h2>

        <motion.ul
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 lg:grid-cols-3"
        >
          {education.map((item, index) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -7 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="card card-gradient-edge flex flex-col p-6 group"
            >
              {/* Icon */}
              <span
                className="mb-5 grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(255,101,132,0.2))',
                  color: 'var(--primary-soft)',
                  boxShadow: '0 0 20px rgba(108,99,255,0.2)',
                }}
              >
                <TbSchool size={22} aria-hidden="true" />
              </span>

              <h3
                className="text-base font-bold leading-snug"
                style={{ color: 'var(--text)' }}
              >
                {item.degree}
              </h3>
              <p
                className="mt-1.5 text-sm font-medium"
                style={{ color: 'var(--primary-soft)' }}
              >
                {item.institution}
              </p>

              <div
                className="mt-3 flex flex-wrap gap-3 text-[0.75rem]"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <TbCalendar size={13} aria-hidden="true" />
                  {item.period}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <TbMapPin size={13} aria-hidden="true" />
                  {item.location}
                </span>
              </div>

              <p
                className="mt-4 text-[0.8125rem] leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.description}
              </p>

              <ul
                className="mt-5 space-y-2 border-t pt-4"
                style={{ borderColor: 'var(--border)' }}
              >
                {item.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 text-[0.8125rem]"
                    style={{ color: 'var(--text)', opacity: 0.8 }}
                  >
                    <TbCircleCheck
                      size={14}
                      className="shrink-0"
                      style={{ color: 'var(--accent)' }}
                      aria-hidden="true"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}