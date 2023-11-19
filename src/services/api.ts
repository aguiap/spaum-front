import axios from "axios";
import { loading$, session$ } from "@/store";
import {
  equalsNullOrUndefined,
  isNotEmpty,
  responseInterceptors
} from "@/utils/functions";
import { ToastType } from "@/components/console/UploadFile/enum";

// export const BASE_URL = "http://localhost:3000";
// export const BASE_URL_API = "http://127.0.0.1:8080";

export const BASE_URL = "https://spaum-597c295705ff.herokuapp.com";
export const BASE_URL_API = "https://spaum-api-fa8ee7093153.herokuapp.com";

const ignoreEndpoint: string[] = [
  "api/v1/courses/get-all-subjects",
  "api/v1/courses/get-all-courses",
  "/token/v1/analysis/get-all-analysis-by-token"
];

axios.interceptors.request.use(
  function (config) {
    loading$.next(true);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    let ignoreToast = false;
    if (response.config.url != null) {
      if (isNotEmpty(ignoreEndpoint)) {
        for (const i in ignoreEndpoint) {
          if (response.config.url.indexOf(ignoreEndpoint[i]) != -1) {
            loading$.next(false);
            ignoreToast = true;
          }
        }
      }
    }
    if (!ignoreToast) responseInterceptors(ToastType.SUCCESS, "successRequest");
    return response;
  },
  function (error) {
    if (!equalsNullOrUndefined(session$.getValue().expiration)) {
      // @ts-ignore
      const expireated: string = session$.getValue().expiration;
      if (new Date().getTime() - Date.parse(expireated) >= 3600000 / 1000)
        window.location.replace(`${BASE_URL}/login?message=userExpired`);
    }
    if (
      equalsNullOrUndefined(error) ||
      equalsNullOrUndefined(error.response) ||
      equalsNullOrUndefined(error.response.data) ||
      equalsNullOrUndefined(error.response.data.message)
    )
      responseInterceptors(ToastType.ERROR, "errorRequest");
    else responseInterceptors(ToastType.ERROR, error.response.data.message);
    return Promise.reject(error);
  }
);
