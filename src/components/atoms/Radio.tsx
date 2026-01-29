import { useId, type ComponentPropsWithRef } from 'react';

type OptionType = Record<string, string | number> | object;
type OptionKeys<T> = { label: keyof T; value: keyof T };

interface RadioProps<T extends OptionType> extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label?: string;
  options: T[];
  error?: string;
  optionKeys?: OptionKeys<T>;
}

const Radio = <T extends OptionType>({
  label,
  options,
  error,
  required = true,
  optionKeys,
  className,
  ...props
}: RadioProps<T>) => {
  const generatedId = useId();

  return (
    <fieldset>
      {label && (
        <legend className="input-label">
          {label} {required && <span className="text-danger-500">*</span>}
        </legend>
      )}

      <div className={`flex gap-x-4 mt-1 ${className}`}>
        {options.map((option, index) => (
          <label
            key={index}
            htmlFor={`${generatedId}-${index}`}
            className=" flex items-center gap-1.5 w-fit capitalize"
          >
            <input
              type="radio"
              value={String(
                optionKeys
                  ? option[optionKeys.value]
                  : (option as Record<string, string | number>).value
              )}
              id={`${generatedId}-${index}`}
              className="accent-primary-500"
              {...props}
            />
            <span className="text-sm leading-[17px]">
              {String(
                optionKeys
                  ? option[optionKeys.label]
                  : (option as Record<string, string | number>).label
              )}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${generatedId}-error`} className="input-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
};

export default Radio;
