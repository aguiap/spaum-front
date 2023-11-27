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
    width: 60%;
    height: 50%;
    margin: auto;
  }
  
  p{
    text-align: center;
  }

  > section > article {
    width: 100%;
    height: 70%;
    border-radius: 1.3rem;
  }
`;

export const ButtonUploadFile = styled(Button)<{component: string}>`
  color: ${tertiaryColor};
  background-color: ${grayColor};
  width: 50%;
  height: 30%;
  margin-top: 10%;
  font-size: 1.1rem;

  &:hover {
    background-color: ${grayColor};
  }

  > span {
    color: ${tertiaryColor};
  }
`;

export const ButtonContinue = styled(Button)`
  margin-top: .6rem;
  color: ${tertiaryColor};
  float: right;
  width: 20rem;
  height: 5rem;
  font-size: 1.3rem;
  &:hover {
    background-color: ${primaryColorDark};
  }

  > span {
    color: ${tertiaryColor};
  }
`;

export const DivUploadDrag = styled.div`
  border-radius: 1rem !important;
  width: 97%;
  height: 85%;
  display: flex;
  margin: auto;
`;

export const AsideFileUploaded = styled.aside`
  margin: 2rem 0 2rem 0;
  display: flex;

  > div {
    display: inline;
  }
  
  div:nth-last-child(0){
    width: 100%;
  }
  
  ul{
    width: 100%;
  }

  > ul,
  li {
    margin: auto;
    display: flex;
    width: 100%;
    font-size: 1.2rem;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;

    > aside {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      margin-left: 1rem;
    }
  }
`;

export const CloseImage = styled(Image)`
  cursor: pointer;
`;
