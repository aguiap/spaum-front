import {ChartsData} from "@/components/console/ChartsData";
import Head from "next/head";
import {tx} from "@/utils/functions";
import {session$} from "@/store";
import {useObservableState} from "observable-hooks";

export default function Charts() {
    const session = useObservableState(session$);

    return (
        <>
            <Head>
                <title>{tx("Console.charts")}</title>
            </Head>
            {session.authenticated && <ChartsData></ChartsData>}
        </>
    );
}
