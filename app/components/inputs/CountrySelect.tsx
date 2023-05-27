'use client';

import ReactSelect from 'react-select';

import useCountries from '@/app/hooks/useCountries';

export type CountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <div>
      <ReactSelect
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              <p>
                {option.label},{' '}
                <span className="text-neutral-500 ml-1">{option.region}</span>
              </p>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  );
};

export default CountrySelect;
