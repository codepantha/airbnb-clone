'use client';

import React, { useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import Counter from '../inputs/Counter';

enum Steps {
  Category = 0,
  Location = 1,
  Info = 2,
  Images = 3,
  Description = 4,
  Price = 5
}

const RentModal = () => {
  const [step, setStep] = useState(Steps.Category);

  const rentModal = useRentModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');

  // dynamically import and re-render Map
  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };

  const onBack = () => setStep((currentVal) => currentVal - 1);

  const onNext = () => setStep((currentVal) => currentVal + 1);

  const actionLabel = useMemo(() => {
    if (step === Steps.Price) return 'Create';

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.Category) return undefined;

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="rent-body">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-3
          max-h-[50vh] overflow-y-auto"
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === Steps.Location) {
    bodyContent = (
      <div className="rent-body">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(location) => setCustomValue('location', location)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === Steps.Info) {
    bodyContent = (
      <div className="rent-body">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      title="Airbnb your home"
      onClose={rentModal.onClose}
      isOpen={rentModal.isOpen}
      onSubmit={onNext}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === Steps.Category ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
