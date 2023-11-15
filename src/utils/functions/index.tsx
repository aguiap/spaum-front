import jsonPt from "../../../public/locales/pt/common.json";
import { loading$, toastRequest$ } from "@/store";
import { ToastType } from "@/components/console/UploadFile/enum";
import { ToastRequestInterceptor } from "@/types";

export const tx = (text: string) => {
  let jsonData = jsonPt;
  let splitText = text.split(".");
  let convertedText = "";
  if (equalsNullOrUndefined(jsonData)) return text;
  for (const i in splitText) {
    if (
      equalsNullOrUndefined(splitText[i]) ||
      // @ts-ignore
      equalsNullOrUndefined(jsonData[splitText[i]])
    )
      return text;
    // @ts-ignore
    else jsonData = jsonData[splitText[i]];
  }
  if (jsonData) convertedText = jsonData.toString();
  return convertedText;
};

export const responseInterceptors = (typeToast: ToastType, message: string) => {
  callToast(typeToast, message);
  setTimeout(() => {
    loading$.next(false);
  }, 500);
};

export const callToast = (typeToast: ToastType, message: string) => {
  const toastRequest: ToastRequestInterceptor = {
    showToast: true,
    typeToast: typeToast,
    message: message,
    timestamp: new Date().getTime()
  };

  toastRequest.clearToast = setTimeout(() => {
    toastRequest$.next({ ...toastRequest, showToast: false });
  }, 4000);

  toastRequest$.next({ ...toastRequest$.getValue(), showToast: false });
  setTimeout(() => {
    toastRequest$.next(toastRequest);
  }, 500);
};

export const isNotEmpty = (list: any) => {
  return list != null && list.length > 0;
};

export const isEmpty = (list: any) => {
  return !isNotEmpty(list);
};

export const cloneDeep = (list: any) => {
  return JSON.parse(JSON.stringify(list));
};

export const equalsCheck = (a: any, b: any) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const equalsNullOrUndefined = (a: any) => {
  return a == null && a == undefined;
};

export const convertNullToZero = (a: any) => {
  return equalsNullOrUndefined(a) ? 0 : a;
};
