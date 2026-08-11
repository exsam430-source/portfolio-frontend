import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  TbMail, TbMapPin, TbBriefcase, TbSend, TbCircleCheck,
  TbBrandGithub, TbBrandLinkedin, TbPhone, TbRefresh,
  TbCopy, TbBrandWhatsapp,
} from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import FormField from '../ui/FormField';
import Spinner from '../ui/Spinner';
import useForm from '../../hooks/useForm';
import { submitContact } from '../../api/services';
import { validateContact } from '../../utils/validators';
import { useProfile } from '../../context';
import { fadeUp, slideLeft, slideRight, stagger, viewportOnce } from '../../utils/motion';

const WHATSAPP_NUMBER = '923495589669';

const INITIAL = {
  name: '', email: '', subject: '', message: '', website: '',
};

const buildInfoCards = (profile) => [
  {
    id: 'email', icon: TbMail, label: 'Email',
    value: profile.email, href: profile.socials.email,
    accent: 'var(--primary)', copyable: true,
  },
  {
    id: 'phone', icon: TbPhone, label: 'Phone',
    value: profile.phone, href: profile.socials.phone,
    accent: 'var(--accent)',
  },
  {
    id: 'location', icon: TbMapPin, label: 'Location',
    value: profile.location,
    href: 'https://maps.google.com/?q=Swat,Pakistan',
    accent: 'var(--secondary)',
  },
  {
    id: 'availability', icon: TbBriefcase, label: 'Open To',
    value: profile.availability, accent: 'var(--accent)',
  },
];

const buildSocials = (profile) => [
  { id: 'github', icon: TbBrandGithub, label: 'GitHub', href: profile.socials.github },
  { id: 'linkedin', icon: TbBrandLinkedin, label: 'LinkedIn', href: profile.socials.linkedin },
  { id: 'email', icon: TbMail, label: 'Email', href: profile.socials.email },
  { id: 'phone', icon: TbPhone, label: 'Phone', href: profile.socials.phone },
];

const buildWhatsAppMessage = (contact) => {
  const lines = [
    `📬 *New Contact Message*`, ``,
    `👤 *From*`,
    `• Name: ${contact.name}`,
    `• Email: ${contact.email}`, ``,
    `📌 *Subject*`, contact.subject, ``,
    `💬 *Message*`, contact.message,
  ];
  return encodeURIComponent(lines.join('\n'));
};

const openWhatsApp = (contact) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(contact)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

