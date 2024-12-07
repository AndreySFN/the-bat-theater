import { dbClientPromise } from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await dbClientPromise;
    const events = await client.collection('events').find({}).toArray();
    return Response.json(events);
  } catch (error) {
    return Response.json(
      { error: `Failed to fetch events: ${error}` },
      { status: 500 }
    );
  }
}
