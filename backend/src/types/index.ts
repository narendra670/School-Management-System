export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  classId: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive' | 'Graduated';
  avatar: string;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  hireDate: string;
  status: 'Active' | 'Inactive';
  avatar: string;
}

export interface Class {
  id: string;
  name: string;
  section: string;
  room: string;
  teacherId: string;
  subject: string;
  capacity: number;
  schedule: string;
  status: 'Active' | 'Inactive';
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
}

export interface Grade {
  id: string;
  studentId: string;
  classId: string;
  subject: string;
  type: 'Quiz' | 'Midterm' | 'Final' | 'Assignment';
  score: number;
  totalScore: number;
  date: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  activeStudents: number;
  attendanceRate: number;
  averageGrade: number;
  recentActivities: Activity[];
  attendanceTrend: { month: string; rate: number }[];
  gradeDistribution: { range: string; count: number }[];
  classDistribution: { className: string; count: number }[];
}

export interface Activity {
  id: string;
  type: 'student' | 'teacher' | 'class' | 'attendance' | 'grade';
  action: string;
  description: string;
  timestamp: string;
}
