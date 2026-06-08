import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Document {
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

const TeacherSchema = new Schema<ITeacher>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  qualification: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  address: { type: String, required: true },
  hireDate: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], required: true },
  avatar: { type: String, default: '' },
});

export default mongoose.model<ITeacher>('Teacher', TeacherSchema);
