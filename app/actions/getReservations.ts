import prisma from '@/app/lib/prismadb';

interface IParams {
  userId?: string;
  listingId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { userId, listingId, authorId } = params;

    const query: any = {};

    if (userId) query.userId = userId;

    if (listingId) query.listingId = listingId;

    if (authorId) query.listing = { userId: authorId };
    
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAT: 'desc'
      }
    });

    const safeReservations = reservations.map(( reservation ) => ({
      ...reservation,
      createdAT: reservation.createdAT.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.startDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      }
    }));

    return safeReservations;
  } catch (err: any) {
    throw new Error(err)
  }
}