
import { Schema, model, type Document } from 'mongoose';

export interface ServiceDocument extends Document {
  title: string;
  description?: string;
  price?: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<ServiceDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: String },
    order: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

export default model<ServiceDocument>('Service', serviceSchema);
