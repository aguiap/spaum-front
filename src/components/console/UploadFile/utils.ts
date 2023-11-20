import {
  callToast,
  cloneDeep,
  convertNullToZero,
  equalsNullOrUndefined,
  isEmpty,
  isNotEmpty,
  tx
} from "@/utils/functions";
import {
  RequiredAttributes,
  ToastType
} from "@/components/console/UploadFile/enum";
import {
  HOURS_IN_PERCENTAGE_TO_NOTE1,
  HOURS_IN_PERCENTAGE_TO_NOTE2,
  HOURS_IN_PERCENTAGE_TO_NOTE3,
  SUM_TO_PASS
} from "@/utils/constant/calculations";
import {
  importCoursesRules$,
  importDataProcessing$,
  initialImportDataProcessing,
  loading$,
  selectCoursesValue$
} from "@/store";
import ApiSpaum from "@/services/spaum";

export const normalizeJsonExcel = async (data: any, path: string) => {
  try {
    const hasCourse = checkSelectCourses(path);
    data = removeNullRows(data);
    const keys = getKeys(data);
    validateColumns(keys)
    data.shift();
    const convertedData = convertArrayToMapJson(data, keys);
    importDataProcessing$.next({
      ...importDataProcessing$.getValue(),
      totals: convertedData.length || 0,
      path: path
    });
    const noteType = getNoteType(convertedData);
    importDataProcessing$.next({
      ...importDataProcessing$.getValue(),
      noteType: noteType
    });
    const separatedDataForNotes = defineCasesForNotes(convertedData, noteType);
    let separatedData;
    if (hasCourse) {
      const separatedDataFouls = await defineCasesForFouls(
        convertedData,
        noteType
      );
      separatedData = removeDuplicatesRows(
        separatedDataForNotes,
        separatedDataFouls
      );
    } else {
      separatedData = separatedDataForNotes;
    }
    importDataProcessing$.next({
      ...importDataProcessing$.getValue(),
      dataProcessing: separatedDataByRegistration(separatedData),
      typeAnalyses: noteType
    });
    if (hasCourse) callToast(ToastType.SUCCESS, "successRequest");
    else callToast(ToastType.WARN, "Console.Import.courseNotFound");
  } catch (e: any) {
    callToast(ToastType.ERROR, e.message);
    importDataProcessing$.next(initialImportDataProcessing);
  } finally {
    loading$.next(false);
  }
};

const validateColumns = (keys: any) => {
 if(keys.indexOf(RequiredAttributes.DISCIPLINA) == -1 && keys.indexOf(RequiredAttributes.DISCIPLINA.toLowerCase()) == -1 && keys.indexOf(RequiredAttributes.DISCIPLINA.toUpperCase()))
   throw new Error("invalidFileExcel");
  if(keys.indexOf(RequiredAttributes.NOME) == -1 && keys.indexOf(RequiredAttributes.NOME.toLowerCase()) == -1 && keys.indexOf(RequiredAttributes.NOME.toUpperCase()))
    throw new Error("invalidFileExcel")
  if(keys.indexOf(RequiredAttributes.NOTA1) == -1 && keys.indexOf(RequiredAttributes.NOTA1.toLowerCase()) == -1 && keys.indexOf(RequiredAttributes.NOTA1.toUpperCase()))
    throw new Error("invalidFileExcel")
  if(keys.indexOf(RequiredAttributes.FALTAS_TOTAL) == -1 && keys.indexOf(RequiredAttributes.FALTAS_TOTAL.toLowerCase()) == -1 && keys.indexOf(RequiredAttributes.FALTAS_TOTAL.toUpperCase()))
    throw new Error("invalidFileExcel")
  if(keys.indexOf(RequiredAttributes.MATRICULA) == -1 && keys.indexOf(RequiredAttributes.MATRICULA.toLowerCase()) == -1 && keys.indexOf(RequiredAttributes.MATRICULA.toUpperCase()))
    throw new Error("invalidFileExcel")
}

