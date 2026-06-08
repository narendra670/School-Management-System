import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { School, Eye, EyeOff, BookOpen, Rocket, Shield, Sparkles } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

interface SignupProps {
  onSignup: (name: string, email: string, password: string) => Promise<boolean>;
}

function FloatingOrb({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        x: [0, -30, 20, 0],
        y: [0, 40, -20, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function Signup({ onSignup }: SignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await onSignup(name, email, password);
    } catch (err: any) {
      setError(err.message || 'Signup failed. Email may already be registered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage className="min-h-screen flex">
      {/* Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80"
          alt="Students collaborating outdoors"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/95 via-primary-900/85 to-primary-800/75" />

        {/* Floating Orbs */}
        <FloatingOrb className="w-96 h-96 bg-purple-400/20 -top-20 -right-20" delay={0} />
        <FloatingOrb className="w-80 h-80 bg-sky-400/15 bottom-20 -left-10" delay={3} />
        <FloatingOrb className="w-64 h-64 bg-primary-400/15 top-1/3 left-10" delay={6} />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                className="w-16 h-16 bg-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10"
              >
                <School className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary-200">
                    EduManage
                  </span>
                </h1>
                <p className="text-primary-200/80 text-sm">School Management System</p>
              </div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="text-5xl font-bold text-white leading-tight mb-6"
          >
            Start Managing
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-sky-200 to-primary-200">
              Your School Today
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="text-primary-200/70 text-lg max-w-md leading-relaxed"
          >
            Create your account and get instant access to all features — manage students, teachers, classes, attendance, and grades seamlessly.
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
            className="mt-12 flex gap-4"
          >
            {[
              { icon: BookOpen, value: 'Free', label: 'To Start', delay: 0.5 },
              { icon: Shield, value: 'No CC', label: 'Required', delay: 0.6 },
              { icon: Rocket, value: 'Full', label: 'Access', delay: 0.7 },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 flex-1 border border-white/5 hover:bg-white/15 transition-all duration-300"
              >
                <item.icon className="w-5 h-5 text-purple-300 mb-2" />
                <p className="text-white font-bold text-xl">{item.value}</p>
                <p className="text-primary-200/60 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative Sparkles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-16"
          >
            <div className="flex items-center gap-2 text-white/30 text-xs">
              <Sparkles className="w-3 h-3" />
              <span>Easy Setup • No Credit Card • Instant Access</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #a855f7 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10 lg:hidden"
          >
            <motion.div
              whileHover={{ rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-br from-purple-600 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-200"
            >
              <School className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-primary-500">
                EduManage
              </span>
            </h1>
            <p className="text-gray-500">School Management System</p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100/50"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
              <p className="text-gray-500 mt-1">Get started with your free account</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm font-medium border border-red-100"
                >
                  {error}
                </motion.div>
              )}

              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-field"
                  placeholder="Enter your name"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Enter your email"
                />
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input-field pr-10"
                    placeholder="Create a password (min. 6 characters)"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </motion.button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01, boxShadow: '0 4px 20px rgba(168,85,247,0.3)' }}
                  whileTap={{ scale: 0.99 }}
                  className="relative w-full py-3 text-base rounded-xl font-semibold text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-primary-500 to-sky-600 group-hover:from-purple-700 group-hover:via-primary-600 group-hover:to-sky-700 transition-all duration-300" />
                  <span className="relative z-10">
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </span>
                </motion.button>
              </motion.div>
            </form>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-6 space-y-2"
            >
              {[
                'Free forever for basic features',
                'No credit card required',
                'Full access to all modules',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
                  {benefit}
                </div>
              ))}
            </motion.div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 pt-6 border-t border-gray-100 text-center"
            >
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-primary-600 hover:from-purple-700 hover:to-primary-700"
                >
                  Sign In
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
}
