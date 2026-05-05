import * as React from "react";
import type { ITransitBreakageProps } from "./ITransitBreakageProps";
import styles from "./TransitBreakage.module.scss";
import { useEffect } from "react";
import { getAllItems } from "../../../shared/services/sharepoint/spService";
const TransitBreakage: React.FC<ITransitBreakageProps> = ({ description }) => {
  useEffect(() => {
    getAllItems("TB_BreakageDetails").then((items) => {
      console.log(items);
    });
  }, []);
  return (
    <div className={styles.transitBreakage}>
      <h2>Transit Breakage</h2>
      <p>{description}</p>
    </div>
  );
};

export default TransitBreakage;
