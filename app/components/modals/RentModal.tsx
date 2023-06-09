'use client';

import React, { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';

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
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const rentModal = useRentModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
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
  const imageSrc = watch('imageSrc');

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== Steps.Price) return onNext();

    setIsLoading(true);

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing Created!');
        router.refresh();
        reset();
        setStep(Steps.Category);
        rentModal.onClose();
      })
      .catch(() => toast.error('Something went wrong.'))
      .finally(() => setIsLoading(false));
  };

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

  if (step === Steps.Images) {
    bodyContent = (
      <div className="rent-body">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  if (step === Steps.Description) {
    bodyContent = (
      <div className="rent-body">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === Steps.Price) {
    bodyContent = (
      <div className="rent-body">
        <Heading
          title="Last step, set your price!"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          type="number"
          disabled={isLoading}
          register={register}
          formatPrice
          errors={errors}
          required
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
      disabled={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === Steps.Category ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
