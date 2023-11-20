import styled from '@emotion/styled'
import { Button } from "@mui/material";
import {
  grayColor,
  primaryColorDark,
  tertiaryColor
} from "@/utils/constant/colors";
import Image from "next/image";

export const UploadDragFile = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  > section {
    margin: auto;
  }

  > section > article {
    border-radius: 1.3rem;
  }
`;

export const ButtonUploadFile = styled(Button)<{component: string}>`
  margin-top: 1rem;
  color: ${tertiaryColor};
  background-color: ${grayColor};

  &:hover {
    background-color: ${grayColor};
  }

  > span {
    color: ${tertiaryColor};
  }
`;

export const ButtonContinue = styled(Button)`
  margin-top: 1.9rem;
  color: ${tertiaryColor};
  float: right;

  &:hover {
    background-color: ${primaryColorDark};
  }

  > span {
    color: ${tertiaryColor};
  }
`;

export const DivUploadDrag = styled.div`
  border-radius: 1rem !important;
  width: 30rem;
`;

export const AsideFileUploaded = styled.aside`
  margin: 2rem 0 1rem 0;
  display: flex;

  > div {
    display: inline;
  }

  > ul,
  li {
    margin: auto;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    max-width: 27rem;

    > aside {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
  }
`;

export const CloseImage = styled(Image)`
  cursor: pointer;
`;
