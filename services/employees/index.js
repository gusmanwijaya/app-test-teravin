import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function get(keyword, page, limit, sortByField, valueSort) {
  const url = `${ROOT_API}/${API}/employees/get?keyword=${keyword}&page=${page}&limit=${limit}&sortByField=${sortByField}&valueSort=${valueSort}`;
  return CallApi({ url, method: "GET" });
}

export async function detail(id) {
  const url = `${ROOT_API}/${API}/employees/detail/${id}`;
  return CallApi({ url, method: "GET" });
}

export async function create(data) {
  const url = `${ROOT_API}/${API}/employees/create`;
  return CallApi({ url, method: "POST", data });
}

export async function update(id, data) {
  const url = `${ROOT_API}/${API}/employees/update/${id}`;
  return CallApi({ url, method: "PUT", data });
}

export async function destroy(id) {
  const url = `${ROOT_API}/${API}/employees/destroy/${id}`;
  return CallApi({ url, method: "DELETE" });
}
