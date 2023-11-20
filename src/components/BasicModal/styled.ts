import styled from '@emotion/styled'
import { Button, IconButton } from "@mui/material";
import { secondColor, tertiaryColor } from "@/utils/constant/colors";

export const BoxFab = styled(Button)<{component: string}>`
  background-color: ${secondColor};
  color: ${tertiaryColor};
  padding: 0.8rem;

  &:hover {
    background-color: ${secondColor};
  }
`;

export const BoxDiv = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 4rem;
  z-index: 1000000;
`;

export const BoxFabIcon = styled(IconButton)`
  background-color: ${tertiaryColor};
  color: ${tertiaryColor};
  border: solid 2px lightgreen;
  padding: 0.8rem;
  margin-left: 1rem;

  &:hover {
    background-color: ${tertiaryColor};
  }
`;
