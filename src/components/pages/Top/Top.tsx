import { useState, useEffect } from "react";

import { Header } from "../../organisms/Header/Header";
import styles from "./Top.module.scss";
import { CheckBox } from "../../UI/CheckBox/CheckBox";
import { PopulationChart } from "../../organisms/Chart/PopulationChart";
import { UseCheckValue } from "../../../hooks/UseCheckValue";

export const Top = () => {
  const { population, handleCheckValue } = UseCheckValue();
  const [prefectures, setPrefectures] = useState<[]>([]);

  const APIKEY: string = process.env.REACT_APP_RESAS_API_KEY || "";
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("x-api-key", APIKEY);

  useEffect(() => {
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      headers: { "x-api-key": APIKEY },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrefectures(data.result);
      })
      .catch(() => {
        console.log("取得に失敗しました");
      });
  }, []);

  return (
    <div className={styles.top}>
      <Header />
      <div className={styles.wrap}>
        {prefectures && (
          <CheckBox
            prefectures={prefectures}
            handleCheckValue={handleCheckValue}
          />
        )}
        <PopulationChart population={population} />
      </div>
    </div>
  );
};
