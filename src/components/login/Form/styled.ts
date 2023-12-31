import styled from '@emotion/styled'
import {
  primaryColor,
  tertiaryColor,
  secondColor,
  primaryColorDark, yellowColor, redColorLight, orangeColorLight
} from "@/utils/constant/colors";
import Image from "next/image";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

export const ButtonLogin = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row-reverse;

  button {
    margin-top: 10%;
    border: none;
    width: 10rem;
    padding: 0.7rem;
    height: 4rem;
    font-size: 1.2rem;
    border-radius: 0.2rem;
    text-align: center;
    background-color: ${secondColor};
    color: ${tertiaryColor};
    flex: 1;
  }

  > p {
    margin-top: 12.5%;
    flex: 2;
    font-size: 0.8rem;
    color: ${yellowColor};
  }
`;

export const ButtonDefault = styled(Button)`
  margin-top: 10%;
  border: none;
  width: 10rem;
  padding: 0.7rem;
  border-radius: 0.2rem;
  text-align: center;
  background-color: ${secondColor};
  color: ${tertiaryColor};
  box-shadow: none;
`;

export const InputLogin = styled.div`
  height: 4rem;
  background-color: ${primaryColor};
  border-radius: 0.2rem;
  border: solid ${tertiaryColor} 3px;
  margin-top: 7%;
  display: flex;

  input {
    width: 100%;
    border: none;
    outline: none;
    padding-left: 1rem;
    font-size: 1.2rem;
    color: ${tertiaryColor};
    background-color: ${primaryColor};
  }

  input::placeholder {
    color: ${tertiaryColor};
    opacity: 0.7;
  }
`;

export const LoginImage = styled(Image)`
  padding-left: 0.5rem;
  margin: auto;
`;

export const FormComponent = styled.div`
  width: 65%;
  margin: 0 auto;
`;
