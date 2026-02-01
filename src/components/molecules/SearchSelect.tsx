import { useRef, useState } from 'react';
import { Link } from 'react-router';
import Search from '../atoms/Search';
import useOutsideClick from '@/hooks/useOutsideClick';

type OptionType = Record<string, string | number> | object;
type OptionKeys<T> = { label: keyof T; value: keyof T };

interface SearchSelectProps<T extends OptionType> {
  options: T[];
  optionKeys?: OptionKeys<T>;
  onChange: (keyword: string) => void;
  onSelect: (item: T) => void;
}

const SearchSelect = <T extends OptionType>({
  options,
  optionKeys,
  onChange,
  onSelect,
}: SearchSelectProps<T>) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const outsideRef = useRef<HTMLDivElement>(null);
  useOutsideClick(outsideRef, () => setOpen(false));

  return (
    <div className="relative">
      <Search
        onSearch={(k) => {
          setOpen(true);
          onChange(k);
        }}
      />

      <div
        ref={outsideRef}
        className={`overflow-hidden z-10 absolute left-0 right-0 mt-2 rounded-lg shadow-custom-2 border border-neutral-300 dark:border-black-300 bg-white dark:bg-black-500 transition-opacity duration-300 ease-in-out ${options && isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
      >
        <div className="max-h-[408px] overflow-y-auto">
          <ul className="text-sm text-neutral-300 py-3">
            {options.map((option, idx) => (
              <li
                key={idx}
                role="button"
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className={`cursor-default flex justify-between py-1.5 px-3 hover:bg-primary-50 hover:text-primary-500`}
              >
                {optionKeys
                  ? String(option[optionKeys?.label])
                  : (option as Record<string, string | number>).label}
              </li>
            ))}
          </ul>
          <p className="py-3 border-t border-border text-center">
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

export default SearchSelect;
