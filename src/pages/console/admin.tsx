import AdminConfig from "@/components/console/AdminConfig";
import Head from "next/head";
import {tx} from "@/utils/functions";
import {session$} from "@/store";
import {useObservableState} from "observable-hooks";

export default function Admin() {
    const session = useObservableState(session$);

    return (
        <>
            <Head>
                <title>{tx("Console.admin")}</title>
            </Head>
            {session.authenticated && <AdminConfig></AdminConfig>}
        </>
    );
}
