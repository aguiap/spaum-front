import XLSX from "sheetjs-style";
import { saveAs } from "file-saver";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheethtml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const exportToExcel = async (data: any, fileName: string) => {
  const excelData = convertDataToExcelData(data);
  const ws = XLSX.utils.json_to_sheet(excelData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], { type: fileType });
  fileName = fileName.replace(".xlsx", "");
  fileName = fileName.replace(".xls", "");
  fileName = fileName.replace(".csv", "");
  fileName = fileName + "_FILTRADO";

  saveAs(dataBlob, fileName + fileExtension);
};

const convertDataToExcelData = (data: any) => {
  let excelData = [];
  for (const i in data) {
    excelData.push({
      MATRÍCULA: data[i].registration,
      NOME: data[i].name,
      "STATUS POR NOTAS": data[i].statusNotes,
      "STATUS POR FALTAS": data[i].statusFouls,
      DISCIPLINA: data[i].subject,
      NOTA1: data[i].noteOne,
      NOTA2: data[i].noteTwo,
      NOTA3: data[i].noteThree,
      NOTASUBS: data[i].noteSubs,
      "TOTAL DE FALTAS": data[i].totalFouls,
      CURSO: data[i].course,
      "TIPO DE ANÁLISE": data[i].typeAnalyses
    });
  }
  return excelData;
};
