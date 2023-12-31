import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {equalsNullOrUndefined, handleNavigationWithoutUser, isEmpty, isNotEmpty, tx} from "@/utils/functions";
import ApiSpaum from "@/services/spaum";
import DataGridToken from "@/components/token/DataGridToken";
import {SplashLoading} from "@/components/token/SplashLoading";
import Head from "next/head";
import {useRouter} from "next/router";

export default function Token() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const [analyses, setAnalysis] = useState([]);
    const [fileName, setFileName] = useState("");
    const [showSplashLoading, setShowSplashLoading] = useState(true);

    useEffect(() => {
        if (isEmpty(analyses) && token != null) {
            setShowSplashLoading(true);
            ApiSpaum.getAllAnalysisByToken(token).then((res) => {
                if (res.data != null && res.data.id != null){
                    decryptedData(res.data);
                }
                else
                    handleNavigationWithoutUser("/login?message=tokenNotFound", router)
                setTimeout(() => setShowSplashLoading(false), 2000);
            }).catch(() => handleNavigationWithoutUser("/login?message=tokenNotFound", router));
        }
    }, [token != null]);

    const decryptedData = (data: any) => {
        if (isNotEmpty(data.analyses)) {
            if (data.path != null && data.path != "")
                setFileName(ApiSpaum.decryptedData(data.path));
            if (data.course != null && data.course != "")
                data.course = ApiSpaum.decryptedData(data.course);
            for (const i in data.analyses) {
                data.analyses[i].statusNotes =
                    data.analyses[i].statusNotes == "ALERT"
                        ? "ALERTA"
                        : data.analyses[i].statusNotes == "BAD"
                            ? "CRÍTICO"
                            : data.analyses[i].statusNotes == "INTERVENTION"
                                ? "INTERVENÇÃO"
                                : null;
                data.analyses[i].statusFouls =
                    data.analyses[i].statusFouls == "ALERT"
                        ? "ALERTA"
                        : data.analyses[i].statusFouls == "BAD"
                            ? "CRÍTICO"
                            : data.analyses[i].statusFouls == "INTERVENTION"
                                ? "INTERVENÇÃO"
                                : null;
                if (!equalsNullOrUndefined(data.analyses[i].name))
                    data.analyses[i].name = ApiSpaum.decryptedData(data.analyses[i].name);
                if (!equalsNullOrUndefined(data.analyses[i].subject))
                    data.analyses[i].subject = ApiSpaum.decryptedData(
                        data.analyses[i].subject
                    );
                if (!equalsNullOrUndefined(data.analyses[i].registration))
                    data.analyses[i].registration = ApiSpaum.decryptedData(
                        data.analyses[i].registration
                    );
                data.analyses[i].course = data.course;
                data.analyses[i].typeAnalyses = data.typeAnalyses;
            }
            setAnalysis(data.analyses);
        }
    };

    return (
        <>
            <Head>
                <title>{tx("analyses")}</title>
            </Head>
            {showSplashLoading ? (
                <SplashLoading text={tx("loading")}></SplashLoading>
            ) : (
                <DataGridToken data={analyses} fileName={fileName}></DataGridToken>
            )}
        </>
    );
}
