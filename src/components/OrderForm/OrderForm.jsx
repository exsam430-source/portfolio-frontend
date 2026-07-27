import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  TbSend, TbCircleCheck, TbCopy, TbRocket, TbShieldCheck, TbClockHour4, TbRefresh,
  TbBrandWhatsapp,
} from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import FormField from '../ui/FormField';
import Spinner from '../ui/Spinner';
import useForm from '../../hooks/useForm';
import { useUI, useFormOptions } from '../../context';
import { submitOrder, fetchOrderOptions } from '../../api/services';
import { validateOrder } from '../../utils/validators';
import { fadeUp, slideLeft, slideRight, stagger, viewportOnce } from '../../utils/motion';

const WHATSAPP_NUMBER = '923495589669'; // 03495589669 → international format

const INITIAL = {
  name: '', email: '', phone: '', serviceType: '', projectTitle: '',
  description: '', budget: '', timeline: '', techPreference: '',
  website: '', // honeypot
};

const PROMISES = [
  { icon: TbClockHour4, title: 'Reply within 24 hours', text: 'Every request gets a real, considered response — not a template.' },
  { icon: TbShieldCheck, title: 'No obligation', text: 'Submitting a request costs nothing and commits you to nothing.' },
  { icon: TbRocket, title: 'Clear scope first', text: "We agree on deliverables, timeline and price before any code is written." },
];

/** Build the WhatsApp message from the order data */
const buildWhatsAppMessage = (order) => {
  const lines = [
    `🚀 *New Project Order — ${order.reference}*`,
    ``,
    `👤 *Client Details*`,
    `• Name: ${order.name}`,
    `• Email: ${order.email}`,
    order.phone ? `• Phone: ${order.phone}` : null,
    ``,
    `📋 *Project Details*`,
    `• Service: ${order.serviceType}`,
    `• Title: ${order.projectTitle}`,
    `• Budget: ${order.budget}`,
    `• Timeline: ${order.timeline}`,
    order.techPreference ? `• Tech Preference: ${order.techPreference}` : null,
    ``,
    `📝 *Description*`,
    order.description,
    ``,
    `🔖 *Reference:* ${order.reference}`,
  ];

  return encodeURIComponent(
    lines.filter((l) => l !== null).join('\n')
  );
};

