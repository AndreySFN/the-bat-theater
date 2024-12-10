import {IImage} from "@/model/image.model";
import mongoose, {Schema, Document} from "mongoose";
import {ISchedule} from "@/model/shedules.model";

export interface IEventDetails extends Document {
    coverImg: IImage;
    schedule: ISchedule;
    description?: string;
}

const EventDetailsSchema = new Schema<IEventDetails>({
    coverImg: { type: Schema.Types.ObjectId, ref: 'images' },
    description: {type: String, required: false},
    schedule: [{ type: Schema.Types.ObjectId, ref: 'schedules' }], // Используем ссылку на схему изображений
});

export const EventDetailsModel = mongoose.models.event_details || mongoose.model<IEventDetails>('event_details', EventDetailsSchema, 'event_details');