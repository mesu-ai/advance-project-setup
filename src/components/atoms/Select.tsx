import ArrowIcon from '@/assets/svg/ArrowIcon';
import { useId, type ComponentPropsWithRef } from 'react';

type OptionType = Record<string, string | number>;
type OptionKeys<T> = { label: keyof T; value: keyof T };

interface SelectProps<T extends OptionType> extends ComponentPropsWithRef<'select'> {
  label: string;
  options: T[];
  error?: string;
  placeholder?: string;
  optionKeys?: OptionKeys<T>;
}

const Select = <T extends OptionType>({
  label,
  options = [],
  error,
  className = '',
  optionKeys,
  placeholder = 'Select an option',
  required,
  ...props
}: SelectProps<T>) => {
  const generatedId = useId();

  console.log({ error });
  return (
    <div className={className}>
      <label className="input-label" htmlFor={generatedId}>
        {label} {required && <span className="text-danger-500">*</span>}
      </label>

      <div className="relative">
        <select
          id={generatedId}
          className="input-field appearance-none peer capitalize bg-surface"
          {...props}
        >
          <option className="text-neutral-300 font-medium" value="">
            {placeholder}
          </option>
          {options?.map((option, index) => (
            <option
              key={index}
              value={String(optionKeys ? option[optionKeys.value] : option.value)}
            >
              {String(optionKeys ? option[optionKeys?.label] : option.label)}
            </option>
          ))}
        </select>
        <ArrowIcon className="pointer-events-none rotate-180 peer-focus:rotate-0 absolute right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform duration-300" />
      </div>

      {error && (
        <p id={`${generatedId}-error`} className="input-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
