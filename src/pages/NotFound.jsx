import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TbHome, TbSend } from 'react-icons/tb';

import { useProfile } from '../context';

export default function NotFound() {
  const profile = useProfile();

  return (
    <main className="grid min-h-screen place-items-center px-5 py-16 text-center">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute left-1/2 top-1/3 size-[32rem] -translate-x-1/2 rounded-full bg-secondary/10 blur-[130px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-display text-[6rem] font-extrabold leading-none sm:text-[9rem]">
          <span className="gradient-text-tri">404</span>
        </p>

        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">This page doesn't exist</h1>

        <p className="mx-auto mt-3.5 max-w-md text-sm leading-relaxed text-muted">
          The link may be broken or the page may have moved. Everything you're looking for is on
          the main portfolio page.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            <TbHome size={17} aria-hidden="true" />
            Back to homepage
          </Link>
          <a href={profile.socials.email} className="btn btn-ghost">
            <TbSend size={17} aria-hidden="true" />
            Email me instead
          </a>
        </div>
      </motion.div>
    </main>
  );
}
