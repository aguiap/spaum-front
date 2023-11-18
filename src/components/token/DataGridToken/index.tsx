import Box from "@mui/material/Box";
import {GridCellParams, GridColDef} from "@mui/x-data-grid";
import {useState} from "react";
import {
    ChartBox,
    FabButton,
    StyledDataGrid,
    TabComponent,
    TabsComponent
} from "@/components/token/DataGridToken/styled";
import {equalsNullOrUndefined, isNotEmpty, tx} from "@/utils/functions";
import Image from "next/image";
import {Tooltip} from "@mui/material";
import {DefaultChartPie} from "@/components/DefaultChartPie";
import {exportToExcel} from "@/components/token/DataGridToken/utils";
import {grayColor, orangeColor, redColor, yellowColor} from "@/utils/constant/colors";

const columns: GridColDef[] = [
    {
        field: "registration",
        headerName: tx("Token.registration"),
        width: 100,
        cellClassName: "column_registration"
    },
    {
        field: "name",
        headerName: tx("Token.name"),
        width: 110
    },
    {
        field: "statusNotes",
        headerName: tx("Token.statusNotes"),
        width: 150,
        cellClassName: (params: GridCellParams) => {
            if (params.value == null) return "";
            const label = tx(params.value.toString());
            return `column--${label}`;
        }
    },
    {
        field: "statusFouls",
        headerName: tx("Token.statusFouls"),
        width: 150,
        cellClassName: (params: GridCellParams) => {
            if (params.value == null) return "";
            const label = tx(params.value.toString());
            return `column--${label}`;
        }
    },
    {
        field: "subject",
        headerName: tx("Token.subject"),
        width: 300
    },
    {
        field: "noteOne",
        headerName: tx("Token.noteOne"),
        type: "number",
        width: 110
    },
    {
        field: "noteTwo",
        headerName: tx("Token.noteTwo"),
        type: "number",
        width: 110
    },
    {
        field: "noteThree",
        headerName: tx("Token.noteThree"),
        type: "number",
        width: 110
    },
    {
        field: "noteSubs",
        headerName: tx("Token.noteSubs"),
        type: "number",
        width: 110
    },
    {
        field: "totalFouls",
        headerName: tx("Token.totalFouls"),
        type: "number",
        width: 110
    },
    {
        field: "course",
        headerName: tx("Token.course"),
        width: 100
    },
    {
        field: "typeAnalyses",
        headerName: tx("Token.typeAnalyses"),
        width: 110
    }
];

interface DataGridTokenProps {
    data: any;
    fileName: string;
}

const initialChartsData = [
    ["Status", "Total"],
    ["Normal", 0],
    ["Alerta", 0],
    ["Ruim", 0],
    ["Intervenção", 0]
];

