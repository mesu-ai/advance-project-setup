import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent,
} from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import ArrowIcon from '@/assets/svg/ArrowIcon';
import Search from './Search';
import { Link } from 'react-router';
import CloseIcon from '@/assets/svg/CloseIcon';

type Primitive = string | number;
type PrimitiveKeys<T> = { [K in keyof T]: T[K] extends Primitive ? K : never }[keyof T];
type OptionKeys<T, ValueKey extends PrimitiveKeys<T>> = {
  label: PrimitiveKeys<T>;
  value: ValueKey;
};

interface BaseComboBoxProps<T, ValueKey extends PrimitiveKeys<T>>
  extends Omit<ComponentPropsWithRef<'button'>, 'value' | 'onChange'> {
  options: T[];
  optionKeys: OptionKeys<T, ValueKey>;
  placeholder?: string;
  error?: string;
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

interface SingleSelectProps<T, ValueKey extends PrimitiveKeys<T>>
  extends BaseComboBoxProps<T, ValueKey> {
  isMulti?: false;
  value?: T[ValueKey];
  onChange: (value: T[ValueKey]) => void;
}

interface MultiSelectProps<T, ValueKey extends PrimitiveKeys<T>>
  extends BaseComboBoxProps<T, ValueKey> {
  isMulti: true;
  value?: T[ValueKey][];
  onChange: (values: T[ValueKey][]) => void;
}

type ComboBoxProps<T, ValueKey extends PrimitiveKeys<T>> =
  | SingleSelectProps<T, ValueKey>
  | MultiSelectProps<T, ValueKey>;

const ComboBox = <T, ValueKey extends PrimitiveKeys<T>>({
  options,
  value,
  optionKeys,
  search,
  onChange,
  error,
  label,
  placeholder = 'Please Select Value or Search Here',
  addMore,
  isLoading,
  required,
  isMulti,

  ...props
}: ComboBoxProps<T, ValueKey>) => {
  const generatedId = useId();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const outsideRef = useRef<HTMLDivElement>(null);
  useOutsideClick(outsideRef, () => setOpen(false));

  const selectedSet = useMemo(() => {
    if (isMulti && Array.isArray(value)) {
      return new Set(value);
    }
    return null;
  }, [isMulti, value]);

  const selectedOptions = useMemo(() => {
    if (isMulti && Array.isArray(value)) {
      const selectedValueSet = new Set(value);
      return options.filter((opt) => selectedValueSet.has(opt[optionKeys.value]));
    }
    return options?.find((opt) => opt[optionKeys.value] === value);
  }, [isMulti, options, optionKeys.value, value]);

  const handleSelect = useCallback(
    (option: T) => {
      const optionValue = option[optionKeys.value];

      if (isMulti) {
        const valueSet = new Set(value ?? []);
        if (valueSet.has(optionValue)) {
          valueSet.delete(optionValue);
        } else {
          valueSet.add(optionValue);
        }
        (onChange as (value: T[ValueKey][]) => void)(Array.from(valueSet));
        return;
      }

      (onChange as (value: T[ValueKey]) => void)(optionValue);
      setOpen(false);
    },
    [onChange, isMulti, optionKeys.value, value]
  );

  const selectedValueLabel = useMemo(() => {
    if (!selectedOptions) return <span>{placeholder}</span>;

    if (isMulti && Array.isArray(selectedOptions)) {
      if (!selectedOptions.length) return <span>{placeholder}</span>;

      return (
        <div className="flex items-center gap-2 text-xs font-medium">
          {selectedOptions?.map((opt) => (
            <p
              key={String(opt[optionKeys.value])}
              onClick={(e) => e.stopPropagation()}
              className="cursor-auto flex items-center gap-0.5 bg-secondary-500 text-white px-2 py-[2.495px] rounded"
            >
              {String(opt[optionKeys.label])}
              <span
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(opt);
                }}
                aria-label={`Remove ${String(opt[optionKeys.label])}`}
                className="hover:text-neutral-200"
              >
                <CloseIcon className="w-4 h-4" />
              </span>
            </p>
          ))}
        </div>
      );
    }

    const singleSelected = selectedOptions as T;
    return <span>{String(singleSelected[optionKeys.label])}</span>;
  }, [isMulti, optionKeys.label, optionKeys.value, placeholder, selectedOptions, handleSelect]);

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
      <label id={generatedId} className="input-label">
        {label} {required && <span className="text-danger-500">*</span>}
      </label>

      <button
        aria-labelledby={generatedId}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`cursor-pointer text-start input-field flex justify-between items-center 
          ${(!selectedOptions || (Array.isArray(selectedOptions) && selectedOptions.length === 0)) && 'text-neutral-300'}`}
        {...props}
      >
        {selectedValueLabel}

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
                const optionLabel = String(option[optionKeys.label]);
                const optionValue = String(option[optionKeys.value]);

                const isHighlighted = highlightedIndex === index;

                let isSelected = false;
                if (isMulti && selectedSet) {
                  isSelected = selectedSet?.has(option[optionKeys.value]);
                } else if (!isMulti && value !== null) {
                  isSelected = value === option[optionKeys.value];
                }

                return (
                  <li
                    key={optionValue}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      if (!isSelected) handleSelect(option);
                    }}
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
