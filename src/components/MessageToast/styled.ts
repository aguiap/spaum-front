import styled from '@emotion/styled'
import Image from "next/image";

export const Message = styled.div`
  span{
    margin-right: .5rem;
  ;
  }
`;

export const ImageCopy = styled(Image)`
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;
