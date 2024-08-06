import Image from "next/image";
import { loader } from "@/utils/images";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <Image src={loader} alt="loader_image" />
    </div>
  );
};

export default Loader;
