import UploadIcon from '@/assets/svg/UploadIcon';
import { useId, type ComponentPropsWithRef } from 'react';

interface FileInputProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'value'> {
  label: string;
  error?: string;
  value?: File | string;
}

const FileInput = ({
  label,
  className = '',
  placeholder = 'Upload Photo',
  error,
  value,
  ...props
}: FileInputProps) => {
  const generatedId = useId();

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   if (selectedFile) setFileName(selectedFile?.name);
  //   onChange?.(e);
  // };

  const fileName =
    value instanceof File ? value.name : typeof value === 'string' ? value.split('/').pop() : '';

  return (
    <div>
      <label className="input-label" htmlFor={generatedId}>
        {label}
      </label>

      <label htmlFor={generatedId} className={`input-field flex items-center ${className}`}>
        <span>{fileName || placeholder}</span>
        <UploadIcon className="w-5 h-5 ms-auto" />
        <input
          type="file"
          id={generatedId}
          aria-invalid={!!error}
          aria-describedby={error ? `${generatedId}-error` : undefined}
          className="hidden"
          {...props}
        />
      </label>

      {error && (
        <p id={`${generatedId}-error`} className="input-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileInput;
