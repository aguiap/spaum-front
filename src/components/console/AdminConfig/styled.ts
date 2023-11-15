import styled from "styled-components";
import { grayColor, tertiaryColor } from "@/utils/constant/colors";
import { Button, OutlinedInput, Typography } from "@mui/material";

export const AdminSection = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  article {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 2rem auto;

    form {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    hr {
      flex: 2;
      height: 3px;
      background-color: ${grayColor};
      border: none;
      margin: auto 0;
    }

    span {
      margin: auto 0;
    }
  }
`;

export const Title = styled(Typography)`
  color: ${grayColor};
  margin-right: 1rem;
  font-size: 1.8rem;
`;

export const ChangePasswordButton = styled(Button)`
  color: ${tertiaryColor};
  height: 3rem;
  margin: auto 0;
  font-weight: bold;
`;

export const OutlinedInputPassword = styled(OutlinedInput)`
  width: 90%;
`;

export const OutButton = styled(Button)`
  color: ${tertiaryColor};
  background-color: ${grayColor};
  height: 3rem;
  margin: auto 0;
  font-weight: bold;
  &:hover {
    background-color: ${grayColor};
  }
`;

export const OutDiv = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end !important;
`;
