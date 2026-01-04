import { baseURL } from '@/apis/config/baseURL';
import UploadIcon from '@/assets/svg/UploadIcon';
import { useEffect, useId, useState, type ComponentPropsWithRef } from 'react';

interface FileInputProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'value'> {
  label: string;
  error?: string;
  errorSameRow?: string;
  value?: File | string;
}

const FileInput = ({
  label,
  className = '',
  placeholder = 'Upload Photo',
  error,
  errorSameRow,
  value,
  ...props
}: FileInputProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const generatedId = useId();

  // const fileName =
  //   value instanceof File ? value.name : typeof value === 'string' ? value.split('/').pop() : '';

  useEffect(() => {
    if (!value) return;
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    if (typeof value === 'string') {
      const imageUrl = `${baseURL}${value}`;
      setPreview(imageUrl);
    }
  }, [value]);

  return (
    <div className={`row-span-2 ${className}`}>
      <label className="input-label" htmlFor={generatedId}>
        {label}
      </label>

      <label
        htmlFor={generatedId}
        className={`${errorSameRow ? 'h-[calc(100%-48px)]' : 'h-[calc(100%-28px)]'} input-field border-dashed flex items-center justify-center gap-x-2`}
      >
        {preview ? (
          <img src={preview} alt="preview-image" className="h-24 w-auto" />
        ) : (
          <>
            <span className="text-neutral-300 select-none">{placeholder}</span>
            <UploadIcon className="w-5 h-5 " />
          </>
        )}
        <input type="file" id={generatedId} className="hidden" {...props} />
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
