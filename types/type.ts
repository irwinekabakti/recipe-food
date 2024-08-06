import { StaticImageData } from "next/image";

export interface SearchRecipeArgs {
  queryText?: any;
  nextPageLink?: any;
}

export interface Recipe {
  id: string;
  image?: string;
  name: string;
  cuisineType?: string;
  mealType?: string;
}

export interface ItemTypeList {
  type: string;
  image: string | StaticImageData;
}

export interface TypeListProps {
  typeList: ItemTypeList[];
  typeId: string;
}
