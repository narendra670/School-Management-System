import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { School, Target, Eye, Heart, ArrowRight, Star, Quote, ChevronRight, Mail, Phone, MapPin, GraduationCap, Award, BookOpen, Users, CheckCircle, Shield } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const values = [
  { icon: Target, title: 'Our Mission', desc: 'To simplify school management so educators can focus on what matters most — student success.', color: 'from-violet-500 to-purple-600', bg: 'bg-purple-50' },
  { icon: Eye, title: 'Our Vision', desc: 'A world where every educational institution has access to powerful, easy-to-use management tools.', color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-50' },
  { icon: Heart, title: 'Our Commitment', desc: 'We are committed to continuous improvement and exceptional support for every institution we serve.', color: 'from-rose-500 to-pink-600', bg: 'bg-pink-50' },
];

const timeline = [
  { year: '2020', title: 'The Idea', desc: 'EduManage was conceived by educators who saw the need for better school management tools.', img: 'https://images.unsplash.com/photo-1456401260170-6b97e1484c0b?w=600&q=80' },
  { year: '2021', title: 'First Launch', desc: 'Beta version launched with 10 partner schools providing invaluable feedback.', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80' },
  { year: '2023', title: 'Major Growth', desc: 'Reached 200+ schools and expanded features based on real-world needs.', img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80' },
  { year: '2024', title: 'Full Platform', desc: 'Launched comprehensive analytics, mobile app, and AI-powered insights.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
  { year: '2025+', title: 'The Future', desc: 'Continuing to innovate with cutting-edge features for the education sector.', img: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80' },
];

const team = [
  { name: 'Dr. Sarah Mitchell', role: 'CEO & Co-Founder', desc: 'Former principal with 20+ years in education', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { name: 'James Rodriguez', role: 'CTO & Co-Founder', desc: 'Software engineer passionate about edtech', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Emily Chen', role: 'VP of Product', desc: 'Product strategist focused on user experience', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { name: 'Michael Park', role: 'Head of Engineering', desc: 'Full-stack developer leading our tech team', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { name: 'Lisa Thompson', role: 'Head of Design', desc: 'Creating beautiful, intuitive interfaces', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80' },
  { name: 'David Kim', role: 'Head of Success', desc: 'Ensuring every school succeeds with our platform', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function About() {
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
                  to={item === 'Home' ? '/' : item === 'Features' ? '/#features' : `/${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors ${item === 'About' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Sign In</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/signup" className="text-sm font-medium bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-primary-200 hover:shadow-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300">Get Started</Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
            alt="Students studying"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white/90 mb-8 border border-white/10">
              <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                <Award className="w-4 h-4 text-yellow-400" />
              </motion.div>
              Our story and mission
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-white mb-6">
              About
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">EduManage</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
              Empowering educational institutions with modern management tools since 2020.
            </motion.p>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Bar */}
      <AnimatedSection className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Schools Powered', icon: School },
              { number: '50K+', label: 'Students Active', icon: Users },
              { number: '5K+', label: 'Teachers Using', icon: GraduationCap },
              { number: '99.9%', label: 'Uptime', icon: Award },
            ].map((stat, i) => (
              <motion.div key={i} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center group">
                <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className="w-14 h-14 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-primary-600" />
                </motion.div>
                <p className="text-3xl font-bold text-gray-900">{stat.number}</p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Our Story */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedSection direction="up"><span className="inline-block text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">Our Story</span></AnimatedSection>
              <AnimatedSection direction="up" delay={0.1}>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  Built by Educators,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">for Educators</span>
                </h2>
              </AnimatedSection>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {[
                  'EduManage was born in 2020 when our founders — a school principal and a software engineer — realized how much time teachers and administrators were wasting on outdated systems.',
                  'They saw dedicated educators spending hours on attendance sheets, grade calculations, and administrative paperwork instead of focusing on what truly matters — teaching and inspiring students.',
                  'Today, EduManage serves over 500 schools worldwide, processing thousands of attendance records, grade entries, and class schedules every day. Our platform has become the backbone of modern school management.',
                ].map((p, i) => (
                  <AnimatedSection key={i} direction="up" delay={0.2 + i * 0.1}>
                    <p>{p}</p>
                  </AnimatedSection>
                ))}
              </div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/signup" className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-primary-200 hover:shadow-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300">
                    Join Our Mission <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <Link to="/#features" className="inline-flex items-center gap-2 bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300">Explore Features</Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80" alt="Students collaborating" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 hidden lg:flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                  <School className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">2020</p>
                  <p className="text-sm text-gray-500">Year Founded</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 hidden lg:block"
              >
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.1 }}>
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">Rated 4.9 by educators</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Values */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <motion.div animate={{ x: [-100, 100] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <AnimatedSection direction="up"><span className="inline-block text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">Our Values</span></AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}><h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">What Drives Us</h2></AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}><p className="text-gray-500 text-lg max-w-2xl mx-auto">Core principles that guide everything we build</p></AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <motion.div whileHover={{ scale: 1.15, rotate: 5 }} className={`w-16 h-16 ${v.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <v.icon className={`w-8 h-8 ${v.color.replace('from-', 'text-').split(' ')[0]}`} />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h3>
                <p className="text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection direction="up"><span className="inline-block text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">Our Journey</span></AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}><h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">How We Got Here</h2></AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}><p className="text-gray-500 text-lg max-w-2xl mx-auto">The milestones that shaped EduManage</p></AnimatedSection>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200 hidden md:block"
            />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  className="relative md:flex items-start gap-8 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold text-lg shadow-lg shadow-primary-200 flex-shrink-0 z-10"
                  >
                    {item.year}
                  </motion.div>
                  <div className="md:hidden w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold text-sm flex items-center justify-center mb-4 shadow-lg">{item.year}</div>
                  <div className="flex-1 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                      <div className="md:col-span-3 p-6 md:p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="md:col-span-2 h-48 md:h-auto overflow-hidden">
                        <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }} src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Team */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <motion.div animate={{ x: [100, -100] }} transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }} className="absolute bottom-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <AnimatedSection direction="up"><span className="inline-block text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">Our Team</span></AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}><h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Meet the People Behind EduManage</h2></AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}><p className="text-gray-500 text-lg max-w-2xl mx-auto">Passionate individuals building the future of education</p></AnimatedSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg">{member.name}</h3>
                    <p className="text-white/80 text-sm">{member.role}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-500 text-sm">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <AnimatedSection className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedSection direction="up"><span className="inline-block text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">Why Choose Us</span></AnimatedSection>
            <AnimatedSection direction="up" delay={0.1}><h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Built Different</h2></AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}><p className="text-gray-500 text-lg max-w-2xl mx-auto">What sets EduManage apart from the rest</p></AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security with 99.9% uptime guarantee' },
              { icon: Users, title: 'User-Friendly', desc: 'Intuitive interface designed with educators in mind' },
              { icon: Award, title: '24/7 Support', desc: 'Dedicated support team ready to help anytime' },
              { icon: CheckCircle, title: 'Easy Integration', desc: 'Seamlessly integrates with your existing tools' },
              { icon: BookOpen, title: 'Regular Updates', desc: 'Continuous improvements based on user feedback' },
              { icon: GraduationCap, title: 'Training Included', desc: 'Free onboarding and training for all staff' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary-600" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Join the Education Revolution</h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">Be part of the growing community of schools transforming education with modern technology.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/signup" className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/40 transition-all duration-300">
                Start Free Trial <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <Link to="/login" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/20 border border-white/10 transition-all duration-300">Sign In</Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                  <School className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">EduManage</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-6">Empowering educational institutions with modern management tools to streamline operations and enhance student success.</p>
              <div className="flex items-center gap-4">
                {[Mail, Phone, MapPin].map((Icon, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 1)' }} className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center cursor-pointer">
                    <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {[
              { title: 'Product', items: ['Features', 'Pricing', 'Integrations', 'Updates'] },
              { title: 'Company', items: ['About', 'Blog', 'Careers', 'Contact'] },
            ].map((col, i) => (
              <motion.div key={col.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
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
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
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
