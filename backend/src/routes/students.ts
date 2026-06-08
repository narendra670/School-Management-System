import { Router, Request, Response } from 'express';
import Student from '../models/Student';
import Class from '../models/Class';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const students = await Student.find();
  const classes = await Class.find();
  const list = students.map(s => ({
    ...s.toObject(),
    className: classes.find(c => c.id === s.classId)?.name || 'Unknown',
  }));
  res.json(list);
});

router.get('/:id', async (req: Request, res: Response) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  const classDoc = await Class.findOne({ id: student.classId });
  res.json({
    ...student.toObject(),
    className: classDoc?.name || 'Unknown',
  });
});

router.post('/', async (req: Request, res: Response) => {
  const newStudent = await Student.create({
    ...req.body,
    enrollmentDate: new Date().toISOString().split('T')[0],
    status: 'Active',
  });
  res.status(201).json(newStudent);
});

router.put('/:id', async (req: Request, res: Response) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json({ message: 'Student deleted' });
});

export default router;
