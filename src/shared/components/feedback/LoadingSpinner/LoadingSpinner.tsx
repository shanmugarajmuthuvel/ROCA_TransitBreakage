import * as React from "react";
import { Spinner, SpinnerSize } from "@fluentui/react";
import type { ILoadingSpinnerProps } from "./ILoadingSpinnerProps";

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({ label = "Loading...", size = "medium" }) => {
  return <Spinner label={label} size={SpinnerSize[size]} />;
};

export default LoadingSpinner;
