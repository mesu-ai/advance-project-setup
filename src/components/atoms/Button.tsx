import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

type ButtonVariantT = 'add' | 'edit' | 'delete' | 'update' | 'cancel' | 'view';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: ButtonVariantT;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  variant,
  className,
  disabled,
  ...rest
}) => {
  const variantStyles: Record<ButtonVariantT, string> = {
    add: 'px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white',
    edit: 'bg-secondary-500 text-white hover:bg-secondary-600',
    delete: 'bg-danger-500 text-white hover:bg-danger-600',
    update: 'py-2 bg-primary-500 text-white hover:bg-primary-600 w-full max-w-[180px]',
    cancel: 'py-2 bg-danger-500 text-white hover:bg-danger-600 w-full max-w-[180px]',
    view: 'bg-danger-500 text-white hover:bg-danger-600',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`cursor-pointer rounded-lg font-semibold ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
