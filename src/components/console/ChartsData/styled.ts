import styled from '@emotion/styled'
import { Button, TextField } from "@mui/material";
import {
  primaryColor,
  secondColor,
  secondColorDark,
  tertiaryColor
} from "@/utils/constant/colors";
import Box from "@mui/material/Box";

export const ChartsSection = styled.section`
  display: flex;
  margin: auto;
  flex-direction: column;
  > section{
    display: flex;
    margin: 2rem auto;
  }
`;

export const SectionChart = styled.section`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  article{
    width: 100%;
  }
`;

export const ButtonDefault = styled(Button)`
  border: none;
  width: 20rem;
  height: 5rem;
  font-size: 1.2rem;
  padding: 0.7rem;
  border-radius: 0.2rem;
  text-align: center;
  background-color: ${secondColor};
  color: ${tertiaryColor};
  box-shadow: none;
  font-weight: bold;
  &:hover {
    background-color: ${secondColor};
  }
`;

export const BoxModal = styled(Box)`
  overflow: auto;
  font-size: 1.2rem;
  li {
    list-style-type: circle;
    font-size: 1.2rem;
  }
  ul {
    padding: 1rem 1rem 1rem 4rem;
  }
`;

export const StatusAside = styled.aside`
  margin: 0.7rem 0;
  p {
    margin-top: 0.3rem;
  }
`;

export const StatusSpan = styled.span<{
  $status?: "ALERT" | "BAD" | "INTERVENTION";
}>`
  color: ${(props) =>
    props.$status == "ALERT"
      ? "#B68F40"
      : props.$status == "BAD"
      ? secondColor
      : primaryColor};
  font-weight: bold;
`;

export const SendPreviewForm = styled.form`
  top: 0;
  position: sticky;
  padding: 0.3rem;
  background-color: ${secondColor};
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  border-radius: 0.4rem;
`;

export const EmailTextField = styled(TextField)`
  background-color: white;
  width: 20rem;
  border-color: white;
  outline-color: white;
  border-radius: 0.4rem;
  
  input{
    font-size: 1.1rem;
  }
`;

export const SendButton = styled(ButtonDefault)`
  width: 10rem;
  font-size: 1rem!important;
  height: 3.5rem!important;
  background-color: ${secondColorDark};
  &:hover {
    background-color: ${secondColorDark};
  }
`;
