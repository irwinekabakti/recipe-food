import Link from "next/link";
import Image from "next/image";
import { logo } from "@/utils/images";
import { footerLinksData } from "@/utils/data";
import { BsPinterest } from "react-icons/bs";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <Link href="/" className="navbar-brand">
            <Image
              src={logo}
              alt="site_logo"
              width={60}
              height={60}
              quality={100}
              rel="preload"
            />
            <p className="navbar-brand-text">
              find<span className="text-orange">Recipe.</span>
            </p>
          </Link>
        </div>
        <div className="footer-links">
          {footerLinksData?.map((link: any, index: any) => (
            <Link key={index} href={link.href || "|"}>
              {link.linkName}
            </Link>
          ))}
        </div>

        <div className="footer-bottom">
          <SocialLink href="/" icon={<AiFillFacebook />} />
          <SocialLink href="/" icon={<AiOutlineTwitter />} />
          <SocialLink href="/" icon={<AiFillInstagram />} />
          <SocialLink href="/" icon={<AiFillYoutube />} />
          <SocialLink href="/" icon={<BsPinterest />} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => (
  <Link href={href} className="social-link">
    {icon}
  </Link>
);
