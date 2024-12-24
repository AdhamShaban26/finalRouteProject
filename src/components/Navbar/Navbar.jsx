import { NavLink, useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/freshcart-logo.svg";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/UserContext";
import { CartContextProvider } from "../../Context/CartContext";

export default function Navbar() {
  const { setToken, token } = useContext(userContext);
  const navigate = useNavigate();
  const { productsCart, getCart } = useContext(CartContextProvider);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getCart();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="border-gray-200 bg-gray-300 fixed start-0 end-0 top-0 z-10 w-full shadow-md">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center gap-5">
            <Link>
              <img src={Logo} className="h-8" alt="Logo" />
            </Link>

            {token && (
              <ul className="hidden md:flex content-center items-center gap-4">
                <li>
                  <NavLink to={""}>Home</NavLink>
                </li>
               
                <li>
                  <NavLink to={"WishList"}>Wish List</NavLink>
                </li>
                <li>
                  <NavLink to={"product"}>Products</NavLink>
                </li>
                <li>
                  <NavLink to={"Categories"}>Categories</NavLink>
                </li>
                <li>
                  <NavLink to={"brands"}>Brands</NavLink>
                </li>
              </ul>
            )}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className=" items-center justify-center gap-3 text-white cursor-pointer hidden lg:flex">
              <li>
                <Link to={"cart"} className="relative">
                  <i className="fa-solid fa-cart-shopping text-4xl"></i>
                  <span className="w-5 h-5 rounded-full bg-[#e73e3e] absolute right-0 top-[-20px] flex items-center justify-center">
                    {productsCart?.length}
                  </span>
                </Link>
              </li>
            </ul>

            {token ? (
              <span
                onClick={logout}
                className="text-sm text-stone-800 dark:text-blue-500 hover:underline cursor-pointer hidden lg:flex"
              >
                Log out
              </span>
              
            ) : (
              <>
                <Link
                  to="register"
                  className="text-sm text-stone-800 dark:text-blue-500 hover:underline "
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          {token && (
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white"
              >
                <i className="fa fa-bars"></i>
              </button>
            </div>
          )}
        </div>

        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:hidden bg-gray-300 text-white py-4`}
        >
          {token && (
            <ul className="flex flex-col items-center gap-4">
              <li>
                <NavLink onClick={() => setMenuOpen(false)} to={""}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuOpen(false)} to={"cart"}>
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuOpen(false)} to={"WishList"}>
                  Wish List
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuOpen(false)} to={"product"}>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuOpen(false)} to={"Categories"}>
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setMenuOpen(false)} to={"brands"}>
                  Brands
                </NavLink>
              </li>
              {token ? (
                <li>
                  <span
                    onClick={logout}
                    className="text-sm text-stone-800 dark:text-blue-500 hover:underline cursor-pointer"
                  >
                    Log out
                  </span>
                </li>
              ) : (
                <li>
                  <>
                    <NavLink
                      to="login"
                      className="text-sm text-stone-800 dark:text-blue-500 hover:underline"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="register"
                      className="text-sm text-stone-800 dark:text-blue-500 hover:underline"
                    >
                      Register
                    </NavLink>
                  </>
                </li>
              )}
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}
