import styled from "styled-components";
import Image from "next/image";
import { tertiaryColor } from "@/utils/constant/colors";

export const HeaderFlex = styled.div`
  display: flex;
  height: 50%;
  flex-direction: column;

  hr {
    height: 0.4rem;
    width: 60%;
    background-color: ${tertiaryColor};
    margin: 0 auto;
    border: none;
  }

  span {
    width: 60%;
    font-size: 2rem;
    color: ${tertiaryColor};
    margin: 7% auto;
  }
`;

export const WrittenLogo = styled(Image)`
  display: flex;
  margin: 5% auto 2% auto;
`;

export const H1LastChild = styled.div`
  height: 0.4rem;
  width: 60%;
  margin: 0 auto;

  hr {
    height: 0.4rem;
    width: 70%;
    background-color: ${tertiaryColor};
    margin: 0;
  }
`;
