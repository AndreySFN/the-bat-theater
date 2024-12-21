import mongoose, { Schema, Document, Types } from 'mongoose';
import { IImage } from '@/model/image.model';
import { IEventDetails } from '@/model/eventDetailes.model';

export interface IEvent extends Document {
  title: string;
  subtitle?: string;
  posterImg?: IImage;
  eventDetails: IEventDetails;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  posterImg: { type: Schema.Types.ObjectId, ref: 'images', required: false },
  eventDetails: {
    type: Schema.Types.ObjectId,
    ref: 'event_details',
    required: true,
  },
});

export const EventModel =
  mongoose.models.events ||
  mongoose.model<IEvent>('events', EventSchema, 'events');
