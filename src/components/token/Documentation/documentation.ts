export const DOC_TEXT = {
 rulesAnalyses: "Regra de análise dos dados",
 forNotes: "Análise por notas",
 forFouls: "Análise por faltas",
 rulesAnalysesText: "Existem 4 tipos de separação para as análises, são: NORMAL, ALERTA, RUIM e INTERVENÇÃO.",
 rulesAnalysesText2: "Serão feitas análises por notas e por faltas. Caso não encontre nenhum curso cadastrado no sistema, será feita apenas a análise por notas. Caso o aluno não tenha feito a avaliação e não possua nota será considerado o valor 0 para a soma das notas.",
 forNotesNormal: "NORMAL: Todos os alunos que não encaixarem nas outras 3 regras.",
 forNotesAlertN1: "ALERTA até N1: Alunos com notas abaixo de 6",
 forNotesBadN1: "RUIM até N1: Alunos que não realizaram a avaliação e não possuem nota na N1",
 forNotesAlertN2: "ALERTA até N2: Alunos em que a soma das notas menos 18 der um total maior igual a 8 e menor que 9.",
 forNotesBadN2: "RUIM até N2: Alunos em que a soma das notas menos 18 der um total maior igual a 9 e menor igual a 10.",
 forNotesInterventionN2: "INTERVENÇÃO até N2: Alunos em que a soma das notas menos 18 der um total maior que 10.",
 forNotesAlertN3: "ALERTA até N3: Caso a soma das notas menos 18 der maior que 0, o aluno precisará fazer a N-1. Então será removido a menor nota do aluno " +
     "e convertida em 6 simulando a N-1, caso a soma dessas notas menos 18 der maior igual a 0 e menor que 2, será um caso de alerta.",
 forNotesBadN3: "RUIM até N3: Caso a soma das notas menos 18 der maior que 0, o aluno precisará fazer a N-1. Então será removido a menor nota do aluno " +
     "e convertida em 6 simulando a N-1, caso a soma dessas notas menos 18 der maior igual a 2 e menor que 4, será um caso ruim.",
 forNotesInterventionN3: "INTERVENÇÃO até N3: Caso a soma das notas menos 18 der maior que 0, o aluno precisará fazer a N-1. Então será removido a menor nota do aluno " +
     "e convertida em 6 simulando a N-1, caso a soma dessas notas menos 18 der maior que 4, será um caso de intervenção.",
 forNotesAlertNSubs: "ALERTA até N-1: Caso não tenha sido aprovado nem com a nota da N-1",
 forFoulsNormal: "NORMAL: Todos os alunos que não encaixarem nas outras 3 regras.",
 forFoulsText: "OBS: A regra é baseada em um cálculo com o total de horas da matéria, e a porcentagem de presença dessas horas até a N1, N2 e N3. Então " +
     "se a matéria conter x horas de carga total a presença definida até a N1 é de 34%, até a N2 é 67% e até N3 ficaria em 100%.",
 forFoulsText2: "OBS: A fórmula ficaria: ",
 forFoulsText3: "Parte 1: (Total de horas até N1|N2|N2) = (horas total da disciplina) * ((N1|N2|N3) / 100)",
 forFoulsText4: "Parte 2: (Total de faltas em porcentagem) = (faltas total) * 100 / (Total de horas até N1|N2|N2)",
 forFoulsText5: "OBS: Exemplo com disciplina com carga horária de 100h e simulando até a N1 e aluno com 16h de faltas",
 forFoulsText6: "Parte 1: Total de horas até N1 = 100 * (34 / 100) = 34",
 forFoulsText7: "Parte 2: Total de faltas em porcentagem = 16 * 100 / 34 = 47,05",
 forFoulsText8: "Parte 3: Resultado = 47,05% de faltas do aluno até a N1 que possui 34% das horas das 100h da disciplina.",
 forFoulsAlertN1: "ALERTA até N1: Caso a porcentagem de faltas do aluno em cima da porcentagem da N1 der maior igual a 30% e menor que 45%.",
 forFoulsBadN1: "RUIM até N1: Caso a porcentagem de faltas do aluno em cima da porcentagem da N1 der maior igual a 45% e menor que 70%.",
 forFoulsInterventionN1: "INTERVENÇÃO até N1: Caso a porcentagem de faltas do aluno em cima da porcentagem da N1 der maior igual a 70%.",
 forFoulsAlertN2: "ALERTA até N2: Caso a porcentagem de faltas do aluno em cima da porcentagem da N2 der maior igual a 20% e menor que 25%.",
 forFoulsBadN2: "RUIM até N2: Caso a porcentagem de faltas do aluno em cima da porcentagem da N2 der maior igual a 25% e menor que 30%.",
 forFoulsInterventionN2: "INTERVENÇÃO até N2: Caso a porcentagem de faltas do aluno em cima da porcentagem da N2 der maior igual a 30%.",
 forFoulsInterventionN3: "INTERVENÇÃO até N3: Caso a porcentagem de faltas do aluno em cima da porcentagem da N3 der maior igual a 25%.",
 forFoulsInterventionNSubs: "INTERVENÇÃO até N-1: Caso a porcentagem de faltas do aluno em cima da porcentagem da N3 der maior igual a 25%."
}