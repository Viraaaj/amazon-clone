import Head from "next/head";
import Header from "./../components/Header";
import Banner from "./../components/Banner";

export default function Home() {
  return (
    <div className="bg-black">
      <Head>
        <title>Amazon Clone</title>
      </Head>

      {/* Header */}
      <Header />

      <main className="max-w-screen-2xl mx-auto ">
        {/* Banner */}
        <Banner />

        {/* Product */}
      </main>
    </div>
  );
}
