import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import { ClientOnly, EmptyState } from '../components';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (!listings.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favourites found"
          subtitle="Looks like you have no favourite listings"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
