import Checkbox from '@/components/atoms/Checkbox';
import Modal from '@/components/organisms/Modal/Modal';
import type { ColumnSetting } from '@/types';
import { Controller, useForm } from 'react-hook-form';

type ColumnSettingFormData = Record<string, 'Y' | 'N'>;

interface ColumnSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnSetting[];
}

const ColumnSettingsModal = ({ isOpen, onClose, columns }: ColumnSettingModalProps) => {
  const defaultValues = columns.reduce((acc, col) => {
    acc[col.value as keyof ColumnSettingFormData] = col.isVisible ? 'Y' : 'N';
    return acc;
  }, {} as ColumnSettingFormData);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<ColumnSettingFormData>({
    defaultValues,
  });

  const onSubmit = (data: ColumnSettingFormData) => {
    console.log(data);

    reset();
    onClose();
  };

  const handleReset = () => {
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Columns">
      <form onSubmit={handleSubmit(onSubmit)} className="min-w-xl space-y-4">
        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
          {columns.map((column) => (
            <Controller
              key={column.value}
              name={column.value as keyof ColumnSettingFormData}
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  label={column.label}
                  checked={value === 'Y'}
                  disabled={column.disabled}
                  onChange={(e) => onChange(e.target.checked ? 'Y' : 'N')}
                />
              )}
            />
          ))}
        </div>

        <div className="-mx-5 -my-4 mt-8 py-6 px-5 shadow-custom-3 font-semibold  grid grid-cols-2 gap-4 text-white">
          <button
            type="button"
            onClick={() => handleReset()}
            className="cursor-pointer bg-danger-500 hover:bg-danger-600 rounded-lg py-2"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer bg-primary-500 hover:bg-primary-600 rounded-lg py-2"
          >
            Apply Columns
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ColumnSettingsModal;
