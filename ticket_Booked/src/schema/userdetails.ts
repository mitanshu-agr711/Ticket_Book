import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  Name!: string;

  @Prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  email!: string;

  @Prop({ required: true, type: [String] })
  Seats!: string[];

  @Prop({ required: true })
  movie!: string;

  @Prop({ required: true })
  timing!: string;

  @Prop({ required: true })
  date!: Date;
}
export const UserDetails = 'User';
export const UserSchema = SchemaFactory.createForClass(User);
