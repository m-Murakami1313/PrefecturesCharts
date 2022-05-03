import React from "react";

import styles from "./CheckBox.module.scss";

type PrefecturesType = {
  prefectures: {
    prefName: string;
    prefCode: string;
  }[];
  handleCheckValue: React.ChangeEventHandler<HTMLInputElement>;
};

export const CheckBox: React.FC<PrefecturesType> = React.memo(
  ({ prefectures, handleCheckValue }) => {
    return (
      <div className={styles.CheckBoxContainer}>
        {prefectures.map(
          (prefecture: { prefName: string; prefCode: string }) => (
            <div key={prefecture.prefName} className={styles.CheckBoxItem}>
              <input
                className={styles.CheckBox}
                type="checkbox"
                id={prefecture.prefCode}
                name={prefecture.prefName}
                onChange={handleCheckValue}
              />
              <label htmlFor={prefecture.prefCode}>{prefecture.prefName}</label>
            </div>
          )
        )}
      </div>
    );
  }
);