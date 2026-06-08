import { Router, Request, Response } from 'express';
import Attendance from '../models/Attendance';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const records = await Attendance.find();
  res.json(records);
});

router.post('/', async (req: Request, res: Response) => {
  const newRecord = await Attendance.create(req.body);
  res.status(201).json(newRecord);
});

router.put('/:id', async (req: Request, res: Response) => {
  const record = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!record) return res.status(404).json({ error: 'Attendance record not found' });
  res.json(record);
});

router.get('/stats/:classId', async (req: Request, res: Response) => {
  const records = await Attendance.find({ classId: req.params.classId });
  const total = records.length;
  const present = records.filter(a => a.status === 'Present').length;
  const absent = records.filter(a => a.status === 'Absent').length;
  const late = records.filter(a => a.status === 'Late').length;
  const excused = records.filter(a => a.status === 'Excused').length;
  res.json({ total, present, absent, late, excused, rate: total ? Math.round((present / total) * 100) : 0 });
});

export default router;
