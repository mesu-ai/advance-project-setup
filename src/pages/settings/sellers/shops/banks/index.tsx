import Button from '@/components/atoms/Button';
import Status from '@/components/atoms/Status';
import ActionButtons from '@/components/molecules/ActionButtons';
import Pagination from '@/components/molecules/Pagination';
import SearchBar from '@/components/molecules/SearchBar';
import DataTable from '@/components/organisms/DataTable';
import ShopBankModal from '@/features/sellers/components/ShopBankModal';
import { useGetSellerBanksQuery } from '@/store/api/endpoints/sellerEndpoints';
import type { BankT } from '@/types';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router';

type BankModalState = { mode: 'create' } | { mode: 'edit'; bank: BankT } | null;

const ShopBanksPage = () => {
  const [bankModalState, setBankModalState] = useState<BankModalState>(null);

  const { shopId } = useParams();
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page') ?? 1);
  const itemsPerPage = Number(searchParams.get('itemsPerPage') ?? 15);

  const numericShopId = Number(shopId);

  const bankParams = {
    shopId: numericShopId,
    currentPage,
    itemsPerPage,
  };

  const { data: banks, isLoading } = useGetSellerBanksQuery(bankParams, {
    skip: !shopId || Number.isNaN(numericShopId),
  });

  const openCreateBankModal = () => {
    setBankModalState({ mode: 'create' });
  };

  const openEditBankModal = (bank: BankT) => {
    setBankModalState({ mode: 'edit', bank });
  };

  const closeBankModal = () => {
    setBankModalState(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!banks?.data) return <div>Banks not found</div>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="heading-1">Shop Bank Accounts</h1>
        <Button variant="add" onClick={openCreateBankModal}>
          Add New Account
        </Button>
      </div>

      <div className="bg-surface mt-3 rounded-xl border border-border">
        <div className="flex justify-between px-5 py-4">
          <SearchBar />
        </div>

        <div className="w-full overflow-x-auto">
          <DataTable
            header={[
              'SL No',
              'Bank Name',
              'Account Holder Name',
              'Account Number',
              'Branch Name',
              'Routing Number',
              'SWIFT Code',
              'Status',
              'Action',
            ]}
          >
            {banks.data.map((bank, index: number) => (
              <tr key={bank.sellerBankAccountId}>
                <td className="px-5 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-5 py-3">{bank.bankName}</td>
                <td className="px-5 py-3">{bank.accountHolderName}</td>
                <td className="px-5 py-3">{bank.accountNo}</td>
                <td className="px-5 py-3">{bank.branchName}</td>
                <td className="px-5 py-3">{bank.routingNo}</td>
                <td className="px-5 py-3">{bank.swiftCode ?? '—'}</td>
                <td className="px-5 py-3">
                  <Status status={bank.status === 'Y' ? 'active' : 'pending'} />
                </td>
                <td className="px-5 py-3">
                  <ActionButtons
                    actions={[{ label: 'Edit', onClick: () => openEditBankModal(bank) }]}
                  />
                </td>
              </tr>
            ))}

            {!isLoading && banks.data.length === 0 && (
              <tr>
                <td className="px-5 py-6 text-center text-neutral-500" colSpan={9}>
                  No bank accounts found.
                </td>
              </tr>
            )}
          </DataTable>
        </div>

        <div className="py-5 text-center">
          <Pagination
            totalPages={banks.pagination?.totalPages}
            totalItems={banks.pagination?.totalItems}
          />
        </div>
      </div>

      {bankModalState && (
        <ShopBankModal
          isOpen
          onClose={closeBankModal}
          shopId={numericShopId}
          initialValues={bankModalState.mode === 'edit' ? bankModalState.bank : undefined}
          mode={bankModalState.mode}
        />
      )}
    </div>
  );
};

export default ShopBanksPage;
