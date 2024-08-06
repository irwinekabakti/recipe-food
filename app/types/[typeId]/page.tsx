"use client";
import React from "react";
import { food_bg_two } from "@/utils/images";
import Title from "@/app/_components/Title/Title";
import TypeList from "@/app/_components/TypeList/TypeList";
import { cuisinesData, dishTypeData, mealTypeData } from "@/utils/data";
import { ItemTypeList } from "@/types/type";
import { useSearchParams } from "next/navigation";

const page: React.FC = () => {
  const searchParams = useSearchParams();
  const typeId = searchParams.get("typeId") ?? "";
  let typeList: ItemTypeList[] = [];

  if (typeId === "meal") {
    typeList = mealTypeData;
  } else if (typeId === "dish") {
    typeList = dishTypeData;
  } else {
    typeList = cuisinesData;
  }

  return (
    <main
      className="type-list-page custom-min-h pt-[4px]"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${food_bg_two}') center/cover no-repeat fixed`,
      }}>
      <div className="container">
        <Title subTitle="Get Meal Ready" mainTitle={`Recipe ${typeId}s`} />
        <TypeList typeId={typeId} typeList={typeList} />
      </div>
    </main>
  );
};

export default page;
