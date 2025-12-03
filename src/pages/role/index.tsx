import ArrowIcon from '@/assets/svg/ArrowIcon';
import SearchIcon from '@/assets/svg/SearchIcon';
import Image from '@/components/atoms/Image';
import Status from '@/components/atoms/Status';
import avatar from '@/assets/images/avatar.png';

const RolePage = () => {
  return (
    <div>
      <h2 className="font-bold text-lg text-neutral-300">Employee Permission List</h2>
      <div className="bg-surface mt-3">
        <div className="flex justify-between px-5 py-4">
          <form
            action=""
            className="w-full flex justify-between border text-neutral-300 border-neutral-300 focus-within:border-primary-500 rounded-lg py-2.5 px-3 text-sm max-w-[350px]"
          >
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Here"
              className="outline-none placeholder:text-neutral-300"
            />
            <SearchIcon className="w-5 h-5" />
          </form>

          <button
            type="button"
            className="font-semibold px-8 py-2.5 rounded-lg bg-primary-500 text-white"
          >
            Add New Employee
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table
            id="employee-permission-table"
            className="md:w-full table-auto border-collapse border border-white-700 text-sm"
          >
            <thead className="bg-white-700 whitespace-nowrap">
              <tr>
                <th className="text-start px-5 py-3">SL No</th>
                <th className="text-start px-5 py-3">Name</th>
                <th className="text-start px-5 py-3">Email</th>
                <th className="text-start px-5 py-3">Role</th>
                <th className="text-start px-5 py-3">Status</th>
                <th className="text-start px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white-700">
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
                  <Status status="active" />
                </td>
                <td className="px-5 py-3">
                  <div className="group relative w-fit">
                    <button
                      type="button"
                      className=" rounded-lg border border-secondary-500 px-2.5 py-1.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                    >
                      Actions{' '}
                      <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                    </button>

                    <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col gap-2 text-neutral-300">
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
                  <Status status="active" />
                </td>
                <td className="px-5 py-3">
                  <div className="group relative w-fit">
                    <button
                      type="button"
                      className=" rounded-lg border border-secondary-500 px-2.5 py-1.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                    >
                      Actions{' '}
                      <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                    </button>

                    <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col gap-2 text-neutral-300">
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
                  <Status status="active" />
                </td>
                <td className="px-5 py-3">
                  <div className="group relative w-fit">
                    <button
                      type="button"
                      className=" rounded-lg border border-secondary-500 px-2.5 py-1.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                    >
                      Actions{' '}
                      <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                    </button>

                    <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col gap-2 text-neutral-300">
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
                      className=" rounded-lg border border-secondary-500 px-2.5 py-1.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                    >
                      Actions{' '}
                      <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                    </button>

                    <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col gap-2 text-neutral-300">
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
                  <Status status="active" />
                </td>
                <td className="px-5 py-3">
                  <div className="group relative w-fit">
                    <button
                      type="button"
                      className=" rounded-lg border border-secondary-500 px-2.5 py-1.5 flex gap-0.5 text-secondary-500 bg-secondary-50"
                    >
                      Actions{' '}
                      <ArrowIcon className="w-5 h-5 rotate-180 group-focus-within:rotate-0 transition-transform" />
                    </button>

                    <div className="z-10 text-sm font-medium bg-white top-full mt-2 hidden group-focus-within:flex absolute p-3 rounded-lg shadow-custom-2 flex-col gap-2 text-neutral-300">
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
            </tbody>
          </table>
          <div className="h-[72px] text-center">pagination here</div>
        </div>
      </div>
    </div>
  );
};

export default RolePage;
