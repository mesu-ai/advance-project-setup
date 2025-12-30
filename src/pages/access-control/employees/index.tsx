import Image from '@/components/atoms/Image';
import Status from '@/components/atoms/Status';
import avatar from '@/assets/images/avatar1.png';
import Pagination from '@/components/molecules/Pagination';
import { useState } from 'react';
import DataTable from '@/components/organisms/DataTable';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import ActionButtons from '@/components/molecules/ActionButtons';
// import Modal from '@/components/organisms/Modal/Modal';
import PageSection from '@/components/templates/PageSection';
import { useNavigate } from 'react-router';
import type { EmployeeT } from '@/types';
import { useGetEmployeesQuery } from '@/store/api/endpoints/employeeEndpoints';

const EmployeeListPage = () => {
  // const [isOpen, setOpen] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<number>(1);

  const navigate = useNavigate();

  const { data: employees } = useGetEmployeesQuery('Employees');

  console.log({ currPage, employees });

  const handleView = (id: string) => {
    console.log(id);
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

        {/* <Button variant="add" onClick={() => setOpen(true)}>
          Add New Employee
        </Button> */}

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
                        onClick: () => handleView(employee.employeeId),
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

      {/* {isOpen && (
        <Modal title="Add New Employee" isOpen={isOpen} onClose={setOpen}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quos rerum veniam
            at reprehenderit accusamus! Velit sint beatae mollitia inventore deserunt cum voluptatum
            rerum numquam. Dolore distinctio sunt quaerat saepe eveniet quod, tenetur pariatur
            voluptate corrupti consequuntur iure animi non fuga consectetur perferendis ut
            voluptates temporibus similique eius nemo ipsam? Perferendis sint fugiat accusantium
            modi debitis quae consectetur esse repudiandae. Voluptas harum necessitatibus natus aut,
            cum recusandae nobis optio quam esse quas impedit dolorem deserunt fugit voluptatem
            dolores totam voluptate ratione error dolore provident veritatis eius animi eos
            similique. Nam dicta minus quaerat pariatur est dignissimos numquam molestias cumque
            explicabo minima id alias sunt blanditiis fugit libero aperiam, magni dolorum fuga
            sapiente facilis veniam reprehenderit aliquam ipsum. Reiciendis eveniet numquam ab vero
            a aliquam delectus natus non veniam blanditiis laboriosam omnis at ex quia tempore
            distinctio, sint similique quod voluptatibus rem doloribus officiis cumque neque!
            Aliquid doloribus natus qui debitis animi quaerat iste! Vitae ducimus alias impedit cum
            tempore. Et tempore tempora rem dicta rerum, sapiente ut autem consequuntur itaque enim
            odit iusto! Labore officia at unde. Itaque voluptatum fuga impedit vitae porro at
            perferendis. Iure ipsa tempore quod est totam deserunt architecto vero, quam ex
            molestiae. A asperiores, est earum beatae molestiae voluptatem accusantium.
            Voluptatibus, ad autem. Cupiditate, dolores. Eum velit sint, dignissimos laudantium
            nihil quos sapiente, obcaecati recusandae molestias dicta adipisci ipsam voluptate
            ducimus cum magni aspernatur impedit, accusamus voluptates reprehenderit atque beatae
            alias numquam. Pariatur perferendis omnis qui autem unde cum culpa dignissimos
            distinctio itaque aperiam? Eum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus libero officiis
            accusantium qui laborum quaerat iste dolor incidunt saepe id? Expedita maiores
            temporibus facere ipsum quidem tenetur veritatis, voluptatum, molestias iusto nihil odit
            harum dolor enim facilis minima quasi. Maxime explicabo consectetur unde molestiae
            corrupti quae quia hic excepturi cum accusantium ullam consequatur voluptatibus
            reiciendis accusamus, error illum corporis voluptate. Officia ullam dicta provident
            atque quas, praesentium ab maxime amet optio harum consequatur quae debitis error dolore
            adipisci, neque quasi perspiciatis accusantium dignissimos beatae, suscipit cum! Rem
            labore error ad sequi eius non provident tempore ullam numquam asperiores voluptatibus
            eveniet enim molestias id, dolor porro placeat eligendi sapiente architecto cum nam.
            Eligendi, non repellendus consectetur corporis amet suscipit, deleniti assumenda itaque
            ipsa adipisci quod modi provident fugit soluta placeat temporibus. Impedit qui nihil
            explicabo vitae quae commodi assumenda temporibus itaque distinctio, praesentium aliquid
            inventore aperiam tempora corporis corrupti sit quaerat placeat. Suscipit soluta
            perferendis cumque sapiente quae asperiores quas, nesciunt voluptatibus at debitis,
            minus, harum minima nostrum laudantium! Voluptatem possimus ducimus dicta deleniti
            aperiam aliquid aut, reiciendis ipsam recusandae id cum praesentium veniam veritatis
            officia reprehenderit molestiae quasi! Natus minus laudantium, fugit fuga deserunt quo
            velit delectus tempore quaerat architecto, doloribus error cupiditate odio corporis
            voluptate est! Doloremque facilis aspernatur laboriosam libero quia? Odit vel quam
            aliquam nisi blanditiis, ut tempore mollitia dolor. Officia cum labore id qui similique
            voluptatem molestiae alias quibusdam architecto? Hic ipsum, facilis deleniti nisi
            aliquid blanditiis ea ratione nam tempora magnam officiis repellat atque. Delectus.
          </p>
        </Modal>
      )} */}
    </PageSection>
  );
};

export default EmployeeListPage;
