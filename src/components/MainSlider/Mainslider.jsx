import slider1 from "../../assets/slider-image-1.jpeg"
import slider2 from "../../assets/slider-2.jpeg"
import slider3 from "../../assets/slider-image-3.jpeg"
import slider4 from "../../assets/slider-image-2-Xt88XJy9.jpeg"
import slider5 from "../../assets/slider-image-1-Dh9d2U6G.jpeg"

import Slider from "react-slick";
export default function Mainslider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,

      };

  return (<div className="grid grid-cols-[2fr_1fr]  ">
    <div className="overflow-hidden ">
    
      <Slider {...settings} className="w-full">
      <img src={slider1} className="w-[100px] h-[200px] object-cover" alt="" />
      <img src={slider2}  className="w-[100px] h-[200px] object-cover" alt="" />
      <img src={slider3} className="w-[100px] h-[200px] object-cover"  alt="" />
      <img src={slider4} className="w-[100px] h-[200px] object-cover"  alt="" />
     
    </Slider>
    </div>
    <div>
    <img src={slider5}  className="w-full h-[100px] object-cover" alt="" />
      <img src={slider3} className="w-full h-[100px] object-cover"  alt="" />
     
    </div>
    </div>
  )
}
