import prisma from '@/app/lib/prismadb';

export interface iListingsParams {
  userId?: string;
}

export default async function getListings(params: iListingsParams) {
  try {
    const { userId } = params;

    let query: { userId?: string } = {};

    if (userId) query.userId = userId;

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: 'desc' }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }));

    return safeListings;
  } catch (err: any) {
    throw new Error(err);
  }
}
