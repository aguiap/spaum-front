import {Chart} from "react-google-charts";

interface DefaultChartPieProps{
    data: any,
    options: any
}

export const DefaultChartPie = ({data, options}: DefaultChartPieProps) => {

    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    )
}