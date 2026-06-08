import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { api } from '../api/client';
import { Grade, Class, Student } from '../types';
import AnimatedPage from '../components/AnimatedPage';

export default function Grades() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editGrade, setEditGrade] = useState<Grade | null>(null);
  const [form, setForm] = useState<{ studentId: string; classId: string; subject: string; type: 'Quiz' | 'Midterm' | 'Final' | 'Assignment'; score: number; totalScore: number; date: string }>({ studentId: '', classId: '', subject: '', type: 'Quiz', score: 0, totalScore: 100, date: new Date().toISOString().split('T')[0] });

  const fetch = () => {
    setLoading(true);
    Promise.all([api.grades.getAll(), api.classes.getAll(), api.students.getAll()]).then(([g, c, s]) => {
      setGrades(g);
      setClasses(c);
      setStudents(s);
      setLoading(false);
    });
  };

  useEffect(() => { fetch(); }, []);

  const filtered = grades.filter(g => {
    const s = students.find(st => st.id === g.studentId);
    const matchClass = !selectedClass || g.classId === selectedClass;
    const matchSearch = !search || `${s?.firstName} ${s?.lastName}`.toLowerCase().includes(search.toLowerCase()) || g.subject.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchSearch;
  });

  const openCreate = () => {
    setEditGrade(null);
    setForm({ studentId: '', classId: selectedClass || '', subject: '', type: 'Quiz', score: 0, totalScore: 100, date: new Date().toISOString().split('T')[0] });
    setShowModal(true);
  };

  const openEdit = (g: Grade) => {
    setEditGrade(g);
    setForm({ studentId: g.studentId, classId: g.classId, subject: g.subject, type: g.type, score: g.score, totalScore: g.totalScore, date: g.date });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editGrade) {
      await api.grades.update(editGrade.id, form);
    } else {
      await api.grades.create(form);
    }
    setShowModal(false);
    fetch();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this grade record?')) {
      await api.grades.delete(id);
      fetch();
    }
  };

  const classStudents = students.filter(s => !form.classId || s.classId === form.classId);

  return (
    <AnimatedPage className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grades</h1>
          <p className="text-gray-500 mt-1">Manage student grades and assessments</p>
        </div>
        <motion.button onClick={openCreate} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Grade
        </motion.button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search grades..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="select-field w-full sm:w-48">
            <option value="">All Classes</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <span className="text-sm text-gray-500">{filtered.length} records</span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="table-header">Student</th>
                  <th className="table-header">Subject</th>
                  <th className="table-header">Class</th>
                  <th className="table-header">Type</th>
                  <th className="table-header">Score</th>
                  <th className="table-header">Grade</th>
                  <th className="table-header">Date</th>
                  <th className="table-header text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((g, i) => {
                  const s = students.find(st => st.id === g.studentId);
                  const pct = Math.round((g.score / g.totalScore) * 100);
                  return (
                    <motion.tr
                      key={g.id}
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
                      <td className="table-cell font-medium text-gray-900">{g.subject}</td>
                      <td className="table-cell text-gray-500">{classes.find(c => c.id === g.classId)?.name || 'N/A'}</td>
                      <td className="table-cell"><span className="badge-info">{g.type}</span></td>
                      <td className="table-cell">{g.score}/{g.totalScore}</td>
                      <td className="table-cell">
                        <span className={pct >= 80 ? 'badge-success' : pct >= 60 ? 'badge-warning' : 'badge-danger'}>{pct}%</span>
                      </td>
                      <td className="table-cell text-gray-500">{new Date(g.date).toLocaleDateString()}</td>
                      <td className="table-cell text-right">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => openEdit(g)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(g.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-12 text-gray-400 text-sm">No grade records found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="bg-white rounded-2xl shadow-2xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-900">{editGrade ? 'Edit Grade' : 'Add Grade'}</h2></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Student</label><select required value={form.studentId} onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))} className="select-field"><option value="">Select Student</option>{classStudents.map(s => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Class</label><select required value={form.classId} onChange={e => setForm(f => ({ ...f, classId: e.target.value, studentId: '' }))} className="select-field"><option value="">Select Class</option>{classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject</label><input required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Type</label><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as any }))} className="select-field"><option value="Quiz">Quiz</option><option value="Midterm">Midterm</option><option value="Final">Final</option><option value="Assignment">Assignment</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Score</label><input type="number" min="0" value={form.score} onChange={e => setForm(f => ({ ...f, score: parseInt(e.target.value) || 0 }))} className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Total Score</label><input type="number" min="1" value={form.totalScore} onChange={e => setForm(f => ({ ...f, totalScore: parseInt(e.target.value) || 100 }))} className="input-field" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="input-field" /></div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary">{editGrade ? 'Update' : 'Create'}</motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatedPage>
  );
}
