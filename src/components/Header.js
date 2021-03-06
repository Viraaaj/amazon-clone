import Image from "next/image";
import {
  SearchIcon,
  ShoppingCartIcon,
  MenuAlt2Icon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { selectItems } from "./../slices/basketSlice";

const Header = () => {
  // using session after wrapping authprovider so that we can get user's email etc
  const [session] = useSession();

  // session.user.

  const router = useRouter();

  //redux
  const items = useSelector(selectItems);

  return (
    <header>
      {/* main navbar */}
      <div className="flex items-center bg-amazon_black p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 ">
          <Image
            src="https://links.papareact.com/f90"
            alt="amazon_logo"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
            loading="lazy"
            onClick={() => router.push("/")}
          />
        </div>

        {/* searchbar */}
        <div className=" hidden sm:flex bg-yellow-400 hover:bg-yellow-500 cursor-pointer items-center h-10 rounded-md flex-grow">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md outline-none px-4 text-black"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* options */}
        <div className="text-white flex items-center mx-6 space-x-6 text-xs whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className=" link ">
            <p>{session ? `Hello, ${session.user.name}` : `Sign In`}</p>
            <p className="font-extrabold md:text-sm ">
              {session ? `Sign Out` : `Accounts & Lists`}
            </p>
          </div>

          <div onClick={() => router.push("/orders")} className=" link ">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm ">& Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="relative flex items-center link"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="font-extrabold md:text-sm hidden md:inline mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* category navbar */}
      <div className="flex items-center bg-amazon_black-light text-white text-sm p-2 pl-3 space-x-3 ">
        <p className="link flex items-center">
          <MenuAlt2Icon className="h-6 mr-1" />
          All
        </p>

        <a
          className="link"
          href="http://virajnimbalkar.netlify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Viraj Here
        </a>
        <p className="link">Electronics</p>
        <p className="link link hidden lg:inline-flex">Mobiles</p>
        <p className="link hidden lg:inline-flex">Computers</p>
        <p className="link hidden lg:inline-flex">Gift Ideas</p>
        <p className="link hidden lg:inline-flex">Sports, Fitness & Outdoors</p>
        <p className="link hidden lg:inline-flex">AmazonBasics</p>
        <p className="link hidden lg:inline-flex">Home Improvement</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
