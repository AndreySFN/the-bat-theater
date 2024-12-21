import mongoose, { Schema, Document, Types } from 'mongoose';
import { IEvent } from '@/model/events.model';

export interface IVenue extends Document {
  title: string;
  label: string;
  events: IEvent[];
  mapUrl?: string;
  address: string;
}

const VenueSchema = new Schema<IVenue>({
  title: { type: String, required: true },
  label: { type: String, required: true },
  mapUrl: { type: String, required: false },
  events: [{ type: Schema.Types.ObjectId, ref: 'events' }],
  address: { type: String, required: true },
});

export const VenueModel =
  mongoose.models.venues ||
  mongoose.model<IVenue>('venues', VenueSchema, 'venues');
