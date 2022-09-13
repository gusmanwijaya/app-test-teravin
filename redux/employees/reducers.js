import {
  GET_ALL_EMPLOYEES,
  ERROR_EMPLOYEES,
  SET_KEYWORD,
  SET_LIMIT,
  SET_PAGE,
  SET_SORT_BY_FIELD,
  SET_VALUE_SORT,
} from "./types";

const initialState = {
  keyword: "",
  sortByField: "",
  valueSort: "ASC",
  page: 1,
  limit: 10,
  totalPage: 1,
  allData: [],
  error: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEES:
      return {
        ...state,
        allData: action.allData,
        totalPage: action.totalPage,
      };

    case ERROR_EMPLOYEES:
      return {
        ...state,
        error: action.error,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    case SET_LIMIT:
      return {
        ...state,
        limit: action.limit,
      };

    case SET_SORT_BY_FIELD:
      return {
        ...state,
        sortByField: action.sortByField,
      };

    case SET_VALUE_SORT:
      return {
        ...state,
        valueSort: action.valueSort,
      };

    default:
      return state;
  }
};

export default reducers;
