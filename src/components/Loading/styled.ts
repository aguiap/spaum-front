import styled from "styled-components";
import {
  primaryColor,
  tertiaryColor,
  secondColor
} from "@/utils/constant/colors";

export const HrLoading = styled.hr`
  position: fixed;
  top: 0;
  height: 0.4rem;
  width: 100%;
  margin: 0;
  border: none;
  animation: loading_color 5s infinite;
  background-color: ${primaryColor};

  @keyframes loading_color {
    0% {
      background-color: ${primaryColor};
    }
    5% {
      background-color: ${secondColor};
    }
    30% {
      background-color: yellow;
    }
    45% {
      background-color: ${tertiaryColor};
    }
    60% {
      background-color: ${secondColor};
    }
    75% {
      background-color: yellow;
    }
    100% {
      background-color: ${primaryColor};
    }
  }
`;
