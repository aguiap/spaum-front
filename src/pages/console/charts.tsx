import { ChartsData } from "@/components/console/ChartsData";
import Head from "next/head";
import { tx } from "@/utils/functions";
import { useObservableState } from "observable-hooks";
import { session$ } from "@/store";
import { useEffect } from "react";
import { BASE_URL } from "@/services/api";

export default function Charts() {
  const session = useObservableState(session$);

  useEffect(() => {
    if (!session.authenticated || session.accessToken === "")
      window.location.replace(`${BASE_URL}/login?userExpired=1`);
  }, [session]);

  return (
    <>
      <Head>
        <title>{tx("Console.charts")}</title>
      </Head>
      <ChartsData></ChartsData>
    </>
  );
}
