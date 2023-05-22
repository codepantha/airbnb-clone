import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string')
    throw new Error('Invalid ID');

  // remove reservations only by the user who placed the reservation
  // or the user who owns the listing
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }]
    }
  });

  return NextResponse.json(reservation);
}
