import styled from "styled-components";
import Image from "next/image";

export const LoginSection = styled.section<{ $color?: string; }>`
  background-color: ${props => props.$color};
  flex-direction: column;
  height: 100vh;
  width: 50%;
  display: flex;
`;

export const LoginPage = styled.div`
  height: 100vh;
  display: flex;
`;

export const ImageLogo = styled(Image)`
  margin: auto;
`;
