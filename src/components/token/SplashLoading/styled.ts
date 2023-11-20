import styled from '@emotion/styled'
import {
  primaryColor,
  secondColor,
  tertiaryColor,
  yellowColor
} from "@/utils/constant/colors";
import Image from "next/image";
import { Typography } from "@mui/material";

export const SectionBox = styled.section`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: ${tertiaryColor};
  display: flex;
  z-index: 99999999;

  div {
    margin: auto;
    display: flex;
    flex-direction: row;
    width: 500px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(
      -45deg,
      ${tertiaryColor},
      ${yellowColor},
      ${primaryColor},
      ${secondColor}
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;

    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    aside {
      display: flex;
      flex-direction: column;
    }

    span {
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;

export const BoxImage = styled(Image)`
  margin: auto;
`;

export const BoxTypography = styled(Typography)`
  font-weight: bold;
  color: ${tertiaryColor};
  font-size: 30px;
  border-bottom: ${tertiaryColor} solid 4px;
  margin: auto 30px auto auto;
`;
