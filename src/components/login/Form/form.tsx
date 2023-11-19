import {handleNavigation, tx} from "@/utils/functions";
import {
  ButtonDefault,
  ButtonLogin,
  FormComponent,
  InputLogin,
  LoginImage
} from "@/components/login/Form/styled";
import ApiSpaum from "@/services/spaum";
import { useState } from "react";
import {NextRouter, useRouter} from "next/router";
import { session$ } from "@/store";
import { AxiosError } from "axios";
import { Typography } from "@mui/material";
import { useObservableState } from "observable-hooks";

export const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const session = useObservableState(session$);
  const router = useRouter();

  const handleClickLogin = () => {
    ApiSpaum.login(username, password)
      .then((response: any) => {
        if (response) {
          session$.next(response.data);
          handleNavigation("/console/import", router);
        }
      })
      .catch(function (error: AxiosError<any>) {
        if (error?.response?.status === 401 && error?.response?.data.message)
          setTimeout(() => setErrorLogin(error?.response?.data.message), 500);
      });
  };

  const handleEnterClick = (e: any) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleClickLogin();
    }
  };

  return (
    <FormComponent>
      <InputLogin>
        <LoginImage
          src="./images/person.svg"
          alt={tx("userIcon")}
          width={20}
          height={20}
        ></LoginImage>
        <input
          onKeyUp={handleEnterClick}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={tx("Login.username")}
        />
      </InputLogin>
      <InputLogin>
        <LoginImage
          src="./images/password.svg"
          alt={tx("passwordIcon")}
          width={20}
          height={20}
        ></LoginImage>
        <input
          onKeyUp={handleEnterClick}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder={tx("Login.password")}
        />
      </InputLogin>
      <ButtonLogin>
        <ButtonDefault
          style={{
            boxShadow: "none"
          }}
          color="secondary"
          variant="contained"
          onClick={handleClickLogin}
        >
          {tx("Login.login")}
        </ButtonDefault>
        <Typography>{tx(errorLogin)}</Typography>
      </ButtonLogin>
    </FormComponent>
  );
};
