import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, BookOpen, Users, Clock, MapPin } from 'lucide-react';
import { api } from '../api/client';
import { Class, Teacher } from '../types';
import AnimatedPage from '../components/AnimatedPage';

export default function Classes() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editClass, setEditClass] = useState<Class | null>(null);
  const [form, setForm] = useState({ name: '', section: '', room: '', teacherId: '', subject: '', capacity: 30, schedule: '' });

  const fetch = () => {
    setLoading(true);
    Promise.all([api.classes.getAll(), api.teachers.getAll()]).then(([c, t]) => {
      setClasses(c);
      setTeachers(t);
      setLoading(false);
    });
  };

  useEffect(() => { fetch(); }, []);

  const filtered = classes.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditClass(null);
    setForm({ name: '', section: '', room: '', teacherId: teachers[0]?.id || '', subject: '', capacity: 30, schedule: '' });
    setShowModal(true);
  };

  const openEdit = (c: Class) => {
    setEditClass(c);
    setForm({ name: c.name, section: c.section, room: c.room, teacherId: c.teacherId, subject: c.subject, capacity: c.capacity, schedule: c.schedule });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editClass) await api.classes.update(editClass.id, form);
    else await api.classes.create(form);
    setShowModal(false);
    fetch();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this class?')) {
      await api.classes.delete(id);
      fetch();
    }
  };

  return (
    <AnimatedPage className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Classes</h1>
          <p className="text-gray-500 mt-1">Manage class schedules and assignments</p>
        </div>
        <motion.button onClick={openCreate} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Class
        </motion.button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search classes..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <span className="text-sm text-gray-500">{filtered.length} classes</span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link to={`/classes/${c.id}`} className="border border-gray-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-lg transition-all block">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary-600" />
                      </motion.div>
                      <div>
                        <p className="font-semibold text-gray-900">{c.name}</p>
                        <p className="text-xs text-gray-500">Section {c.section}</p>
                      </div>
                    </div>
                    <span className={c.status === 'Active' ? 'badge-success' : 'badge-warning'}>{c.status}</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-gray-400" /> Teacher: {c.teacherName || 'Unassigned'}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gray-400" /> Room: {c.room}</div>
                    <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-gray-400" /> {c.schedule}</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{c.studentCount ?? 0}/{c.capacity} Students</span>
                    <div className="flex gap-1" onClick={e => e.preventDefault()}>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.preventDefault(); openEdit(c); }} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"><Edit2 className="w-3.5 h-3.5" /></motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.preventDefault(); handleDelete(c.id); }} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></motion.button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="bg-white rounded-2xl shadow-2xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-900">{editClass ? 'Edit Class' : 'Add Class'}</h2></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Section</label><input required value={form.section} onChange={e => setForm(f => ({ ...f, section: e.target.value }))} className="input-field" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject</label><input required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Room</label><input required value={form.room} onChange={e => setForm(f => ({ ...f, room: e.target.value }))} className="input-field" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label><select value={form.teacherId} onChange={e => setForm(f => ({ ...f, teacherId: e.target.value }))} className="select-field"><option value="">Select Teacher</option>{teachers.map(t => <option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label><input type="number" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: parseInt(e.target.value) || 0 }))} className="input-field" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label><input required value={form.schedule} onChange={e => setForm(f => ({ ...f, schedule: e.target.value }))} className="input-field" placeholder="e.g. Mon/Wed/Fri 9:00 AM" /></div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary">{editClass ? 'Update' : 'Create'}</motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatedPage>
  );
}
