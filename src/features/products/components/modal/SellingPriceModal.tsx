import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/Modal/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const PriceModalSchema = z.object({
  sellingPrice: z.coerce.number<number>('Invalid price').positive('Selling price must be positive'),
  sellingDate: z.iso.datetime({ local: true }),
});

export type PriceFormData = z.infer<typeof PriceModalSchema>;

interface SellingPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PriceFormData) => void;
  initialValues?: PriceFormData;
}

const SellingPriceModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}: SellingPriceModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<PriceFormData>({
    resolver: zodResolver(PriceModalSchema),
    defaultValues: initialValues ?? {},
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit((data) => {
      onSubmit(data);
      reset();
    })(e);
  };

  const handleClose = () => {
    reset(); // Reset form when closing
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Selling Price">
      <form onSubmit={handleFormSubmit} className="min-w-xl space-y-4">
        <Input
          label="Selling Price"
          placeholder="Enter Selling Price"
          error={errors.sellingPrice?.message}
          {...register('sellingPrice')}
          required
        />
        <Input
          type="datetime-local"
          label="Selling Date"
          placeholder="Select Selling Date"
          error={errors.sellingDate?.message}
          {...register('sellingDate')}
          required
        />

        <div className="flex justify-end gap-4 pt-4">
          <Button onClick={handleClose} variant="cancel">
            Cancel
          </Button>
          <Button type="submit" variant="save" disabled={isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SellingPriceModal;
