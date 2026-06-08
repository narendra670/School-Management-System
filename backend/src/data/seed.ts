import connectDB from '../db';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import Class from '../models/Class';
import Attendance from '../models/Attendance';
import Grade from '../models/Grade';
import Activity from '../models/Activity';

const maleAvatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
];

const femaleAvatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop',
];

const seedData = async () => {
  await connectDB();

  const existingStudents = await Student.countDocuments();
  if (existingStudents > 0) {
    console.log('Database already seeded, skipping...');
    process.exit(0);
  }

  await Teacher.insertMany([
    { _id: 'T1', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@school.com', phone: '+1 (555) 111-2233', subject: 'Mathematics', qualification: 'PhD in Mathematics', dateOfBirth: '1980-03-15', gender: 'Female', address: '123 Oak Street, NY', hireDate: '2015-08-20', status: 'Active', avatar: femaleAvatars[0] },
    { _id: 'T2', firstName: 'Michael', lastName: 'Chen', email: 'michael.chen@school.com', phone: '+1 (555) 222-3344', subject: 'Physics', qualification: 'MSc in Physics', dateOfBirth: '1978-07-22', gender: 'Male', address: '456 Maple Drive, LA', hireDate: '2016-09-10', status: 'Active', avatar: maleAvatars[0] },
    { _id: 'T3', firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.rodriguez@school.com', phone: '+1 (555) 333-4455', subject: 'English Literature', qualification: 'MA in English', dateOfBirth: '1985-11-08', gender: 'Female', address: '789 Pine Lane, CHI', hireDate: '2017-01-15', status: 'Active', avatar: femaleAvatars[1] },
    { _id: 'T4', firstName: 'James', lastName: 'Williams', email: 'james.williams@school.com', phone: '+1 (555) 444-5566', subject: 'Chemistry', qualification: 'PhD in Chemistry', dateOfBirth: '1982-05-30', gender: 'Male', address: '321 Elm Road, HOU', hireDate: '2014-10-05', status: 'Active', avatar: maleAvatars[1] },
    { _id: 'T5', firstName: 'Lisa', lastName: 'Thompson', email: 'lisa.thompson@school.com', phone: '+1 (555) 555-6677', subject: 'History', qualification: 'MA in History', dateOfBirth: '1983-09-12', gender: 'Female', address: '654 Birch Blvd, PHX', hireDate: '2018-03-22', status: 'Active', avatar: femaleAvatars[2] },
    { _id: 'T6', firstName: 'David', lastName: 'Kim', email: 'david.kim@school.com', phone: '+1 (555) 666-7788', subject: 'Computer Science', qualification: 'MSc in Computer Science', dateOfBirth: '1986-01-25', gender: 'Male', address: '987 Cedar Court, SF', hireDate: '2019-07-01', status: 'Active', avatar: maleAvatars[2] },
  ]);

  await Class.insertMany([
    { _id: 'C1', name: 'Math 101', section: 'A', room: 'Room 101', teacherId: 'T1', subject: 'Mathematics', capacity: 30, schedule: 'Mon/Wed/Fri 9:00 AM', status: 'Active' },
    { _id: 'C2', name: 'Physics 101', section: 'A', room: 'Room 102', teacherId: 'T2', subject: 'Physics', capacity: 25, schedule: 'Tue/Thu 10:00 AM', status: 'Active' },
    { _id: 'C3', name: 'English Lit 101', section: 'B', room: 'Room 103', teacherId: 'T3', subject: 'English Literature', capacity: 28, schedule: 'Mon/Wed 11:00 AM', status: 'Active' },
    { _id: 'C4', name: 'Chemistry 101', section: 'A', room: 'Lab 1', teacherId: 'T4', subject: 'Chemistry', capacity: 24, schedule: 'Tue/Thu/Fri 1:00 PM', status: 'Active' },
    { _id: 'C5', name: 'World History', section: 'B', room: 'Room 104', teacherId: 'T5', subject: 'History', capacity: 30, schedule: 'Mon/Wed/Fri 2:00 PM', status: 'Active' },
    { _id: 'C6', name: 'CS Fundamentals', section: 'A', room: 'Computer Lab', teacherId: 'T6', subject: 'Computer Science', capacity: 20, schedule: 'Tue/Thu 3:00 PM', status: 'Active' },
  ]);

  await Student.insertMany([
    { _id: 'S1', firstName: 'Alice', lastName: 'Brown', email: 'alice.brown@student.com', phone: '+1 (555) 101-0101', dateOfBirth: '2006-04-10', gender: 'Female', address: '111 First St', classId: 'C1', enrollmentDate: '2023-09-01', status: 'Active', avatar: femaleAvatars[3] },
    { _id: 'S2', firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@student.com', phone: '+1 (555) 202-0202', dateOfBirth: '2006-07-22', gender: 'Male', address: '222 Second Ave', classId: 'C1', enrollmentDate: '2023-09-01', status: 'Active', avatar: maleAvatars[3] },
    { _id: 'S3', firstName: 'Charlie', lastName: 'Davis', email: 'charlie.davis@student.com', phone: '+1 (555) 303-0303', dateOfBirth: '2005-11-05', gender: 'Male', address: '333 Third Blvd', classId: 'C2', enrollmentDate: '2023-09-01', status: 'Active', avatar: maleAvatars[0] },
    { _id: 'S4', firstName: 'Diana', lastName: 'Martinez', email: 'diana.martinez@student.com', phone: '+1 (555) 404-0404', dateOfBirth: '2006-02-18', gender: 'Female', address: '444 Fourth Ln', classId: 'C2', enrollmentDate: '2023-09-01', status: 'Active', avatar: femaleAvatars[0] },
    { _id: 'S5', firstName: 'Ethan', lastName: 'Wilson', email: 'ethan.wilson@student.com', phone: '+1 (555) 505-0505', dateOfBirth: '2005-09-30', gender: 'Male', address: '555 Fifth Cir', classId: 'C3', enrollmentDate: '2023-09-01', status: 'Active', avatar: maleAvatars[1] },
    { _id: 'S6', firstName: 'Fiona', lastName: 'Taylor', email: 'fiona.taylor@student.com', phone: '+1 (555) 606-0606', dateOfBirth: '2006-06-14', gender: 'Female', address: '666 Sixth Way', classId: 'C3', enrollmentDate: '2023-09-01', status: 'Active', avatar: femaleAvatars[1] },
    { _id: 'S7', firstName: 'George', lastName: 'Anderson', email: 'george.anderson@student.com', phone: '+1 (555) 707-0707', dateOfBirth: '2005-12-25', gender: 'Male', address: '777 Seventh Dr', classId: 'C4', enrollmentDate: '2023-09-01', status: 'Active', avatar: maleAvatars[2] },
    { _id: 'S8', firstName: 'Hannah', lastName: 'Thomas', email: 'hannah.thomas@student.com', phone: '+1 (555) 808-0808', dateOfBirth: '2006-03-08', gender: 'Female', address: '888 Eighth Ct', classId: 'C4', enrollmentDate: '2023-09-01', status: 'Active', avatar: femaleAvatars[2] },
    { _id: 'S9', firstName: 'Ian', lastName: 'Jackson', email: 'ian.jackson@student.com', phone: '+1 (555) 909-0909', dateOfBirth: '2005-08-19', gender: 'Male', address: '999 Ninth Pl', classId: 'C5', enrollmentDate: '2023-09-01', status: 'Active', avatar: maleAvatars[3] },
    { _id: 'S10', firstName: 'Julia', lastName: 'White', email: 'julia.white@student.com', phone: '+1 (555) 111-1111', dateOfBirth: '2006-01-27', gender: 'Female', address: '1010 Tenth Ave', classId: 'C5', enrollmentDate: '2023-09-01', status: 'Active', avatar: femaleAvatars[3] },
    { _id: 'S11', firstName: 'Kevin', lastName: 'Lee', email: 'kevin.lee@student.com', phone: '+1 (555) 222-1212', dateOfBirth: '2005-05-12', gender: 'Male', address: '1111 Eleventh St', classId: 'C6', enrollmentDate: '2023-09-01', status: 'Active', avatar: maleAvatars[0] },
    { _id: 'S12', firstName: 'Liam', lastName: 'Brown', email: 'liam.brown@student.com', phone: '+1 (555) 333-1313', dateOfBirth: '2006-08-03', gender: 'Male', address: '1212 Twelfth Rd', classId: 'C6', enrollmentDate: '2023-09-01', status: 'Active', avatar: maleAvatars[1] },
    { _id: 'S13', firstName: 'Mia', lastName: 'Garcia', email: 'mia.garcia@student.com', phone: '+1 (555) 444-1414', dateOfBirth: '2005-10-20', gender: 'Female', address: '1313 Thirteenth Ln', classId: 'C1', enrollmentDate: '2023-09-01', status: 'Active', avatar: femaleAvatars[0] },
    { _id: 'S14', firstName: 'Noah', lastName: 'Martinez', email: 'noah.martinez@student.com', phone: '+1 (555) 555-1515', dateOfBirth: '2006-04-15', gender: 'Male', address: '1414 Fourteenth Blvd', classId: 'C2', enrollmentDate: '2023-09-01', status: 'Active', avatar: maleAvatars[2] },
    { _id: 'S15', firstName: 'Olivia', lastName: 'Johnson', email: 'olivia.johnson@student.com', phone: '+1 (555) 666-1616', dateOfBirth: '2005-07-28', gender: 'Female', address: '1515 Fifteenth Cir', classId: 'C3', enrollmentDate: '2023-09-01', status: 'Active', avatar: femaleAvatars[1] },
  ]);

  await Attendance.insertMany([
    { _id: 'A1', studentId: 'S1', classId: 'C1', date: '2024-01-15', status: 'Present' },
    { _id: 'A2', studentId: 'S2', classId: 'C1', date: '2024-01-15', status: 'Present' },
    { _id: 'A3', studentId: 'S13', classId: 'C1', date: '2024-01-15', status: 'Late' },
    { _id: 'A4', studentId: 'S3', classId: 'C2', date: '2024-01-15', status: 'Present' },
    { _id: 'A5', studentId: 'S4', classId: 'C2', date: '2024-01-15', status: 'Absent' },
    { _id: 'A6', studentId: 'S14', classId: 'C2', date: '2024-01-15', status: 'Present' },
    { _id: 'A7', studentId: 'S5', classId: 'C3', date: '2024-01-15', status: 'Present' },
    { _id: 'A8', studentId: 'S6', classId: 'C3', date: '2024-01-15', status: 'Present' },
    { _id: 'A9', studentId: 'S15', classId: 'C3', date: '2024-01-15', status: 'Excused' },
    { _id: 'A10', studentId: 'S1', classId: 'C1', date: '2024-01-16', status: 'Present' },
    { _id: 'A11', studentId: 'S2', classId: 'C1', date: '2024-01-16', status: 'Absent' },
    { _id: 'A12', studentId: 'S13', classId: 'C1', date: '2024-01-16', status: 'Present' },
  ]);

  await Grade.insertMany([
    { _id: 'G1', studentId: 'S1', classId: 'C1', subject: 'Mathematics', type: 'Quiz', score: 28, totalScore: 30, date: '2024-01-10' },
    { _id: 'G2', studentId: 'S2', classId: 'C1', subject: 'Mathematics', type: 'Quiz', score: 25, totalScore: 30, date: '2024-01-10' },
    { _id: 'G3', studentId: 'S13', classId: 'C1', subject: 'Mathematics', type: 'Quiz', score: 30, totalScore: 30, date: '2024-01-10' },
    { _id: 'G4', studentId: 'S1', classId: 'C1', subject: 'Mathematics', type: 'Midterm', score: 85, totalScore: 100, date: '2024-02-15' },
    { _id: 'G5', studentId: 'S2', classId: 'C1', subject: 'Mathematics', type: 'Midterm', score: 72, totalScore: 100, date: '2024-02-15' },
    { _id: 'G6', studentId: 'S13', classId: 'C1', subject: 'Mathematics', type: 'Midterm', score: 95, totalScore: 100, date: '2024-02-15' },
    { _id: 'G7', studentId: 'S3', classId: 'C2', subject: 'Physics', type: 'Quiz', score: 18, totalScore: 20, date: '2024-01-12' },
    { _id: 'G8', studentId: 'S4', classId: 'C2', subject: 'Physics', type: 'Quiz', score: 15, totalScore: 20, date: '2024-01-12' },
    { _id: 'G9', studentId: 'S14', classId: 'C2', subject: 'Physics', type: 'Quiz', score: 20, totalScore: 20, date: '2024-01-12' },
    { _id: 'G10', studentId: 'S5', classId: 'C3', subject: 'English Literature', type: 'Assignment', score: 42, totalScore: 50, date: '2024-01-14' },
    { _id: 'G11', studentId: 'S6', classId: 'C3', subject: 'English Literature', type: 'Assignment', score: 38, totalScore: 50, date: '2024-01-14' },
    { _id: 'G12', studentId: 'S15', classId: 'C3', subject: 'English Literature', type: 'Assignment', score: 45, totalScore: 50, date: '2024-01-14' },
  ]);

  await Activity.insertMany([
    { _id: 'ACT1', type: 'student', action: 'New Enrollment', description: 'Alice Brown enrolled in Math 101', timestamp: '2024-01-15T09:30:00Z' },
    { _id: 'ACT2', type: 'attendance', action: 'Attendance Marked', description: 'Math 101 attendance recorded - 28 Present, 2 Absent', timestamp: '2024-01-15T10:00:00Z' },
    { _id: 'ACT3', type: 'grade', action: 'Grades Published', description: 'Physics Quiz grades published for Class 2', timestamp: '2024-01-14T14:00:00Z' },
    { _id: 'ACT4', type: 'teacher', action: 'New Hire', description: 'David Kim joined as Computer Science teacher', timestamp: '2024-01-10T08:00:00Z' },
    { _id: 'ACT5', type: 'class', action: 'Class Created', description: 'CS Fundamentals class created with 20 seats', timestamp: '2024-01-09T11:00:00Z' },
    { _id: 'ACT6', type: 'student', action: 'Status Change', description: '3 students promoted to Graduated status', timestamp: '2024-01-08T16:00:00Z' },
  ]);

  console.log('Database seeded successfully');
  process.exit(0);
};

seedData();
