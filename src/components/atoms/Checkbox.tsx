import { type ComponentPropsWithRef } from 'react';

interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label?: string;
}

const Checkbox = ({ label, className = '', ...props }: CheckboxProps) => {
  return (
    <label className={`capitalize select-none flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        className="accent-primary-500 cursor-pointer w-4 h-4 disabled:cursor-not-allowed"
        {...props}
      />
      <span className="mt-0.5"> {label}</span>
    </label>
  );
};

export default Checkbox;
