import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, XCircle, Clock, HelpCircle } from 'lucide-react';
import { api } from '../api/client';
import type { Attendance as AttendanceRecord, Class, Student } from '../types';
import AnimatedPage from '../components/AnimatedPage';
import StaggerList from '../components/StaggerList';

export default function Attendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState('');

  const fetch = () => {
    setLoading(true);
    Promise.all([api.attendance.getAll(), api.classes.getAll(), api.students.getAll()]).then(([r, c, s]) => {
      setRecords(r);
      setClasses(c);
      setStudents(s);
      setLoading(false);
    });
  };

  useEffect(() => { fetch(); }, []);

  const filtered = records.filter(r => {
    const s = students.find(st => st.id === r.studentId);
    const matchClass = !selectedClass || r.classId === selectedClass;
    const matchDate = r.date === selectedDate;
    const matchSearch = !search || `${s?.firstName} ${s?.lastName}`.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchDate && matchSearch;
  });

  const classStudents = students.filter(s => !selectedClass || s.classId === selectedClass);
  const todayRecords = records.filter(r => r.date === selectedDate && (!selectedClass || r.classId === selectedClass));
  const unmarkedStudents = classStudents.filter(s => !todayRecords.find(r => r.studentId === s.id));

  const markAttendance = async (studentId: string, status: 'Present' | 'Absent' | 'Late' | 'Excused') => {
    try {
      const existing = records.find(r => r.studentId === studentId && r.date === selectedDate && (!selectedClass || r.classId === selectedClass));
      const data = { studentId, classId: selectedClass || students.find(s => s.id === studentId)?.classId, date: selectedDate, status };
      if (existing) {
        await api.attendance.update(existing.id, data);
      } else {
        await api.attendance.create(data);
      }
      fetch();
    } catch (err) {
      alert('Failed to mark attendance.');
    }
  };

  const getStats = () => {
    const total = filtered.length;
    const present = filtered.filter(r => r.status === 'Present').length;
    const absent = filtered.filter(r => r.status === 'Absent').length;
    const late = filtered.filter(r => r.status === 'Late').length;
    const excused = filtered.filter(r => r.status === 'Excused').length;
    return { total, present, absent, late, excused, rate: total ? Math.round((present / total) * 100) : 0 };
  };

  const stats = getStats();

  return (
    <AnimatedPage className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-500 mt-1">Track and manage student attendance</p>
      </motion.div>

      <StaggerList className="grid grid-cols-1 sm:grid-cols-4 gap-4" staggerDelay={0.08}>
        {[
          { label: 'Present', value: stats.present, icon: CheckCircle2, color: 'green', bg: 'bg-green-50', iconColor: 'text-green-600' },
          { label: 'Absent', value: stats.absent, icon: XCircle, color: 'red', bg: 'bg-red-50', iconColor: 'text-red-600' },
          { label: 'Late', value: stats.late, icon: Clock, color: 'yellow', bg: 'bg-yellow-50', iconColor: 'text-yellow-600' },
          { label: 'Excused', value: stats.excused, icon: HelpCircle, color: 'blue', bg: 'bg-blue-50', iconColor: 'text-blue-600' },
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -2 }} className="stat-card">
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}><stat.icon className={`w-6 h-6 ${stat.iconColor}`} /></div>
            <div><p className="text-sm text-gray-500">{stat.label}</p><p className="text-xl font-bold text-gray-900">{stat.value}</p></div>
          </motion.div>
        ))}
      </StaggerList>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="select-field w-full sm:w-48">
            <option value="">All Classes</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="input-field w-full sm:w-44" />
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="table-header">Student</th>
                  <th className="table-header">Class</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Status</th>
                  <th className="table-header text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((r, i) => {
                  const s = students.find(st => st.id === r.studentId);
                  return (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          <img src={s?.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100" />
                          <span className="font-medium text-gray-900">{s?.firstName} {s?.lastName}</span>
                        </div>
                      </td>
                      <td className="table-cell text-gray-500">{classes.find(c => c.id === r.classId)?.name || 'N/A'}</td>
                      <td className="table-cell text-gray-500">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="table-cell">
                        <span className={r.status === 'Present' ? 'badge-success' : r.status === 'Absent' ? 'badge-danger' : r.status === 'Late' ? 'badge-warning' : 'badge-info'}>{r.status}</span>
                      </td>
                      <td className="table-cell text-right">
                        <div className="flex items-center justify-end gap-1">
                          {(['Present', 'Absent', 'Late', 'Excused'] as const).map(status => (
                            <motion.button
                              key={status}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => markAttendance(r.studentId, status)}
                              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                                r.status === status
                                  ? status === 'Present' ? 'bg-green-100 text-green-800' 
                                    : status === 'Absent' ? 'bg-red-100 text-red-800'
                                    : status === 'Late' ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-blue-100 text-blue-800'
                                  : 'text-gray-400 hover:bg-gray-100'
                              }`}
                            >
                              {status === 'Present' ? 'P' : status === 'Absent' ? 'A' : status === 'Late' ? 'L' : 'E'}
                            </motion.button>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
                {unmarkedStudents.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="bg-gray-50/50"
                  >
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <img src={s.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100" />
                        <span className="font-medium text-gray-900">{s.firstName} {s.lastName}</span>
                      </div>
                    </td>
                    <td className="table-cell text-gray-500">{classes.find(c => c.id === s.classId)?.name || 'N/A'}</td>
                    <td className="table-cell text-gray-500">{new Date(selectedDate).toLocaleDateString()}</td>
                    <td className="table-cell"><span className="badge bg-gray-100 text-gray-500">Unmarked</span></td>
                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-1">
                        {(['Present', 'Absent', 'Late', 'Excused'] as const).map(status => (
                          <motion.button
                            key={status}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => markAttendance(s.id, status)}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                          >
                            {status === 'Present' ? 'P' : status === 'Absent' ? 'A' : status === 'Late' ? 'L' : 'E'}
                          </motion.button>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && unmarkedStudents.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-12 text-gray-400 text-sm">No attendance records found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </AnimatedPage>
  );
}