export default function DataGridToken({data, fileName}: DataGridTokenProps) {
    const [visibleRowsLookup, setVisibleRowsLookup] = useState<any>({});
    const [value, setValue] = useState("table");
    const [chartsDataNote, setChartsDataNote] = useState(initialChartsData);
    const [chartsDataFouls, setChartsDataFouls] = useState(initialChartsData);
    const [filteredData, setFilteredData] = useState([]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        const filteredData = getFilteredData();
        getChartsData(filteredData);
        setFilteredData(filteredData)
        setValue(newValue);
    };

    const handleDownload = () => {
        exportToExcel(getFilteredData(), fileName).then();
    };

    const getFilteredData = () => {
        let filteredData: any = [];
        if (
            visibleRowsLookup == null &&
            Object.values(visibleRowsLookup).length === 0
        ) {
            return data;
        } else {
            for (const i in visibleRowsLookup) {
                if (visibleRowsLookup[i]) {
                    const value = data.filter((value: any) => value.id == i);
                    if (isNotEmpty(value)) filteredData.push(value[0]);
                }
            }
        }
        return filteredData;
    };

    const getChartsData = (filteredData: any) => {
        const normalTotalNotes = filteredData.filter((value: any) =>
            equalsNullOrUndefined(value.statusNotes)
        ).length;
        const alertTotalNotes = filteredData.filter((value: any) => value.statusNotes === "ALERTA")
            .length;
        const badTotalNotes = filteredData.filter((value: any) => value.statusNotes === "RUIM").length;
        const interventionTotalNotes = filteredData.filter((value: any) => value.statusNotes === "INTERVENÇÃO")
            .length;

        const normalTotalFouls = filteredData.filter((value: any) =>
            equalsNullOrUndefined(value.statusFouls)
        ).length;
        const alertTotalFouls = filteredData.filter((value: any) => value.statusFouls === "ALERTA")
            .length;
        const badTotalFouls = filteredData.filter((value: any) => value.statusFouls === "RUIM").length;
        const interventionTotalFouls = filteredData.filter((value: any) => value.statusFouls === "INTERVENÇÃO")
            .length;

        setChartsDataNote([
            ["Status", "Total"],
            [
                `Normal: ${normalTotalNotes}`,
                normalTotalNotes
            ],
            [
                `Alerta: ${alertTotalNotes}`,
                alertTotalNotes
            ],
            [
                `Ruim: ${badTotalNotes}`,
                badTotalNotes
            ],
            [
                `Intervenção: ${interventionTotalNotes}`,
                interventionTotalNotes
            ]
        ]);
        setChartsDataFouls([
            ["Status", "Total"],
            [
                `Normal: ${normalTotalFouls}`,
                normalTotalFouls
            ],
            [
                `Alerta: ${alertTotalFouls}`,
                alertTotalFouls
            ],
            [
                `Ruim: ${badTotalFouls}`,
                badTotalFouls
            ],
            [
                `Intervenção: ${interventionTotalFouls}`,
                interventionTotalFouls
            ]
        ]);
    };

    return (
        <>
            <Box sx={{width: "100%", height: "10vh"}}>
                <TabsComponent
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <TabComponent value="table" label={tx("Console.table")}/>
                    <TabComponent value="charts" label={tx("Console.charts")}/>
                </TabsComponent>
            </Box>
            <div hidden={value !== "table"}>
                <Box sx={{height: "90vh", width: "100%"}}>
                    <StyledDataGrid
                        onStateChange={(e) => setVisibleRowsLookup(e.visibleRowsLookup)}
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10
                                }
                            }
                        }}
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                        getRowClassName={(params) => {
                            if (
                                params.row.statusNotes == "INTERVENÇÃO" ||
                                params.row.statusFouls == "INTERVENÇÃO"
                            )
                                return `row--INTERVENTION`;
                            if (
                                params.row.statusNotes == "RUIM" ||
                                params.row.statusFouls == "RUIM"
                            )
                                return `row--BAD`;
                            return `row--ALERT`;
                        }}
                    />
                </Box>
                <Tooltip title={tx("downloadExcel")} arrow>
                    <FabButton onClick={handleDownload}>
                        <Image
                            src="../images/download.svg"
                            alt={tx("excelIcon")}
                            width={30}
                            height={30}
                        ></Image>
                    </FabButton>
                </Tooltip>
            </div>
            <div hidden={value !== "charts"}>
                <ChartBox>
                    <DefaultChartPie
                        data={chartsDataNote}
                        options={{
                            title: tx("Console.Charts.noteStatus") + ` - Total ${filteredData.length}`,
                            colors: [grayColor, yellowColor, orangeColor, redColor],
                        }}
                    ></DefaultChartPie>

                    <DefaultChartPie
                        data={chartsDataFouls}
                        options={{
                            title: tx("Console.Charts.foulStatus") + ` - Total ${filteredData.length}`,
                            colors: [grayColor, yellowColor, orangeColor, redColor],
                        }}
                    ></DefaultChartPie>
                </ChartBox>
            </div>
        </>
    );
}
