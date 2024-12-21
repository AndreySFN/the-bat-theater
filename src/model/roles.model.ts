import { IImage } from '@/model/image.model';
import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  actorName: string;
  image?: IImage;
  role?: string;
}

const RoleSchema = new Schema<IRole>({
  actorName: { type: String, required: true },
  role: { type: String, required: false },
  image: { type: Schema.Types.ObjectId, ref: 'images' }, // Используем ссылку на схему изображений
});

export const RoleModel =
  mongoose.models.roles || mongoose.model<IRole>('roles', RoleSchema, 'roles');
