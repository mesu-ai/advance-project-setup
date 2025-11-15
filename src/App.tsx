import { RouterProvider } from 'react-router';
import './index.css';
import { router } from './routes/router.config';
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
