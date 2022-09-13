import axios from "axios";

export default async function CallApi({ url, method, data }) {
  const response = await axios({
    url,
    method,
    data,
  }).catch((error) => error.response);

  return response;
}
