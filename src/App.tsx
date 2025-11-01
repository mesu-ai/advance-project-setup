import { RouterProvider } from 'react-router';
import './index.css';
import { router } from './routes';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { useAuthInit } from './hooks/useAuthInit';

function AppContent() {
  // ✅ Just call the hook - no loading screen needed
  // Router will render, middleware will allow user through
  // Token refresh happens in background
  useAuthInit();

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
