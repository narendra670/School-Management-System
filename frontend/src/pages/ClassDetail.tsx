import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Users, Clock, MapPin, User } from 'lucide-react';
import { api } from '../api/client';
import { Class, Student } from '../types';
import AnimatedPage from '../components/AnimatedPage';

export default function ClassDetail() {
  const { id } = useParams();
  const [cls, setCls] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.classes.getById(id).then(c => { setCls(c); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!cls) return <div className="text-center py-20 text-gray-500">Class not found</div>;

  return (
    <AnimatedPage className="space-y-6">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/classes" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Classes
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <motion.div whileHover={{ scale: 1.05, rotate: 5 }} className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-primary-600" />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{cls.name}</h1>
                <p className="text-gray-500 mt-1">{cls.subject} • Section {cls.section}</p>
              </div>
              <span className={cls.status === 'Active' ? 'badge-success' : 'badge-warning'}>{cls.status}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600"><User className="w-4 h-4 text-gray-400" /> {cls.teacherName || 'Unassigned'}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin className="w-4 h-4 text-gray-400" /> {cls.room}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Clock className="w-4 h-4 text-gray-400" /> {cls.schedule}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Users className="w-4 h-4 text-gray-400" /> {cls.students?.length ?? 0}/{cls.capacity} Students</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrolled Students</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="table-header">Student</th>
                <th className="table-header">Email</th>
                <th className="table-header">Phone</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cls.students?.map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="table-cell">
                    <Link to={`/students/${s.id}`} className="flex items-center gap-3 group">
                      <img src={s.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-primary-200 transition-all" />
                      <span className="font-medium text-gray-900">{s.firstName} {s.lastName}</span>
                    </Link>
                  </td>
                  <td className="table-cell text-gray-500">{s.email}</td>
                  <td className="table-cell text-gray-500">{s.phone}</td>
                  <td className="table-cell">
                    <span className={s.status === 'Active' ? 'badge-success' : 'badge-warning'}>{s.status}</span>
                  </td>
                </motion.tr>
              ))}
              {(!cls.students || cls.students.length === 0) && (
                <tr><td colSpan={4} className="text-center py-12 text-gray-400 text-sm">No students enrolled</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AnimatedPage>
  );
}
