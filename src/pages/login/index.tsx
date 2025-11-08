import { useNavigate, useSearchParams } from 'react-router';
import type { LoginResponseT } from '@/types';
import { useAppDispatch } from '@/hooks/useAuth';
import { useLoginMutation } from '@/store/api/endpoints/authEndpoints';
import { loginSucceeded } from '@/store/slices/auth/authSlice';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const callbackUrl = decodeURIComponent(searchParams.get('callbackUrl') ?? '/');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = String(data.get('username') ?? '').trim();
    const password = String(data.get('password') ?? '').trim();

    // http://192.168.30.22:56771/api/Auth/AdminLogin

    if (!username || !password) return;

    try {
      // const res = await fetch('http://localhost:4000/api/v1/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     // email: 'operation@saralifestyle.com',
      //     // password: '5wrd!#24zta@Ra8',
      //     username: 'admin',
      //     password: '1234',
      //   }),
      //   credentials: 'include',
      // });

      const res: LoginResponseT = await login({ username, password }).unwrap();
      console.log(res);

      if (res.success) {
        const { userInfo, accessToken } = res.data;
        localStorage.setItem('user', JSON.stringify(userInfo));
        dispatch(loginSucceeded({ user: userInfo, accessToken }));
        navigate(callbackUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8 text-black">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>

        {/* {actionData?.error && (
          <p className="text-sm text-red-500 text-center mb-4">{actionData.error}</p>
        )} */}

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="callbackUrl" value={callbackUrl} />

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Username</label>
              <input
                name="username"
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <button
              type="submit"
              // disabled={navigation.state === 'submitting'}
              className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 disabled:opacity-50"
            >
              Login
              {/* {navigation.state === 'submitting' ? 'Signing in...' : 'Login'} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
