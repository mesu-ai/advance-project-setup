import type { ButtonHTMLAttributes, FC } from 'react';

type variants = 'add' | 'edit' | 'delete' | 'update' | 'cancel' | 'view';

interface ButtonPropsT extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className?: string;
  variant: variants;
}

const Button: FC<ButtonPropsT> = ({
  title,
  type = 'button',
  variant,
  className,
  disabled,
  ...rest
}) => {
  const variantStyles: Record<variants, string> = {
    add: 'px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white',
    edit: 'bg-secondary-500 text-white hover:bg-secondary-600',
    delete: 'bg-danger-500 text-white hover:bg-danger-600',
    update: 'bg-danger-500 text-white hover:bg-danger-600',
    cancel: 'bg-danger-500 text-white hover:bg-danger-600',
    view: 'bg-danger-500 text-white hover:bg-danger-600',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`cursor-pointer rounded-lg font-semibold ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {title}
    </button>
  );
};

export default Button;
