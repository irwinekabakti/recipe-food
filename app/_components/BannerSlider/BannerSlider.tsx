import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { sliderData } from "@/utils/data";

const BannerSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider className="header-slider" {...settings}>
      {sliderData.map((sliderItem) => (
        <div className="slider-item" key={sliderItem.id}>
          <Image
            src={sliderItem.image}
            alt="slider_image"
            quality={100}
            rel="preload"
          />
          <div className="slider-item-content max-w-[800px]">
            <h2>{sliderItem.title}</h2>
            <p>{sliderItem.text}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default BannerSlider;
