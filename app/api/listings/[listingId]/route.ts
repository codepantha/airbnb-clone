import { NextResponse } from "next/server";
import axios from "axios";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";

interface IParams {
  listingId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string')
    throw new Error('Invalid ID')

  const listing = await prisma.listing.deleteMany({
    where: { id: listingId, AND: { userId: currentUser.id } }
  });

  return NextResponse.json(listing);
}
