import Head from 'next/head';
import Header from '../components/header';
import dynamic from 'next/dynamic';

const Desktop = dynamic(import('../components/desktop'), { ssr: false });

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Nevy Angelova portfolio</title>
        <link rel="icon" href="/nevy.ico" />
      </Head>
      <Header/>
      <Desktop/>
    </div>
  );
}
