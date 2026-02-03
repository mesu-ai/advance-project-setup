import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariantT =
  | 'add'
  | 'edit'
  | 'delete'
  | 'update'
  | 'cancel'
  | 'view'
  | 'confirm'
  | 'draft'
  | 'submit';

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
  const variantStyles: Record<ButtonVariantT, string> = {
    add: 'px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white',
    edit: 'bg-secondary-500 text-white hover:bg-secondary-600',
    view: 'bg-danger-500 text-white hover:bg-danger-600',
    delete: 'bg-danger-500 text-white hover:bg-danger-600',
    cancel: 'py-2 bg-danger-500 text-white hover:bg-danger-600 w-full max-w-[180px]',
    update: 'py-2 bg-primary-500 text-white hover:bg-primary-600 w-full max-w-[180px]',
    confirm: 'py-2 bg-primary-500 text-white hover:bg-primary-600 w-full max-w-[180px]',
    draft: 'py-2 bg-primary-500 text-white hover:bg-primary-600 w-full max-w-[180px]',
    submit: 'py-2 bg-success-500 text-white hover:bg-success-600 w-full max-w-[180px]',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`cursor-pointer rounded-lg font-semibold disabled:bg-white-700 disabled:text-neutral-200 ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
