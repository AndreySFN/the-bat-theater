import { IImage } from '@/model/image.model';
import mongoose, { Schema, Document } from 'mongoose';

export interface IActor extends Document {
  name: string;
  image: IImage;
  description?: string;
}

const ActorSchema = new Schema<IActor>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: Schema.Types.ObjectId, ref: 'images' }, // Используем ссылку на схему изображений
});

export const ActorModel =
  mongoose.models.actors ||
  mongoose.model<IActor>('actors', ActorSchema, 'actors');
