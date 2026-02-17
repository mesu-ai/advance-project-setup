import {
  useCallback,
  useId,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent,
} from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import ArrowIcon from '@/assets/svg/ArrowIcon';
import Search from './Search';
import { Link } from 'react-router';

type OptionType = Record<string, string | number> | object;
type OptionKeys<T> = { label: keyof T; value: keyof T };

interface ComboBoxProps<T extends OptionType>
  extends Omit<ComponentPropsWithRef<'button'>, 'value'> {
  options: T[];
  optionKeys: OptionKeys<T>;
  onOptionSelect: (item: T) => void;
  placeholder?: string;
  error?: string;
  selectedValue?: string | number;
  label?: string;
  isLoading?: boolean;
  required?: boolean;
  search?: {
    enabled: boolean;
    onSearch: (keyword: string) => void;
  };
  addMore?: {
    enabled: boolean;
    link: string;
  };
}

const ComboBox = <T extends OptionType>({
  options,
  selectedValue,
  optionKeys,
  search,
  onOptionSelect,
  error,
  label,
  placeholder = 'Please Select Value or Search Here',
  addMore,
  isLoading,
  required,

  ...props
}: ComboBoxProps<T>) => {
  const generatedId = useId();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const outsideRef = useRef<HTMLDivElement>(null);
  useOutsideClick(outsideRef, () => setOpen(false));

  const selectedOption =
    selectedValue && options?.find((opt) => opt[optionKeys.value] === selectedValue);

  const handleSelect = useCallback(
    (option: T) => {
      onOptionSelect(option);
      setOpen(false);
    },
    [onOptionSelect]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();

        if (!isOpen) {
          setOpen(true);
          setHighlightedIndex(0);
          return;
        }

        setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;

      case 'Enter':
        e.preventDefault();
        if (options[highlightedIndex]) {
          handleSelect(options[highlightedIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={outsideRef} className="relative">
      <label className="input-label" htmlFor={generatedId}>
        {label} {required && <span className="text-danger-500">*</span>}
      </label>

      <button
        id={generatedId}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`cursor-pointer text-start input-field flex justify-between items-center ${!selectedOption && 'text-neutral-300'}`}
        {...props}
      >
        {selectedOption ? String(selectedOption[optionKeys?.label]) : placeholder}

        <ArrowIcon
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}
        />
      </button>

      {error && !isOpen && (
        <p id={`${generatedId}-error`} className="input-error" role="alert">
          {error}
        </p>
      )}

      <div
        className={`space-y-1 absolute left-0 right-0 overflow-hidden z-10  mt-2 p-3 rounded-lg shadow-custom-2 border border-neutral-300 dark:border-black-300 bg-white dark:bg-black-500 transition-opacity duration-300 ease-in-out ${options && isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
      >
        {search?.enabled && <Search onSearch={(k) => search.onSearch(k)} disabled={isLoading} />}

        <div className="max-h-[200px] overflow-y-auto space-y-1">
          {!isLoading ? (
            <ul className="text-sm text-neutral-300" role="listbox">
              {options.map((option, index) => {
                const optionLabel = String(option[optionKeys?.label]);
                const optionValue = String(option[optionKeys?.value]);

                const isHighlighted = highlightedIndex === index;

                const isSelected =
                  !!selectedOption && selectedOption[optionKeys.value] === option[optionKeys.value];

                return (
                  <li
                    key={optionValue}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    className={`cursor-default flex justify-between py-1 px-3 hover:bg-primary-50 rounded hover:text-primary-500 ${isHighlighted && 'bg-primary-50 text-primary-500'}`}
                  >
                    {optionLabel}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Loading...</p>
          )}

          {addMore?.enabled && (
            <p className="pt-3 border-t border-border text-center text-sm">
              Can't find attribute value?
              <Link
                className="text-primary-500 hover:text-primary-600 ms-1 font-medium"
                to={addMore.link ?? '#'}
              >
                Click Here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComboBox;
