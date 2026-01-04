import Image from '@/components/atoms/Image';
import Status from '@/components/atoms/Status';
import avatar from '@/assets/images/avatar1.png';
import Pagination from '@/components/molecules/Pagination';
import { useState } from 'react';
import DataTable from '@/components/organisms/DataTable';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import ActionButtons from '@/components/molecules/ActionButtons';
import PageSection from '@/components/templates/PageSection';
import Modal from '@/components/organisms/Modal/Modal';
import { useNavigate } from 'react-router';
import type { EmployeeT } from '@/types';
import { useGetEmployeesQuery } from '@/store/api/endpoints/employeeEndpoints';
import ProfileImage from '@/assets/images/employee1.png';

const EmployeeListPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedEmp, setSelectedEmp] = useState<EmployeeT>();
  const [currPage, setCurrPage] = useState<number>(1);

  const navigate = useNavigate();

  const { data: employees } = useGetEmployeesQuery('Employees');

  console.log({ currPage });

  const handleView = (empToView: EmployeeT) => {
    setSelectedEmp(empToView);
    setOpen(true);
  };

  const handleEdit = (id: string) => {
    navigate(`/access-control/employees/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };

  return (
    <PageSection title="All Employee List">
      <div className="flex justify-between px-5 py-4">
        <SearchBar />

        <Button variant="add" onClick={() => navigate('/access-control/employees/create')}>
          Add New Employee
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <DataTable header={['SL No', 'Name', 'Email', 'Role', 'Status', 'Action']}>
          {employees?.data &&
            employees?.data.map((employee: EmployeeT, index: number) => (
              <tr key={employee.employeeId}>
                <td className="px-5 py-3">{index + 1}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2 items-center">
                    <Image src={avatar} width={28} height={28} alt="default-avater" />
                    <p>{}</p>
                  </div>
                </td>
                <td className="px-5 py-3">{employee.email}</td>
                <td className="px-5 py-3">{employee.role}</td>
                <td className="px-5 py-3">
                  <Status status={employee.status} />
                </td>
                <td className="px-5 py-3">
                  <ActionButtons
                    actions={[
                      {
                        label: 'View',
                        onClick: () => handleView(employee),
                      },
                      {
                        label: 'Edit',
                        onClick: () => handleEdit(employee.employeeId),
                      },
                      {
                        label: 'Delete',
                        onClick: () => handleDelete(employee.employeeId),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
        </DataTable>
        <div className="text-center py-5">
          <Pagination totalPage={12} currentPage={5} setCurrentPage={setCurrPage} />
        </div>
      </div>

      {open && selectedEmp && (
        <Modal title="View Employee" isOpen={open} onClose={setOpen}>
          <div className="flex gap-4 items-center">
            <div className="ring-2 ring-primary-500 rounded-full p-2.5">
              <Image src={ProfileImage} className="rounded-full" width={162} height={162} />
            </div>
            <div className="space-y-7 min-w-[358px]">
              <div className="font-bold flex justify-between items-center">
                <div className="space-y-1 capitalize">
                  <p>Name: {selectedEmp.name}</p>
                  <p>Employee ID: {selectedEmp.employeeId}</p>
                </div>
                <Status status={selectedEmp.status} />
              </div>

              <ul className="text-sm font-medium space-y-1">
                <li>
                  <span className="text-neutral-300">Mobile:</span> {selectedEmp.mobileNo}
                </li>
                <li>
                  <span className="text-neutral-300">Email:</span> {selectedEmp.email}
                </li>
                <li className="flex gap-4 capitalize">
                  <p>
                    <span className="text-neutral-300">NID:</span> {selectedEmp.nid}
                  </p>
                  <p>
                    <span className="text-neutral-300">Gender:</span> {selectedEmp.gender}
                  </p>
                </li>

                <li className="flex gap-4 capitalize">
                  <p>
                    <span className="text-neutral-300">Role:</span> {selectedEmp.role}
                  </p>
                  <p>
                    <span className="text-neutral-300">Depertment:</span> {selectedEmp.depertment}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </PageSection>
  );
};

export default EmployeeListPage;
