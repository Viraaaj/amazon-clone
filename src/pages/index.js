import Head from "next/head";
import Header from "./../components/Header";
import Banner from "./../components/Banner";
import ProductFeed from "./../components/ProductFeed";
import Footer from "./../components/Footer";

export default function Home({ products }) {
  return (
    <div className="bg-amazon_black-dark">
      <Head>
        <title>Amazon Clone</title>
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
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products: products,
    },
  };
}
