import ArrowIcon from '@/assets/svg/ArrowIcon';
import SearchIcon from '@/assets/svg/SearchIcon';
import Image from '@/components/atoms/Image';
import Status from '@/components/atoms/Status';
import avatar from '@/assets/images/avatar1.png';
import Pagination from '@/components/molecules/Pagination';
import { useState } from 'react';
import DataTable from '@/components/organisms/DataTable';

const RolePage = () => {
  const [currPage, setCurrPage] = useState<number>(1);

  console.log({ currPage });

  return (
    <div>
      <h2 className="font-bold text-lg text-neutral-300">Employee Permission List</h2>
      <div className="bg-surface mt-3 rounded-xl border border-border-default">
        <div className="flex justify-between px-5 py-4">
          <form
            action=""
            className="w-full flex justify-between border text-neutral-300 border-neutral-300 dark:border-black-300 dark:bg-black-500 focus-within:border-primary-500 rounded-lg py-2 px-3 text-sm max-w-[350px]"
          >
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Here"
              className="outline-none placeholder:text-neutral-300 w-full"
            />
            <SearchIcon className="w-5 h-5" />
          </form>

          <button
            type="button"
            className="font-semibold px-5 py-2 rounded-lg bg-primary-500 text-white"
          >
            Add New Employee
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <DataTable header={['SL No', 'Name', 'Email', 'Role', 'Status', 'Action']}>
            <tr>
              <td className="px-5 py-3">01</td>
              <td className="px-5 py-3">
                <div className="flex gap-2 items-center">
                  <Image src={avatar} width={28} height={28} alt="default-avater" />
                  <p>Md Abdullah Al Momin</p>
                </div>
              </td>
              <td className="px-5 py-3">momin@hotmail.com</td>
              <td className="px-5 py-3">Tester</td>
              <td className="px-5 py-3">
                <Status status="inactive" />
              </td>
              <td className="px-5 py-3">
                <div className="group relative w-fit">
                  <button
                    type="button"
                    className="rounded-lg border border-secondary-500 ps-2.5 pe-1.5 py-0.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                  >
                    Actions{' '}
                    <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                  </button>

                  <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col items-start gap-2 text-neutral-300">
                    <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                      View
                    </button>
                    <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                      Edit
                    </button>
                    <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-3">01</td>
              <td className="px-5 py-3">
                <div className="flex gap-2 items-center">
                  <Image src={avatar} width={28} height={28} alt="default-avater" />
                  <p>Md Abdullah Al Momin</p>
                </div>
              </td>
              <td className="px-5 py-3">momin@hotmail.com</td>
              <td className="px-5 py-3">Tester</td>
              <td className="px-5 py-3">
                <Status status="inactive" />
              </td>
              <td className="px-5 py-3">
                <div className="group relative w-fit">
                  <button
                    type="button"
                    className="rounded-lg border border-secondary-500 ps-2.5 pe-1.5 py-0.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                  >
                    Actions{' '}
                    <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                  </button>

                  <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col items-start gap-2 text-neutral-300">
                    <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                      View
                    </button>
                    <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                      Edit
                    </button>
                    <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-3">01</td>
              <td className="px-5 py-3">
                <div className="flex gap-2 items-center">
                  <Image src={avatar} width={28} height={28} alt="default-avater" />
                  <p>Md Abdullah Al Momin</p>
                </div>
              </td>
              <td className="px-5 py-3">momin@hotmail.com</td>
              <td className="px-5 py-3">Tester</td>
              <td className="px-5 py-3">
                <Status status="inactive" />
              </td>
              <td className="px-5 py-3">
                <div className="group relative w-fit">
                  <button
                    type="button"
                    className="rounded-lg border border-secondary-500 ps-2.5 pe-1.5 py-0.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                  >
                    Actions{' '}
                    <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                  </button>

                  <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col items-start gap-2 text-neutral-300">
                    <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                      View
                    </button>
                    <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                      Edit
                    </button>
                    <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-3">01</td>
              <td className="px-5 py-3">
                <div className="flex gap-2 items-center">
                  <Image src={avatar} width={28} height={28} alt="default-avater" />
                  <p>Md Abdullah Al Momin</p>
                </div>
              </td>
              <td className="px-5 py-3">momin@hotmail.com</td>
              <td className="px-5 py-3">Tester</td>
              <td className="px-5 py-3">
                <Status status="inactive" />
              </td>
              <td className="px-5 py-3">
                <div className="group relative w-fit">
                  <button
                    type="button"
                    className="rounded-lg border border-secondary-500 ps-2.5 pe-1.5 py-0.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                  >
                    Actions{' '}
                    <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                  </button>

                  <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col items-start gap-2 text-neutral-300">
                    <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                      View
                    </button>
                    <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                      Edit
                    </button>
                    <button className="px-3 hover:text-primary-500 cursor-pointer" type="button">
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </DataTable>
          <div className="text-center py-5">
            <Pagination totalPage={12} currentPage={5} setCurrentPage={setCurrPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePage;
