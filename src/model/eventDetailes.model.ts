import { IImage } from '@/model/image.model';
import mongoose, { Schema, Document } from 'mongoose';
import { ISchedule } from '@/model/shedules.model';
import { IRole } from '@/model/roles.model';
import { IAlbumElement } from '@/model/albumElement.model';
import { IMetadata } from '@/model/metadata.model';

export interface IEventDetails extends Document {
  coverImg: IImage;
  schedule: Array<ISchedule>;
  description?: string;
  roles?: Array<IRole>;
  previews?: string;
  ym?: string;
  metadata: IMetadata;
}

const EventDetailsSchema = new Schema<IEventDetails>({
  ym: { type: String, required: false },
  coverImg: { type: Schema.Types.ObjectId, ref: 'images' },
  description: { type: String, required: false },
  schedule: [{ type: Schema.Types.ObjectId, ref: 'schedules' }],
  roles: [{ type: Schema.Types.ObjectId, ref: 'roles' }],
  previews: [{ type: Schema.Types.ObjectId, ref: 'albums' }],
  metadata: { type: Schema.Types.ObjectId, ref: 'metadata' },
});

export const EventDetailsModel =
  mongoose.models.event_details ||
  mongoose.model<IEventDetails>(
    'event_details',
    EventDetailsSchema,
    'event_details'
  );
