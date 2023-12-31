import {DocumentationComponent, SubTitleBox, TextBox, TitleBox} from "@/components/token/Documentation/styled";
import {DOC_TEXT} from "@/components/token/Documentation/documentation";

export const Documentation = () => {
    return (
        <DocumentationComponent>
            <TitleBox>
                <h3>{DOC_TEXT.rulesAnalyses}</h3>
            </TitleBox>
            <TextBox>
                <p>
                    {DOC_TEXT.rulesAnalysesText}
                </p>
                <p>
                    {DOC_TEXT.rulesAnalysesText2}
                </p>
            </TextBox>
            <SubTitleBox>
                <h3>{DOC_TEXT.forNotes}</h3>
            </SubTitleBox>
            <TextBox>
                <p>
                    {DOC_TEXT.forNotes2}
                </p>
                <ul>
                    <li>
                        <p>{DOC_TEXT.forNotesNormal}</p>
                    </li>
                </ul>
                <ul>
                    <li>
                        <p>{DOC_TEXT.forNotesAlert}</p>
                    </li>
                    <ul>
                        <li>
                            <p>{DOC_TEXT.forNotesAlertN1}</p>
                        </li>
                        <li>
                            <p>{DOC_TEXT.forNotesAlertN2}</p>
                        </li>
                        <li>
                            <p>{DOC_TEXT.forNotesAlertN3}</p>
                        </li>
                        <li>
                            <p>{DOC_TEXT.forNotesAlertNSubs}</p>
                        </li>
                    </ul>
                </ul>
                <ul>
                    <li>
                        <p>{DOC_TEXT.forNotesBad}</p>
                    </li>
                    <ul>
                        <li>
                            <p>{DOC_TEXT.forNotesBadN1}</p>
                        </li>
                        <li>
                            <p>{DOC_TEXT.forNotesBadN2}</p>
                        </li>
                        <li>
                            <p>{DOC_TEXT.forNotesBadN3}</p>
                        </li>
                    </ul>
                </ul>
                <ul>
                    <li>
                        <p>{DOC_TEXT.forNotesIntervention}</p>
                    </li>
                    <ul>
                        <li>
                            <p>{DOC_TEXT.forNotesInterventionN2}</p>
                        </li>
                        <li>
                            <p>{DOC_TEXT.forNotesInterventionN3}</p>
                        </li>
                    </ul>
                </ul>
            </TextBox>
            <SubTitleBox>
                <h3>{DOC_TEXT.forFouls}</h3>
            </SubTitleBox>
            <TextBox>
                <p>
                    {DOC_TEXT.forFouls2}
                </p>
                <ul>
                    <li>
                        <p>{DOC_TEXT.forNotesNormal}</p>
                    </li>
                </ul>
                <ul>
                    <li>
                        <p>{DOC_TEXT.forFoulsAlert}</p>
                    </li>
                    <ul>
                        <li>
                            <p>{DOC_TEXT.forFoulsAlertN1}</p>
                        </li>
                        <li>
                            <p>{DOC_TEXT.forFoulsAlertN2}</p>
                        </li>
                    </ul>
                </ul>
                <ul>
                    <li>
                        <p>{DOC_TEXT.forFoulsBad}</p>
                    </li>
                    <ul>
                        <li>
                            <p>{DOC_TEXT.forFoulsBadN1}</p>
                        </li>
                        <li>
                            <p>{DOC_TEXT.forFoulsBadN2}</p>
                        </li>
                    </ul>
                </ul>
                <ul>
                    <li>
                        <p>{DOC_TEXT.forFoulsIntervention}</p>
                    </li>
                    <ul>
                        <li>
                            <p>{DOC_TEXT.forFoulsInterventionN1}</p>
                        </li>
                        <li>
                            <p>{DOC_TEXT.forFoulsInterventionN2}</p>
                        </li>
                        <li>
                            <p>{DOC_TEXT.forFoulsInterventionN3}</p>
                        </li>
                        <li>
                            <p>{DOC_TEXT.forFoulsInterventionNSubs}</p>
                        </li>
                    </ul>
                </ul>
                <p></p>
                <p>
                    {DOC_TEXT.forFoulsText}
                </p>
                <p>
                    {DOC_TEXT.forFoulsText2}
                </p>
                <p>
                    {DOC_TEXT.forFoulsText3}
                </p>
                <p>
                    {DOC_TEXT.forFoulsText4}
                </p>
                <p>
                    {DOC_TEXT.forFoulsText5}
                </p>
                <p>
                    {DOC_TEXT.forFoulsText6}
                </p>
                <p>
                    {DOC_TEXT.forFoulsText7}
                </p>
                <p>
                    {DOC_TEXT.forFoulsText8}
                </p>
            </TextBox>
        </DocumentationComponent>
    );
};
