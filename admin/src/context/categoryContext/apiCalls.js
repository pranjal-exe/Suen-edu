import axios from "axios";
import {
  createCategoryFailure,
  createCategoryStart,
  createCategorySuccess,
  deleteCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  getCategoriesFailure,
  getCategoriesStart,
  getCategoriesSuccess,
} from "./CategoryActions";

export const getCategories = async (dispatch) => {
  dispatch(getCategoriesStart());
  try {
    const res = await axios.get("/categories", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getCategoriesSuccess(res.data));
  } catch (err) {
    dispatch(getCategoriesFailure());
  }
};

//create
export const createCategory = async (category, dispatch) => {
  dispatch(createCategoryStart());
  try {
    const res = await axios.post("/categories", category, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createCategorySuccess(res.data));
  } catch (err) {
    dispatch(createCategoryFailure());
  }
};

//delete
export const deleteCategory = async (id, dispatch) => {
  dispatch(deleteCategoryStart());
  try {
    await axios.delete("/categories/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteCategorySuccess(id));
  } catch (err) {
    dispatch(deleteCategoryFailure());
  }
};
