import { useRouter } from 'next/router';
import { SCOPE, REDIRECT_URI } from '../lib/constants';

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    await router.push(
      'https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
          response_type: 'code',
          client_id: process.env.clientId,
          scope: SCOPE,
          redirect_uri: REDIRECT_URI,
        }).toString(),
    );
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
