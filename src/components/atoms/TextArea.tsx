import { useId, type ComponentPropsWithRef } from 'react';

interface TextAreaProps extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  error?: string;
}

const TextArea = ({ label, className, error, required, ...props }: TextAreaProps) => {
  const generatedId = useId();
  return (
    <div>
      <label className="input-label" htmlFor={generatedId}>
        {label} {required && <span className="text-danger-500">*</span>}
      </label>
      <div className={`input-field ${className}`}>
        <textarea
          id={generatedId}
          aria-invalid={!!error}
          aria-describedby={error ? `${generatedId}-error` : undefined}
          className="outline-none w-full"
          rows={5}
          {...props}
        />
        {error && (
          <p id={`${generatedId}-error`} className="input-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextArea;
