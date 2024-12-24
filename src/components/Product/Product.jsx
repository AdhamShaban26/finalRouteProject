import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContextProvider } from "../../Context/CartContext";
import toast from "react-hot-toast";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { WishListContext } from "../../Context/WishListContext";
import { Helmet } from "react-helmet";

export default function Product() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { addToCart } = useContext(CartContextProvider);
  const [loading, setIsLoading] = useState(false);
  let { addToList, getLoggedUserWish, listDetails, deleteItem } =
    useContext(WishListContext);

  useEffect(() => {
    getLoggedUserWish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addToWishList(productId) {
    setIsLoading(true)
    let response = await addToList(productId);

    if (response) {
      getLoggedUserWish();
      toast.success("Product added successfully to Wish list");
      setIsLoading(false)
    } else {
      toast.error("Error adding product to Wish list");
      setIsLoading(false)
    }
  }

  async function addProductCart(id) {
    setIsLoading(true)
    let response = await addToCart(id);
    console.log(response);
    if (response?.status === "success") {
      toast.success(response?.message);
      setIsLoading(false)
    } else {
      toast.error(response?.data?.message);
      setIsLoading(false)
    }
  }

  function callProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isError, error, isFetching, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: callProduct,
    staleTime: 20000,
    // refetchInterval: 100000,
  });

  const filteredProducts = data?.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }
  if (isError) {
    return console.log(error);
    
  }

  return loading ?(<LoadingScreen/>): (
    <>
    <Helmet><title>Product</title></Helmet>
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 cursor-pointer mb-7 px-4 lg:px-0">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="text-start shadow-lg p-3 relative group overflow-hidden"
          >
            <Link
              to={`../ProductDetails/${product.id}/${product.category.name}`}
            >
              <img src={product.imageCover} alt={product.title}></img>
              <h3 className="text-[#6cce6c]">{product.category.name}</h3>
              <h2>{product.title.split(" ", 2).join(" ")}</h2>

              <span className="flex justify-end"></span>

              <div className="flex justify-between items-center gap-3">
                {product.priceAfterDiscount ? (
                  <div className="text-xs">
                    <span className="line-through text-red-600">
                      {product.price} EGP
                    </span>
                    <span> {product.priceAfterDiscount} EGP</span>
                  </div>
                ) : (
                  <span>{product.price} EGP</span>
                )}

                <span>
                  <i className="fa-solid fa-star text-yellow-300"></i>
                  {product.ratingsAverage}
                </span>
              </div>

              {product.priceAfterDiscount ? (
                <span className="rounded-b-md bg-red-500 text-white p-1 absolute top-0 end-0">
                  Sale
                </span>
              ) : null}
            </Link>
            <div className="flex gap-1">
              <button
                onClick={() => addProductCart(product.id)}
                className="hover:bg-[#088A08] focus:ring-[#6cce6c] group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap w-full px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 translate-y-full bg-[#0AAD0A] rounded-lg opacity-0 cursor-pointer"
              >
                Add to Cart
              </button>

              <button
                onClick={() =>
                  listDetails?.find((x) => x?.id === product.id)
                    ? deleteItem(product.id)
                    : addToWishList(product.id)
                }
              >
                <i
                  className={`fa-solid fa-heart text-xl ${
                    listDetails?.find((x) => x?.id === product.id)
                      ? "text-red-600"
                      : ""
                  }`}
                ></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
