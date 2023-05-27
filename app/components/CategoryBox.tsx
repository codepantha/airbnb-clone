'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    // if params, parse the query string into an object
    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    };
    // unselect the category if it is already selected
    if (params?.get('category') === label) delete updatedQuery.category;

    const url = qs.stringifyUrl(
      { url: '/', query: updatedQuery },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <li
      onClick={handleClick}
      className={`flex list-none flex-col items-center justify-center gap-2
        p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}
    >
      <Icon size={26} />
      <p className="font-medium text-sm">{label}</p>
    </li>
  );
};

export default CategoryBox;
