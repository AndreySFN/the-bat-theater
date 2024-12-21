import { IImage } from '@/model/image.model';
import mongoose, { Schema, Document } from 'mongoose';

export interface IAlbumElement extends Document {
  title?: string;
  subtitle?: string;
  image: IImage;
}

const IAlbumElementSchema = new Schema<IAlbumElement>({
  title: { type: String, required: false },
  subtitle: { type: String, required: false },
  image: { type: Schema.Types.ObjectId, ref: 'images' }, // Используем ссылку на схему изображений
});

export const AlbumElementModel =
  mongoose.models.album_elements ||
  mongoose.model<IAlbumElement>(
    'album_elements',
    IAlbumElementSchema,
    'album_elements'
  );
