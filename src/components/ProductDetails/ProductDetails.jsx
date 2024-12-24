import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContextProvider } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";
// import Slider from "react-slick";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [ProductDetails, setProducts] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useContext(CartContextProvider);
  let { addToList, listDetails, getLoggedUserWish, deleteItem } =
    useContext(WishListContext);
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    getLoggedUserWish();
  }, []);
  function GetSpcificProduct(id) {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProducts(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
    setIsLoading(false);
  }

  function getproducts(category) {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setIsLoading(false);
        let result = res.data.data.filter(
          (product) => product.category.name == category
        );
        setRelatedProducts(result);
      })

      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }
  async function addProductCart(newId) {
    setIsLoading(true);
    let flag = await addToCart(newId);
    if (flag) {
      setIsLoading(false);
      toast.success("Product added successfully to your cart");
    } else {
      setIsLoading(false);
      toast.error("Error adding product to your cart");
    }
  }
  async function addProductToWishList(newId) {
    setIsLoading(true);
    let flag = await addToList(newId);
    setIsLoading(false);
    if (flag) {
      toast.success("Product added successfully to your Wishlist");
    } else {
      setIsLoading(false);
      toast.error("Error adding product to your Wishlist");
    }
  }

  useEffect(() => {
    GetSpcificProduct(id);
    getproducts(category);
  }, [id, category]);
  return loading ? (
    <LoadingScreen />
  ) : (
    <>
    <Helmet><title>Product Details</title></Helmet>
      <div className="grid grid-cols-[1fr_2fr] p-10 items-center gap-3">
        <div className="w-full">
          <img src={ProductDetails.imageCover} alt="" />
        </div>
        <div className="text-start ">
          <h2 className=" text-[#6cce6c] text-  font-bold my-3">
            {ProductDetails.title}
          </h2>

          <p>{ProductDetails.description}</p>

          <div className="text-sm  flex items-center justify-between  ">
            {ProductDetails.priceAfterDiscount ? (
              <div className="flex items-center gap-2">
                {" "}
                <span className="line-through text-red-600">
                  {" "}
                  {ProductDetails.price} EGP{" "}
                </span>
                <span> {ProductDetails.priceAfterDiscount} EGP</span>
              </div>
            ) : (
              <span>{ProductDetails.price} EGP</span>
            )}
            <span>
              <i className="fa-solid fa-star text-yellow-300"></i>
              {ProductDetails.ratingsAverage}
            </span>
          </div>
          <div className="flex justify-between items-center gap-4 pt-5">
            <button
              onClick={() => addProductCart(id)}
              className="hover:bg-[#088A08] focus:ring-[#6cce6c] whitespace-nowrap w-full px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 bg-[#0AAD0A] rounded-lg cursor-pointer"
            >
              Add to Cart
            </button>
         
            <button
              onClick={() =>
                listDetails?.find((x) => x?.id === ProductDetails.id)
                  ? deleteItem(ProductDetails.id)
                  : addProductToWishList(ProductDetails.id)
              }
            >
              <i
                className={`fa-solid fa-heart text-xl ${
                  listDetails?.find((x) => x?.id === ProductDetails.id)
                    ? "text-red-600"
                    : ""
                }`}
              ></i>
            </button>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-6  md:grid-cols-4 sm:grid-cols-2 gap-5 cursor-pointer mt-14 pb-4 ">
        {relatedProducts?.map((product) => (
          <div
            key={product.id}
            className="text-start shadow-lg p-3 relative group overflow-hidden"
          >
            <Link
              to={`../ProductDetails/${product.id}/${product.category.name}`}
            >
              {" "}
              <img src={product.imageCover} alt={product.title}></img>
              <h3 className="text-[#088A08]  ">{product.category.name}</h3>
              <h2>{product.title.split(" ", 2).join(" ")}</h2>
              <div className="flex  items-center gap-3">
                {product.priceAfterDiscount ? (
                  <div className="text-xs">
                    {" "}
                    <span className="line-through text-red-600">
                      {product.price} EGP
                    </span>
                    <span> {product.priceAfterDiscount} EGP</span>
                  </div>
                ) : (
                  <span>{product.price} EGP</span>
                )}
                {/* ///////////////// */}
                <span>
                  <i className="fa-solid fa-star text-yellow-300"></i>
                  {product.ratingsAverage}
                </span>
              </div>
              {product.priceAfterDiscount ? (
                <span className="rounded-b-md bg-red-500 text-white p-1 absolute top-0 end-0 ">
                  Sale
                </span>
              ) : null}
            </Link>
            <div className="flex justify-between items-center gap-1">
              <button
                onClick={() => addProductCart(id)}
                className="group-hover:translate-y-[0%]  btn translate-y-[250%]   hover:bg-[#088A08] focus:ring-[#6cce6c] whitespace-nowrap w-full px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 bg-[#0AAD0A] rounded-lg cursor-pointer"
              >
                Add to Cart
              </button>

              <button
                onClick={() =>
                  listDetails?.find((x) => x?.id === product.id)
                    ? deleteItem(product.id)
                    : addProductToWishList(product.id)
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
