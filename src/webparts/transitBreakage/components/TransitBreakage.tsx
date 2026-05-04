import * as React from "react";
import type { ITransitBreakageProps } from "./ITransitBreakageProps";
import styles from "./TransitBreakage.module.scss";

const TransitBreakage: React.FC<ITransitBreakageProps> = ({ description }) => {
  return (
    <div className={styles.transitBreakage}>
      <h2>Transit Breakage</h2>
      <p>{description}</p>
    </div>
  );
};

export default TransitBreakage;