/** Open WhatsApp with the pre-filled message */
const openWhatsApp = (order) => {
  const message = buildWhatsAppMessage(order);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

export default function OrderForm() {
  const { prefilledService, clearPrefilledService, addSubmittedOrder } = useUI();
  const defaultOptions = useFormOptions();
  const [success, setSuccess] = useState(null);
  const [options, setOptions] = useState(defaultOptions);

  const form = useForm(INITIAL, validateOrder);
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setValue, setErrors, reset } = form;

  /* Keep dropdowns in sync with the backend enums */
  useEffect(() => {
    let cancelled = false;
    fetchOrderOptions()
      .then((data) => { if (!cancelled && data) setOptions(data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  /* A service card was clicked → preselect that service type */
  useEffect(() => {
    if (prefilledService) {
      setValue('serviceType', prefilledService);
      clearPrefilledService();
    }
  }, [prefilledService, setValue, clearPrefilledService]);

  const onSubmit = handleSubmit(async (data) => {
    const toastId = toast.loading('Submitting your project request…');
    try {
      const res = await submitOrder(data);
      const order = res?.data;

      toast.success(res.message || 'Order submitted! Redirecting to WhatsApp…', {
        id: toastId,
        duration: 4000,
      });

      if (order?.reference) addSubmittedOrder(order.reference);

      setSuccess({
        reference: order.reference,
        name: data.name,
        email: data.email,
        title: data.projectTitle,
        order, // full order for WhatsApp message
      });

      reset();

      // Auto-open WhatsApp after short delay so toast is visible
      setTimeout(() => openWhatsApp(order), 1500);

    } catch (err) {
      toast.error(err.message, { id: toastId });
      if (err.fieldErrors && Object.keys(err.fieldErrors).length) setErrors(err.fieldErrors);
    }
  });

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(success.reference);
      toast.success('Reference copied to clipboard');
    } catch {
      toast.error('Could not copy — please note it down manually.');
    }
  };

  return (
    <section id="order" className="section relative overflow-hidden" aria-labelledby="order-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-secondary/10 blur-[150px]"
      />

      <div className="container-x">
        <SectionHeading
          eyebrow="Hire Me"
          title="Start Your"
          highlight="Project"
          subtitle="Tell me what you want to build. The more detail you give, the more accurate my proposal will be."
        />
        <h2 id="order-heading" className="sr-only">Submit a project order</h2>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]">
          {/* ── Left: reassurance panel ── */}
          <motion.aside
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <motion.div variants={slideLeft} className="card card-gradient-edge p-6">
              <h3 className="text-lg font-bold">How it works</h3>
              <ol className="mt-5 space-y-5">
                {[
                  { step: '01', title: 'You submit the brief', text: 'Fill in the form — it takes about two minutes.' },
                  { step: '02', title: 'WhatsApp redirect', text: 'You\'re taken to WhatsApp with all details pre-filled.' },
                  { step: '03', title: 'We agree the scope', text: 'Deliverables, milestones, timeline and price in writing.' },
                  { step: '04', title: 'I build and ship', text: 'Regular updates, then handover with documentation.' },
                ].map((item) => (
                  <li key={item.step} className="flex gap-3.5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/12 text-xs font-bold text-primary-soft">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-[0.875rem] font-semibold">{item.title}</p>
                      <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.ul variants={stagger(0.08)} className="mt-4 space-y-3">
              {PROMISES.map(({ icon: Icon, title, text }) => (
                <motion.li key={title} variants={fadeUp} className="card !rounded-xl flex gap-3 p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-success/12 text-success">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.8125rem] font-semibold">{title}</p>
                    <p className="mt-0.5 text-[0.75rem] leading-relaxed text-muted">{text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.aside>

          {/* ── Right: the form ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="card card-gradient-edge relative p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              {success ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                    className="grid size-16 place-items-center rounded-2xl bg-success/15 text-success"
                  >
                    <TbCircleCheck size={34} aria-hidden="true" />
                  </motion.span>

                  <h3 className="mt-6 text-2xl font-bold">
                    Request received, {success.name.split(' ')[0]}!
                  </h3>

                  <p className="mt-2.5 max-w-md text-sm leading-relaxed text-muted">
                    Your project brief for{' '}
                    <strong className="text-content">{success.title}</strong> has been saved.
                    WhatsApp should have opened automatically — if not, click the button below.
                  </p>

                  {success.reference && (
                    <div className="mt-6 w-full max-w-xs">
                      <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted">
                        Your reference number
                      </p>
                      <button
                        type="button"
                        onClick={copyReference}
                        className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 font-mono text-lg font-bold text-primary-soft transition-colors hover:border-primary/60"
                      >
                        {success.reference}
                        <TbCopy
                          size={16}
                          className="opacity-60 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  )}

                  {/* WhatsApp button */}
                  <button
                    type="button"
                    onClick={() => openWhatsApp(success.order)}
                    className="btn btn-primary mt-7 gap-2 !bg-[#25D366] hover:!bg-[#20bd5a] !border-[#25D366]"
                  >
                    <TbBrandWhatsapp size={20} aria-hidden="true" />
                    Open WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={() => setSuccess(null)}
                    className="btn btn-ghost mt-3"
                  >
                    <TbRefresh size={16} aria-hidden="true" />
                    Submit another project
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  aria-label="Project order form"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                      <TbRocket size={19} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold">Project brief</h3>
                      <p className="text-xs text-muted">Fields marked with * are required.</p>
                    </div>
                  </div>

                  {/* Honeypot */}
                  <div className="absolute left-[-9999px] top-0" aria-hidden="true">
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      id="website" name="website" type="text"
                      tabIndex={-1} autoComplete="off"
                      value={values.website} onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Full Name" name="name" required autoComplete="name"
                      placeholder="Jane Cooper" maxLength={80}
                      value={values.name} onChange={handleChange} onBlur={handleBlur}
                      error={errors.name} touched={touched.name} disabled={isSubmitting}
                    />
                    <FormField
                      label="Email Address" name="email" type="email" required autoComplete="email"
                      placeholder="jane@company.com"
                      value={values.email} onChange={handleChange} onBlur={handleBlur}
                      error={errors.email} touched={touched.email} disabled={isSubmitting}
                    />
                    <FormField
                      label="Phone Number" name="phone" type="tel" autoComplete="tel"
                      placeholder="+1 555 000 0000"
                      value={values.phone} onChange={handleChange} onBlur={handleBlur}
                      error={errors.phone} touched={touched.phone} disabled={isSubmitting}
                    />
                    <FormField
                      label="Service Type" name="serviceType" as="select" required
                      placeholder="Choose a service" options={options.serviceTypes}
                      value={values.serviceType} onChange={handleChange} onBlur={handleBlur}
                      error={errors.serviceType} touched={touched.serviceType} disabled={isSubmitting}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      label="Project Title" name="projectTitle" required maxLength={140}
                      placeholder="e.g. Multi-vendor e-commerce marketplace"
                      value={values.projectTitle} onChange={handleChange} onBlur={handleBlur}
                      error={errors.projectTitle} touched={touched.projectTitle} disabled={isSubmitting}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      label="Project Description" name="description" as="textarea" required
                      rows={6} maxLength={5000}
                      placeholder="What are you building, who is it for, and what does success look like? Mention any must-have features, integrations or existing systems."
                      hint="The more context you give, the more accurate my quote will be."
                      value={values.description} onChange={handleChange} onBlur={handleBlur}
                      error={errors.description} touched={touched.description} disabled={isSubmitting}
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Budget Range" name="budget" as="select" required
                      placeholder="Select a budget" options={options.budgets}
                      value={values.budget} onChange={handleChange} onBlur={handleBlur}
                      error={errors.budget} touched={touched.budget} disabled={isSubmitting}
                    />
                    <FormField
                      label="Timeline / Deadline" name="timeline" as="select" required
                      placeholder="Select a timeline" options={options.timelines}
                      value={values.timeline} onChange={handleChange} onBlur={handleBlur}
                      error={errors.timeline} touched={touched.timeline} disabled={isSubmitting}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      label="Tech Stack Preference" name="techPreference" maxLength={300}
                      placeholder="e.g. Must use Next.js and PostgreSQL, deploy on AWS"
                      hint="Leave blank and I'll recommend the best stack for the job."
                      value={values.techPreference} onChange={handleChange} onBlur={handleBlur}
                      error={errors.techPreference} touched={touched.techPreference} disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary mt-7 w-full !py-3.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner size={17} label="Submitting" />
                        Submitting your request…
                      </>
                    ) : (
                      <>
                        <TbBrandWhatsapp size={17} aria-hidden="true" />
                        Submit & Continue on WhatsApp
                      </>
                    )}
                  </button>

                  <p className="mt-3.5 text-center text-[0.6875rem] leading-relaxed text-muted">
                    Your details are saved securely. After submitting, you'll be redirected to
                    WhatsApp with your project details pre-filled.
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