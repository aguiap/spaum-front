import {
  ImageCopy,
  Loading,
  ToastComponent,
  ZoomToast
} from "@/components/ToastRequest/styled";
import { useObservableState } from "observable-hooks";
import { toastRequest$ } from "@/store";
import { Alert } from "@mui/material";
import { tx } from "@/utils/functions";
import { useEffect, useState } from "react";

export const ToastRequest = () => {
  const initialValueSeconds = 4;
  const toast = useObservableState(toastRequest$);
  const [hasCopy, setHasCopy] = useState(false);
  const [secondsRemaining, setSecondsRemaining] =
    useState<number>(initialValueSeconds);
  const [mouseEnter, setMouseEnter] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tx(toast.message)).then(() => {
      setHasCopy(true);
      setTimeout(() => {
        setHasCopy(false);
      }, 1500);
    });
  };

  const handleMouseEnter = () => {
    clearTimeout(toast.clearToast);
    setSecondsRemaining((new Date().getTime() - toast.timestamp) / 1000);
    setMouseEnter(true);
  };

  const handleMouseLeave = () => {
    setSecondsRemaining(initialValueSeconds);
    setMouseEnter(false);
    toastRequest$.next({
      ...toast,
      showToast: false
    });
  };

  useEffect(() => {
    setHasCopy(false);
    setMouseEnter(false);
    setSecondsRemaining(initialValueSeconds);
  }, [toast.showToast]);

  return (
    <ZoomToast
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      in={toast.showToast}
    >
      <ToastComponent $toastType={toast.typeToast} hidden={!toast.showToast}>
        <Alert
          variant="filled"
          onClose={() => {
            toastRequest$.next({ ...toast, showToast: false });
          }}
          severity={toast.typeToast}
        >
          <span>{tx(toast.message)}</span>
          <ImageCopy
            onClick={hasCopy ? () => {} : handleCopy}
            src={hasCopy ? "../images/copied.svg" : "../images/copy.svg"}
            alt={hasCopy ? tx("copiedMessage") : tx("copyMessage")}
            title={hasCopy ? tx("copiedMessage") : tx("copyMessage")}
            width={15}
            height={15}
          ></ImageCopy>
        </Alert>
        <Loading
          $mouseEnter={mouseEnter}
          $secondsRemaining={secondsRemaining}
          $toastType={toast.typeToast}
        ></Loading>
      </ToastComponent>
    </ZoomToast>
  );
};
