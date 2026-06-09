import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db';
import studentRoutes from './routes/students';
import teacherRoutes from './routes/teachers';
import classRoutes from './routes/classes';
import attendanceRoutes from './routes/attendance';
import gradeRoutes from './routes/grades';
import dashboardRoutes from './routes/dashboard';
import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 6500;
const FRONTEND_URLS = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map(s => s.trim());

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
