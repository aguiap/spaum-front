import styled from '@emotion/styled'
import Image from "next/image";
import {mq} from "@/utils/media";

export const LoginSection = styled.section<{ $color?: string; }>`
  background-color: ${props => props.$color};
  flex-direction: column;
  height: 100vh;
  width: 50%;
  display: flex;

  ${mq({
    width: ['100%', '50%'],
  })};
`;

export const LoginPage = styled.div`
  height: 100vh;
  display: flex;
`;

export const ImageLogo = styled(Image)`
  margin: auto;
`;
