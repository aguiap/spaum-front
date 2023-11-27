import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useObservableState} from "observable-hooks";
import {importDataProcessingSubject$, modalManage$} from "@/store";
import {callToast, equalsNullOrUndefined, isEmpty, isNotEmpty, tx} from "@/utils/functions";
import ApiSpaum from "@/services/spaum";
import {InputHours, InputSubject, ModalSubjects, UlCourses} from "@/components/console/CoursesList/styled";
import {IconButton, Tooltip, Zoom} from "@mui/material";
import Image from "next/image";
import {BoxDiv, BoxFab, BoxFabIcon} from "@/components/BasicModal/styled";
import styled from '@emotion/styled'
import {useDropzone} from "react-dropzone";
import readXlsxFile from "read-excel-file";
import {normalizeImportSubjects} from "@/components/BasicModal/utils";
import {useRouter} from "next/router";
import {ToastType} from "@/components/console/UploadFile/enum";
import {css} from "@emotion/css";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '30%',
    minWidth: 600,
    maxHeight: '60%',
    bgcolor: "background.paper",
    overflow: "auto" as "auto",
    borderRadius: 1,
    boxShadow: 24,
    p: 4
};

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1
});

export default function BasicModal() {
    const modal = useObservableState(modalManage$);
    const dataProcessing = useObservableState(importDataProcessingSubject$);
    const excelType1 =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const excelType2 = "application/vnd.ms-excel";
    const [subjects, setSubjects] = useState<any>([]);
    const router = useRouter();
    const initialCreateSubject = {
        name: "",
        hours: ""
    };

    const acceptFile = {
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
            "application/vnd.ms-excel": []
        }
    };

    const {acceptedFiles, getInputProps} = useDropzone(acceptFile);

    const handleClose = () => {
        setSubjects([]);
        modalManage$.next({showModal: false});
    };

    const validateInputs = (key: number) => {
        if (subjects[key].name == "" || equalsNullOrUndefined(subjects[key].name)) {
            callToast(ToastType.WARN, "Console.Courses.requiredNameSubject");
            return true;
        }
        if (
            subjects[key].hours == "" ||
            equalsNullOrUndefined(subjects[key].hours)
        ) {
            callToast(ToastType.WARN, "Console.Courses.requiredHoursSubject");
            return true;
        }
        const parseFloatHours = parseFloat(subjects[key].hours);
        if (parseFloatHours <= 0 || parseFloatHours > 200) {
            callToast(ToastType.WARN, "Console.Courses.minMaxHours");
            return true;
        }
        return false;
    };

    const handleSave = (key: number) => {
        const hasError = validateInputs(key);
        if (!hasError) ApiSpaum.editSubject(subjects[key]).then(() => {
        });
    };

    const handleCreate = (key: number) => {
        const hasError = validateInputs(key);
        if (!hasError)
            ApiSpaum.createSubject(modal.id as bigint, subjects[key]).then(
                (res: any) => {
                    let createSubject = subjects;
                    createSubject[key].id = res.data;
                    setSubjects(() => [...createSubject, initialCreateSubject]);
                }
            );
    };

    const handleCreateMultipleSubject = () => {
        ApiSpaum.createSubjectMultiple(modal.id as bigint, dataProcessing).then(
            () => {
                modalManage$.next({showModal: false});
            }
        );
    };

    const handleDelete = (key: number) => {
        ApiSpaum.deleteSubject(subjects[key].id).then(() => {
            let saveSubjects = subjects;
            setSubjects([]);
            setTimeout(() => {
                setSubjects([
                    ...saveSubjects.slice(0, key),
                    ...saveSubjects.slice(key + 1, saveSubjects.length)
                ]);
            }, 200);
        });
    };

    useEffect(() => {
        if (isEmpty(subjects) && modal.id != null) {
            ApiSpaum.getSubjectsWithCourseId(modal.id).then((res: any) => {
                setSubjects(() => [...res.data, initialCreateSubject]);
            });
        }
    }, [modal.id]);

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            if (
                acceptedFiles[0].type === excelType1 ||
                acceptedFiles[0].type === excelType2
            ) {
                readXlsxFile(acceptedFiles[0]).then((rows) => {
                    normalizeImportSubjects(rows);
                });
            } else {
                callToast(ToastType.ERROR, "invalidFileExcel");
            }
        }
    }, [acceptedFiles]);

    useEffect(() => {
        importDataProcessingSubject$.next([]);
    }, [modal.showModal]);

    useEffect(() => {
        return () => {
            importDataProcessingSubject$.next([]);
        };
    }, []);

    return (
        <>
            <div>
                <ModalSubjects open={modal.showModal} onClose={handleClose}>
                    <Box sx={style}>
                        <BoxDiv>
                            <BoxFab component="label" variant="contained">
                                {tx("Console.Courses.importSubjects")}
                                <VisuallyHiddenInput type="file" {...getInputProps()} />
                            </BoxFab>

                            <Zoom
                                in={
                                    isNotEmpty(dataProcessing) &&
                                    !equalsNullOrUndefined(dataProcessing)
                                }
                            >
                                <Tooltip title={tx("Console.Courses.confirmImport")} arrow>
                                    <BoxFabIcon onClick={handleCreateMultipleSubject}>
                                        <Image
                                            src="../images/confirm-green.svg"
                                            alt={tx("add")}
                                            width={25}
                                            height={25}
                                        ></Image>
                                    </BoxFabIcon>
                                </Tooltip>
                            </Zoom>
                        </BoxDiv>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {tx("subjects")}
                        </Typography>
                        {isNotEmpty(subjects) && (
                            <UlCourses>
                                {subjects.map((value: any, key: number) => {
                                    return (
                                        <>
                                            <li>
                                                <InputSubject
                                                    placeholder={tx("Console.Courses.enterSubject")}
                                                    defaultValue={value.name}
                                                    onChange={(e) =>
                                                        (subjects[key].name = e.target.value)
                                                    }
                                                />
                                                <InputHours
                                                    placeholder={tx("hours")}
                                                    defaultValue={value.hours}
                                                    onChange={(e) =>
                                                        (subjects[key].hours = e.target.value)
                                                    }
                                                />
                                                <div>
                                                    <Tooltip
                                                        title={
                                                            subjects[key].id ? tx("saveChange") : tx("add")
                                                        }
                                                        arrow
                                                    >
                                                        <IconButton
                                                            className={css`margin-right: ${subjects[key].id ? 0 : '2.9rem'}`}
                                                            onClick={() =>
                                                                subjects[key].id
                                                                    ? handleSave(key)
                                                                    : handleCreate(key)
                                                            }
                                                                >
                                                                <Image
                                                                src={
                                                                subjects[key].id
                                                                ? "../images/confirm-green.svg"
                                                                : "../images/add-circle.svg"
                                                            }
                                                                alt={
                                                                subjects[key].id
                                                                ? tx("saveChange")
                                                                : tx("add")
                                                            }
                                                                width={subjects[key].id ? 35 : 40}
                                                                height={subjects[key].id ? 35 : 40}
                                                                ></Image>
                                                                </IconButton>
                                                                </Tooltip>
                                                                </div>
                                                                <div hidden={!subjects[key].id}>
                                                            <Tooltip title={tx("remove")} arrow>
                                                                <IconButton onClick={() => handleDelete(key)}>
                                                                    <Image
                                                                        src="../images/delete.svg"
                                                                        alt={tx("remove")}
                                                                        width={35}
                                                                        height={35}
                                                                    ></Image>
                                                                </IconButton>
                                                            </Tooltip>
                                                </div>
                                            </li>
                                        </>
                                    );
                                })}
                            </UlCourses>
                        )}
                    </Box>
                </ModalSubjects>
            </div>
        </>
    );
}
