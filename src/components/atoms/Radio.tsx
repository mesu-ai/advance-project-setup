import { useId, type ComponentPropsWithRef } from 'react';

type OptionType = { label: string; value: string };

interface RadioProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label: string;
  error?: string;
  options: OptionType[];
}

const Radio = ({ label, options, error, ...props }: RadioProps) => {
  const generatedId = useId();

  return (
    <div>
      <label>{label}</label>
      <div className="space-x-4 mt-1">
        {options.map((option, index) => (
          <label key={index} htmlFor={`${generatedId}-${index}`} className="capitalize space-x-1.5">
            <input
              type="radio"
              value={option.value}
              id={`${generatedId}-${index}`}
              className="accent-primary-500"
              {...props}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${generatedId}-error`} className="input-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Radio;
