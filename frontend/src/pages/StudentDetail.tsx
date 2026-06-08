import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, BookOpen } from 'lucide-react';
import { api } from '../api/client';
import { Student, Attendance, Grade } from '../types';
import AnimatedPage from '../components/AnimatedPage';

export default function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      api.students.getById(id),
      api.attendance.getAll(),
      api.grades.getAll(),
    ]).then(([s, a, g]) => {
      setStudent(s);
      setAttendance(a.filter((r: Attendance) => r.studentId === id));
      setGrades(g.filter((r: Grade) => r.studentId === id));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!student) return <div className="text-center py-20 text-gray-500">Student not found</div>;

  const avgGrade = grades.length ? Math.round(grades.reduce((s, g) => s + (g.score / g.totalScore) * 100, 0) / grades.length) : 0;
  const present = attendance.filter(a => a.status === 'Present').length;
  const attRate = attendance.length ? Math.round((present / attendance.length) * 100) : 0;

  return (
    <AnimatedPage className="space-y-6">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/students" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Students
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={student.avatar} alt=""
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-gray-100"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{student.firstName} {student.lastName}</h1>
                <p className="text-gray-500 mt-1">{student.className || 'No class'} • {student.status}</p>
              </div>
              <span className={student.status === 'Active' ? 'badge-success' : 'badge-warning'}>{student.status}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600"><Mail className="w-4 h-4 text-gray-400" /> {student.email}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Phone className="w-4 h-4 text-gray-400" /> {student.phone}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Calendar className="w-4 h-4 text-gray-400" /> {student.dateOfBirth}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin className="w-4 h-4 text-gray-400" /> {student.address}</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Attendance Rate', value: `${attRate}%`, icon: Calendar, bg: 'bg-green-50', color: 'text-green-600' },
          { label: 'Average Grade', value: `${avgGrade}%`, icon: BookOpen, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Total Records', value: grades.length, icon: BookOpen, bg: 'bg-purple-50', color: 'text-purple-600' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ y: -2 }}
            className="stat-card"
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Records</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-gray-200"><th className="table-header">Date</th><th className="table-header">Status</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {attendance.map((a, i) => (
                  <motion.tr key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                    <td className="table-cell">{new Date(a.date).toLocaleDateString()}</td>
                    <td className="table-cell">
                      <span className={a.status === 'Present' ? 'badge-success' : a.status === 'Absent' ? 'badge-danger' : a.status === 'Late' ? 'badge-warning' : 'badge-info'}>{a.status}</span>
                    </td>
                  </motion.tr>
                ))}
                {attendance.length === 0 && <tr><td colSpan={2} className="text-center py-8 text-gray-400 text-sm">No records</td></tr>}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Records</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-gray-200"><th className="table-header">Subject</th><th className="table-header">Type</th><th className="table-header">Score</th><th className="table-header">Grade</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {grades.map((g, i) => {
                  const pct = Math.round((g.score / g.totalScore) * 100);
                  return (
                    <motion.tr key={g.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                      <td className="table-cell font-medium">{g.subject}</td>
                      <td className="table-cell"><span className="badge-info">{g.type}</span></td>
                      <td className="table-cell">{g.score}/{g.totalScore}</td>
                      <td className="table-cell"><span className={pct >= 80 ? 'badge-success' : pct >= 60 ? 'badge-warning' : 'badge-danger'}>{pct}%</span></td>
                    </motion.tr>
                  );
                })}
                {grades.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-gray-400 text-sm">No records</td></tr>}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatedPage>
  );
}
