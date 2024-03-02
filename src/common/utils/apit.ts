import axios from "axios";
import qs from "qs";
import AppConsts from "../../library/appconst";
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
} from "./interceptors";

export const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
http.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default http;

// axios
//   .get("locs", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//   .then()
//   .catch();
