import LogoutButton from '@/components/molecules/LogoutButton';
import { useAuth } from '@/hooks/useAuth';
import { checkPageAction } from '@/utils/permission';
import { useLocation } from 'react-router';

const HomePage = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  console.log({ user });

  const handleView = () => {
    console.log('click view button');
  };

  const handleDelete = () => {
    console.log('click delete button');
  };

  console.log('action permission-view:', checkPageAction(pathname, 'view'));
  console.log('action permission:-edit: ', checkPageAction(pathname, 'delete'));

  return (
    <div>
      <p>Home Page {user?.name}</p>
      <LogoutButton />
      <div className="mt-4 flex flex-col gap-2">
        {checkPageAction(pathname, 'view') && (
          <button onClick={handleView} type="button" className="bg-yellow-600 cursor-pointer">
            view
          </button>
        )}

        {checkPageAction(pathname, 'delete') && (
          <button
            onClick={handleDelete}
            type="button"
            // disabled={!checkPageAction(pathname, 'delete')}
            className="bg-sky-600 cursor-pointer"
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
