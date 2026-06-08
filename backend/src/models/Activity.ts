import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  type: 'student' | 'teacher' | 'class' | 'attendance' | 'grade';
  action: string;
  description: string;
  timestamp: string;
}

const ActivitySchema = new Schema<IActivity>({
  type: { type: String, enum: ['student', 'teacher', 'class', 'attendance', 'grade'], required: true },
  action: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: String, required: true },
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
