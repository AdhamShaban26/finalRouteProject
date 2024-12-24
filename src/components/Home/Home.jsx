import { Helmet } from "react-helmet";
import Categoryslider from "../Category slider/Categoryslider";
import Mainslider from "../MainSlider/Mainslider";
import Product from "../Product/Product";

export default function Home() {
  return (
   
    <>
    <Helmet><title>Home</title></Helmet>
      <div className="mb-14">
        <Mainslider />
      </div>
      <div className="mb-7">
        <Categoryslider />
      </div>
      <Product />
    </>
  );
}
