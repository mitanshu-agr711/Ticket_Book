import { Document } from 'mongoose';

export interface BookTicket extends Document {
  title: string; // Ticket title (must be unique)
  description: string; // Ticket description
  rate: number; // Rating (0-10)
  price: number; // Ticket price
  comments?: string; // Optional comments
  image: string; // Image URL
  createdAt?: Date; // Timestamp when the document was created
  updatedAt?: Date; // Timestamp when the document was last updated
}
