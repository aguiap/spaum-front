import { callToast } from "@/utils/functions";
import { Subject, ToastType } from "@/components/console/UploadFile/enum";
import { importDataProcessingSubject$ } from "@/store";

export const normalizeImportSubjects = (data: any) => {
  try {
    data.shift();
    data = removeRowNull(data);
    data = convertDataInJson(data);
    data = removeDuplicatesSubject(data);
    validateData(data);
    importDataProcessingSubject$.next(data);
  } catch (e: any) {
    callToast(ToastType.WARN, e.message);
  }
};

const removeRowNull = (data: any) => {
  const removeRows: string[] = [];
  for (const i in data) {
    if (data[i][0] == null || data[i][1] == null) removeRows.push(i);
  }
  return data.filter(
    (value: any, key: number) => removeRows.indexOf(key.toString()) == -1
  );
};

const convertDataInJson = (data: any) => {
  const json = [];
  for (const i in data) {
    const aux: any = {};
    aux[Subject.NAME] = data[i][0];
    aux[Subject.HOURS] = data[i][1];
    json.push(aux);
  }
  return json;
};

const removeDuplicatesSubject = (data: any) => {
  const notRemoveRows: string[] = [];
  const subjects: string[] = [];
  for (const i in data) {
    if (subjects.indexOf(data[i][Subject.NAME]) == -1) {
      subjects.push(data[i][Subject.NAME]);
      notRemoveRows.push(i);
    }
  }

  return data.filter(
    (value: any, key: number) => notRemoveRows.indexOf(key.toString()) != -1
  );
};

const validateData = (data: any) => {
  for (const i in data) {
    if (data[i][Subject.NAME] == "")
      throw new Error("Console.Courses.requiredNameSubject");
    if (data[i][Subject.HOURS] == "")
      throw new Error("Console.Courses.requiredHoursSubject");
    const parseFloatHours = parseFloat(data[i][Subject.HOURS]);
    if (parseFloatHours <= 0 || parseFloatHours > 200)
      throw new Error("Console.Courses.minMaxHours");
  }
};
