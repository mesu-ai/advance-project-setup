import { useId, useRef, useState } from 'react';
import { Link } from 'react-router';
import Search from '../atoms/Search';
import useOutsideClick from '@/hooks/useOutsideClick';
import ArrowIcon from '@/assets/svg/ArrowIcon';

type OptionType = Record<string, string | number> | object;
type OptionKeys<T> = { label: keyof T; value: keyof T };

interface SearchSelectProps<T extends OptionType> {
  options: T[];
  optionKeys?: OptionKeys<T>;
  onChange: (keyword: string) => void;
  onSelect: (item: T) => void;
  error?: string;
}

const Select1 = <T extends OptionType>({
  options,
  optionKeys,
  onChange,
  onSelect,
  error,
}: SearchSelectProps<T>) => {
  const generatedId = useId();
  const [isDropdown, setDropdown] = useState<boolean>(false);

  const outsideRef = useRef<HTMLDivElement>(null);
  useOutsideClick(outsideRef, () => setDropdown(false));

  const isValue = '';

  console.log({ isDropdown });

  return (
    <div ref={outsideRef} className="relative">
      <div className="">
        <label className="input-label">
          Shop Name <span className="text-danger-500">*</span>
        </label>

        <button
          type="button"
          onClick={() => setDropdown((prev) => !prev)}
          className={`cursor-pointer text-start input-field flex justify-between items-center ${!isValue && 'text-neutral-300'}`}
        >
          Please Select Value or Search Here
          <ArrowIcon
            className={`w-4 h-4 transition-transform ${isDropdown ? 'rotate-0' : 'rotate-180'}`}
          />
        </button>

        {error && !isDropdown && (
          <p id={`${generatedId}-error`} className="input-error" role="alert">
            {error}
          </p>
        )}
      </div>

      <div
        className={`absolute left-0 right-0 overflow-hidden z-10  mt-2 p-3 rounded-lg shadow-custom-2 border border-neutral-300 dark:border-black-300 bg-white dark:bg-black-500 transition-opacity duration-300 ease-in-out ${options && isDropdown ? 'opacity-100' : 'opacity-0 hidden'}`}
      >
        <div>
          <Search onSearch={(k) => onChange(k)} />
        </div>

        <div className="max-h-[408px] overflow-y-auto">
          <ul className="text-sm text-neutral-300 py-1">
            {options.map((option, idx) => (
              <li
                key={idx}
                role="button"
                onClick={() => {
                  onSelect(option);
                  setDropdown(false);
                }}
                className={`cursor-default flex justify-between py-1.5 px-3 hover:bg-primary-50 hover:text-primary-500`}
              >
                {optionKeys
                  ? String(option[optionKeys?.label])
                  : (option as Record<string, string | number>).label}
              </li>
            ))}
          </ul>
          <p className="pt-3 border-t border-border text-center">
            <span className="text-sm">Can't find attribute value?</span>{' '}
            <Link className="text-primary-500 hover:text-primary-600" to="#">
              Click Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Select1;
