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

export interface BreadcrumbData {
  typeOf: string;
  typeName: string;
}

export interface BreadcrumbProps {
  breadcrumbData: BreadcrumbData;
}

export interface TitleData {
  typeOf: string;
  typeName: string;
}

export interface PageTitleProps {
  titleData: TitleData;
}

// export interface TypeData {
//   typeOf: "cuisine" | "dish" | "meal";
//   typeName: string;
// }

export interface SelectProps {
  typeData: TypeData;
  handleSelection: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// src/types.ts
export interface TypeData {
  typeOf?: any;
  typeName?: string;
}

export interface Recipe {
  id: string;
  name: string;
  // Add other recipe fields here
}

export interface RecipesResponse {
  data: Recipe[];
  nextPage: string;
}

export interface RecipesState {
  error: string | null;
  status: string;
  count: number;
  nextPage: string | null;
  entities: { [id: string]: Recipe };
  ids: string[];
}
