import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Tickets {
  @Prop({ unique: true, required: true, trim: true })
  title!: string;

  @Prop({ required: true, trim: true })
  description!: string;

  @Prop({ required: true, min: 0, max: 10 })
  rate!: number;

  @Prop({ required: true })
  price!: number;

  @Prop({ trim: true })
  comments!: string;

  @Prop({ required: true })
  image!: string;
}

export const TicketName = 'Ticket';
export const TicketSchema = SchemaFactory.createForClass(Tickets);
