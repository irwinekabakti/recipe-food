import { AiFillHome } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import Link from "next/link";

interface BreadcrumbData {
  typeOf: string;
  typeName: string;
}

interface BreadcrumbProps {
  breadcrumbData: BreadcrumbData;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbData }) => {
  return (
    <ul className="breadcrumb">
      <li>
        <Link href="/" className="flex items-center">
          <AiFillHome className="me-3" size={20} />
          Home
        </Link>
      </li>
      <li>
        <BsChevronRight />
      </li>
      <li>
        <Link
          href={`/recipes/${breadcrumbData.typeOf}/${breadcrumbData.typeName}`}>
          {breadcrumbData.typeOf} / {breadcrumbData.typeName}
        </Link>
      </li>
    </ul>
  );
};

export default Breadcrumb;
