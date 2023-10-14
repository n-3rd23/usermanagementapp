// import axios from "axios";
// import { cookies } from "next/headers";

// const baseURL = process.env.NEXT_PUBLIC_API_URL,
//   isServer = typeof window === "undefined";

// const AxiosInstance = axios.create({
//   baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// AxiosInstance.interceptors.request.use(async (config) => {
//   if (isServer) {
//     const cookieStore = cookies();
//     console.log("Cookies :: ", cookieStore.getAll());
//     const token = cookieStore.get("access_token")?.value;
//     console.log("Token in axios instance : ", token);
//     if (token) {
//       config.headers["Authorization"] = `${token}`;
//     }
//   }
//   return config;
// });

// export default AxiosInstance;

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL,
  isServer = typeof window === "undefined";

const AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import("next/headers"),
      token = cookies().get("access_token")?.value;
    console.log("Access Token Axios :: ", token);
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
  }

  return config;
});

export default AxiosInstance;
