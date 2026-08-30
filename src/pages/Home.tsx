import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import portrait from '../images/Dexter.png';

const focusAreas = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Supabase', 'MongoDB', 'React Native', 'GIS & Mapping',
];

const stats = [
  { value: '15+', label: 'Projects Delivered' },
  { value: '9+', label: 'Client Platforms' },
  { value: 'Full Stack', label: 'Web & Mobile' },
];

const Home = () => {
  return (
    <div className="relative bg-gray-950 overflow-hidden">
      {/* Ambient background: dot grid + drifting gradient blobs */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" aria-hidden="true" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-500/15 rounded-full blur-3xl animate-blob" aria-hidden="true" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-blob-slow" aria-hidden="true" />

      {/* Hero */}
      <section className="relative min-h-[82vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            {/* Left: intro */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <span className="eyebrow justify-center lg:justify-start mb-4">
                Computer Engineer &middot; Full Stack Developer
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.05]">
                Hi, I&apos;m{' '}
                <span className="text-gradient">Dexter John</span>
                <span className="text-accent-400">.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                I build production web and mobile platforms for clients in solar
                energy, SaaS, and beyond, taking each product from idea to launch.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
                <Link
                  to="/projects"
                  className="group bg-accent-500 hover:bg-accent-400 text-gray-950 font-semibold py-3 px-7 rounded-lg transition-all duration-200 hover:shadow-glow-accent inline-flex items-center justify-center gap-2"
                >
                  View Projects
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  to="/contact"
                  className="border border-gray-600 hover:border-accent-400 text-white hover:text-accent-400 font-medium py-3 px-7 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  Get In Touch
                </Link>
                <a
                  href="/resume.pdf"
                  download="Dexter_John_Perdido_Resume.pdf"
                  className="text-gray-300 hover:text-accent-400 font-medium py-3 px-4 rounded-lg transition-colors duration-200 inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
                </a>
              </div>

              {/* Socials */}
              <div className="flex justify-center lg:justify-start gap-5">
                <a href="https://github.com/Dextiee" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-accent-400 hover:-translate-y-0.5 transition-all duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/dexter-john-perdido" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-accent-400 hover:-translate-y-0.5 transition-all duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:dexterjohnperdido@gmail.com" aria-label="Email" className="text-gray-400 hover:text-accent-400 hover:-translate-y-0.5 transition-all duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Right: portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative animate-float">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-accent-400 via-blue-500 to-accent-400 opacity-70 blur-md" aria-hidden="true" />
                <img
                  src={portrait}
                  alt="Portrait of Dexter John Perdido"
                  className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-full object-cover border-4 border-gray-950 shadow-glow-accent"
                />
                <div className="absolute -bottom-2 -right-2 bg-gray-900 border border-gray-700 rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                  Open to work
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:text-left lg:border-l lg:border-gray-800 lg:pl-4">
                <div className="text-xl sm:text-2xl font-display font-bold text-white">{s.value}</div>
                <div className="text-xs sm:text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="relative py-20 border-t border-gray-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow mb-3">About Me</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                From research lab to client-ready platforms
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                I&apos;m a Computer Engineer working as a freelance software engineer, building
                production platforms for clients across solar energy, SaaS, and real estate.
                Recent work includes Solar X, a marketing and customer-experience platform for
                a national solar company, Efficyon, a FinOps product that helps businesses cut
                software spend, and Psalmix, an AI-powered music streaming platform.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Before freelancing, I worked as a Science Research Analyst, where I built the
                ARECGIS renewable-energy mapping platform, the CARES offline survey app, and an
                IoT hydroponics automation system. That mix of research and client work shaped
                how I build today: software that is fast, secure, and dependable long after launch.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-900/70 border border-gray-800 rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold text-white mb-5">Core Stack &amp; Focus</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {focusAreas.map((t) => (
                  <span key={t} className="px-3 py-1.5 text-sm rounded-md font-medium bg-accent-400/10 text-accent-400 border border-accent-400/20">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/experience" className="flex-1 text-center border border-gray-700 hover:border-accent-400 text-white hover:text-accent-400 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
                  My Experience
                </Link>
                <Link to="/skills" className="flex-1 text-center border border-gray-700 hover:border-accent-400 text-white hover:text-accent-400 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
                  All Skills
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
