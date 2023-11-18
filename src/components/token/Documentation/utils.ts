import {equalsNullOrUndefined} from "@/utils/functions";
import {DOC_TEXT} from "@/components/token/Documentation/documentation";

export const txDoc = (text: string) => {
    let jsonData = DOC_TEXT;
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