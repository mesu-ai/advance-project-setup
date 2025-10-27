/* eslint-disable react-refresh/only-export-components */
import {
  data,
  redirect,
  useActionData,
  useNavigation,
  useSearchParams,
  type ActionFunctionArgs,
} from 'react-router';
import { commitSession, getSession } from '../../sessions.server';
import type { FormEvent } from 'react';

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('user')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/');
  }

  return data(
    { error: session.get('error') },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}

export async function action({
  request,
}: ActionFunctionArgs): Promise<Response | { error: string }> {
  if (request.method !== 'POST') {
    return { error: 'Method not allowed' };
  }

  try {
    const formData = await request.formData();
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();
    const callbackUrl = formData.get('callbackUrl')?.toString() ?? '/';

    // ✅ Validate inputs
    if (!username || !password) {
      return { error: 'Username and password are required' };
    }

    // ✅ Fake authentication (replace with real API call)
    if (username !== 'admin' || password !== '1234') {
      return { error: 'Invalid username or password' };
    }

    console.log('✅ Login successful for user:', username);

    // Create session with user data
    const session = await getSession(request.headers.get('Cookie'));
    console.log({ session });

    session.set('user', {
      id: 1,
      name: username,
      role: 'admin',
      token: {
        access: 'xlxlxls',
        refresh: 'lsdldkkd',
      },
      permissions: ['products.read', 'products.create'],
    });

    // Store user in sessionStorage for client-side context (optional)
    // This helps AuthContext work faster on first load

    console.log('🔐 Redirecting to:', callbackUrl);

    // Redirect back to callback URL
    return redirect(callbackUrl, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    return { error: 'An error occurred during login' };
  }
}

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const callbackUrl = decodeURIComponent(searchParams.get('callbackUrl') ?? '/');
  const actionData = useActionData() as { error?: string };
  const navigation = useNavigation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('handle submit button');

    const res = await fetch('http://192.168.30.22:56771/api/Auth/AdminLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'operation@saralifestyle.com',
        password: '5wrd!#24zta@Ra8',
      }),
      credentials: 'include',
    });

    console.log({ res });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8 text-black">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>

        {actionData?.error && (
          <p className="text-sm text-red-500 text-center mb-4">{actionData.error}</p>
        )}

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
              disabled={navigation.state === 'submitting'}
              className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 disabled:opacity-50"
            >
              {navigation.state === 'submitting' ? 'Signing in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
