import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="mx-auto container mt-20">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
