const CategoryReducer = (state, action) => {
  switch (action.type) {
    case "GET_CATEGORIES_START":
      return {
        categories: [],
        isFetching: true,
        error: false,
      };
    case "GET_CATEGORIES_SUCCESS":
      return {
        categories: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_CATEGORIES_FAILURE":
      return {
        categories: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_CATEGORY_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_CATEGORY_SUCCESS":
      return {
        categories: [...state.categories, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_CATEGORY_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPLOAD_CATEGORY_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPLOAD_CATEGORY_SUCCESS":
      return {
        categories: state.categories.map(
          (category) => category._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPLOAD_CATEGORY_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "DELETE_CATEGORY_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_CATEGORY_SUCCESS":
      return {
        categories: state.categories.filter((category) => category._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_CATEGORY_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default CategoryReducer;
