import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllEmployees,
  setKeyword,
  setLimit,
  setPage,
  setSortByField,
  setValueSort,
} from "../redux/employees/actions.js";
import { destroy, detail } from "../services/employees";
import Swal from "sweetalert2";
import moment from "moment";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { allData, sortByField, valueSort, keyword, page, totalPage, limit } =
    useSelector((state) => state.employeesReducers);

  const [searchingKeyword, setSearchingKeyword] = useState("");

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch, sortByField, valueSort, keyword, page, limit]);

  const handleSorting = (sortByField) => {
    dispatch(setSortByField(sortByField));
    dispatch(setValueSort(valueSort === "ASC" ? "DESC" : "ASC"));
  };

  const handleSearching = () => {
    if (searchingKeyword !== "") {
      dispatch(setKeyword(searchingKeyword));
    }
  };

  const handlePrevious = () => {
    dispatch(setPage(page <= 1 ? 1 : page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page === totalPage ? totalPage : page + 1));
  };

  const handleFirstPage = () => {
    dispatch(setPage(1));
  };

  const handleLastPage = () => {
    dispatch(setPage(totalPage));
  };

  const handleShowPerPage = (value) => {
    dispatch(setLimit(parseInt(value)));
  };

  const handleDelete = async (id) => {
    const responseDetailData = await detail(id);
    if (responseDetailData?.data?.statusCode === 200) {
      const dd = responseDetailData?.data?.data?.birthDate
        .toString()
        .split("-")[2];
      const MM = responseDetailData?.data?.data?.birthDate
        .toString()
        .split("-")[1];
      const YY = responseDetailData?.data?.data?.birthDate
        .toString()
        .split("-")[0];

      let month = "";

      if (MM === "01") {
        month = "January";
      } else if (MM === "02") {
        month = "February";
      } else if (MM === "03") {
        month = "March";
      } else if (MM === "04") {
        month = "April";
      } else if (MM === "05") {
        month = "May";
      } else if (MM === "06") {
        month = "June";
      } else if (MM === "07") {
        month = "July";
      } else if (MM === "08") {
        month = "August";
      } else if (MM === "09") {
        month = "September";
      } else if (MM === "10") {
        month = "October";
      } else if (MM === "11") {
        month = "November";
      } else if (MM === "12") {
        month = "December";
      }

      Swal.fire({
        title: "Delete Employee",
        html: `<p className="text-sm">ID : ${responseDetailData?.data?.data?.id}</p> <br /> <p className="text-sm">Name : ${responseDetailData?.data?.data?.name}</p> <br /> <p className="text-sm">Email : ${responseDetailData?.data?.data?.email}</p> <br /> <p className="text-sm">Mobile : ${responseDetailData?.data?.data?.mobile}</p> <br />
        <p className="text-sm">Birth date : ${month} ${dd}, ${YY}</p> <br /> <p className="text-sm">Address : ${responseDetailData?.data?.data?.address}</p> <br /> <br /> <br /> <p className="text-sm">Are you sure want to delete this employee?</p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await destroy(id);
          if (response?.data?.statusCode === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: `${
                response?.data?.message || "Successfully deleted data!"
              }`,
            });
            dispatch(fetchAllEmployees());
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${response?.data?.message || "Something went wrong!"}`,
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response?.data?.message || "Employee not found!"}`,
      });
    }
  };

  return (
    <>
      <Head>
        <title>List Employees - Test Teravin by Gusman Wijaya, S.Kom</title>
      </Head>
      <div className="h-screen justify-center items-center p-20 space-y-5 bg-white">
        <div className="flex flex-row justify-between items-center">
          <h4 className="font-bold">List Employees</h4>
          <div className="flex flex-row space-x-16">
            <div className="flex flex-row">
              <input
                onChange={(event) =>
                  event?.target?.value === ""
                    ? dispatch(setKeyword("")) && setSearchingKeyword("")
                    : setSearchingKeyword(event?.target?.value)
                }
                type="text"
                className="border p-1 text-sm w-72"
                placeholder="Search by ID, Name, or Email"
              />
              <button
                onClick={handleSearching}
                type="button"
                className={`border p-1 text-sm ${
                  searchingKeyword === "" ? "cursor-not-allowed" : ""
                }`}
                disabled={searchingKeyword === "" ? true : false}
              >
                Search
              </button>
            </div>
            <button
              type="button"
              onClick={() => router.push("/add")}
              className="border rounded-sm text-sm px-4"
            >
              Add
            </button>
          </div>
        </div>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center">
                    ID
                    <button type="button" onClick={() => handleSorting("id")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 w-3 h-3"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center">
                    Name
                    <button type="button" onClick={() => handleSorting("name")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 w-3 h-3"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center">
                    Email
                    <button
                      type="button"
                      onClick={() => handleSorting("email")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 w-3 h-3"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center">
                    Mobile
                    <button
                      type="button"
                      onClick={() => handleSorting("mobile")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 w-3 h-3"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"></path>
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allData?.length > 0 &&
                allData?.map((value, index) => (
                  <tr key={index} className="bg-white">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {value?.id || "-"}
                    </th>
                    <td className="py-4 px-6">{value?.name || "-"}</td>
                    <td className="py-4 px-6">{value?.email || "-"}</td>
                    <td className="py-4 px-6">{value?.mobile || "-"}</td>
                    <td className="py-4 px-6 space-x-1">
                      <button
                        onClick={() => router.push(`/detail/${value?.id}`)}
                        type="button"
                        className="border text-sm p-1"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => router.push(`/edit/${value?.id}`)}
                        type="button"
                        className="border text-sm p-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(value?.id)}
                        type="button"
                        className="border text-sm p-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {allData?.length < 1 && (
          <div className="flex flex-row justify-center items-center py-24">
            <p className="text-center text-sm">List empty</p>
          </div>
        )}

        <div className="flex flex-row justify-center items-center space-x-16 pb-20">
          <div className="flex flex-row justify-center items-center space-x-4">
            <h6 className="text-sm">Show</h6>
            <select
              name="showPerPage"
              className="border text-sm"
              onChange={(event) => handleShowPerPage(event?.target?.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <h6 className="text-sm">per page</h6>
          </div>
          <div className="flex flex-row justify-center items-center space-x-2">
            <button
              onClick={handleFirstPage}
              disabled={page <= 1 ? true : false}
              type="button"
              className={`text-sm ${page <= 1 ? "cursor-not-allowed" : ""}`}
            >
              {"<<"}
            </button>
            <button
              onClick={handlePrevious}
              disabled={page <= 1 ? true : false}
              type="button"
              className={`text-sm ${page <= 1 ? "cursor-not-allowed" : ""}`}
            >
              {"<"}
            </button>
            <p className="text-sm">
              page {page} of {totalPage}
            </p>
            <button
              onClick={handleNext}
              disabled={page === totalPage ? true : false}
              type="button"
              className={`text-sm ${
                page === totalPage ? "cursor-not-allowed" : ""
              }`}
            >
              {">"}
            </button>
            <button
              onClick={handleLastPage}
              disabled={page === totalPage ? true : false}
              type="button"
              className={`text-sm ${
                page === totalPage ? "cursor-not-allowed" : ""
              }`}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
