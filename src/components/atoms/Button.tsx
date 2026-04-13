import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariantT =
  | 'add'
  | 'edit'
  | 'delete'
  | 'save'
  | 'cancel'
  | 'view'
  | 'confirm'
  | 'bulk'
  | 'draft'
  | 'filter'
  | 'column'
  | 'apply'
  | 'submit';

const variantStyles: Record<ButtonVariantT, string> = {
  add: 'px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white',
  edit: 'bg-secondary-500 text-white hover:bg-secondary-600',
  view: 'bg-info-500 text-white hover:bg-info-600',
  delete: 'bg-danger-500 text-white hover:bg-danger-600',
  apply: 'bg-secondary-500 text-white hover:bg-secondary-600',
  bulk: 'px-4 py-1 text-sm text-white',
  cancel: 'py-2 bg-danger-500 text-white hover:bg-danger-600 w-full max-w-[180px]',
  save: 'py-2 bg-primary-500 text-white hover:bg-primary-600 w-full max-w-[180px]',
  confirm: 'py-2 bg-primary-500 text-white hover:bg-primary-600 w-full max-w-[180px]',
  draft: 'py-2 bg-primary-500 text-white hover:bg-primary-600 w-full max-w-[180px]',
  filter:
    'py-1.5 bg-info-50 text-info-500 border border-info-500 hover:bg-info-600 hover:text-white w-[150px]',
  column:
    'py-1.5 bg-processing-50 text-processing-500 border border-processing-500 hover:text-white hover:bg-processing-600 w-[150px]',
  submit: 'py-2 bg-success-500 text-white hover:bg-success-600 w-full max-w-[180px]',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: ButtonVariantT;
  className?: string;
}

const Button = ({
  children,
  type = 'button',
  variant,
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  // box-shadow: 0 0 10px 0 rgba(132, 132, 132, 0.15);

  return (
    <button
      type={type}
      disabled={disabled}
      className={`leading-normal cursor-pointer rounded-lg font-semibold disabled:bg-white-700 disabled:text-neutral-200 ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
