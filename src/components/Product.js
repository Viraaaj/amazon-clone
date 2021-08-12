import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
// import PrimeLogo from "../assets/prime_logo.png";

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({ id, title, price, description, category, image }) => {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [isPrimeItem] = useState(Math.random() < 0.5);

  return (
    <div className="text-white relative flex flex-col bg-amazon_black-light m-5 z-30 p-10 rounded-sm ">
      <p className="absolute top-2 right-2 text-xs italic text-gray-200">
        {category}
      </p>

      <Image
        src={image}
        height={200}
        width={200}
        objectFit="contain"
        alt="Product_Image"
      />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className=" text-xs my-2 line-clamp-2 ">{description}</p>

      <div>
        <Currency className="mb-5" quantity={price} currency="INR" />
      </div>

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

      <button className=" mt-auto button ">Add to Cart</button>
    </div>
  );
};

export default Product;
