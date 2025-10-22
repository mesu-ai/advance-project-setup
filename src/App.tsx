//scr/App.tsx:

import { RouterProvider } from 'react-router';
import './index.css';
import { router } from './routes';
import AuthProvider from './providers/AuthProvider';

function App() {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
