import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const options = {};

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

export const dbClientPromise = new MongoClient(uri, options)
  .connect()
  .then((res) => res.db(process.env.MONGODB_NAME));
