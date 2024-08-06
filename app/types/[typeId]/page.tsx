"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { food_bg_two } from "@/utils/images";
import Title from "@/app/_components/Title/Title";
import TypeList from "@/app/_components/TypeList/TypeList";
import { cuisinesData, dishTypeData, mealTypeData } from "@/utils/data";
import { ItemTypeList } from "@/types/type";

const page: React.FC = () => {
  const pathname = usePathname();
  const typeId = pathname?.split("/").pop() || "";
  let typeList: ItemTypeList[] = [];

  const pluralize = (word: string): string => {
    if (word.endsWith("s")) {
      return word + "es";
    } else if (word.endsWith("h")) {
      return word + "es";
    } else if (word.endsWith("e")) {
      return word + "s";
    } else {
      return word + "s";
    }
  };

  if (typeId === "meal") {
    typeList = mealTypeData;
  } else if (typeId === "dish") {
    typeList = dishTypeData;
  } else if (typeId === "cuisine") {
    typeList = cuisinesData;
  }

  const pluralizedTypeId = pluralize(typeId);

  return (
    <main
      className="type-list-page custom-min-h pt-[4px]"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${food_bg_two.src}) center/cover no-repeat fixed`,
      }}>
      <div className="container">
        <Title
          subTitle="Get Meal Ready"
          mainTitle={`Recipe ${pluralizedTypeId}`}
        />
        <TypeList typeId={typeId} typeList={typeList} />
      </div>
    </main>
  );
};

export default page;
