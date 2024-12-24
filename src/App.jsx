import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import Brands from "./components/Brands/Brands";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import UserContext from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Categories from "./components/Categories/Categories";

import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import CartContext from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./components/Payment/Payment";
import ALLOrders from "./components/allorders/ALLOrders";
import ResetCode from "./components/ResetCode/ResetCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import WishListContextProvider from "./Context/WishListContext";
import WishList from "./components/wishList/WishList";

// import CartContext from "./Context/CartContext";

let client = new QueryClient();

// Create router
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ),
      },
      {
        path: "Payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <ALLOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "resetcode",
        element: <ResetCode />,
      },
      {
        path: "resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "forget",
        element: <ForgetPassword />,
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <UserContext>
      <CartContext>
        <WishListContextProvider>
          <QueryClientProvider client={client}>
            <RouterProvider router={router} />
            <Toaster />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </WishListContextProvider>
      </CartContext>
    </UserContext>
  );
}

export default App;
