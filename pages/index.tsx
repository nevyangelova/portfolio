import Head from 'next/head';
import { Button } from '@react95/core';
import { Access229 } from '@react95/icons';
import Header from '../components/header';
import Shortcuts from '../components/shortcuts';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Nevy Angelova&aposs portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <Shortcuts/>
    </div>
  );
}
