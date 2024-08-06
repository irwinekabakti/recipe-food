import { SiCodechef } from "react-icons/si";
import { food_bg_one } from "@/utils/images";

interface TitleData {
  typeOf: string;
  typeName: string;
}

interface PageTitleProps {
  titleData: TitleData;
}

const PageTitle: React.FC<PageTitleProps> = ({ titleData }) => {
  return (
    <div
      className="page-title"
      style={{
        background: `url(${food_bg_one.src}) center/cover no-repeat`,
      }}>
      <div className="container">
        <h2>
          <span>{titleData.typeOf}</span>
          <span className="px-4">/</span>
          <span>{titleData.typeName}</span>
          <span className="page-title-icon">
            <SiCodechef />
          </span>
        </h2>
      </div>
    </div>
  );
};

export default PageTitle;
