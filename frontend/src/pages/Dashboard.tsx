import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, BookOpen, TrendingUp, Activity, Clock, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend } from 'recharts';
import { api } from '../api/client';
import { DashboardStats, Activity as ActivityType } from '../types';
import AnimatedPage from '../components/AnimatedPage';
import StaggerList from '../components/StaggerList';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444'];

const activityIcons: Record<string, React.ElementType> = {
  student: Users,
  teacher: GraduationCap,
  class: BookOpen,
  attendance: Activity,
  grade: Award,
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.dashboard.get().then(data => { setStats(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Students', value: stats?.totalStudents ?? 0, icon: Users, iconColor: 'text-violet-500', bg: 'bg-purple-50' },
    { label: 'Active Students', value: stats?.activeStudents ?? 0, icon: TrendingUp, iconColor: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Total Teachers', value: stats?.totalTeachers ?? 0, icon: GraduationCap, iconColor: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Total Classes', value: stats?.totalClasses ?? 0, icon: BookOpen, iconColor: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <AnimatedPage className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">School overview and statistics</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-200"
        >
          <Clock className="w-4 h-4 text-gray-400 animate-pulse-soft" />
          <span className="text-sm text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </motion.div>
      </motion.div>

      <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4, scale: 1.01 }}
            className="stat-card cursor-default"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center`}
            >
              <card.icon className={`w-7 h-7 ${card.iconColor}`} />
            </motion.div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </StaggerList>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Attendance Rate</h3>
          <p className="text-sm text-gray-500 mb-6">Monthly attendance trends</p>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-600" />
              <span className="text-sm text-gray-600">This Year</span>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
              className="text-2xl font-bold text-gray-900"
            >
              {stats?.attendanceRate}%
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="badge-success"
            >
              +2.5%
            </motion.div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={stats?.attendanceTrend ?? []}>
              <defs>
                <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={3} fill="url(#attendanceGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Grade Distribution</h3>
          <p className="text-sm text-gray-500 mb-6">Student performance breakdown</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.gradeDistribution ?? []}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="count"
                label={({ range, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {(stats?.gradeDistribution ?? []).map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Class Distribution</h3>
          <p className="text-sm text-gray-500 mb-6">Students per class</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.classDistribution ?? []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis dataKey="className" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} width={120} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
              <Bar dataKey="count" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-500">Latest updates</p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {stats?.recentActivities.length ?? 0} updates
            </motion.div>
          </div>
          <StaggerList className="space-y-1" staggerDelay={0.05}>
            {(stats?.recentActivities ?? []).map((activity) => (
              <motion.div
                key={activity.id}
                whileHover={{ x: 4, backgroundColor: 'rgba(249, 250, 251, 1)' }}
                className="flex items-start gap-3 p-3 rounded-lg transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                >
                  {React.createElement(activityIcons[activity.type] || Activity, { className: 'w-4 h-4 text-primary-600' })}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(activity.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </motion.div>
            ))}
          </StaggerList>
        </motion.div>
      </div>
    </AnimatedPage>
  );
}
