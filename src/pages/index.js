import Head from "next/head";
import Header from "./../components/Header";
import Banner from "./../components/Banner";
import ProductFeed from "./../components/ProductFeed";
import Footer from "./../components/Footer";
import { getSession } from "next-auth/client";
import productsData from "../../products.json";

export default function Home({ products }) {
  return (
    <div className="bg-amazon_black-dark">
      <Head>
        <title>Amazon Clone</title>

        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      {/* Header */}
      <Header />

      <main className="max-w-screen-2xl mx-auto ">
        {/* Banner */}
        <Banner />

        {/* Product */}
        <ProductFeed products={products} />
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // const products = await fetch("https://fakestoreapi.com/products").then(
  //   (res) => res.json()
  // );

  const products = await productsData;

  return {
    props: {
      products: products,
      session,
    },
  };
}
