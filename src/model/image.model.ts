import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
    src: string;
    blurDataUrl: string;
}

const ImageSchema = new Schema<IImage>({
    src: { type: String, required: true },
    blurDataUrl: { type: String, required: true },
});

export const ImageModel = mongoose.models.images || mongoose.model<IImage>('images', ImageSchema, 'images');
