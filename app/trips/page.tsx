import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

import { ClientOnly, EmptyState } from '../components';
import TripsClient from './TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });
  
  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
};

export default TripsPage;
