import { ImageLogo, LoginPage, LoginSection } from "@/styles/login";
import { primaryColor } from "@/utils/constant/colors";
import { FormLogin } from "@/components/login/Form/form";
import { HeaderLogin } from "@/components/login/Header/header";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { callToast, tx } from "@/utils/functions";
import { ToastType } from "@/components/console/UploadFile/enum";
import Head from "next/head";

export default function Login() {
  const searchParams = useSearchParams();
  const userExpired = searchParams.get("userExpired");

  useEffect(() => {
    if (userExpired != null && userExpired == "1")
      callToast(ToastType.WARN, "userExpired");
  }, [userExpired != null]);

  return (
    <>
      <Head>
        <title>{tx("Login.login")}</title>
      </Head>
      <LoginPage>
        <LoginSection $color={primaryColor}>
          <HeaderLogin />
          <FormLogin />
        </LoginSection>
        <LoginSection>
          <ImageLogo
            src="./images/logo.svg"
            alt="Logo icon"
            width={400}
            height={400}
          ></ImageLogo>
        </LoginSection>
      </LoginPage>
    </>
  );
}
