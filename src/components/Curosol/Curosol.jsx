import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function Curosol({ relatedproduct }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {relatedproduct.map((product) => (
          <div key={product.id} className=" group rounded-xl p-4">
            <Link to={`/ProductDetail/${product.id}/${product.category.name}`}>
              <img
                className="rounded-md"
                src={product.imageCover}
                alt={product.title}
              />
              <h3 className="text-lg font-normal text-[#0AAD0A]">
                {product.category.name}
              </h3>
              <p className="mb-2 font-medium">
                {product.title.split(" ", 2).join(" ")}
              </p>
              <div className="flex items-center justify-between">
                {product.priceAfterDiscount ? (
                  <>
                    {" "}
                    <div className="flex gap-4">
                      <h4 className="line-through">
                        {product.priceAfterDiscount}EGP
                      </h4>
                      <h4> {product.price} EGP</h4>
                    </div>
                  </>
                ) : (
                  <h4> {product.price} EGP</h4>
                )}

                <p className="flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 576 512"
                    className="mr-1 text-yellow-400"
                    height={16}
                    width={16}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                  </svg>{" "}
                  {product.ratingsAverage}
                </p>
              </div>
            </Link>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button className="hover:bg-[#088A08] focus:ring-[#6cce6c] group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap w-full px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 translate-y-full bg-[#0AAD0A] rounded-lg opacity-0 cursor-pointer">
                Add to Cart
              </button>
              <i className="fa-solid fa-heart text-gray-900 text-xl"></i>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}