export default function Contact() {
  const profile = useProfile();
  const INFO_CARDS = buildInfoCards(profile);
  const SOCIALS = buildSocials(profile);
  const [sent, setSent] = useState(false);
  const [sentContact, setSentContact] = useState(null);

  const {
    values, errors, touched, isSubmitting,
    handleChange, handleBlur, handleSubmit, setErrors, reset,
  } = useForm(INITIAL, validateContact);

  const onSubmit = handleSubmit(async (data) => {
    const toastId = toast.loading('Sending your message…');
    try {
      const res = await submitContact(data);
      const contact = res?.data;
      toast.success(res.message || 'Message sent!', { id: toastId, duration: 4000 });
      setSentContact(contact);
      setSent(true);
      reset();
      setTimeout(() => openWhatsApp(contact), 1500);
    } catch (err) {
      toast.error(err.message, { id: toastId });
      if (err.fieldErrors && Object.keys(err.fieldErrors).length) {
        setErrors(err.fieldErrors);
      }
    }
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success('Email address copied');
    } catch {
      toast.error('Could not copy');
    }
  };

  return (
    <section
      id="contact"
      className="section relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 rounded-full"
        style={{
          width: '38rem',
          height: '38rem',
          background:
            'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build"
          highlight="something together"
          subtitle="Have a question or opportunity? My inbox is always open."
        />
        <h2 id="contact-heading" className="sr-only">Contact</h2>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* ── Info column ── */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.ul variants={stagger(0.08)} className="space-y-3.5">
              {INFO_CARDS.map((card) => {
                const Icon = card.icon;
                const inner = (
                  <>
                    <span
                      className="grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `color-mix(in oklab, ${card.accent} 15%, transparent)`,
                        color: card.accent,
                      }}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em]"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {card.label}
                      </p>
                      <p
                        className="mt-0.5 truncate text-[0.9375rem] font-semibold"
                        style={{ color: 'var(--text)' }}
                        title={card.value}
                      >
                        {card.value}
                      </p>
                    </div>
                  </>
                );

                return (
                  <motion.li key={card.id} variants={fadeUp}>
                    <div className="card group flex items-center gap-4 p-4">
                      {card.href ? (
                        <a
                          href={card.href}
                          target={
                            card.href.startsWith('http') ? '_blank' : undefined
                          }
                          rel="noreferrer noopener"
                          className="flex flex-1 items-center gap-4"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex flex-1 items-center gap-4">
                          {inner}
                        </div>
                      )}
                      {card.copyable && (
                        <button
                          type="button"
                          onClick={copyEmail}
                          aria-label="Copy email address"
                          className="grid size-8 shrink-0 place-items-center rounded-lg border transition-colors"
                          style={{
                            borderColor: 'var(--border)',
                            color: 'var(--text-muted)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--primary)';
                            e.currentTarget.style.color = 'var(--primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)';
                            e.currentTarget.style.color = 'var(--text-muted)';
                          }}
                        >
                          <TbCopy size={15} />
                        </button>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Socials */}
            <motion.div
              variants={slideLeft}
              className="card card-gradient-edge mt-4 p-6"
            >
              <h3
                className="text-[0.9375rem] font-bold"
                style={{ color: 'var(--text)' }}
              >
                Find me online
              </h3>
              <p
                className="mt-1.5 text-[0.8125rem] leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                Follow my work or connect professionally.
              </p>

              <ul className="mt-5 flex gap-2.5">
                {SOCIALS.map(({ id, icon: Icon, label, href }) => (
                  <li key={id}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      title={label}
                      className="group grid size-11 place-items-center rounded-xl border transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background:
                          'color-mix(in oklab, var(--surface) 50%, transparent)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-muted)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.color = 'var(--primary)';
                        e.currentTarget.style.boxShadow =
                          '0 0 15px rgba(108,99,255,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <Icon
                        size={19}
                        className="transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}

                {/* WhatsApp */}
                <li>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="WhatsApp"
                    className="group grid size-11 place-items-center rounded-xl border transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background:
                        'color-mix(in oklab, var(--surface) 50%, transparent)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        'rgba(37,211,102,0.55)';
                      e.currentTarget.style.color = '#25D366';
                      e.currentTarget.style.boxShadow =
                        '0 0 15px rgba(37,211,102,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <TbBrandWhatsapp
                      size={19}
                      className="transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              </ul>

              {/* Available status */}
              <div
                className="mt-6 flex items-center gap-2.5 rounded-xl border px-4 py-3"
                style={{
                  background: 'rgba(67,233,123,0.08)',
                  borderColor: 'rgba(67,233,123,0.25)',
                }}
              >
                <span className="relative flex size-2" aria-hidden="true">
                  <span
                    className="absolute inline-flex size-full rounded-full animate-pulse-ring"
                    style={{ background: 'var(--accent)' }}
                  />
                  <span
                    className="relative inline-flex size-2 rounded-full"
                    style={{ background: 'var(--accent)' }}
                  />
                </span>
                <p
                  className="text-[0.8125rem] font-medium"
                  style={{ color: 'var(--accent)' }}
                >
                  Currently accepting new projects
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Form column ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="card card-gradient-edge relative p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex min-h-[24rem] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 16,
                      delay: 0.1,
                    }}
                    className="grid size-16 place-items-center rounded-2xl"
                    style={{
                      background: 'rgba(67,233,123,0.15)',
                      color: 'var(--accent)',
                    }}
                  >
                    <TbCircleCheck size={34} aria-hidden="true" />
                  </motion.span>

                  <h3
                    className="mt-6 text-2xl font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    Message saved!
                  </h3>
                  <p
                    className="mt-2.5 max-w-sm text-sm leading-relaxed"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    WhatsApp should have opened automatically. If not, click below.
                  </p>

                  <button
                    type="button"
                    onClick={() => openWhatsApp(sentContact)}
                    className="btn mt-7 gap-2"
                    style={{
                      background: '#25D366',
                      color: '#fff',
                      border: 'none',
                    }}
                  >
                    <TbBrandWhatsapp size={20} aria-hidden="true" />
                    Open WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSent(false); setSentContact(null); }}
                    className="btn btn-ghost mt-3"
                  >
                    <TbRefresh size={16} aria-hidden="true" />
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  aria-label="Contact form"
                >
                  <h3
                    className="text-lg font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    Send me a message
                  </h3>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Fields marked with * are required.
                  </p>

                  {/* Honeypot */}
                  <div
                    className="absolute left-[-9999px] top-0"
                    aria-hidden="true"
                  >
                    <input
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Your Name" name="name" required
                      autoComplete="name" placeholder="Jane Cooper"
                      maxLength={80} value={values.name}
                      onChange={handleChange} onBlur={handleBlur}
                      error={errors.name} touched={touched.name}
                      disabled={isSubmitting}
                    />
                    <FormField
                      label="Email Address" name="email" type="email"
                      required autoComplete="email"
                      placeholder="jane@company.com" value={values.email}
                      onChange={handleChange} onBlur={handleBlur}
                      error={errors.email} touched={touched.email}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      label="Subject" name="subject" required
                      maxLength={140} placeholder="What is this about?"
                      value={values.subject} onChange={handleChange}
                      onBlur={handleBlur} error={errors.subject}
                      touched={touched.subject} disabled={isSubmitting}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      label="Message" name="message" as="textarea"
                      required rows={6} maxLength={4000}
                      placeholder="Tell me about your project..."
                      value={values.message} onChange={handleChange}
                      onBlur={handleBlur} error={errors.message}
                      touched={touched.message} disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary mt-6 w-full !py-3.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner size={17} label="Sending" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <TbBrandWhatsapp size={17} aria-hidden="true" />
                        Send via WhatsApp
                      </>
                    )}
                  </button>

                  <p
                    className="mt-3.5 text-center text-[0.6875rem]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Message saves to database then opens WhatsApp with details pre-filled.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}