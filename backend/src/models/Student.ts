import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
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

const StudentSchema = new Schema<IStudent>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  address: { type: String, required: true },
  classId: { type: String, required: true },
  enrollmentDate: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive', 'Graduated'], required: true },
  avatar: { type: String, default: '' },
});

export default mongoose.model<IStudent>('Student', StudentSchema);
