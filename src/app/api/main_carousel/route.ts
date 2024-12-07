import { dbClientPromise } from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await dbClientPromise;
    const carousel = await client
      .collection('main_carousel')
      .find({})
      .toArray();
    return Response.json(carousel);
  } catch (error) {
    return Response.json(
      { error: `Failed to fetch main carousel: ${error}` },
      { status: 500 }
    );
  }
}
