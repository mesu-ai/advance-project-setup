import { type ComponentPropsWithRef } from 'react';

interface CheckboxProps extends ComponentPropsWithRef<'input'> {
  label?: string;
}

const Checkbox = ({ label, className, ...props }: CheckboxProps) => {
  return (
    <label className={`capitalize select-none flex items-center gap-2 ${className}`}>
      <input type="checkbox" className="accent-primary-500 cursor-pointer w-4 h-4" {...props} />
      <span className="font-medium text-black-300"> {label}</span>
    </label>
  );
};

export default Checkbox;
