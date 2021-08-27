import { buffer } from "micro";
import * as admin from "firebase-admin";

// connection to firebase
const serviceAccount = require("../../../permissions.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app(); //Check if the app is already configured

// Establish connect to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log("Fulfulling orders.....");

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Success: Order ${session.id} added to DB`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req); //generate certificate
    const payload = requestBuffer.toString();
    const signature = req.headers["stripe-signature"];

    let event;

    //   Verifying POST event came from stripe?
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log("Webhook error message:", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    // checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // fulfulling order: store in db
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) =>
          res
            .status(400)
            .send(`Webhook error fulfilling orders: ${err.message}`)
        );
    }
  }
};

// configuriing endpoint
export const config = {
  api: {
    bodyParser: false, //dont want parsed object as we getting stream
    externalResolver: true, //req not handled by us
  },
};
