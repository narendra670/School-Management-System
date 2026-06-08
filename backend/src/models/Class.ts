import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  name: string;
  section: string;
  room: string;
  teacherId: string;
  subject: string;
  capacity: number;
  schedule: string;
  status: 'Active' | 'Inactive';
}

const ClassSchema = new Schema<IClass>({
  name: { type: String, required: true },
  section: { type: String, required: true },
  room: { type: String, required: true },
  teacherId: { type: String, required: true },
  subject: { type: String, required: true },
  capacity: { type: Number, required: true },
  schedule: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], required: true },
});

export default mongoose.model<IClass>('Class', ClassSchema);
