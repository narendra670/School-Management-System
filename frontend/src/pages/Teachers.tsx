import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Mail, Phone, BookOpen } from 'lucide-react';
import { api } from '../api/client';
import { Teacher } from '../types';
import AnimatedPage from '../components/AnimatedPage';

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [form, setForm] = useState<{ firstName: string; lastName: string; email: string; phone: string; subject: string; qualification: string; gender: 'Male' | 'Female' | 'Other'; dateOfBirth: string; address: string }>({ firstName: '', lastName: '', email: '', phone: '', subject: '', qualification: '', gender: 'Male', dateOfBirth: '', address: '' });

  const fetch = () => {
    setLoading(true);
    api.teachers.getAll().then(d => { setTeachers(d); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const filtered = teachers.filter(t =>
    `${t.firstName} ${t.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditTeacher(null);
    setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', qualification: '', gender: 'Male', dateOfBirth: '', address: '' });
    setShowModal(true);
  };

  const openEdit = (t: Teacher) => {
    setEditTeacher(t);
    setForm({ firstName: t.firstName, lastName: t.lastName, email: t.email, phone: t.phone, subject: t.subject, qualification: t.qualification, gender: t.gender, dateOfBirth: t.dateOfBirth, address: t.address });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editTeacher) await api.teachers.update(editTeacher.id, form);
      else await api.teachers.create(form);
      setShowModal(false);
      fetch();
    } catch (err) {
      alert('Failed to save teacher. Please check all fields.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this teacher?')) {
      await api.teachers.delete(id);
      fetch();
    }
  };

  return (
    <AnimatedPage className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-500 mt-1">Manage teacher records</p>
        </div>
        <motion.button onClick={openCreate} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Teacher
        </motion.button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search teachers..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <span className="text-sm text-gray-500">{filtered.length} teachers</span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-primary-200 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <Link to={`/teachers/${t.id}`} className="flex items-center gap-3 group">
                    <motion.img whileHover={{ scale: 1.1 }} src={t.avatar} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-primary-200 transition-all" />
                    <div>
                      <p className="font-semibold text-gray-900">{t.firstName} {t.lastName}</p>
                      <p className="text-xs text-gray-500">{t.subject}</p>
                    </div>
                  </Link>
                  <span className={t.status === 'Active' ? 'badge-success' : 'badge-warning'}>{t.status}</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-gray-400" /> {t.email}</div>
                  <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gray-400" /> {t.phone}</div>
                  <div className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-gray-400" /> {t.qualification}</div>
                </div>
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => openEdit(t)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleDelete(t.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">{editTeacher ? 'Edit Teacher' : 'Add Teacher'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">First Name</label><input required value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label><input required value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} className="input-field" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input-field" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject</label><input required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="input-field" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label><input required value={form.qualification} onChange={e => setForm(f => ({ ...f, qualification: e.target.value }))} className="input-field" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Gender</label><select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value as any }))} className="select-field"><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label><input required type="date" value={form.dateOfBirth} onChange={e => setForm(f => ({ ...f, dateOfBirth: e.target.value }))} className="input-field" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><input required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="input-field" /></div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary">{editTeacher ? 'Update' : 'Create'}</motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatedPage>
  );
}
