import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { mealTypeData } from "@/utils/data";

const MealSlider: React.FC = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="meals-slider">
      {mealTypeData?.map((meal: any) => (
        <div key={meal?.type} className="meal-item-wrapper">
          <Link href={`recipes/meal/${meal?.type}`} className="meal-item">
            <Image
              src={meal?.image}
              alt="image-meal"
              quality={100}
              rel="preload"
            />
            <span className="meal-item-name">{meal?.type}</span>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default MealSlider;
