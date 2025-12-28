import SwitchIcon from '@/assets/svg/SwitchIcon';
import { useEffect, useState, type ChangeEvent, type ComponentPropsWithRef } from 'react';

interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label?: string;
}

const Checkbox2 = ({ label, className = '', checked, onChange, ...props }: CheckboxProps) => {
  const [isChecked, setChecked] = useState<boolean>(checked || false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange?.(e);
  };

  useEffect(() => {
    if (checked !== undefined) setChecked(checked);
  }, [checked]);

  return (
    <label
      className={` transition-colors duration-200 ease-in-out select-none capitalize ${className}`}
    >
      {label}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="cursor-pointer appearance-none"
        {...props}
      />
      <SwitchIcon
        isEnabled={isChecked}
        className={`mt-2 cursor-pointer transition-colors duration-200 ease-in-out  ${isChecked ? 'text-success-500' : 'text-neutral-100'}`}
      />
    </label>
  );
};

export default Checkbox2;
