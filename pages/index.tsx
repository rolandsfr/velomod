import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Head>
      <title>Velomod</title>
      <meta
        name="description"
        content="Velomod - Inovatīvi velosipēdu aksesuāri"
      />

      {/* TODO: Add favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Home;
