import mongoose, {Schema, Document} from 'mongoose';
import {IEvent} from "@/model/events.model";

export interface IVenue extends Document {
    title: string;
    label: string;
    events: IEvent[];
    mapUrl?: string;
}

const VenueSchema = new Schema<IVenue>({
    title: { type: String, required: true },
    label: { type: String, required: true },
    mapUrl: {type: String, required: false},
    events: [{type: Schema.Types.ObjectId, ref: 'events'}]
});

export const VenueModel = mongoose.models.venues || mongoose.model<IVenue>('venues', VenueSchema, 'venues');