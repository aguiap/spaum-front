import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useEffect} from "react";
import ApiSpaum from "@/services/spaum";
import {callToast, isNotEmpty, tx} from "@/utils/functions";
import {useQuery} from "react-query";
import {useObservableState} from "observable-hooks";
import {
    importCoursesRules$,
    importDataProcessingSubject$,
    initialImportDataProcessing,
    selectCoursesValue$,
    showImport$
} from "@/store";
import {ToastType} from "@/components/console/UploadFile/enum";
import {css} from "@emotion/css";

export const SelectDefault = () => {
    const value = useObservableState(selectCoursesValue$);
    const showImport = useObservableState(showImport$);
    const courses = useObservableState(importCoursesRules$);

    const fetchCourses = () => {
        if (value === null) {
            ApiSpaum.getAllCourses().then((res: any) => {
                res.data.unshift({
                    id: "auto",
                    name: tx("Console.Import.setAutomatically")
                });
                selectCoursesValue$.next(res.data[0].id.toString());
                importCoursesRules$.next(res.data);
            });
        }
    };

    useQuery({queryKey: ["fetchCourses"], queryFn: fetchCourses});

    const handleChange = (event: any) => {
        if (showImport) {
            importDataProcessingSubject$.next(initialImportDataProcessing);
            showImport$.next(false);
            selectCoursesValue$.next(event.target.value);
            callToast(ToastType.WARN, "Console.Import.removedImport");
        } else selectCoursesValue$.next(event.target.value);
    };

    useEffect(() => {
        return () => {
            selectCoursesValue$.next(null);
        };
    }, []);

    const coursesMap = () => {
        return (
            <>
                <Select
                    style={{minWidth: "20rem", height: "5rem", fontSize: "1.2rem"}}
                    // @ts-ignore
                    color="gray"
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={value}
                    onChange={handleChange}
                    autoWidth
                    label={tx("Console.courses")}
                >
                    {courses.map((c: any) => (
                        // eslint-disable-next-line react/jsx-key
                        <MenuItem
                            className={css`font-size: 1.2rem; min-width: 20rem`}
                            value={c.id}>{c.name}</MenuItem>
                    ))}
                </Select>
            </>
        );
    };
    return (
        <FormControl sx={{m: 1, minWidth: 80}}>
            <InputLabel
                className={css`font-size: 1.2rem`}
                // @ts-ignore
                color="gray"
                id="demo-simple-select-autowidth-label"
            >
                {tx("Console.courses")}
            </InputLabel>
            {value && isNotEmpty(courses) && coursesMap()}
        </FormControl>
    );
};
