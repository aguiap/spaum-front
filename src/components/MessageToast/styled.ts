import styled from "styled-components";
import Image from "next/image";
import {Tooltip} from "@mui/material";

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
