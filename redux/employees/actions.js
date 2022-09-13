import {
  GET_ALL_EMPLOYEES,
  ERROR_EMPLOYEES,
  SET_KEYWORD,
  SET_LIMIT,
  SET_PAGE,
  SET_SORT_BY_FIELD,
  SET_VALUE_SORT,
} from "./types";
import { get } from "../../services/employees";
import debounce from "debounce-promise";

const debouncedGet = debounce(get, 250);

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

const setLimit = (limit) => {
  return {
    type: SET_LIMIT,
    limit,
  };
};

const setSortByField = (sortByField) => {
  return {
    type: SET_SORT_BY_FIELD,
    sortByField,
  };
};

const setValueSort = (valueSort) => {
  return {
    type: SET_VALUE_SORT,
    valueSort,
  };
};

const setGet = (allData, totalPage) => {
  return {
    type: GET_ALL_EMPLOYEES,
    allData,
    totalPage,
  };
};

const setError = (error) => {
  return {
    type: ERROR_EMPLOYEES,
    error,
  };
};

const fetchAllEmployees = () => {
  return async (dispatch, getState) => {
    const params = {
      keyword: getState().employeesReducers?.keyword || "",
      page: getState().employeesReducers?.page || 1,
      limit: getState().employeesReducers?.limit || 10,
      sortByField: getState().employeesReducers?.sortByField || "",
      valueSort: getState().employeesReducers?.valueSort || "ASC",
    };

    const response = await debouncedGet(
      params?.keyword,
      params?.page,
      params?.limit,
      params?.sortByField,
      params?.valueSort
    );
    if (response?.data?.statusCode === 200) {
      dispatch(setGet(response?.data?.data, response?.data?.totalPage));
    } else {
      dispatch(setError(response));
    }
  };
};

export {
  fetchAllEmployees,
  setPage,
  setKeyword,
  setLimit,
  setSortByField,
  setValueSort,
};
