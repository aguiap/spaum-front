import { RequiredAttributes } from "@/components/console/UploadFile/enum";
import ApiSpaum from "@/services/spaum";
import { equalsNullOrUndefined } from "@/utils/functions";

export const convertDataToSend = async (data: any) => {
  let convertedData: any = {};
  convertedData.forEmail = ApiSpaum.encryptData(data.forEmail);
  convertedData.path = ApiSpaum.encryptData(data.path);
  convertedData.course = ApiSpaum.encryptData(data.course);
  convertedData.typeAnalyses = data.typeAnalyses;
  convertedData.dataProcessing = [];
  for (const i in data.dataProcessing) {
    convertedData.dataProcessing[i] = {
      name: ApiSpaum.encryptData(data.dataProcessing[i].name),
      value: []
    };
    for (const j in data.dataProcessing[i].value) {
      convertedData.dataProcessing[i].value[j] = {
        subject: ApiSpaum.encryptData(
          data.dataProcessing[i].value[j][RequiredAttributes.DISCIPLINA]
        ),
        name: ApiSpaum.encryptData(
          data.dataProcessing[i].value[j][RequiredAttributes.NOME]
        ),
        registration: ApiSpaum.encryptData(
          data.dataProcessing[i].value[j][RequiredAttributes.MATRICULA]
        ),
        noteOne: data.dataProcessing[i].value[j][RequiredAttributes.NOTA1],
        noteTwo: data.dataProcessing[i].value[j][RequiredAttributes.NOTA2],
        noteThree: data.dataProcessing[i].value[j][RequiredAttributes.NOTA3],
        noteSubs: data.dataProcessing[i].value[j][RequiredAttributes.NOTASUBS],
        totalFouls:
          data.dataProcessing[i].value[j][RequiredAttributes.FALTAS_TOTAL],
        statusNotes:
          data.dataProcessing[i].value[j][RequiredAttributes.TYPE_FOR_NOTE],
        statusFouls:
          data.dataProcessing[i].value[j][RequiredAttributes.TYPE_FOR_FOULS]
      };
    }
  }

  if (!equalsNullOrUndefined(convertedData))
    await ApiSpaum.sendEmail(convertedData);
};
