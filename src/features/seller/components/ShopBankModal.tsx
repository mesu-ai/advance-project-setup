import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/Modal/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const bankAccontSchema = z.object({
  accountHolderName: z.string().min(3, 'Account holder name is required'),
  accountNo: z.string().min(3, 'Accont no is required'),
  bankName: z.string().min(3, 'Bank name is required'),
  routingNo: z.string().min(3, 'Routing no is required'),
  swiftCode: z.string().min(3, 'Swift code is required'),
  branchName: z.string().min(3, 'Branch name is required'),
  shopId: z.number().positive('Shop ID is required'),
  // status: 'Y' | 'N';
});

type BankAccountFormData = z.infer<typeof bankAccontSchema>;

interface ShopBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  shopId: number;
  initialValues?: BankAccountFormData;
  mode: 'create' | 'edit';
}

const ShopBankModal = ({ isOpen, onClose, shopId, initialValues, mode }: ShopBankModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccontSchema),
    defaultValues: initialValues ?? { shopId: shopId },
  });

  const onSubmit = (data: BankAccountFormData) => {
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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'create' ? 'Add Bank Account' : 'Update Bank Account'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="min-w-2xl space-y-4">
        <div className="grid grid-cols-2 gap-x-3 gap-y-4">
          <Input
            label="Account Holder Name"
            placeholder="Enter Account Holder Name"
            error={errors.accountHolderName?.message}
            {...register('accountHolderName')}
            required
          />

          <Input
            label="Bank Name"
            placeholder="Enter Bank Name"
            error={errors.bankName?.message}
            {...register('bankName')}
            required
          />

          <Input
            label="Account No"
            placeholder="Enter Account No."
            error={errors.accountNo?.message}
            {...register('accountNo')}
            required
          />

          <Input
            label="Branch Name"
            placeholder="Enter Branch Name"
            error={errors.branchName?.message}
            {...register('branchName')}
            required
          />

          <Input
            label="Routing No"
            placeholder="Enter Routing No."
            error={errors.routingNo?.message}
            {...register('routingNo')}
            required
          />

          <Input
            label="Swift Code"
            placeholder="Enter Swift Code"
            error={errors.swiftCode?.message}
            {...register('swiftCode')}
            required
          />
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
            {mode === 'create' ? 'Save' : 'Update'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ShopBankModal;
