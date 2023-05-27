'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value > 1) onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <p className="font-medium">{title}</p>
        <p className="font-light text-gray-600">{subtitle}</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-[1px]
          border-neutral-400 flex items-center justify-center
          text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <button onClick={onReduce}>
            <AiOutlineMinus />
          </button>
        </div>
        {value}
        <div
          className="w-10 h-10 rounded-full border-[1px]
          border-neutral-400 flex items-center justify-center
          text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <button onClick={onAdd}>
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
