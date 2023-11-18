import {CoursesConfig} from "@/components/console/CoursesConfig";
import Head from "next/head";
import {tx} from "@/utils/functions";
import {session$} from "@/store";
import {useObservableState} from "observable-hooks";

export default function Courses() {
    const session = useObservableState(session$);

    return (
        <>
            <Head>
                <title>{tx("Console.Courses.pageCourses")}</title>
            </Head>
            {session.authenticated && <CoursesConfig></CoursesConfig>}
        </>
    );
}
