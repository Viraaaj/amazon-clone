import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const AddToastNotification = () => {
  return <div className="text-white">Item added to the basket!</div>;
};

const RemoveToastNotification = () => {
  return <div className="text-white">Item removed to the basket!</div>;
};

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //actions
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]; //product is passed here as a payload ... product.js

      toast.dark(<AddToastNotification />, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    },

    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      let updatedBasket = [...state.items];

      if (index >= 0) {
        //Item exists
        updatedBasket.splice(index, 1); //dont use filter as it will remove all items with same id
      } else {
        //items does not exist
        console.warn(
          `Can't remove product id: ${action.payload.id} as it is not in the basket`
        );
      }

      state.items = updatedBasket;

      toast.dark(<RemoveToastNotification />, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