const checkSelectCourses = (path: string) => {
  let courses: any = cloneDeep(importCoursesRules$.getValue());
  courses.shift();
  if (isNotEmpty(courses)) {
    if (selectCoursesValue$.getValue() === "auto") {
      for (const i in courses) {
        if (isNotEmpty(courses[i].rulesCourses)) {
          for (const j in courses[i].rulesCourses) {
            if (
              path
                .toLowerCase()
                .indexOf(courses[i].rulesCourses[j].name.toLowerCase()) != -1
            ) {
              selectCoursesValue$.next(courses[i].id);
              importDataProcessing$.next({
                ...importDataProcessing$.getValue(),
                hasFouls: true,
                forEmail: courses[i].email,
                course: courses[i].name
              });
              return true;
            }
          }
        }
      }
      importDataProcessing$.next({
        ...importDataProcessing$.getValue(),
        hasFouls: false,
        forEmail: ""
      });
      return false;
    } else {
      let course;
      for (const i in courses) {
        if (courses[i].id == selectCoursesValue$.getValue()) {
          course = courses[i];
        }
      }

      if (course == null) return false;

      importDataProcessing$.next({
        ...importDataProcessing$.getValue(),
        hasFouls: true,
        forEmail: course.email,
        course: course.name
      });
      return true;
    }
  }
  throw new Error("Console.Import.coursesNotFound");
};

const removeNullRows = (data: any) => {
  let removeRows: string[] = [];
  if (isEmpty(data)) throw new Error("Console.Import.emptyExcel");
  for (const i in data) {
    if (isEmpty(data[i])) throw new Error("Console.Import.emptyExcel");

    let allRowsIsNull = true;
    for (const j in data[i]) {
      if (
        data[i][j] != null &&
        data[i][j] != undefined &&
        data[i][j] != "Total Geral"
      )
        allRowsIsNull = false;
    }
    if (allRowsIsNull) removeRows.push(i);
  }
  return data.filter(
    (value: any, key: number) => removeRows.indexOf(key.toString()) == -1
  );
};

const getKeys = (data: any) => {
  if (isEmpty(data[0])) throw new Error("Console.Import.emptyColumnKey");
  return data[0].map(
    (value: string, key: number) => (data[0][key] = value.toUpperCase())
  );
};

const convertArrayToMapJson = (data: any, keys: string[]) => {
  if (isEmpty(data)) throw new Error("Console.Import.emptyExcel");

  let convertedData = [];
  for (const i in data) {
    let rowJson: any = {};
    for (const j in data[i]) {
      if (Object.keys(RequiredAttributes).indexOf(keys[parseInt(j)]) > -1) {
        const key = keys[parseInt(j)];
        rowJson[key] = data[i][j];
      }
    }
    convertedData.push(rowJson);
  }

  return convertedData;
};

const getNoteType = (data: any) => {
  if (!allRowNoteIsNull(data, RequiredAttributes.NOTA2)) {
    if (!allRowNoteIsNull(data, RequiredAttributes.NOTA3))
      if (!allRowNoteIsNull(data, RequiredAttributes.NOTASUBS))
        return RequiredAttributes.NOTASUBS;
      else return RequiredAttributes.NOTA3;
    else return RequiredAttributes.NOTA2;
  }
  return RequiredAttributes.NOTA1;
};

const allRowNoteIsNull = (data: any, noteType: string) => {
  let allRowNoteIsNull = true;
  for (const i in data) {
    if (data[i][noteType] != null && data[i][noteType] != undefined) {
      allRowNoteIsNull = false;
      break;
    }
  }
  return allRowNoteIsNull;
};

