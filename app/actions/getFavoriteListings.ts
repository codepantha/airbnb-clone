import prisma from '@/app/lib/prismadb';

import getCurrentUser from '@/app/actions/getCurrentUser';

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();
  
    const favoriteIds = currentUser?.favoriteIds || [];
  
    const favoritedListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...favoriteIds]
        }
      }
    });
  
    const safeFavorites = favoritedListings.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString()
    }))

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
