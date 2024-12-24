import axios from "axios";

import { createContext, useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export let WishListContext = createContext(0);

// eslint-disable-next-line react/prop-types
export default function WishListContextProvider({ children }) {
  const token = localStorage.getItem("token");
  const [loading, setIsLoading] = useState(false);
  const [getLoading, setIsGetLoading] = useState(false);
  const [listDetails, setListDetails] = useState(null);
  const [numOfCart, setNumOfCart] = useState(0);

  function getLoggedUserWish() {
    setIsGetLoading(true);
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: { token },
      })
      .then((res) => {
        setListDetails(res.data.data);
        setNumOfCart(res.data.numOfCartItems);
        setIsGetLoading(false);
      })
      .catch((error) => {
        setIsGetLoading(false);

        return error;
      });
  }

  function addToList(productId) {
    setIsLoading(true);
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        {
          headers: { token },
        }
      )
      .then((res) => {
        getLoggedUserWish();
        return res;
      })

      .catch((error) => error);
  }

  function deleteItem(id) {
    setIsLoading(true);
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token },
      })
      .then((res) => {
        getLoggedUserWish();
        toast.success(res.data?.message);

        setIsLoading(false);
      })
      .catch((error) => {
        error;
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <WishListContext.Provider
      value={{
        getLoggedUserWish,
        addToList,
        deleteItem,
        loading,
        listDetails,
        numOfCart,
        getLoading,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
