import {
  AdminSection,
  ChangePasswordButton,
  OutButton,
  OutDiv,
  OutlinedInputPassword,
  Title
} from "@/components/console/AdminConfig/styled";
import { IconButton, InputAdornment } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import React, { useState } from "react";
import { initialSession, session$ } from "@/store";
import { useRouter } from "next/router";
import ApiSpaum from "@/services/spaum";
import {handleNavigation, handleNavigationWithoutUser, tx} from "@/utils/functions";
import { SubmitHandler, useForm } from "react-hook-form";
import { MessageInputValidations } from "@/components/MessageInputValidations";

interface IFormInput {
  password: string;
}

export default function AdminConfig() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>();
  const router = useRouter();

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogout = () => {
    session$.next(initialSession);
    handleNavigationWithoutUser("/login", router);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    ApiSpaum.changePassword(data.password).then();
  };

  return (
    <AdminSection>
      <article>
        <div>
          <Title>{tx("Console.Admin.pageAdmin")}</Title>
          <hr />
        </div>
      </article>
      <article>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
            <InputLabel
              // @ts-ignore
              color="gray"
              htmlFor="outlined-adornment-password"
            >
              {tx("Login.password")}
            </InputLabel>
            <OutlinedInputPassword
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              // @ts-ignore
              color="gray"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {/*{showPassword ? <VisibilityOff /> : <Visibility />}*/}
                  </IconButton>
                </InputAdornment>
              }
              label={tx("Login.password")}
              {...register("password", {
                required: true,
                minLength: 8,
                pattern: /^[A-Za-z0-9+-=/.,!@#$%&*()]+$/i
              })}
            />
            <MessageInputValidations
              type={errors?.password?.type}
            ></MessageInputValidations>
          </FormControl>
          <ChangePasswordButton
            type="submit"
            variant="contained"
            disableElevation
          >
            {tx("Console.Admin.changePassword")}
          </ChangePasswordButton>
        </form>
      </article>
      <article>
        <OutDiv>
          <OutButton
            onClick={() => handleLogout()}
            variant="contained"
            disableElevation
          >
            {tx("Console.Admin.out")}
          </OutButton>
        </OutDiv>
      </article>
    </AdminSection>
  );
}
