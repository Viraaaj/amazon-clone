// /checkout
import Header from "./../components/Header";
import Image from "next/image";
import { selectItems, selectTotal } from "./../slices/basketSlice";
import { useSelector } from "react-redux";
import CheckoutProduct from "./../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key.toString()); //Need to use public key so that we can get access to stripe account

const Checkout = () => {
  const items = useSelector(selectItems);

  const [session] = useSession(); //Always remember fo wrap session inside rectangle brackets

  const total = useSelector(selectTotal);

  const handleCheckoutSession = async () => {
    const stripe = await stripePromise;

    // calling backend to create checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    //redirecting user to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-amazon_black-dark text-white min-h-screen ">
      <Header />

      <main className=" lg:flex max-w-screen-2xl mx-auto ">
        {/* Products */}
        <div className="flex-grow m-5 shadow-lg">
          <Image
            src="/checkout_page_banner.png"
            width={1020}
            height={250}
            objectFit="contain"
            alt="checkout_page_banner"
          />

          <div className="flex flex-col p-5 space-y-10 bg-amazon_black-light mt-2">
            <h1 className="text-3xl border-b pb-4">
              {items.length > 0 ? "Shopping Basket" : "You cart is empty"}
            </h1>

            {items.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                isPrimeItem={item.isPrimeItem}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* checkout */}

        <div className="flex flex-col p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items) :{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="INR" />
                </span>
              </h2>

              <button
                onClick={handleCheckoutSession}
                role="link" //imp for stripe
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  `from-gray-800 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed`
                }`}
              >
                {session ? "Proceed to checkout" : "Sign In to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
