

import { useContext } from "react";
import { WishListContext } from "../../Context/WishListContext";
import { useEffect } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function WishList() {
  let { getLoggedUserWish, deleteItem, listDetails, loading, getLoading } =
    useContext(WishListContext);

  useEffect(() => {
    getLoggedUserWish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading || getLoading ? (
    <LoadingScreen />
 
  ) : (
    
    
    <main className="container px-4 mx-auto overflow-hidden">
      <Helmet><title>Wish List</title></Helmet>
      <section className="xl:mx-24 px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-500">Wish List</h2>
          </div>
        </div>
        {listDetails?.length < 1 && (
          <div className="flex flex-col items-center justify-center gap-12 py-8 my-8">
            <p className="sm:text-5xl text-3xl font-medium">
              your Wishlist Is Empty
            </p>
            <Link
              className="hover:bg-[#0AAD0A] focus:ring-[#6cce6c] whitespace-nowrap w-full px-4 py-2 mx-auto mt-8 font-semibold text-center text-white transition-all duration-300 bg-[#088A08] rounded-lg cursor-pointer"
              to={"/product"}
            >
              Go To Shopping
            </Link>
          </div>
        )}
        {listDetails?.map((product) => (
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
                  src={product.imageCover}
                  alt={product.title}
                />
                <div>
                  <h3 className="mb-2 text-lg font-medium text-gray-500">
                    {product.title.split(" ", 2).join(" ")}
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
                      onClick={() => deleteItem(product._id)}
                      className="text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center"></div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
