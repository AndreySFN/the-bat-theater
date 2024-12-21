import { IImage } from '@/model/image.model';
import mongoose, { Schema, Document } from 'mongoose';

export interface IMetadata extends Document {
  title?: string;
  description?: string;
  image?: IImage;
  width?: number;
  height?: number;
  alt?: string;
}

const MetadataSchema = new Schema<IMetadata>({
  title: { type: String, req: false },
  description: { type: String, req: false },
  image: { type: Schema.Types.ObjectId, ref: 'images', req: false },
  width: { type: Number, req: false },
  height: { type: Number, req: false },
  alt: { type: String, req: false },
});

export const MetadataModel =
  mongoose.models.metadata ||
  mongoose.model<IMetadata>('metadata', MetadataSchema, 'metadata');
