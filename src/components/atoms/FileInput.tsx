import UploadIcon from '@/assets/svg/UploadIcon';
import { useId, useState, type ChangeEvent, type ComponentPropsWithRef } from 'react';

interface FileInputProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label: string;
  error?: string;
}

const FileInput = ({
  label,
  className = '',
  placeholder = 'Upload Photo',
  error,
  onChange,
  ...props
}: FileInputProps) => {
  const [file, setFile] = useState<string>('');
  const generatedId = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    setFile(file?.name ?? '');
    onChange?.(e);
  };

  return (
    <div>
      <label className="input-label" htmlFor={generatedId}>
        {label}
      </label>

      <label htmlFor={generatedId} className={`input-field flex items-center ${className}`}>
        <span>{file || placeholder}</span>
        <UploadIcon className="w-5 h-5 ms-auto" />
        <input
          type="file"
          id={generatedId}
          aria-invalid={!!error}
          aria-describedby={error ? `${generatedId}-error` : undefined}
          className="hidden"
          onChange={handleChange}
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
