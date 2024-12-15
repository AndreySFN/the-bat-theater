import {IImage} from "@/model/image.model";
import mongoose, {Schema, Document} from "mongoose";
import {ISchedule} from "@/model/shedules.model";
import {IRole} from "@/model/roles.model";
import {IMainCarouselElement} from "@/model/mainCarousel.model";

export interface IEventDetails extends Document {
    coverImg: IImage;
    schedule: Array<ISchedule>;
    description?: string;
    roles?: Array<IRole>;
    previews?: Array<IMainCarouselElement>
}

const EventDetailsSchema = new Schema<IEventDetails>({
    coverImg: { type: Schema.Types.ObjectId, ref: 'images' },
    description: {type: String, required: false},
    schedule: [{ type: Schema.Types.ObjectId, ref: 'schedules' }], // Используем ссылку на схему изображений
    roles: [{type: Schema.Types.ObjectId, ref: 'roles'}],
    previews: [{type: Schema.Types.ObjectId, ref: 'main_gallery'}]
});

export const EventDetailsModel = mongoose.models.event_details || mongoose.model<IEventDetails>('event_details', EventDetailsSchema, 'event_details');