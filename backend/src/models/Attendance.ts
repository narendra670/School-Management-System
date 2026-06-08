import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  studentId: string;
  classId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
}

const AttendanceSchema = new Schema<IAttendance>({
  studentId: { type: String, required: true },
  classId: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Late', 'Excused'], required: true },
});

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
