import { useNavigate, useSearchParams } from 'react-router';
import type { LoginResponseT } from '@/types';
import { useAppDispatch } from '@/hooks/useAuth';
import { useLoginMutation } from '@/store/api/endpoints/authEndpoints';
import { loginSucceeded } from '@/store/slices/auth/authSlice';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from '@/components/atoms/Image';
import loginCover from '@/assets/images/login-cover.png';
import ArrowLongIcon from '@/assets/svg/ArrowLongIcon';
import MailIcon from '@/assets/svg/MailIcon';
import ShowIcon from '@/assets/svg/ShowIcon';
import HideIcon from '@/assets/svg/HideIcon';
import { useState } from 'react';
import { useApiError } from '@/hooks/useApiError';

const loginSchema = z.object({
  username: z.string().min(1, 'Username can not empty'),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(50, 'Password too long'),
});

type LoginFormDataT = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [show, setShow] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const callbackUrl = decodeURIComponent(searchParams.get('callbackUrl') ?? '/');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();
  const { handleApiError } = useApiError();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormDataT>({ resolver: zodResolver(loginSchema) });

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   const username = String(data.get('username') ?? '').trim();
  //   const password = String(data.get('password') ?? '').trim();

  //   // http://192.168.30.22:56771/api/Auth/AdminLogin

  //   if (!username || !password) return;

  //   try {
  //     // const res = await fetch('http://localhost:4000/api/v1/auth/login', {
  //     //   method: 'POST',
  //     //   headers: {
  //     //     'Content-Type': 'application/json',
  //     //   },
  //     //   body: JSON.stringify({
  //     //     // email: 'operation@saralifestyle.com',
  //     //     // password: '5wrd!#24zta@Ra8',
  //     //     username: 'admin',
  //     //     password: '1234',
  //     //   }),
  //     //   credentials: 'include',
  //     // });

  //     const res: LoginResponseT = await login({ username, password }).unwrap();
  //     console.log(res);

  //     if (res.success) {
  //       const { userInfo, accessToken } = res.data;
  //       localStorage.setItem('user', JSON.stringify(userInfo));
  //       dispatch(loginSucceeded({ user: userInfo, accessToken }));
  //       navigate(callbackUrl);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSubmit = async (data: LoginFormDataT) => {
    // console.log(data);

    try {
      const res: LoginResponseT = await login(data).unwrap();
      console.log(res);

      if (res.success) {
        const { userInfo, accessToken } = res.data;
        localStorage.setItem('user', JSON.stringify(userInfo));
        dispatch(loginSucceeded({ user: userInfo, accessToken }));
        navigate(callbackUrl);
      }
    } catch (error) {
      // console.log({ error });
      handleApiError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-[1100px] grid grid-cols-2 w-full bg-surface rounded-xl shadow-custom-1 overflow-clip">
        <div className="w-full max-w-[400px] mx-auto py-[100px]">
          <h1 className="text-[26px] font-bold text-center mb-10">Admin Login</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />

            <div className="space-y-5">
              <div>
                <label className="block">Username</label>
                <div className="input-class flex justify-between">
                  <input
                    type="text"
                    placeholder="Enter Your Username"
                    autoComplete="username"
                    {...register('username')}
                    className="outline-none w-full"
                  />
                  <MailIcon className="w-5 h-5" />
                </div>

                <p className="input-error">{errors.username?.message}</p>
              </div>

              <div>
                <label className="block">Password</label>
                <div className="input-class flex justify-between">
                  <input
                    type={show ? 'text' : 'password'}
                    placeholder="Enter Your Pasword"
                    autoComplete="current-password"
                    {...register('password')}
                    className="outline-none w-full"
                  />
                  <button
                    type="button"
                    aria-label="password show button"
                    className="cursor-pointer"
                    onClick={() => setShow((prev) => !prev)}
                  >
                    {show ? <HideIcon className="w-5 h-5" /> : <ShowIcon className="w-5 h-5" />}
                  </button>
                </div>

                <p className="input-error">{errors.password?.message}</p>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex justify-center items-center gap-2 mt-10 cursor-pointer w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Signing in...' : 'Login'} <ArrowLongIcon />
            </button>
          </form>
        </div>
        <div className="bg-primary-50 flex justify-center items-center w-full">
          <Image src={loginCover} alt="Login illustration" width={350} height={378} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
