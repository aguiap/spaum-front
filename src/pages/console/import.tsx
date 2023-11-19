import {UploadFile} from "@/components/console/UploadFile";
import Head from "next/head";
import {tx} from "@/utils/functions";
import {session$} from "@/store";
import {useObservableState} from "observable-hooks";
import {useEffect, useState} from "react";

export default function Console() {
    const session = useObservableState(session$);

    return (
        <>
            <Head>
                <title>{tx("Console.Import.importExcel")}</title>
            </Head>
            {session.authenticated && <UploadFile></UploadFile>}
        </>
    );
}
