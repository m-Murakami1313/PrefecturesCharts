import { useState, useCallback } from "react";

type PopulationType = {
  populationId: number | string;
  prefectureName: string;
  data: string[] | number[];
};
export const UseCheckValue = () => {
  const [population, setPopulation] = useState<PopulationType[]>([]);

  const handleCheckValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const targetValue: number | string = e.target.id;
      const targetName: string = e.target.name;
      const URL =
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=" +
        targetValue;
      const req = new Request(URL);
      const APIKEY: string = process.env.REACT_APP_RESAS_API_KEY || "";
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set("x-api-key", APIKEY);
      const deletePopulation = population.filter((p: PopulationType) => {
        return p.populationId !== targetValue;
      });
      const some = population.some(
        (p: PopulationType) => p.populationId === targetValue
      );
      some
        ? setPopulation(deletePopulation)
        : fetch(req, {
            headers: requestHeaders,
          })
            .then((res: Response) => res.json())
            .then((data) => {
              const newData = {
                populationId: targetValue,
                prefectureName: targetName,
                data: data.result.data[0].data,
              };
              const results = [...population, newData];
              setPopulation(results);
            })
            .catch(() => {
              console.log("人口のデータの取得に失敗しました");
            });
    },
    [population]
  );
  return { population, handleCheckValue };
};
