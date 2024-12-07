import { dbClientPromise } from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await dbClientPromise;
    const troupe = await client.collection('troupe').find({}).toArray();
    return Response.json(troupe);
  } catch (error) {
    return Response.json(
      { error: `Failed to fetch troupe: ${error}` },
      { status: 500 }
    );
  }
}
