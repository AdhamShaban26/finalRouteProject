import axios from "axios";
import { createContext, useState } from "react";
import PropTypes from "prop-types"; // for prop types validation

// Create context
// eslint-disable-next-line react-refresh/only-export-components
export const CartContextProvider = createContext();

export default function CartContext({ children }) {
  const [numOfCart, setNumOfCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsCart, setProductCart] = useState(null);
  const [cartId, setCardId] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token } }
      );
    
      getCart();
      return response?.data;
    } catch (error) {
      console.error(error);
      return error?.response;
    }
  };

  function getCart() {
    setIsLoading(true);

    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token },
      })
      .then((res) => {
       
        setCardId(res.data.cartId);
        setNumOfCart(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);
        setProductCart(res.data.data.products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }
  async function updateCartQuantity(id, count) {
    setIsLoading(true);
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers: { token } }
      )
      .then((res) => {
      
        setNumOfCart(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);
        setProductCart(res.data.data.products);
        setIsLoading(false);
        return true;
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return false;
      });
  }

  function deleteItem(id) {
    setIsLoading(true);
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token },
      })
      .then((res) => {
    
        setNumOfCart(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);
        setProductCart(res.data.data.products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }
  function deleteCart() {
    setIsLoading(true);

    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
      })
      .then(() => {
        getCart();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <CartContextProvider.Provider
      value={{
        addToCart,
        getCart,
        numOfCart,
        totalPrice,
        productsCart,
        updateCartQuantity,
        deleteItem,
        deleteCart,
        cartId,
        loading,
      }}
    >
      {children}
    </CartContextProvider.Provider>
  );
}

// Prop validation for children prop
CartContext.propTypes = {
  children: PropTypes.node.isRequired,
};
