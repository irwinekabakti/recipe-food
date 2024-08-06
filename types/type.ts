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

export interface TypeData {
  typeOf?: any;
  typeName?: string;
}

// export interface Recipe {
//   id: string;
//   name: string;
//   // Add other recipe fields here
// }

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

// export interface Recipe {
//   name: string;
//   image?: string;
//   source_url: string;
//   cuisineType?: string;
//   calories: number;
//   dishType: string[];
//   totalWeight: number;
//   totalTime: number;
//   healthLabels: string[];
//   ingredients: {
//     text: string;
//     quantity: number;
//     measure: string;
//     weight: number;
//     food: string;
//   }[];
//   nutrients: Record<string, { label: string; quantity: number; unit: string }>;
//   images: Record<string, { url: string; width: number; height: number }>;
// }

// Interface for recipe data
export interface Recipe {
  uri: string;
  label: string;
  image?: string;
  images: { [key: string]: string }; // Adjust according to the actual structure
  source: string;
  url: string;
  healthLabels: string[];
  ingredientLines: string[];
  ingredients: {
    text: string;
    quantity: number;
    measure: string;
    food: string;
  }[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType?: string;
  mealType?: string;
  dishType: string[];
  totalNutrients: {
    [key: string]: {
      label: string;
      quantity: number;
      unit: string;
    };
  };
}

export interface RecipesData {
  hits: { recipe: Recipe }[];
  _links?: {
    next?: {
      href: string;
    };
  };
}

export interface SingleRecipeData {
  recipe: Recipe;
}

export interface SliderItem {
  id: number;
  title: string;
  text: string;
  image: StaticImageData;
}
export interface CuisineItem {
  type: string;
  image: StaticImageData;
}

export interface MealTypeItem {
  type: string;
  image: StaticImageData;
}
export interface DishTypeItem {
  type: string;
  image: StaticImageData;
}
export interface FooterLink {
  linkId: string;
  linkName: string;
}
