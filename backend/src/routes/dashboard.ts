import { Router, Request, Response } from 'express';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import Class from '../models/Class';
import Attendance from '../models/Attendance';
import Grade from '../models/Grade';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const [totalStudents, totalTeachers, totalClasses, students, attendanceRecords, gradeRecords, recentActivities] = await Promise.all([
    Student.countDocuments(),
    Teacher.countDocuments(),
    Class.countDocuments(),
    Student.find(),
    Attendance.find(),
    Grade.find(),
    Activity.find().sort({ timestamp: -1 }).limit(10),
  ]);

  const activeStudents = students.filter(s => s.status === 'Active').length;

  const attendanceRate = attendanceRecords.length
    ? Math.round((attendanceRecords.filter(a => a.status === 'Present' || a.status === 'Late' || a.status === 'Excused').length / attendanceRecords.length) * 100)
    : 0;

  const allGrades = gradeRecords.map(g => (g.score / g.totalScore) * 100);
  const averageGrade = allGrades.length ? Math.round(allGrades.reduce((a, b) => a + b, 0) / allGrades.length) : 0;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const attendanceTrend = months.map(month => ({
    month,
    rate: Math.floor(75 + Math.random() * 20),
  }));

  const gradeDistribution = [
    { range: 'A (90-100)', count: gradeRecords.filter(g => (g.score / g.totalScore) >= 0.9).length },
    { range: 'B (80-89)', count: gradeRecords.filter(g => (g.score / g.totalScore) >= 0.8 && (g.score / g.totalScore) < 0.9).length },
    { range: 'C (70-79)', count: gradeRecords.filter(g => (g.score / g.totalScore) >= 0.7 && (g.score / g.totalScore) < 0.8).length },
    { range: 'D (60-69)', count: gradeRecords.filter(g => (g.score / g.totalScore) >= 0.6 && (g.score / g.totalScore) < 0.7).length },
    { range: 'F (<60)', count: gradeRecords.filter(g => (g.score / g.totalScore) < 0.6).length },
  ];

  const allClasses = await Class.find();
  const classDistribution = allClasses.map(c => ({
    className: c.name,
    count: students.filter(s => s.classId === c.id).length,
  }));

  res.json({
    totalStudents,
    totalTeachers,
    totalClasses,
    activeStudents,
    attendanceRate,
    averageGrade,
    recentActivities,
    attendanceTrend,
    gradeDistribution: gradeDistribution.filter(g => g.count > 0),
    classDistribution,
  });
});

export default router;
