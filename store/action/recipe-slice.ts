import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";
import { APP_ID, APP_KEY } from "@/api/api-constant";
import { extractRecipeData, extractSingleRecipeData } from "@/utils/helpers";
import fetchData from "@/api/axios";
import { SearchRecipeArgs } from "@/types/type";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (queryText: string = "chicken") => {
    try {
      // searching chicken recipes by default
      const { data } = await fetchData(
        `?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${queryText}`
      );
      let recipesData = extractRecipeData(data);
      return recipesData;
    } catch (error) {
      throw Error("Failed to fetch recipes.");
    }
  }
);

export const fetchSearchRecipe = createAsyncThunk(
  "recipes/fetchSearchRecipes",
  async ({ queryText, nextPageLink }: SearchRecipeArgs) => {
    try {
      let recipesData = null;

      if (!nextPageLink) {
        const { data } = await fetchData(
          `?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${queryText}`
        );
        recipesData = extractRecipeData(data);
        recipesData;
      } else {
        const { data } = await fetchData(`${nextPageLink}`);
        recipesData = extractRecipeData(data);
      }

      return recipesData;
    } catch (error) {
      throw Error("Failed to search recipes.");
    }
  }
);

export const fetchSingleRecipe = createAsyncThunk(
  "recipe/fetchSingleRecipes",
  async (recipeId) => {
    try {
      const { data } = await fetchData(
        `/${recipeId}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      let recipeData = extractSingleRecipeData(data);
      return recipeData;
    } catch (error) {
      throw Error("Failed to fetch single recipe");
    }
  }
);

const recipesAdapter = createEntityAdapter({});

const initialState = recipesAdapter.getInitialState({
  error: null,
  status: STATUS.IDLE,
  nextPage: null,
  searchResult: null,
  searchQuery: "",
  singleRecipe: null,
});

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },

    clearSearch(state) {
      state.searchResult = null;
    },
  },
  extraReducers(builder) {
    builder
      // handling fetching of all recipes
      .addCase(fetchRecipes.pending, (state: any) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchRecipes.fulfilled, (state: any, action) => {
        state.status = STATUS.SUCCEEDED;
        state.nextPage = action.payload.nextPage;
        recipesAdapter.upsertMany(state, action.payload.data);
      })
      .addCase(fetchRecipes.rejected, (state: any, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })

      // handling fetching of single recipe
      .addCase(fetchSingleRecipe.pending, (state: any) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchSingleRecipe.fulfilled, (state: any, action) => {
        state.singleRecipe = action.payload;
        state.status = STATUS.SUCCEEDED;
      })
      .addCase(fetchSingleRecipe.rejected, (state: any, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })

      // handle recipe search by search terms
      .addCase(fetchSearchRecipe.pending, (state: any) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchSearchRecipe.fulfilled, (state: any, action) => {
        state.searchResult = action.payload.data;
        state.nextPage = action.payload.nextPage;
        state.status = STATUS.SUCCEEDED;
      })
      .addCase(fetchSearchRecipe.rejected, (state: any, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { selectAll: selectAllRecipes } = recipesAdapter.getSelectors(
  (state: any) => state.recipes
);

export const getRecipesStatus = (state: any) => state.recipes.status;
export const getRecipesError = (state: any) => state.recipes.error;
export const getSearchQuery = (state: any) => state.recipes.searchQuery;
export const selectSearchResult = (state: any) => state.recipes.searchResult;
export const getRecipesNextPage = (state: any) => state.recipes.nextPage;
export const selectSingleRecipe = (state: any) => state.recipes.singleRecipe;

export const { setSearchQuery, clearSearch } = recipesSlice.actions;
export default recipesSlice.reducer;
