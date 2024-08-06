import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { cuisinesData } from "@/utils/data";

const CategorySlider: React.FC = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          centerMode: false,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className="categories-slider">
      {cuisinesData?.map((cuisine: any) => (
        <Link
          href={`recipes/cuisine/${cuisine?.type}`}
          key={cuisine?.type}
          className="cuisine-item">
          <Image
            src={cuisine?.image}
            alt="img-category"
            quality={100}
            rel="preload"
          />
          <p className="cuisine-item-name">{cuisine?.type}</p>
        </Link>
      ))}
    </Slider>
  );
};

export default CategorySlider;
