import styled from "styled-components";
import { Zoom } from "@mui/material";
import Image from "next/image";
import {
  greenColor,
  greenColorDark,
  orangeColor,
  primaryColor,
  redColor,
  secondColorDark
} from "@/utils/constant/colors";
import { ToastType } from "@/components/console/UploadFile/enum";

export const ToastComponent = styled.div<{ $toastType?: ToastType }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 99999999;
  background-color: ${(props) =>
    props.$toastType === ToastType.SUCCESS
      ? greenColor
      : props.$toastType === ToastType.WARN
      ? orangeColor
      : redColor};
  margin-bottom: 1rem;
  border-radius: 0.4rem;
`;

export const Loading = styled.article<{
  $toastType?: ToastType;
  $secondsRemaining: number;
  $mouseEnter: boolean;
}>`
  width: ${(props) => (!props.$mouseEnter ? "100%" : "0%")};
  background-color: ${(props) =>
    props.$toastType === ToastType.SUCCESS
      ? greenColorDark
      : props.$toastType === ToastType.WARN
      ? secondColorDark
      : primaryColor};
  height: 0.3rem;
  border-radius: 0 0 0.4rem 0.4rem;
  animation-name: ${(props) => (props.$mouseEnter ? "none" : "loading")};
  animation-duration: ${(props) => props.$secondsRemaining + "s"};

  @keyframes loading {
    from {
      width: 100%;
    }
    to {
      width: 0;
    }
  }
`;

export const ZoomToast = styled(Zoom)`
  width: 20rem;
  cursor: pointer;

  span {
    margin-right: 0.5rem;
  }
`;

export const ImageCopy = styled(Image)`
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;
