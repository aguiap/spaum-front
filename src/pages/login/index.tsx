import {ImageLogo, LoginPage, LoginSection} from "@/styles/login";
import {primaryColor} from "@/utils/constant/colors";
import {FormLogin} from "@/components/login/Form/form";
import {HeaderLogin} from "@/components/login/Header/header";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {callToast, tx} from "@/utils/functions";
import {ToastType} from "@/components/console/UploadFile/enum";
import Head from "next/head";
import {useRouter} from "next/router";
import {mq} from "@/utils/media";
import {css} from "@emotion/css";

export default function Login() {
    const searchParams = useSearchParams();
    const router = useRouter();
    let message = searchParams.get("message");

    useEffect(() => {
        if (message != null) {
            callToast(ToastType.WARN, message);
            message = null;
            router.replace('/login').then();
        }
    }, [message != null,]);

    return <>
        <Head>
            <title>{tx("Login.login")}</title>
        </Head>
        <LoginPage>
            <LoginSection $color={primaryColor}>
                <HeaderLogin/>
                <FormLogin/>
            </LoginSection>
            <LoginSection
                className={css(mq({
                    display: ['none', 'flex']
                }))}
            >
                <ImageLogo
                    src="./images/logo.svg"
                    alt="Logo icon"
                    width={400}
                    height={400}
                ></ImageLogo>
            </LoginSection>
        </LoginPage>
    </>;
}