const defineCasesForNotes = (data: any, noteType: string) => {
  let separatedData = {
    rowsWithAlert: [],
    rowsWithBad: [],
    rowsWithIntervention: []
  };

  switch (noteType) {
    case RequiredAttributes.NOTA1:
      [separatedData.rowsWithAlert, data] = caseNote(
        data,
        conditionCaseAlertNote1
      );
      [separatedData.rowsWithBad, data] = caseNote(data, conditionCaseBadNote1);
      break;
    case RequiredAttributes.NOTA2:
      [separatedData.rowsWithIntervention, data] = caseNote(
        data,
        conditionCaseInterventionNote2
      );
      [separatedData.rowsWithBad, data] = caseNote(data, conditionCaseBadNote2);
      [separatedData.rowsWithAlert, data] = caseNote(
        data,
        conditionCaseAlertNote2
      );
      break;
    case RequiredAttributes.NOTA3:
      [separatedData.rowsWithIntervention, data] = caseNote(
        data,
        conditionCaseInterventionNote3
      );
      [separatedData.rowsWithBad, data] = caseNote(data, conditionCaseBadNote3);
      [separatedData.rowsWithAlert, data] = caseNote(
        data,
        conditionCaseAlertNote3
      );
      break;
    case RequiredAttributes.NOTASUBS:
      [separatedData.rowsWithAlert, data] = caseNote(
        data,
        conditionCaseAlertNoteSubs
      );
      break;
  }

  separatedData.rowsWithAlert.map(
    (value: any, key: number) =>
      (value[RequiredAttributes.TYPE_FOR_NOTE] = "ALERT")
  );
  importDataProcessing$.next({
    ...importDataProcessing$.getValue(),
    totalsNoteAlert: separatedData.rowsWithAlert.length || 0
  });

  separatedData.rowsWithBad.map(
    (value: any, key: number) =>
      (value[RequiredAttributes.TYPE_FOR_NOTE] = "BAD")
  );
  importDataProcessing$.next({
    ...importDataProcessing$.getValue(),
    totalsNoteBad: separatedData.rowsWithBad.length || 0
  });

  separatedData.rowsWithIntervention.map(
    (value: any, key: number) =>
      (value[RequiredAttributes.TYPE_FOR_NOTE] = "INTERVENTION")
  );
  importDataProcessing$.next({
    ...importDataProcessing$.getValue(),
    totalsNoteIntervention: separatedData.rowsWithIntervention.length || 0
  });

  return [
    ...separatedData.rowsWithAlert,
    ...separatedData.rowsWithBad,
    ...separatedData.rowsWithIntervention
  ];
};

const caseNote = (data: any, condition: any) => {
  let rowsSeparated = [];
  let removeKeys: string[] = [];
  for (const i in data) {
    if (condition(data[i])) {
      rowsSeparated.push(data[i]);
      removeKeys.push(i);
    }
  }
  data = data.filter(
    (value: any, key: number) => removeKeys.indexOf(key.toString()) == -1
  );
  return [rowsSeparated, data];
};

const conditionCaseAlertNote1 = (data: any) => {
  return (
    data[RequiredAttributes.NOTA1] != null && data[RequiredAttributes.NOTA1] < 6
  );
};

const conditionCaseBadNote1 = (data: any) => {
  return equalsNullOrUndefined(data[RequiredAttributes.NOTA1]);
};

const conditionCaseInterventionNote2 = (data: any) => {
  const nota1 = data[RequiredAttributes.NOTA1];
  const nota2 = data[RequiredAttributes.NOTA2];
  if (equalsNullOrUndefined(nota1) && equalsNullOrUndefined(nota2)) return true;
  const sum = sumNotes(nota1, nota2);
  data["SUM"] = sum;
  data["SUMTOPASS"] = SUM_TO_PASS - sum;
  return SUM_TO_PASS - sum > 10;
};

const conditionCaseBadNote2 = (data: any) => {
  const nota1 = data[RequiredAttributes.NOTA1];
  const nota2 = data[RequiredAttributes.NOTA2];
  const sum = sumNotes(nota1, nota2);
  data["SUM"] = sum;
  data["SUMTOPASS"] = SUM_TO_PASS - sum;
  return SUM_TO_PASS - sum <= 10 && SUM_TO_PASS - sum >= 9;
};

const conditionCaseAlertNote2 = (data: any) => {
  const nota1 = data[RequiredAttributes.NOTA1];
  const nota2 = data[RequiredAttributes.NOTA2];
  const sum = sumNotes(nota1, nota2);
  data["SUM"] = sum;
  data["SUMTOPASS"] = SUM_TO_PASS - sum;
  return (
    (SUM_TO_PASS - sum < 9 && SUM_TO_PASS - sum >= 8) ||
    equalsNullOrUndefined(nota1) ||
    equalsNullOrUndefined(nota2)
  );
};

