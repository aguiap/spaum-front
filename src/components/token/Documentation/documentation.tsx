export const DOC_TEXT = {
    rulesAnalyses: "Regra de análise dos dados",
    forNotes2: (<span>Os alunos são classificados em quatro categorias, de acordo com as suas notas e as avaliações que realizaram: <b>NORMAL</b>, <b>ALERTA</b>, <b>CRÍTICO</b> e <b>INTERVENÇÃO</b>.</span>),
    forNotes: "Análise por notas",
    forFouls: "Análise por faltas",
    forFouls2: (<span>Os alunos são classificados em quatro categorias, de acordo com as suas faltas e as horas da matéria: <b>NORMAL</b>, <b>ALERTA</b>, <b>CRÍTICO</b> e <b>INTERVENÇÃO</b>.</span>),
    rulesAnalysesText: (
        <span>Para fazer as análises, os dados são separados em quatro categorias: <b>NORMAL</b>, <b>ALERTA</b>, <b>CRÍTICO</b> e <b>INTERVENÇÃO</b>.</span>),
    rulesAnalysesText2: (
        <span>As análises são baseadas nas notas e nas faltas dos alunos. Se o sistema não encontrar nenhum curso cadastrado, ele fará apenas a análise das notas. Se o aluno não tiver feito a avaliação ou não tiver nota, ele receberá o valor <b>0</b> na soma das notas</span>),
    forNotesNormal: (<span><b>NORMAL:</b> Alunos que não se enquadram em nenhuma das outras categorias.</span>),
    forNotesAlert: (
        <span><b>ALERTA:</b> Alunos que precisam de atenção para melhorar o seu desempenho. São considerados em alerta:</span>),
    forFoulsAlert: (
        <span><b>ALERTA:</b> Alunos que precisam de atenção para reduzir as suas faltas. São considerados em alerta:</span>),
    forNotesBad: (
        <span><b>CRÍTICO:</b> Alunos que estão em situação crítica e precisam de intervenção urgente. São considerados em situação criticas:</span>),
    forFoulsBad: (
        <span><b>CRÍTICO:</b> Alunos que estão em situação crítica e precisam de intervenção urgente. São considerados em situação criticas:</span>),
    forNotesIntervention: (<span><b>INTERVENÇÃO:</b> Alunos que estão em risco de reprovação e precisam de ações imediatas. São considerados em intervenção:</span>),
    forFoulsIntervention: (<span><b>INTERVENÇÃO:</b> Alunos que estão em risco de reprovação e precisam de ações imediatas. São considerados em intervenção:</span>),
    forNotesAlertN1: "Até a N1, os alunos com notas abaixo de 6.",
    forNotesBadN1: "Até a N1, os alunos que não realizaram a avaliação e não possuem nota na N1.",
    forNotesAlertN2: "Até a N2, os alunos cuja soma das notas menos 18 seja maior ou igual a 8 e menor que 9.",
    forNotesBadN2: "Até a N2, os alunos cuja soma das notas menos 18 seja maior ou igual a 9 e menor ou igual a 10.",
    forNotesInterventionN2: "Até a N2, os alunos cuja soma das notas menos 18 seja maior que 10.",
    forNotesAlertN3: "Até a N3, os alunos que precisam fazer a N-1 e que, ao remover a menor nota e substituí-la por 6, tenham uma soma das notas menos 18 maior ou igual a 0 e menor que 2.",
    forNotesBadN3: "Até a N3, os alunos que precisam fazer a N-1 e que, ao remover a menor nota e substituí-la por 6, tenham uma soma das notas menos 18 maior ou igual a 2 e menor que 4.",
    forNotesInterventionN3: "Até a N3, os alunos que precisam fazer a N-1 e que, ao remover a menor nota e substituí-la por 6, tenham uma soma das notas menos 18 maior que 4.",
    forNotesAlertNSubs: "Até a N-1, os alunos que não foram aprovados mesmo com a nota da N-1.",
    forFoulsNormal: (<span><b>NORMAL:</b> Alunos que não se enquadram em nenhuma das outras categorias.</span>),
    forFoulsText: (<span><b>OBS:</b> A regra é baseada em um cálculo com o total de horas da matéria, e a porcentagem de presença dessas horas até a N1, N2 e N3. Então se a matéria conter x horas de carga total, a presença definida até a N1 é de 34%, até a N2 é 67% e até N3 ficaria em 100%.</span>),
    forFoulsText2: (<span><b>OBS:</b> A fórmula ficaria:</span>),
    forFoulsText3: "Parte 1: (Total de horas até N1|N2|N3) = (horas total da disciplina) * ((N1|N2|N3) / 100)",
    forFoulsText4: "Parte 2: (Total de faltas em porcentagem) = (faltas total) * 100 / (Total de horas até N1|N2|N3))",
    forFoulsText5: (<span><b>OBS:</b> Exemplo com disciplina com carga horária de 100h e simulando até a N1 e aluno com 16h de faltas</span>),
    forFoulsText6: "Parte 1: Total de horas até N1 = 100 * (34 / 100) = 34",
    forFoulsText7: "Parte 2: Total de faltas em porcentagem = 16 * 100 / 34 ≈≈ 47,05",
    forFoulsText8: "Parte 3: Resultado = 47,05% de faltas do aluno até a N1 que possui 34% das horas das 100h da disciplina.",
    forFoulsAlertN1: "Até a N1, os alunos cuja porcentagem de faltas sobre as horas da N1 seja maior ou igual a 30% e menor que 45%.",
    forFoulsBadN1: "Até a N1, os alunos cuja porcentagem de faltas sobre as horas da N1 seja maior ou igual a 45% e menor que 70%.",
    forFoulsInterventionN1: "Até a N1, os alunos cuja porcentagem de faltas sobre as horas da N1 seja maior ou igual a 70%.",
    forFoulsAlertN2: "Até a N2, os alunos cuja porcentagem de faltas sobre as horas da N2 seja maior ou igual a 20% e menor que 25%.",
    forFoulsBadN2: "Até a N2, os alunos cuja porcentagem de faltas sobre as horas da N2 seja maior ou igual a 25% e menor que 30%.",
    forFoulsInterventionN2: "Até a N2, os alunos cuja porcentagem de faltas sobre as horas da N2 seja maior ou igual a 30%.",
    forFoulsInterventionN3: "Até a N3, os alunos cuja porcentagem de faltas sobre as horas da N3 seja maior ou igual a 25%.",
    forFoulsInterventionNSubs: "Até a N-1, os alunos cuja porcentagem de faltas sobre as horas da N3 seja maior ou igual a 25%."
}