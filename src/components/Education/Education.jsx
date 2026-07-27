import { motion } from 'framer-motion';
import { TbSchool, TbMapPin, TbCalendar, TbCircleCheck } from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import { useEducation } from '../../context';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';

export default function Education() {
  const education = useEducation();

  return (
    <section id="education" className="section !pt-0" aria-labelledby="education-heading">
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
          {education.map((item) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -7 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="card card-gradient-edge flex flex-col p-6"
            >
              <span className="mb-5 grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary-soft">
                <TbSchool size={21} aria-hidden="true" />
              </span>

              <h3 className="text-base font-bold leading-snug">{item.degree}</h3>
              <p className="mt-1.5 text-sm font-medium text-primary-soft">{item.institution}</p>

              <div className="mt-3 flex flex-wrap gap-3 text-[0.75rem] text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <TbCalendar size={13} aria-hidden="true" /> {item.period}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <TbMapPin size={13} aria-hidden="true" /> {item.location}
                </span>
              </div>

              <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">{item.description}</p>

              <ul className="mt-5 space-y-2 border-t border-line/70 pt-4">
                {item.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-[0.8125rem] text-content/80">
                    <TbCircleCheck size={14} className="shrink-0 text-success" aria-hidden="true" />
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
