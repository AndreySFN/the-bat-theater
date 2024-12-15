import mongoose, {Schema, Document} from "mongoose";

export interface ISchedule extends Document {
    ticketUrl: string;
    place: string;
    dateTime: Date;
    price: string;
}

const ScheduleSchema = new Schema<ISchedule>({
    ticketUrl: { type: String, required: true },
    place: {type: String, required: true},
    dateTime: {type: Date, required: true},
    price: {type: String, required: true},
});

export const ScheduleModel = mongoose.models.schedules || mongoose.model<ISchedule>('schedules', ScheduleSchema, 'schedules');