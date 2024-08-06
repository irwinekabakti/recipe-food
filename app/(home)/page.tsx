import Image from "next/image";
import TestImg from "@/assets/cat_img_1.jpg";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Test</h1>
      <Image
        src={TestImg}
        height={100}
        width={100}
        rel="preload"
        alt="test-img"
      />
    </div>
  );
};

export default Home;
