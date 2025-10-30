import { RouterProvider } from 'react-router';
import './index.css';
import { router } from './routes';
import AuthProvider from './providers/AuthProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <div>
      <ReduxProvider store={store}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ReduxProvider>
    </div>
  );
}

export default App;
