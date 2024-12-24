import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Categoryslider() {
  const [Categories, setCtegories] = useState(null);
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
       
        setCtegories(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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
    <div className="shadow-lg">
      <Slider {...settings}>
        {Categories?.map((category) => (
          <div key={category._id} >
            <img
              src={category.image}
              className="w-full h-[200px] object-cover"
              alt=""
            />
            <h3>{category.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
