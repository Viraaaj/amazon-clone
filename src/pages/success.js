import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";
import Header from "./../components/Header";

const Success = () => {
  const router = useRouter();

  return (
    <div className="bg-amazon_black-dark h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto mt-10">
        <div className="flex flex-col p-10 bg-amazon_black-light">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl text-white ">
              Thank you, your order has been confirmed!
            </h1>
          </div>

          <p className="text-white">
            Thank you for shopping with us. If you would like to check the
            status of your order(s) please press the link below
          </p>

          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default Success;
