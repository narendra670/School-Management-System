import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { School, Users, BookOpen, TrendingUp, ArrowRight, BarChart, ClipboardList, Star, Quote, GraduationCap, ChevronRight, Mail, Phone, MapPin, Award } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import CountUp from '../components/CountUp';

const features = [
  { icon: Users, title: 'Student Management', desc: 'Track student profiles, enrollment, and academic progress all in one place.', color: 'from-violet-500 to-purple-600', bg: 'bg-purple-50', img: 'https://images.unsplash.com/photo-1529543544282-ea66907b1966?w=800&q=80' },
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

const stagger = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

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
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100"
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
                  className={`text-sm font-medium transition-colors ${item === 'Home' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
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
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            src="https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1920&q=80"
            alt="Students on campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">
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
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/40 transition-all duration-300"
                >
                  Start Free Trial <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  ><ArrowRight className="w-4 h-4" /></motion.span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/20 border border-white/10 transition-all duration-300"
                >
                  Learn More
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
        />
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-14 h-14 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300"
                >
                  <stat.icon className="w-7 h-7 text-primary-600" />
                </motion.div>
                <p className="text-3xl font-bold text-gray-900">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <img src="https://images.unsplash.com/photo-1529543544282-ea66907b1966?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <AnimatedSection direction="up">
              <span className="inline-block text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">Features</span>
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
                <div className="h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="p-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 -mt-12 relative z-10 ring-4 ring-white shadow-lg`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color.replace('from-', 'text-').split(' ')[0]}`} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection className="py-24 bg-white">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up for free and set up your school profile', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80' },
              { step: '02', title: 'Add Data', desc: 'Import students, teachers, and class information', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80' },
              { step: '03', title: 'Start Managing', desc: 'Track attendance, grades, and generate reports', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative mb-8 rounded-2xl overflow-hidden shadow-lg"
                >
                  <img src={item.img} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center"
                  >
                    <span className="text-white font-bold text-sm">{item.step}</span>
                  </motion.div>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <motion.div
          animate={{ x: [-100, 100], y: [-50, 50] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{ x: [100, -100], y: [50, -50] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <AnimatedSection direction="up">
              <span className="inline-block text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">Testimonials</span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">What Educators Say</h2>
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
                <Quote className="w-10 h-10 text-primary-200 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-6">{t.quote}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your School?
          </h2>
          <p className="text-lg text-primary-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of schools already using EduManage to streamline their operations.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <p className="text-primary-200 text-sm mt-4">No credit card required. Free 30-day trial.</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                  <School className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">EduManage</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-6">
                Empowering educational institutions with modern management tools to streamline operations and enhance student success.
              </p>
              <div className="flex items-center gap-4">
                {[Mail, Phone, MapPin].map((Icon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 1)' }}
                    className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center cursor-pointer"
                  >
                    <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {[
              { title: 'Product', items: ['Features', 'Pricing', 'Integrations', 'Updates'] },
              { title: 'Company', items: ['About', 'Blog', 'Careers', 'Contact'] },
            ].map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="text-white font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.items.map(item => (
                    <li key={item}>
                      <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} EduManage. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </motion.div>
  );
}
