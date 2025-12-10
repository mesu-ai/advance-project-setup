import ArrowIcon from '@/assets/svg/ArrowIcon';
import { memo, type FC } from 'react';

export interface ActionItemProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface ActionButtonsProps {
  actions: ActionItemProps[];
  label?: string;
}

const ActionButtons: FC<ActionButtonsProps> = memo(({ actions, label = 'Actions' }) => {
  return (
    <div className="group relative w-fit">
      <button
        type="button"
        className="rounded-lg border border-secondary-500 ps-2.5 pe-1.5 py-0.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
      >
        {label}
        <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
      </button>

      <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col items-start gap-2 text-neutral-300">
        {actions.map((action, idx) => (
          <button
            key={idx}
            type="button"
            disabled={action.disabled}
            onClick={action.onClick}
            className="px-3 hover:text-primary-500 cursor-pointer capitalize"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
});

export default ActionButtons;
