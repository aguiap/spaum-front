import {
  BoxModal,
  ButtonDefault,
  ChartsSection,
  EmailTextField, SectionChart,
  SendButton,
  SendPreviewForm,
  StatusAside,
  StatusSpan
} from "@/components/console/ChartsData/styled";
import { DefaultChartPie } from "@/components/DefaultChartPie";
import { importDataProcessing$ } from "@/store";
import { useObservableState } from "observable-hooks";
import {
  callToast,
  equalsNullOrUndefined,
  isNotEmpty,
  tx
} from "@/utils/functions";
import {
  RequiredAttributes,
  ToastType
} from "@/components/console/UploadFile/enum";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { convertDataToSend } from "@/components/console/ChartsData/utils";
import { SplashLoading } from "@/components/token/SplashLoading";
import {grayColor, orangeColor, redColor, yellowColor} from "@/utils/constant/colors";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "70%",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  overflow: "auto" as "auto"
};

export const ChartsData = () => {
  const dataProcessing = useObservableState(importDataProcessing$);
  const [open, setOpen] = useState(false);
  const [showSplashLoading, setShowSplashLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getDataNote = () => {
    const alertTotals = importDataProcessing$.getValue().totalsNoteAlert;
    const badTotals = importDataProcessing$.getValue().totalsNoteBad;
    const interventionTotals =
      importDataProcessing$.getValue().totalsNoteIntervention;
    const normalTotals =
      importDataProcessing$.getValue().totals -
      alertTotals -
      badTotals -
      interventionTotals;
    return [
      ["Status", "Total"],
      [`Normal: ${normalTotals}`, normalTotals],
      [`Alerta: ${alertTotals}`, alertTotals],
      [`Crítico: ${badTotals}`, badTotals],
      [`Intervenção: ${interventionTotals}`, interventionTotals]
    ];
  };

  const getDataFouls = () => {
    const alertTotals = importDataProcessing$.getValue().totalsFoulsAlert;
    const badTotals = importDataProcessing$.getValue().totalsFoulsBad;
    const interventionTotals =
      importDataProcessing$.getValue().totalsFoulsIntervention;
    const normalTotals =
      importDataProcessing$.getValue().totals -
      alertTotals -
      badTotals -
      interventionTotals;
    return [
      ["Status", "Total"],
      [`Normal: ${normalTotals}`, normalTotals],
      [`Alerta: ${alertTotals}`, alertTotals],
      [`Crítico: ${badTotals}`, badTotals],
      [`Intervenção: ${interventionTotals}`, interventionTotals]
    ];
  };

  const options = (title: string) => {
    let label = "";
    switch (dataProcessing.noteType) {
      case RequiredAttributes.NOTA1:
        label = "N1";
        break;
      case RequiredAttributes.NOTA2:
        label = "N2";
        break;
      case RequiredAttributes.NOTA3:
        label = "N3";
        break;
      case RequiredAttributes.NOTASUBS:
        label = "N-1";
        break;
    }

    title += ` até ${label} - Total: ${dataProcessing.totals}`;
    return {
      title: title,
      colors: [grayColor, yellowColor, orangeColor, redColor],
    };
  };

  const handleChange = (e: any) => {
    importDataProcessing$.next({
      ...importDataProcessing$.getValue(),
      forEmail: e.target.value
    });
  };

  const sendEmail = () => {
    const hasError = validate();
    if (!hasError) {
      setShowSplashLoading(true);
      convertDataToSend(dataProcessing)
        .then(() => {
          setShowSplashLoading(false);
        })
        .catch(() => setShowSplashLoading(false));
    }
  };

  const validate = () => {
    if (
      equalsNullOrUndefined(dataProcessing.forEmail) ||
      dataProcessing.forEmail == ""
    ) {
      callToast(ToastType.WARN, "Console.Courses.requiredEmail");
      return true;
    }
    if (
      !dataProcessing.forEmail.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      callToast(ToastType.WARN, "Console.Courses.invalidEmail");
      return true;
    }
    return false;
  };

  return (
    <>
      {!equalsNullOrUndefined(dataProcessing.dataProcessing) && (
        <ChartsSection>
          <section>
            <ButtonDefault onClick={handleOpen}>
              {tx("Console.Charts.showPreview")}
            </ButtonDefault>
          </section>
          <SectionChart>
            <article>
              <DefaultChartPie
                data={getDataNote()}
                options={options(tx("Console.Charts.noteStatus"))}
              ></DefaultChartPie>
            </article>
            {dataProcessing.hasFouls && (
              <article>
                <DefaultChartPie
                  data={getDataFouls()}
                  options={options(tx("Console.Charts.foulStatus"))}
                ></DefaultChartPie>
              </article>
            )}
          </SectionChart>
        </ChartsSection>
      )}
      {!equalsNullOrUndefined(dataProcessing.dataProcessing) &&
        isNotEmpty(dataProcessing.dataProcessing) && (
          <>
            <Modal open={open} onClose={handleClose}>
              <BoxModal sx={style}>
                <SendPreviewForm>
                  <EmailTextField
                    defaultValue={dataProcessing.forEmail}
                    onChange={handleChange}
                    placeholder={tx("email")}
                    // @ts-ignore
                    color="gray"
                  />
                  <SendButton onClick={sendEmail}>
                    {tx("Console.Charts.sendEmail")}
                  </SendButton>
                </SendPreviewForm>
                {(dataProcessing.dataProcessing || []).map(
                  (value: any, i: string) => (
                    <p key={i}>
                      <span>{value.name}</span>
                      <ul>
                        {(value.value || []).map((data: any, i: string) => (
                          <>
                            <li>
                              <div>
                                <span>
                                  {data[RequiredAttributes.DISCIPLINA]}
                                </span>
                                <StatusAside>
                                  {!equalsNullOrUndefined(
                                    data[RequiredAttributes.TYPE_FOR_NOTE]
                                  ) && (
                                    <p>
                                      {tx("Console.Charts.noteStatus:")}
                                      <StatusSpan
                                        $status={
                                          data[RequiredAttributes.TYPE_FOR_NOTE]
                                        }
                                      >
                                        {` ${tx(
                                          data[RequiredAttributes.TYPE_FOR_NOTE]
                                        )}`}
                                      </StatusSpan>
                                    </p>
                                  )}
                                  {!equalsNullOrUndefined(
                                    data[RequiredAttributes.TYPE_FOR_FOULS]
                                  ) && (
                                    <p>
                                      {tx("Console.Charts.foulStatus:")}
                                      <StatusSpan
                                        $status={
                                          data[
                                            RequiredAttributes.TYPE_FOR_FOULS
                                          ]
                                        }
                                      >
                                        {` ${tx(
                                          data[
                                            RequiredAttributes.TYPE_FOR_FOULS
                                          ]
                                        )}`}
                                      </StatusSpan>
                                    </p>
                                  )}
                                  <p>
                                    {tx("Console.Charts.totalFouls")}
                                    <span>{` ${
                                      data[RequiredAttributes.FALTAS_TOTAL]
                                    }`}</span>
                                  </p>
                                  {(dataProcessing.noteType ===
                                    RequiredAttributes.NOTA1 ||
                                    dataProcessing.noteType ===
                                      RequiredAttributes.NOTA2 ||
                                    dataProcessing.noteType ===
                                      RequiredAttributes.NOTA3 ||
                                    dataProcessing.noteType ===
                                      RequiredAttributes.NOTASUBS) && (
                                    <p>
                                      {tx("Console.Charts.n1")}
                                      <span>{` ${
                                        equalsNullOrUndefined(
                                          data[RequiredAttributes.NOTA1]
                                        )
                                          ? ""
                                          : data[RequiredAttributes.NOTA1]
                                      }`}</span>
                                    </p>
                                  )}
                                  {(dataProcessing.noteType ===
                                    RequiredAttributes.NOTA2 ||
                                    dataProcessing.noteType ===
                                      RequiredAttributes.NOTA3 ||
                                    dataProcessing.noteType ===
                                      RequiredAttributes.NOTASUBS) && (
                                    <p>
                                      {tx("Console.Charts.n2")}
                                      <span>{` ${
                                        equalsNullOrUndefined(
                                          data[RequiredAttributes.NOTA2]
                                        )
                                          ? ""
                                          : data[RequiredAttributes.NOTA2]
                                      }`}</span>
                                    </p>
                                  )}
                                  {(dataProcessing.noteType ===
                                    RequiredAttributes.NOTA3 ||
                                    dataProcessing.noteType ===
                                      RequiredAttributes.NOTASUBS) && (
                                    <p>
                                      {tx("Console.Charts.n3")}
                                      <span>{` ${
                                        equalsNullOrUndefined(
                                          data[RequiredAttributes.NOTA3]
                                        )
                                          ? ""
                                          : data[RequiredAttributes.NOTA3]
                                      }`}</span>
                                    </p>
                                  )}
                                  {dataProcessing.noteType ===
                                    RequiredAttributes.NOTASUBS && (
                                    <p>
                                      {tx("Console.Charts.n-1")}
                                      <span>{` ${
                                        equalsNullOrUndefined(
                                          data[RequiredAttributes.NOTASUBS]
                                        )
                                          ? ""
                                          : data[RequiredAttributes.NOTASUBS]
                                      }`}</span>
                                    </p>
                                  )}
                                </StatusAside>
                              </div>
                            </li>
                          </>
                        ))}
                      </ul>
                    </p>
                  )
                )}
              </BoxModal>
            </Modal>
          </>
        )}
      {showSplashLoading && (
        <SplashLoading text={tx("sendEmailLoading")}></SplashLoading>
      )}
    </>
  );
};
