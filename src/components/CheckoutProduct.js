import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  category,
  image,
  isPrimeItem,
  rating,
}) => {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      isPrimeItem,
      rating,
    };
    dispatch(addToBasket(product));

    console.log("Multiplied number of item in basket:", product);
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
    console.log("Removed item from basket:", { id });
  };

  return (
    <div className="grid grid-cols-5">
      {/* image */}
      <Image
        src={image}
        alt="cart_item"
        height={200}
        width={200}
        objectFit="contain"
      />

      {/* item details */}
      <div className="col-span-3 mx-5 ">
        <p>{title}</p>

        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className=" text-xs my-2 line-clamp-3 ">{description}</p>

        <Currency className="mb-5" quantity={price} currency="INR" />

        {isPrimeItem && (
          <div className="flex items-center space-x-2 mb-2">
            <Image
              loading="lazy"
              width={60}
              height={30}
              src="/prime_logo.png"
              alt="Prime_Logo"
            />
            <p className="text-xs text-gray-300">Free Next-Day Delivery</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className=" flex flex-col space-y-2 my-auto justify-self-end ">
        <button onClick={addItemToBasket} className="button">
          Add again To Basket
        </button>
        <button onClick={removeItemFromBasket} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
