import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { School, Eye, EyeOff, GraduationCap, Users, Award, Sparkles } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
}

function FloatingOrb({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
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

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage className="min-h-screen flex">
      {/* Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80"
          alt="Students collaborating"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/95 via-primary-900/85 to-primary-800/75" />

        {/* Floating Orbs */}
        <FloatingOrb className="w-96 h-96 bg-primary-400/20 -top-20 -left-20" delay={0} />
        <FloatingOrb className="w-80 h-80 bg-purple-400/15 bottom-20 -right-10" delay={3} />
        <FloatingOrb className="w-64 h-64 bg-sky-400/15 top-1/3 right-10" delay={6} />

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
                whileHover={{ rotate: -10, scale: 1.05 }}
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
            Manage Your School
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-purple-200 to-sky-200">
              With Ease
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="text-primary-200/70 text-lg max-w-md leading-relaxed"
          >
            Complete school management solution for students, teachers, classes, attendance, and grades — all in one place.
          </motion.p>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
            className="mt-12 flex gap-4"
          >
            {[
              { icon: Users, value: '500+', label: 'Students', delay: 0.5 },
              { icon: GraduationCap, value: '50+', label: 'Teachers', delay: 0.6 },
              { icon: Award, value: '99%', label: 'Satisfaction', delay: 0.7 },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 flex-1 border border-white/5 hover:bg-white/15 transition-all duration-300"
              >
                <item.icon className="w-5 h-5 text-primary-300 mb-2" />
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
              <span>Secure • Reliable • Modern</span>
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
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
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
              whileHover={{ rotate: -5 }}
              className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-200"
            >
              <School className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
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
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-500 mt-1">Sign in to your account to continue</p>
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

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
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

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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
                    placeholder="Enter your password"
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
                transition={{ delay: 0.45 }}
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01, boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}
                  whileTap={{ scale: 0.99 }}
                  className="relative w-full py-3 text-base rounded-xl font-semibold text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-purple-600 group-hover:from-primary-700 group-hover:via-primary-600 group-hover:to-purple-700 transition-all duration-300" />
                  <span className="relative z-10">{loading ? 'Signing In...' : 'Sign In'}</span>
                </motion.button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-400">or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {['Google', 'Microsoft', 'Apple'].map((provider) => (
                  <motion.button
                    key={provider}
                    type="button"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  >
                    {provider}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Signup Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700"
                >
                  Create One
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
}
