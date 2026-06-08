import { Router, Request, Response } from 'express';
import Grade from '../models/Grade';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const records = await Grade.find();
  res.json(records);
});

router.post('/', async (req: Request, res: Response) => {
  const newGrade = await Grade.create(req.body);
  res.status(201).json(newGrade);
});

router.put('/:id', async (req: Request, res: Response) => {
  const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!grade) return res.status(404).json({ error: 'Grade not found' });
  res.json(grade);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const grade = await Grade.findByIdAndDelete(req.params.id);
  if (!grade) return res.status(404).json({ error: 'Grade not found' });
  res.json({ message: 'Grade deleted' });
});

router.get('/stats/:classId', async (req: Request, res: Response) => {
  const records = await Grade.find({ classId: req.params.classId });
  const scores = records.map(g => (g.score / g.totalScore) * 100);
  const average = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  res.json({ average, count: records.length });
});

export default router;
