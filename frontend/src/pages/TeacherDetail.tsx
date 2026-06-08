import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, BookOpen, Award } from 'lucide-react';
import { api } from '../api/client';
import { Teacher, Class } from '../types';
import AnimatedPage from '../components/AnimatedPage';

export default function TeacherDetail() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [teacherClasses, setTeacherClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([api.teachers.getById(id), api.classes.getAll()]).then(([t, c]) => {
      setTeacher(t);
      setTeacherClasses(c.filter((cls: Class) => cls.teacherId === id));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>;
  if (!teacher) return <div className="text-center py-20 text-gray-500">Teacher not found</div>;

  return (
    <AnimatedPage className="space-y-6">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/teachers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Teachers
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <motion.img whileHover={{ scale: 1.05 }} src={teacher.avatar} alt="" className="w-24 h-24 rounded-2xl object-cover ring-4 ring-gray-100" />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{teacher.firstName} {teacher.lastName}</h1>
                <p className="text-gray-500 mt-1">{teacher.subject} Teacher</p>
              </div>
              <span className={teacher.status === 'Active' ? 'badge-success' : 'badge-warning'}>{teacher.status}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600"><Mail className="w-4 h-4 text-gray-400" /> {teacher.email}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Phone className="w-4 h-4 text-gray-400" /> {teacher.phone}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Award className="w-4 h-4 text-gray-400" /> {teacher.qualification}</div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Calendar className="w-4 h-4 text-gray-400" /> Hired: {teacher.hireDate}</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Classes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teacherClasses.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Link to={`/classes/${c.id}`} className="border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-lg transition-all block">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary-600" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-500">Section {c.section}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Room: {c.room}</p>
                  <p>Schedule: {c.schedule}</p>
                  <p>Students: {c.studentCount}/{c.capacity}</p>
                </div>
              </Link>
            </motion.div>
          ))}
          {teacherClasses.length === 0 && <p className="text-gray-400 text-sm col-span-full text-center py-8">No classes assigned</p>}
        </div>
      </motion.div>
    </AnimatedPage>
  );
}
