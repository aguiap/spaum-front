import jsonPt from "../../../public/locales/pt/common.json";
import {ToastType} from "@/components/console/UploadFile/enum";
import {toast} from "react-toastify";
import {loading$, session$} from "@/store";
import {MessageToast} from "@/components/MessageToast";
import {NextRouter} from "next/router";
import ApiSpaum from "@/services/spaum";
import {BASE_URL} from "@/services/api";

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

export const handleNavigation = (page: string, router: NextRouter) => {
    const token = encodeURIComponent(ApiSpaum.encryptData(session$.getValue().accessToken))
    const expiration = encodeURIComponent(ApiSpaum.encryptData(session$.getValue().expiration))
    const username = encodeURIComponent(ApiSpaum.encryptData(session$.getValue().username))
    router.replace(`${page}?accessToken=${token}&expiration=${expiration}&username=${username}`).then(() => {
    });
};

export const handleNavigationWithoutUser = (page: string, router: NextRouter) => {
    router.replace(page).then(() => {});
};

export const validateRefreshAuthentication = (router: NextRouter, token: string | null, expiration: string | null, username: string | null) => {
    const ignoreRouter = ['/login', '/token']
    if (router.isReady && !session$.getValue().authenticated && ignoreRouter.indexOf(router.pathname) == -1) {
        if (token == null || expiration == null || username == null) {
            window.location.replace(`${BASE_URL}/login?message=userExpired`);
        } else {
            if (!session$.getValue().authenticated && session$.getValue().accessToken === "") {
                session$.next({
                    ...session$.getValue(),
                    accessToken: ApiSpaum.decryptedData(decodeURIComponent(token)),
                    expiration: ApiSpaum.decryptedData(decodeURIComponent(expiration)),
                    username: ApiSpaum.decryptedData(decodeURIComponent(username)),
                    authenticated: true
                });
            }
        }
    }
}
