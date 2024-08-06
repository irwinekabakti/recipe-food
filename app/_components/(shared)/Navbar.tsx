"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import PropTypes from "prop-types";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/types/meal",
      label: "Meals",
    },
    {
      path: "/types/dish",
      label: "Dishes",
    },
    {
      path: "/types/cuisine",
      label: "Cuisines",
    },
  ];

  return (
    <nav>
      <ul className="nav-list">
        {navItems?.map((item) => (
          <li key={item.path}>
            <CustomNavLink
              href={item.path}
              label={item.label}
              isActive={pathname === item.path}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}
const CustomNavLink: React.FC<NavLinkProps> = ({ href, label, isActive }) => (
  <Link href={href} className={`nav-link ${isActive ? "nav-link-active" : ""}`}>
    {label}
  </Link>
);

// CustomNavLink.propTypes = {
//   href: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   isActive: PropTypes.bool.isRequired,
// };
