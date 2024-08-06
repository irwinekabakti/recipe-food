import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";
import fetchData from "@/api/axios";
import { APP_ID, APP_KEY } from "@/api/api-constant";
import { extractRecipeData } from "@/utils/helpers";

export const fetchTypesRecipes = createAsyncThunk(
  "recipes/type/fetchRecipes",
  async (obj) => {
    const { typeData, nextPageLink }: any = obj;
    let recipesData = null;

    // if the given fetch request is not a link & doesn't have type=public information
    if (!(Object.keys(typeData).length === 0)) {
      const { data } = await fetchData(
        `?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&${typeData.typeOf}Type=${typeData.typeName}`
      );
      recipesData = extractRecipeData(data);
    } else {
      // in case of the next page fetch link where we already have type information as well
      const { data } = await fetchData(`${nextPageLink}`);
      recipesData = extractRecipeData(data);
    }
    return recipesData;
  }
);

const typesAdapter = createEntityAdapter({});

const initialState = typesAdapter.getInitialState({
  error: null,
  status: STATUS.IDLE,
  count: 0,
  nextPage: null,
});

const typesSlice = createSlice({
  name: "types",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTypesRecipes.pending, (state: any) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchTypesRecipes.fulfilled, (state: any, action) => {
        state.status = STATUS.SUCCEEDED;
        typesAdapter.removeAll(state);
        state.nextPage = action.payload.nextPage;
        typesAdapter.addMany(state, action.payload.data);
      })
      .addCase(fetchTypesRecipes.rejected, (state: any, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { selectAll: selectTypesAllRecipes } = typesAdapter.getSelectors(
  (state: any) => state.types
);

export const getTypesRecipesStatus = (state: any) => state.types.status;
export const getTypesRecipesError = (state: any) => state.types.error;
export const getTypesRecipeNextPage = (state: any) => state.types.nextPage;

export default typesSlice.reducer;
