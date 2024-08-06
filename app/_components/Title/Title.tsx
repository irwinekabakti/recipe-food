import React from "react";

interface TitleProps {
  subTitle?: string;
  mainTitle?: string;
}

const Title: React.FC<TitleProps> = ({ subTitle, mainTitle }) => {
  return (
    <div className="title">
      {subTitle && <h3 className="sub-title">{subTitle}</h3>}
      {mainTitle && <h2 className="main-title">{mainTitle}</h2>}
    </div>
  );
};

export default Title;
