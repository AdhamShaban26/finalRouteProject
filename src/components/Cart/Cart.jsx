import { useContext } from "react";
import { CartContextProvider } from "../../Context/CartContext";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";

export default function Cart() {
  let {
    getCart,
    numOfCart,
    totalPrice,
    productsCart,
    updateCartQuantity,
    deleteItem,
    deleteCart,
    loading,
  } = useContext(CartContextProvider);

  async function upDateCart(id, count) {
    let flag = await updateCartQuantity(id, count);
    if (flag == true) {
      return toast.success(" Update successfully to your cart");
    } else {
      return toast.error("Error adding product to your cart");
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return loading ? ( <LoadingScreen /> ) : (
    <>
    <Helmet><title>Cart</title></Helmet>
      <main className="container px-4 mx-auto overflow-hidden">
        <section className="xl:mx-24 px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-500">
                Shopping Cart
              </h2>
            </div>
            <div>
              <button
                onClick={() => deleteCart()}
                className="hover:bg-red-700 focus:ring-red-300 whitespace-nowrap w-fit px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 bg-red-500 rounded-lg cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
          {numOfCart == 0 ? (
            <div className="flex flex-col items-center justify-center gap-12 py-8 my-8">
              <p className="sm:text-5xl text-3xl font-medium">
                your Cart Is Empty
              </p>
              <Link
                className="hover:bg-[#0AAD0A] focus:ring-[#6cce6c] whitespace-nowrap w-full px-4 py-2 mx-auto mt-8 font-semibold text-center text-white transition-all duration-300 bg-[#088A08] rounded-lg cursor-pointer"
                to={"/product"}
              >
                Go To Shopping
              </Link>
            </div>
          ) : (
            <div className="sm:flex-row border-b-gray-300 sm:border-none flex flex-col items-center justify-between gap-8 pb-4 mb-4 text-2xl text-gray-500 border-b">
              <h3>
                Total Price:{" "}
                <span className="font-bold text-[#6cce6c]">{totalPrice}</span>
              </h3>
              <h3>
                Total Number:{" "}
                <span className="font-semibold text-[#6cce6c]">
                  {numOfCart}
                </span>
              </h3>
            </div>
          )}

          {productsCart?.map((product) => (
            <div
              key={product._id}
              className="rounded-xl p-4 my-4"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 12px 12px 26px, rgba(255, 255, 255, 0.6) -12px -12px 26px",
              }}
            >
              <div className="sm:flex-row flex flex-col items-center justify-between gap-8">
                <div className="flex items-center">
                  <img
                    className="w-28 mr-3"
                    src={product.product.imageCover}
                    alt={product.title}
                  />
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-500">
                      {product.product.title}
                    </h3>
                    <h4 className="mb-2 font-bold text-[#6cce6c]">
                      {product.price}
                    </h4>
                    <div className="flex">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        className="text-[20px] cursor-pointer text-1xl text-red-600 relative top-[2px] mr-1"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z" />
                      </svg>
                      <button
                        onClick={() => deleteItem(product.product._id)}
                        className="text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      upDateCart(product.product._id, product.count + 1)
                    }
                    className="sm:text-base hover:bg-[#088A08] focus:ring-[#6cce6c] hover:text-white  px-4 py-2 text-sm text-gray-500 bg-transparent border-2 border-[#0AAD0A] rounded-lg cursor-pointer"
                  >
                    +
                  </button>
                  <span className="mx-4 text-lg font-medium">
                    {product.count}
                  </span>
                  <button
                    onClick={() =>
                      upDateCart(product.product._id, product.count - 1)
                    }
                    className="sm:text-base hover:bg-[#088A08] focus:ring-[#6cce6c] hover:text-white px-4 py-2 text-sm text-gray-500 bg-transparent border-2 border-[#0AAD0A] rounded-lg cursor-pointer"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          {productsCart?.length > 0 && (
            <Link
              to={"/Payment"}
              className="hover:bg-[#088A08] focus:ring-[#6cce6c] whitespace-nowrap block w-full px-4 py-2 mx-auto mt-8 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A]  rounded-lg cursor-pointer"
            >
              Checkout
            </Link>
          )}
        </section>
      </main>
    </>
  
  );
}
