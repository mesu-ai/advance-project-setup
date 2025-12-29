import { useId, type ComponentPropsWithRef } from 'react';

interface InputProps extends ComponentPropsWithRef<'input'> {
  label: string;
  error?: string;
}

const Input = ({ label, className = '', type = 'text', error, ...props }: InputProps) => {
  const generatedId = useId();

  return (
    <div>
      <label className="input-label" htmlFor={generatedId}>
        {label}
      </label>
      <div className={`input-field ${className}`}>
        <input
          type={type}
          id={generatedId}
          aria-invalid={!!error}
          aria-describedby={error ? `${generatedId}-error` : undefined}
          className="outline-none w-full"
          {...props}
        />
      </div>
      {error && (
        <p id={`${generatedId}-error`} className="input-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
