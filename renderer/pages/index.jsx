import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Spotify from 'spotify-web-api-js';

const spotify = new Spotify();

function Index() {
  const [state, setState] = useState();

  function getAlbums() {
    spotify.setAccessToken(localStorage.getItem('ACCESS_TOKEN'));
    spotify.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
      function (data) {
        console.log('Artist albums', data);
        setState(data);
      },
      function (err) {
        console.error(err);
      },
    );
  }

  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      getAlbums();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Rippify</title>
      </Head>
      <div>
        <h1>hi</h1>
        <div>client id: {process.env.clientId}</div>
        <div>client secret: {process.env.clientSecret}</div>
        <code>{JSON.stringify(state)}</code>
        <Link href="/login">Login</Link>
      </div>
    </>
  );
}

export default Index;
