import moment from "moment";
import { getSession, useSession } from "next-auth/client";
import db from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";

const Orders = ({ orders }) => {
  const [session] = useSession();

  console.log("Your orders are:", orders);

  return (
    <div className="bg-amazon_black-dark h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto p-10 text-white ">
        <h1 className="text-3xl  border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {session ? (
          <h2>
            {" "}
            {orders.length > 1
              ? `${orders.length} orders`
              : `${orders.length} order`}{" "}
          </h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4 ">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  //get stripe info
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // get user's logged in creds
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  //   orders in firebase
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  //orders in stripe
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      //unix is number that we can convert back to the date.. coz we cant directly access timestamp from firebase (format changes)
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
