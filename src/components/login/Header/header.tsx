import {
  H1LastChild,
  HeaderFlex,
  WrittenLogo
} from "@/components/login/Header/styled";
import { tx } from "@/utils/functions";

export const HeaderLogin = () => {
  return (
    <HeaderFlex>
      <WrittenLogo
        src="./images/writtenLogo.svg"
        alt={tx("logoWritten")}
        width={200}
        height={200}
      ></WrittenLogo>
      <hr></hr>
      <span>{tx("Login.logIntoAccount")}</span>
      <H1LastChild>
        <hr></hr>
      </H1LastChild>
    </HeaderFlex>
  );
};
