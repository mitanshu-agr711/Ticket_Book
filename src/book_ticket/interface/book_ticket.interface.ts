import { Document } from 'mongoose';

export interface BookTicket extends Document {
  title: string;
  description: string;
  rate: number;
  price: number;
  comments?: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
