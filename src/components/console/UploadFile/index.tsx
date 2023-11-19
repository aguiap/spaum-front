import {
  AsideFileUploaded,
  ButtonContinue,
  ButtonUploadFile,
  CloseImage,
  DivUploadDrag,
  UploadDragFile
} from "@/components/console/UploadFile/styled";
import { useEffect, useMemo } from "react";
import readXlsxFile from "read-excel-file";
import { useDropzone } from "react-dropzone";
import { Typography } from "@mui/material";
import {callToast, handleNavigation, tx} from "@/utils/functions";
import Image from "next/image";
import { grayColor } from "@/utils/constant/colors";
import { SelectDefault } from "@/components/SelectDefault";
import { normalizeJsonExcel } from "@/components/console/UploadFile/utils";
import {
  importDataProcessing$,
  initialImportDataProcessing,
  loading$,
  showImport$
} from "@/store";
import { useObservableState } from "observable-hooks";
import { useRouter } from "next/router";
import { ToastType } from "@/components/console/UploadFile/enum";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const focusedStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

export const UploadFile = () => {
  const importProcessedData = useObservableState(importDataProcessing$);
  const showImport = useObservableState(showImport$);
  const excelType1 =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const excelType2 = "application/vnd.ms-excel";
  const router = useRouter();

  const acceptFile = {
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": []
    }
  };

  let {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone(acceptFile);

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const files: any = acceptedFiles.map((file: any) => (
    <>
      <div>
        <Image
          src="../images/excel.svg"
          alt={tx("excelIcon")}
          width={50}
          height={50}
        ></Image>
      </div>
      <ul>
        <li key={file.path} title={`${file.path} - ${file.size} bytes`}>
          <aside>
            {file.path} - {file.size} bytes
          </aside>
          <CloseImage
            onClick={() => {
              showImport$.next(false);
              importDataProcessing$.next(initialImportDataProcessing);
              callToast(ToastType.SUCCESS, "Console.Import.removedImport");
            }}
            src="../images/close-circle-red.svg"
            alt={tx("Console.Import.removeExcel")}
            title={tx("Console.Import.removeExcel")}
            width={20}
            height={20}
          ></CloseImage>
        </li>
      </ul>
    </>
  ));

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      showImport$.next(true);
      importDataProcessing$.next(initialImportDataProcessing);
      loading$.next(true);
      if (
        acceptedFiles[0].type === excelType1 ||
        acceptedFiles[0].type === excelType2
      ) {
        // @ts-ignore
        const path: string = acceptedFiles[0]?.path;
        readXlsxFile(acceptedFiles[0]).then((rows) => {
          normalizeJsonExcel(rows, path);
        });
      } else {
        callToast(ToastType.ERROR, "invalidFileExcel");
      }
    }
  }, [acceptedFiles]);

  return (
    <UploadDragFile>
      <section>
        <article
          style={{
            outline:
              isDragActive || isFocused ? "none" : `solid ${grayColor} 5px`
          }}
        >
          <DivUploadDrag {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography>{tx("Console.Import.dropHere")}</Typography>
            ) : (
              <Typography>{tx("Console.Import.dragAndDropHere")}</Typography>
            )}
            <ButtonUploadFile
              component="label"
              variant="contained"
              // startIcon={<CloudUploadRoundedIcon />}
              onClick={() => open}
            >
              {tx("Console.Import.importExcel")}
            </ButtonUploadFile>
          </DivUploadDrag>
        </article>
        <AsideFileUploaded>{showImport && files}</AsideFileUploaded>
        <ButtonContinue
          onClick={() => handleNavigation("/console/charts", router)}
          disabled={importProcessedData.totals === 0}
          variant="contained"
        >
          {tx("continue")}
        </ButtonContinue>
        <SelectDefault></SelectDefault>
      </section>
    </UploadDragFile>
  );
};
