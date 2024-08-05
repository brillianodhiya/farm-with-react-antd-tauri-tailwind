// config axios get localstorage from jotai session storage
//
import axios from "axios";
import { jotaiSessionStore } from "../store/jotaiStore";

const axiosConfig = {
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  transformRequest: [
    (data: any, headers: { [x: string]: string }) => {
      const token = jotaiSessionStore.getItem("token", null);
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      return JSON.stringify(data);
    },
  ],
};

// buatkan fungsi untuk menggunakan axiosconfig tersebut dan saya tinggal memanggil api.get() atau api.post()

const api = axios.create(axiosConfig);
export default api;

//
// export const axiosConfigWithToken = {
//   ...axiosConfig,
//   transformRequest: [
//     (data, headers) => {
//       const token = sessionStore.get("token");
//       if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//       }
//       return JSON.stringify(data);
//     },
//   ],
// };
//
