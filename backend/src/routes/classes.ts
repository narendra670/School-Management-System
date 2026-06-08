import { Router, Request, Response } from 'express';
import Class from '../models/Class';
import Teacher from '../models/Teacher';
import Student from '../models/Student';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const classes = await Class.find();
  const teachers = await Teacher.find();
  const students = await Student.find();
  const list = classes.map(c => {
    const teacher = teachers.find(t => t.id === c.teacherId);
    return {
      ...c.toObject(),
      teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unknown',
      studentCount: students.filter(s => s.classId === c.id).length,
    };
  });
  res.json(list);
});

router.get('/:id', async (req: Request, res: Response) => {
  const cls = await Class.findById(req.params.id);
  if (!cls) return res.status(404).json({ error: 'Class not found' });
  const teachers = await Teacher.find();
  const teacher = teachers.find(t => t.id === cls.teacherId);
  const classStudents = await Student.find({ classId: cls.id });
  res.json({
    ...cls.toObject(),
    teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unknown',
    students: classStudents,
  });
});

router.post('/', async (req: Request, res: Response) => {
  const newClass = await Class.create({ ...req.body, status: 'Active' });
  res.status(201).json(newClass);
});

router.put('/:id', async (req: Request, res: Response) => {
  const cls = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!cls) return res.status(404).json({ error: 'Class not found' });
  res.json(cls);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const cls = await Class.findByIdAndDelete(req.params.id);
  if (!cls) return res.status(404).json({ error: 'Class not found' });
  res.json({ message: 'Class deleted' });
});

export default router;
