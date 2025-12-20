import SwitchIcon from '@/assets/svg/SwitchIcon';
import { memo, type FC } from 'react';

interface SwitchProps {
  isEnabled: boolean;
  onEnabled: () => void;
}

const Switch: FC<SwitchProps> = memo(({ isEnabled, onEnabled }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEnabled}
      onClick={onEnabled}
      className={`cursor-pointer transition-colors duration-200 ease-in-out h-4 w-10 bg-white rounded-lg ${isEnabled ? 'text-success-500' : 'text-neutral-100'}`}
    >
      <SwitchIcon isEnabled={isEnabled} />
    </button>
  );
});

export default Switch;
