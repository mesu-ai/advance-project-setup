import { type ComponentPropsWithRef } from 'react';

interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label?: string;
}

const Checkbox = ({ label, className = '', ...props }: CheckboxProps) => {
  return (
    <label className={`capitalize select-none flex items-center gap-2 w-fit text-sm ${className}`}>
      <input
        type="checkbox"
        className="peer accent-primary-500 cursor-pointer w-4 h-4 disabled:cursor-not-allowed"
        {...props}
      />
      <span className="mt-0.5 text-neutral-300 peer-checked:text-inherit peer-disabled:text-neutral-200">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