const conditionCaseInterventionNote3 = (data: any) => {
  const nota1 = data[RequiredAttributes.NOTA1];
  const nota2 = data[RequiredAttributes.NOTA2];
  const nota3 = data[RequiredAttributes.NOTA3];
  if (
    equalsNullOrUndefined(nota1) &&
    equalsNullOrUndefined(nota2) &&
    equalsNullOrUndefined(nota3)
  )
    return true;
  const sum = sumNotes(nota1, nota2, nota3);
  const sumWithRemoveMinNote = getSumWithNoteSubs(nota1, nota2, nota3);
  return SUM_TO_PASS - sum > 0 && SUM_TO_PASS - sumWithRemoveMinNote > 4;
};

const conditionCaseBadNote3 = (data: any) => {
  const nota1 = data[RequiredAttributes.NOTA1];
  const nota2 = data[RequiredAttributes.NOTA2];
  const nota3 = data[RequiredAttributes.NOTA3];
  const sum = sumNotes(nota1, nota2, nota3);
  const sumWithRemoveMinNote = getSumWithNoteSubs(nota1, nota2, nota3);
  return SUM_TO_PASS - sum > 0 && SUM_TO_PASS - sumWithRemoveMinNote >= 2;
};

const conditionCaseAlertNote3 = (data: any) => {
  const nota1 = data[RequiredAttributes.NOTA1];
  const nota2 = data[RequiredAttributes.NOTA2];
  const nota3 = data[RequiredAttributes.NOTA3];
  const sum = sumNotes(nota1, nota2, nota3);
  const sumWithRemoveMinNote = getSumWithNoteSubs(nota1, nota2, nota3);
  return SUM_TO_PASS - sum > 0 && SUM_TO_PASS - sumWithRemoveMinNote >= 0;
};

const conditionCaseAlertNoteSubs = (data: any) => {
  const nota1 = data[RequiredAttributes.NOTA1];
  const nota2 = data[RequiredAttributes.NOTA2];
  const nota3 = data[RequiredAttributes.NOTA3];
  const notaSubs = data[RequiredAttributes.NOTASUBS];
  const sum = sumNotes(nota1, nota2, nota3);
  const sumWithNoteSubs = getSumWithNoteSubs(nota1, nota2, nota3, notaSubs);
  return SUM_TO_PASS - sum > 0 && SUM_TO_PASS - sumWithNoteSubs > 0;
};

const sumNotes = (note1: number, note2: number = 0, note3: number = 0) => {
  return (
    convertNullToZero(note1) +
    convertNullToZero(note2) +
    convertNullToZero(note3)
  );
};

const getSumWithNoteSubs = (
  note1: number,
  note2: number,
  note3: number,
  noteSubs: number = 6
) => {
  note1 = convertNullToZero(note1);
  note2 = convertNullToZero(note2);
  note3 = convertNullToZero(note3);
  noteSubs = convertNullToZero(noteSubs);
  const min = Math.min(note1, note2, note3);
  if (note1 === min) note1 = noteSubs;
  else if (note2 === min) note2 = noteSubs;
  else if (note3 === min) note3 = noteSubs;
  return note1 + note2 + note3;
};

const separatedDataByRegistration = (data: any) => {
  let registrations: any = {};
  let separatedDataByRegistration: any = [];
  for (const i in data) {
    if (
      Object.keys(registrations).indexOf(
        data[i][RequiredAttributes.MATRICULA]
      ) == -1
    ) {
      const textKey = data[i][RequiredAttributes.MATRICULA];
      registrations[textKey] = `${data[i][RequiredAttributes.MATRICULA]} - ${
        data[i][RequiredAttributes.NOME]
      }`;
    }
  }

  for (const i in registrations) {
    let byRegistration = [];
    for (const j in data) {
      if (i == data[j][RequiredAttributes.MATRICULA]) {
        byRegistration.push(data[j]);
      }
    }
    separatedDataByRegistration.push({
      name: registrations[i],
      value: byRegistration
    });
  }
  return separatedDataByRegistration;
};

