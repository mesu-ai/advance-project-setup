// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../store/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useAuth = () => {
  // const ctx = useContext(AuthContext);
  // if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  // return ctx;
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  return { user, isAuthenticated };
};
