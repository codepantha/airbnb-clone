import getCurrentUser from './actions/getCurrentUser';
import getListings, { iListingsParams } from './actions/getListings';
import { ClientOnly, Container, EmptyState } from './components';
import { ListingCard } from './components/listings';
import { SafeListing } from './types';

interface HomeProps {
  searchParams: iListingsParams;
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (!listings.length) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
        >
          {listings.map((listing: SafeListing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}

export default Home;

export const dynamic = 'force-dynamic';