const defineCasesForFouls = async (data: any, noteType: string) => {
  const id = selectCoursesValue$.getValue();
  let subjects;
  if (id != null) {
    await ApiSpaum.getSubjectsWithCourseId(id).then(
      (res) => (subjects = res.data)
    );
  }

  if (!equalsNullOrUndefined(subjects)) {
    let separatedData = {
      rowsWithAlert: [],
      rowsWithBad: [],
      rowsWithIntervention: []
    };
    checkAllSubjectsInData(data, subjects);

    switch (noteType) {
      case RequiredAttributes.NOTA1:
        [separatedData.rowsWithAlert, data] = caseFouls(
          data,
          conditionCaseAlertFoulsNote1,
          subjects
        );
        [separatedData.rowsWithBad, data] = caseFouls(
          data,
          conditionCaseBadFoulsNote1,
          subjects
        );
        [separatedData.rowsWithIntervention, data] = caseFouls(
          data,
          conditionCaseInterventionFoulsNote1,
          subjects
        );
        break;
      case RequiredAttributes.NOTA2:
        [separatedData.rowsWithAlert, data] = caseFouls(
          data,
          conditionCaseAlertFoulsNote2,
          subjects
        );
        [separatedData.rowsWithBad, data] = caseFouls(
          data,
          conditionCaseBadFoulsNote2,
          subjects
        );
        [separatedData.rowsWithIntervention, data] = caseFouls(
          data,
          conditionCaseInterventionFoulsNote2,
          subjects
        );
        break;
      case RequiredAttributes.NOTA3:
      case RequiredAttributes.NOTASUBS:
        [separatedData.rowsWithIntervention, data] = caseFouls(
          data,
          conditionCaseInterventionFoulsNote3,
          subjects
        );
        break;
    }

    separatedData.rowsWithAlert.map(
      (value: any, key: number) =>
        (value[RequiredAttributes.TYPE_FOR_FOULS] = "ALERT")
    );
    importDataProcessing$.next({
      ...importDataProcessing$.getValue(),
      totalsFoulsAlert: separatedData.rowsWithAlert.length || 0
    });

    separatedData.rowsWithBad.map(
      (value: any, key: number) =>
        (value[RequiredAttributes.TYPE_FOR_FOULS] = "BAD")
    );
    importDataProcessing$.next({
      ...importDataProcessing$.getValue(),
      totalsFoulsBad: separatedData.rowsWithBad.length || 0
    });

    separatedData.rowsWithIntervention.map(
      (value: any, key: number) =>
        (value[RequiredAttributes.TYPE_FOR_FOULS] = "INTERVENTION")
    );
    importDataProcessing$.next({
      ...importDataProcessing$.getValue(),
      totalsFoulsIntervention: separatedData.rowsWithIntervention.length || 0
    });

    return [
      ...separatedData.rowsWithAlert,
      ...separatedData.rowsWithBad,
      ...separatedData.rowsWithIntervention
    ];
  } else {
    throw new Error("Console.Import.emptySubject");
  }
};

const checkAllSubjectsInData = (data: any, subjects: any) => {
  let allSubjects = [];
  let errors = [];
  for (const i in subjects) {
    allSubjects.push(subjects[i].name);
  }

  for (const i in data) {
    if (allSubjects.indexOf(data[i][RequiredAttributes.DISCIPLINA]) == -1)
      errors.push(data[i][RequiredAttributes.DISCIPLINA]);
  }

  if (isNotEmpty(errors)) {
    let unique = errors.filter(arrayUnique);

    throw new Error(tx("Console.Import.requiredSubject") + unique.join(", "));
  }
};

function arrayUnique(value: string, index: number, self: any) {
  return self.indexOf(value) === index;
}

