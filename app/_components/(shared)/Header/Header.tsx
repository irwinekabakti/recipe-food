import Link from "next/link";
import Image from "next/image";
import Navbar from "../Navbar";
import Searchbar from "../Searchbar";
import { logo } from "@/utils/images";

const Header: React.FC = () => {
  return (
    <header>
      <div className="navbar-brand-wrapper">
        <div className="container">
          <Link href="/" className="navbar-brand flex items-center">
            <Image src={logo} alt="site logo" width={60} />
            <p className="navbar-brand-text">
              find<span className="text-orange">Recipe.</span>
            </p>
          </Link>
        </div>
      </div>

      <div className="header-bottom">
        <div className="container">
          <Navbar />
          <Searchbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
