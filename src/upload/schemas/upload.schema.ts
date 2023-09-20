import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UploadDocument = HydratedDocument<Upload>;

@Schema({ timestamps: true })
export class Upload {
  _id: Types.ObjectId;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  path: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);