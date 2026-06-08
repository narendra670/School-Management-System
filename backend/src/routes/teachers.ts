import { Router, Request, Response } from 'express';
import Teacher from '../models/Teacher';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const teachers = await Teacher.find();
  res.json(teachers);
});

router.get('/:id', async (req: Request, res: Response) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
  res.json(teacher);
});

router.post('/', async (req: Request, res: Response) => {
  const newTeacher = await Teacher.create({
    ...req.body,
    hireDate: new Date().toISOString().split('T')[0],
    status: 'Active',
  });
  res.status(201).json(newTeacher);
});

router.put('/:id', async (req: Request, res: Response) => {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
  res.json(teacher);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const teacher = await Teacher.findByIdAndDelete(req.params.id);
  if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
  res.json({ message: 'Teacher deleted' });
});

export default router;
