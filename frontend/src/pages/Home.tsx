import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  School, Users, BookOpen, TrendingUp, ArrowRight, BarChart, ClipboardList,
  Star, Quote, GraduationCap, ChevronRight, Mail, Phone, MapPin, Award,
  Sparkles, CheckCircle, ChevronUp, Play, Shield, Zap
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import CountUp from '../components/CountUp';
import { useState, useEffect } from 'react';

const FALLBACK_IMG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" fill="%23e2e8f0"%3E%3Crect width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-size="20"%3EImage not available%3C/text%3E%3C/svg%3E';

function addFallback(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (!img.dataset.fallbackAttempted) {
    img.dataset.fallbackAttempted = 'true';
    img.src = FALLBACK_IMG;
  }
}

const features = [
  { icon: Users, title: 'Student Management', desc: 'Track student profiles, enrollment, and academic progress all in one place.', color: 'from-violet-500 to-purple-600', bg: 'bg-purple-50', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80' },
  { icon: GraduationCap, title: 'Teacher Directory', desc: 'Manage teacher information, subjects, and class assignments effortlessly.', color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-50', img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80' },
  { icon: BookOpen, title: 'Class Scheduling', desc: 'Organize classes, sections, and room assignments with ease.', color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80' },
  { icon: ClipboardList, title: 'Attendance Tracking', desc: 'Record and monitor attendance with real-time status updates.', color: 'from-orange-500 to-amber-600', bg: 'bg-orange-50', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80' },
  { icon: TrendingUp, title: 'Grade Management', desc: 'Enter and analyze grades with detailed performance insights.', color: 'from-pink-500 to-rose-600', bg: 'bg-pink-50', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80' },
  { icon: BarChart, title: 'Analytics Dashboard', desc: 'Visualize key metrics and make data-driven decisions.', color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
];

const testimonials = [
  { name: 'Dr. Sarah Mitchell', role: 'Principal, Riverside Academy', quote: 'EduManage has transformed how we run our school. The intuitive interface and comprehensive features have saved us countless hours.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80' },
  { name: 'James Rodriguez', role: 'Head of Mathematics', quote: 'The grade management and analytics tools are incredible. I can track student progress in real-time and identify areas needing attention.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80' },
  { name: 'Emily Chen', role: 'School Administrator', quote: 'Attendance tracking used to be a nightmare. Now with EduManage, it takes seconds. The reporting features are a game-changer.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

function FloatingOrb({ className, size, color, delay = 0, duration = 8 }: { className?: string; size: string; color: string; delay?: number; duration?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 3, delay, repeat: Infinity }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
        className={`${size} ${color} rounded-full blur-3xl`}
      />
    </motion.div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', toggle, { passive: true });
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-2xl shadow-xl shadow-primary-500/30 flex items-center justify-center hover:shadow-primary-500/50 hover:scale-105 transition-all duration-300"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={`relative h-24 overflow-hidden ${className || ''}`}>
      <div className="absolute inset-0">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" className="fill-current text-gray-50" />
        </svg>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200 group-hover:shadow-primary-300 transition-shadow"
            >
              <School className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">EduManage</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Features'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase() === 'features' ? '#features' : item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary-500 after:transition-all after:duration-300 hover:after:w-full ${item === 'Home' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/signup"
                className="text-sm font-medium bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-primary-200 hover:shadow-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300"
              >
                Get Started Free
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <FloatingOrb className="-top-40 -left-40" size="w-96 h-96" color="bg-primary-400" delay={0} duration={10} />
        <FloatingOrb className="-bottom-40 -right-40" size="w-80 h-80" color="bg-cyan-400" delay={2} duration={12} />
        <FloatingOrb className="top-1/3 right-1/4" size="w-64 h-64" color="bg-purple-400" delay={4} duration={8} />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80"
            alt="Students on campus"
            className="w-full h-full object-cover"
            onError={addFallback}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white/90 mb-8 border border-white/10"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Award className="w-4 h-4 text-yellow-400" />
              </motion.div>
              Trusted by 500+ educational institutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-white mb-6"
            >
              Simplify School
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500">
                Management
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
            >
              Everything you need to manage students, teachers, classes, attendance, and grades in one powerful, intuitive platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/40 transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Trial
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </span>
                  <motion.div
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/20 border border-white/10 transition-all duration-300"
                >
                  <Play className="w-4 h-4" /> Learn More
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10"
            >
              <div className="flex -space-x-3">
                {[0,1,2,3].map(i => (
                  <motion.img
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    src={`https://images.unsplash.com/photo-${['1494790108377-be9c29b29330','1507003211169-0a1dd7228f2d','1438761681033-6461ffad8d80','1472099645785-5658abf4ff4e'][i]}?w=48&q=80`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    onError={addFallback}
                  />
                ))}
              </div>
              <div className="text-white">
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6 + i * 0.08 }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-gray-300">Loved by <span className="text-white font-semibold">2,000+</span> educators</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, x: 100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 w-[500px] xl:w-[600px]"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                  alt="School management dashboard"
                  className="w-full h-auto"
                  onError={addFallback}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
              </div>
            </motion.div>
            {/* Decorative blobs */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary-400 to-purple-600 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-60 blur-xl" />
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-60 blur-xl" />
            {/* Floating stats card */}
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-16 bg-white/90 backdrop-blur rounded-xl p-3 shadow-lg flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Security</p>
                <p className="text-sm font-bold text-gray-900">99.9% Uptime</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/40">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1.5 bg-white/40 rounded-full"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
        />
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-20 bg-white relative overflow-hidden">
        <FloatingOrb className="top-0 right-0" size="w-72 h-72" color="bg-primary-100" delay={1} duration={10} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { end: 500, suffix: '+', label: 'Schools', icon: School },
              { end: 50000, suffix: '+', label: 'Students', icon: Users },
              { end: 5000, suffix: '+', label: 'Teachers', icon: GraduationCap },
              { end: 99, suffix: '%', label: 'Satisfaction', icon: Star },
            ].map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative text-center p-6 rounded-3xl border border-gray-100/50 group-hover:border-primary-100/50 transition-all duration-500">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-14 h-14 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-all duration-300"
                  >
                    <stat.icon className="w-7 h-7 text-primary-600" />
                  </motion.div>
                  <p className="text-3xl lg:text-4xl font-bold text-gray-900">
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="text-gray-500 mt-1 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <SectionDivider className="-mt-12" />

      {/* Features Section */}
      <AnimatedSection className="py-24 bg-gray-50 relative overflow-hidden">
        <FloatingOrb className="-top-20 -left-20" size="w-96 h-96" color="bg-primary-200" delay={0} duration={12} />
        <FloatingOrb className="-bottom-20 -right-20" size="w-80 h-80" color="bg-cyan-100" delay={3} duration={10} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <AnimatedSection direction="up">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">
                <Zap className="w-3.5 h-3.5" /> Features
              </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Comprehensive tools designed to streamline every aspect of school management
              </p>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] bg-gradient-to-b from-primary-400 via-transparent to-transparent pointer-events-none" />
                <div className="h-48 overflow-hidden relative">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    onError={addFallback}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="p-6 relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 -mt-12 relative z-10 ring-4 ring-white shadow-lg`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color.replace('from-', 'text-').split(' ')[0]}`} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{feature.desc}</p>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <SectionDivider className="-mt-12 rotate-180" />

      {/* How It Works */}
      <AnimatedSection className="py-24 bg-white relative overflow-hidden">
        <FloatingOrb className="top-1/3 -left-20" size="w-80 h-80" color="bg-primary-100" delay={2} duration={11} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection direction="up">
              <span className="inline-block text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">How It Works</span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Get Started in Minutes</h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Simple setup process to get your school online</p>
            </AnimatedSection>
          </div>

          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-[440px] -translate-x-1/2 w-1/2 h-[2px]">
            <svg viewBox="0 0 200 2" className="w-full h-full">
              <motion.path
                d="M0,1 L200,1"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="8 6"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up for free and set up your school profile in under 2 minutes.', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80', icon: CheckCircle },
              { step: '02', title: 'Add Data', desc: 'Import students, teachers, and class information with our bulk upload tool.', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80', icon: Users },
              { step: '03', title: 'Start Managing', desc: 'Track attendance, grades, and generate insightful reports instantly.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', icon: Zap },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center group relative"
              >
                {/* Step indicator dot for connecting line */}
                <div className="hidden md:block absolute top-[80px] left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-md z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
                    className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-30"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative mb-8 rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-100"
                >
                  <img src={item.img} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" onError={addFallback} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white font-bold text-sm">{item.step}</span>
                  </motion.div>
                </motion.div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center"
                  >
                    <item.icon className="w-4 h-4 text-primary-600" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <SectionDivider className="-mt-12" />

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <FloatingOrb className="top-0 left-0" size="w-96 h-96" color="bg-primary-200" delay={0} duration={14} />
        <FloatingOrb className="bottom-0 right-0" size="w-96 h-96" color="bg-primary-100" delay={2} duration={12} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <AnimatedSection direction="up">
              <span className="inline-block text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">Testimonials</span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">What Educators Say</h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Hear from the educators who trust EduManage every day
              </p>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative group"
              >
                {/* Decorative quote background */}
                <div className="absolute top-4 right-6 opacity-[0.04]">
                  <Quote className="w-24 h-24 text-primary-600" />
                </div>

                {/* Star ratings */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed mb-6 relative z-10">"{t.quote}"</p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100"
                    onError={addFallback}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>

                {/* Gradient line on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider className="-mt-12 rotate-180" />

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <FloatingOrb className="-top-40 -right-40" size="w-[500px] h-[500px]" color="bg-primary-200" delay={0} duration={15} />
        <FloatingOrb className="-bottom-40 -left-40" size="w-[400px] h-[400px]" color="bg-cyan-100" delay={3} duration={13} />

        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80" alt="" className="w-full h-full object-cover" onError={addFallback} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-800/90 to-primary-900/95" />
          {/* Animated grid overlay */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-8 ring-1 ring-white/20"
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-100">
              Your School?
            </span>
          </h2>

          <p className="text-lg text-primary-100/80 mb-10 max-w-2xl mx-auto">
            Join hundreds of schools already using EduManage to streamline their operations and enhance student success.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                Get Started Free
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/20 border border-white/10 transition-all duration-300"
              >
                Talk to Sales
              </Link>
            </motion.div>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex items-center gap-2 text-primary-200/60 text-sm">
              <Shield className="w-4 h-4" /> No credit card required
            </div>
            <div className="flex items-center gap-2 text-primary-200/60 text-sm">
              <CheckCircle className="w-4 h-4" /> Free 30-day trial
            </div>
            <div className="flex items-center gap-2 text-primary-200/60 text-sm">
              <Zap className="w-4 h-4" /> Cancel anytime
            </div>
          </motion.div>
        </motion.div>
      </section>

      <SectionDivider className="-mt-12" />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
        <FloatingOrb className="top-0 right-0" size="w-96 h-96" color="bg-primary-900" delay={0} duration={15} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sm:col-span-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                  <School className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">EduManage</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-6 text-sm">
                Empowering educational institutions with modern management tools to streamline operations and enhance student success.
              </p>
              <div className="flex items-center gap-3">
                {[Mail, Phone, MapPin].map((Icon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-xl flex items-center justify-center cursor-pointer transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {[
              { title: 'Product', items: ['Features', 'Pricing', 'Integrations', 'Updates'] },
              { title: 'Company', items: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Support', items: ['Help Center', 'Documentation', 'API Status', 'Community'] },
            ].map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-3">
                  {col.items.map(item => (
                    <li key={item}>
                      <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
                        <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-400">Stay up to date with our latest features and releases.</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all w-48"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 pt-6 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} EduManage. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</Link>
              <Link to="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</Link>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Back to top button */}
      <BackToTop />
    </motion.div>
  );
}
