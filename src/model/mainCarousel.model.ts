import {IImage} from "@/model/image.model";
import mongoose, {Schema, Document} from "mongoose";

export interface IMainCarouselElement extends Document {
    title?: string,
    subtitle?: string,
    image: IImage
}

const MainCarouselSchema = new Schema<IMainCarouselElement>({
    title: { type: String, required: false },
    subtitle: {type: String, required: false},
    image: { type: Schema.Types.ObjectId, ref: 'images' }, // Используем ссылку на схему изображений
});

export const MainCarouselModel = mongoose.models.main_carousel || mongoose.model<IMainCarouselElement>('main_carousel', MainCarouselSchema, 'main_carousel');