import mongoose from 'mongoose';
import '@/model/image.model';
import '@/model/events.model';
import '@/model/venues.model';
import { ActorModel } from '@/model/actors.model';
import { EventDetailsModel } from '@/model/eventDetailes.model';
import { EventModel } from '@/model/events.model';
import { ImageModel } from '@/model/image.model';
import { MainCarouselModel } from '@/model/mainCarousel.model';
import { ScheduleModel } from '@/model/shedules.model';
import '@/model';

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const modelList = [
    // TODO: Узнать, что делать с этим кастылём
    ActorModel, // сюда надо импортировать все модели, а то они не подтягиваются в бандл
    EventDetailsModel, // что вызывает ошибку  Schema hasn't been registered for model "model_name"
    EventModel,
    ImageModel,
    MainCarouselModel,
    ScheduleModel,
  ];
  console.log(`model list: ${modelList}`);
  const MONGODB_URI = process.env.MONGODB_URI!;

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside ..env.local'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
