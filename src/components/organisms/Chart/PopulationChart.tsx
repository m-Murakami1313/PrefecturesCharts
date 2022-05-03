import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

type PopulationType = {
  population: {
    populationId: number | string;
    prefectureName: string;
    data: string[] | number[];
  }[];
};

export const PopulationChart: React.FC<PopulationType> = React.memo(
  ({ population }) => {
    const options = {
      title: {
        text: "人口増減数",
      },
      yAxis: {
        title: {
          text: "人口総数",
        },
      },
      xAxis: {
        title: {
          text: "年度",
        },
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        },
      },
      series: population.map(
        (p: { prefectureName: string; data: string[] | number[] }) => ({
          name: p.prefectureName,
          data: p.data.map((v: number | string | any) => [v.year, v.value]),
        })
      ),
    };
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
);
