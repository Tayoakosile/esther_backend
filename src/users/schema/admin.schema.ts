// src/admin/schemas/admin.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ default: false })
  is_verified: boolean;

  @Prop({ enum: ['admin', 'user'] })
  role: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Invite' }] })
  invites: Types.ObjectId[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
