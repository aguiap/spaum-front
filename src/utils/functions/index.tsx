import jsonPt from "../../../public/locales/pt/common.json";
import { ToastType } from "@/components/console/UploadFile/enum";
import {toast} from "react-toastify";
import {loading$} from "@/store";
import {MessageToast} from "@/components/MessageToast";

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
  toast(<MessageToast message={message}></MessageToast>, {
    position: "bottom-right",
    autoClose: typeToast === ToastType.SUCCESS ? 1000 : 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
    type: typeToast
  });
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
