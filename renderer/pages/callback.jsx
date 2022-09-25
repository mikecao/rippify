import Link from 'next/link';
import { REDIRECT_URI } from '../lib/constants';

export default function Callback({ res }) {
  global?.localStorage?.setItem('ACCESS_TOKEN', res.access_token);

  return (
    <>
      <p>
        <code>ok: {JSON.stringify(res)}</code>
      </p>
      <Link href="/">Home</Link>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { code } = query;

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization:
        'Basic ' +
        new Buffer(process.env.clientId + ':' + process.env.clientSecret).toString('base64'),
    },
    body: encodeURI(`code=${code}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`),
  }).then(res => res.json());

  return { props: { res } };
}
