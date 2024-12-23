import { IImage } from '@/model/image.model';
import mongoose, { Schema, Document } from 'mongoose';
import {IActor} from "@/model/actors.model";

export interface IRole extends Document {
  actor: IActor;
  image?: IImage;
  role?: string;
}

const RoleSchema = new Schema<IRole>({
  actor: { type: Schema.Types.ObjectId, ref: 'actors', required: true },
  image: { type: Schema.Types.ObjectId, ref: 'images', required: false },
  role: { type: String, required: false }
});

export const RoleModel =
  mongoose.models.roles || mongoose.model<IRole>('roles', RoleSchema, 'roles');