const caseFouls = (data: any, condition: any, subjects: any) => {
  let rowsSeparated = [];
  let removeKeys: string[] = [];
  for (const i in data) {
    const subjectHours = getHoursSubject(data[i], subjects);
    if (condition(data[i], subjectHours)) {
      rowsSeparated.push(data[i]);
      removeKeys.push(i);
    }
  }
  data = data.filter(
    (value: any, key: number) => removeKeys.indexOf(key.toString()) == -1
  );
  return [rowsSeparated, data];
};

const getHoursSubject = (data: any, subjects: any) => {
  for (const i in subjects) {
    if (subjects[i].name === data[RequiredAttributes.DISCIPLINA])
      return subjects[i].hours;
  }
};

const conditionCaseAlertFoulsNote1 = (data: any, hours: number) => {
  const totalFoulsInPercentage = calculateTotalFoulsInPercentage(
    data,
    hours,
    HOURS_IN_PERCENTAGE_TO_NOTE1
  );
  return totalFoulsInPercentage >= 30 && totalFoulsInPercentage < 45;
};

const conditionCaseBadFoulsNote1 = (data: any, hours: number) => {
  const totalFoulsInPercentage = calculateTotalFoulsInPercentage(
    data,
    hours,
    HOURS_IN_PERCENTAGE_TO_NOTE1
  );
  return totalFoulsInPercentage >= 45 && totalFoulsInPercentage < 70;
};

const conditionCaseInterventionFoulsNote1 = (data: any, hours: number) => {
  const totalFoulsInPercentage = calculateTotalFoulsInPercentage(
    data,
    hours,
    HOURS_IN_PERCENTAGE_TO_NOTE1
  );
  return totalFoulsInPercentage >= 70;
};

const conditionCaseAlertFoulsNote2 = (data: any, hours: number) => {
  const totalFoulsInPercentage = calculateTotalFoulsInPercentage(
    data,
    hours,
    HOURS_IN_PERCENTAGE_TO_NOTE1,
    HOURS_IN_PERCENTAGE_TO_NOTE2
  );
  return totalFoulsInPercentage >= 20 && totalFoulsInPercentage < 25;
};

const conditionCaseBadFoulsNote2 = (data: any, hours: number) => {
  const totalFoulsInPercentage = calculateTotalFoulsInPercentage(
    data,
    hours,
    HOURS_IN_PERCENTAGE_TO_NOTE1,
    HOURS_IN_PERCENTAGE_TO_NOTE2
  );
  return totalFoulsInPercentage >= 25 && totalFoulsInPercentage < 30;
};

const conditionCaseInterventionFoulsNote2 = (data: any, hours: number) => {
  const totalFoulsInPercentage = calculateTotalFoulsInPercentage(
    data,
    hours,
    HOURS_IN_PERCENTAGE_TO_NOTE1,
    HOURS_IN_PERCENTAGE_TO_NOTE2
  );
  return totalFoulsInPercentage >= 30;
};

const conditionCaseInterventionFoulsNote3 = (data: any, hours: number) => {
  const totalFoulsInPercentage = calculateTotalFoulsInPercentage(
    data,
    hours,
    HOURS_IN_PERCENTAGE_TO_NOTE1,
    HOURS_IN_PERCENTAGE_TO_NOTE2,
    HOURS_IN_PERCENTAGE_TO_NOTE3
  );
  return totalFoulsInPercentage >= 25;
};

const calculateTotalFoulsInPercentage = (
  data: any,
  hours: number,
  n1: number,
  n2: number = 0,
  n3: number = 0
) => {
  const hoursFoulsUntilNote1 = hours * ((n1 + n2 + n3) / 100);
  return (data[RequiredAttributes.FALTAS_TOTAL] * 100) / hoursFoulsUntilNote1;
};

const removeDuplicatesRows = (dataNotes: any, dataFouls: any) => {
  let data: any = [...dataNotes];
  let dataStringify = [...dataNotes.map((value: any) => JSON.stringify(value))];

  for (const i in dataFouls) {
    if (dataStringify.indexOf(JSON.stringify(dataFouls[i])) == -1) {
      data.push(dataFouls[i]);
      dataStringify.push(JSON.stringify(dataFouls[i]));
    }
  }

  return data;
};
