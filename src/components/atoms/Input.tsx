import { cn } from '@/lib/cn';
import { useId, type ComponentPropsWithRef } from 'react';

interface InputProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  error?: string;
}

const Input = ({ label, className = '', type = 'text', error, required, ...props }: InputProps) => {
  const generatedId = useId();

  return (
    <div>
      <label className="input-label" htmlFor={generatedId}>
        {label} {required && <span className="text-danger-500">*</span>}
      </label>

      <div data-disabled={props.disabled} className={cn('input-field', className)}>
        <input
          type={type}
          id={generatedId}
          aria-invalid={!!error}
          aria-describedby={error ? `${generatedId}-error` : undefined}
          className={cn('outline-none w-full', type === 'number' && 'input-no-arrow')}
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
