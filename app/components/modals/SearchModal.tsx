'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Modal from './Modal';
import useSearchModal from '@/app/hooks/useSearch';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';

enum Steps {
  Location = 0,
  Date = 1,
  Info = 2
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState(Steps.Location);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((currentVal) => currentVal - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((currentVal) => currentVal + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== Steps.Info) return onNext();

    let currentQuery = {};

    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    };

    if (dateRange.startDate)
      updatedQuery.startDate = formatISO(dateRange.startDate);

    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true }
    );

    setStep(Steps.Location);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params
  ]);

  const actionLabel = useMemo(() => {
    if (step === Steps.Info) return 'Search';

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.Location) return undefined;

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === Steps.Date) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === Steps.Info) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter 
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests" 
          subtitle="How many guests are coming?"
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need"
        />
        <hr />
        <Counter
          onChange={(value) => setBathroomCount(value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you need"
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === Steps.Location ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
