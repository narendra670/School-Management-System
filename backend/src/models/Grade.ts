import mongoose, { Schema, Document } from 'mongoose';

export interface IGrade extends Document {
  studentId: string;
  classId: string;
  subject: string;
  type: 'Quiz' | 'Midterm' | 'Final' | 'Assignment';
  score: number;
  totalScore: number;
  date: string;
}

const GradeSchema = new Schema<IGrade>({
  studentId: { type: String, required: true },
  classId: { type: String, required: true },
  subject: { type: String, required: true },
  type: { type: String, enum: ['Quiz', 'Midterm', 'Final', 'Assignment'], required: true },
  score: { type: Number, required: true },
  totalScore: { type: Number, required: true },
  date: { type: String, required: true },
});

export default mongoose.model<IGrade>('Grade', GradeSchema);
