import PlusIcon from '@/assets/svg/PlusIcon';
import { useEffect, useId, useState, type ComponentPropsWithRef, type DragEvent } from 'react';

interface FileInputProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'value' | 'onDrop'> {
  label: string;
  error?: string;
  errorSameRow?: string;
  value?: File | File[] | string;
  onDrop?: (file: File) => void;
}

const FileInput = ({
  label,
  className = '',
  error,
  errorSameRow,
  value,
  required,
  onDrop,
  ...props
}: FileInputProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const generatedId = useId();

  // const fileName =
  //   value instanceof File ? value.name : typeof value === 'string' ? value.split('/').pop() : '';

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDrop) setIsDragOver(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleOnDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer?.files ?? []);
    const file = files[0];
    if (file && onDrop) onDrop(file);
  };

  useEffect(() => {
    if (!value) return;
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    if (typeof value === 'string') {
      // const imageUrl = `${baseURL}${value}`;
      setPreview(value);
    }
  }, [value]);

  return (
    <div className={className}>
      <label className="input-label" htmlFor={generatedId}>
        {label} {required && <span className="text-danger-500">*</span>}
      </label>

      <label
        htmlFor={generatedId}
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`${errorSameRow ? 'h-[calc(100%-48px)]' : 'h-[calc(100%-28px)]'} input-field border-dashed flex items-center justify-center gap-x-2 ${isDragOver && 'border-primary-500'}`}
      >
        {preview ? (
          <img src={preview} alt="preview-image" className="h-24 w-auto" />
        ) : (
          <span
            className={
              isDragOver
                ? 'text-secondary-500'
                : 'w-10 h-10 bg-white-600 rounded flex justify-center items-center'
            }
          >
            {isDragOver ? 'Drop Your Image Here' : <PlusIcon className="stroke-neutral-300" />}
          </span>
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
