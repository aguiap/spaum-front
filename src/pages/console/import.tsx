import { UploadFile } from "@/components/console/UploadFile";
import Head from "next/head";
import { tx } from "@/utils/functions";
import { useObservableState } from "observable-hooks";
import { session$ } from "@/store";
import { useEffect } from "react";
import { BASE_URL } from "@/services/api";

export default function Console() {
  const session = useObservableState(session$);

  useEffect(() => {
    if (!session.authenticated || session.accessToken === "")
      window.location.replace(`${BASE_URL}/login?userExpired=1`);
  }, [session]);

  return (
    <>
      <Head>
        <title>{tx("Console.Import.importExcel")}</title>
      </Head>
      <UploadFile></UploadFile>
    </>
  );
}
