import { CoursesConfig } from "@/components/console/CoursesConfig";
import Head from "next/head";
import { tx } from "@/utils/functions";
import { useObservableState } from "observable-hooks";
import { session$ } from "@/store";
import { useEffect } from "react";
import { BASE_URL } from "@/services/api";

export default function Courses() {
  const session = useObservableState(session$);

  useEffect(() => {
    if (!session.authenticated || session.accessToken === "")
      window.location.replace(`${BASE_URL}/login?userExpired=1`);
  }, [session]);

  return (
    <>
      <Head>
        <title>{tx("Console.Courses.pageCourses")}</title>
      </Head>
      <CoursesConfig></CoursesConfig>
    </>
  );
}
