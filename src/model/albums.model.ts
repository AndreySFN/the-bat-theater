import { IImage } from '@/model/image.model';
import mongoose, { Schema, Document } from 'mongoose';
import {IAlbumElement} from "@/model/albumElement.model";

export interface IAlbum extends Document {
  title?: string,
  key: string,
  elements: Array<IAlbumElement>
}

const ActorSchema = new Schema<IAlbum>({
  key: {type: String, required: true, unique: true},
  title: {type: String},
  elements: [{type: Schema.Types.ObjectId, ref: 'album_elements'}]
});

export const AlbumModel =
  mongoose.models.albums ||
  mongoose.model<IAlbum>('albums', ActorSchema, 'albums');
