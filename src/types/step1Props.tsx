import { Dispatch, SetStateAction } from "react";

export interface DeployData {
    name: string;
    symbol: string;
  }
  
export  interface Step1Props {
    deployData: DeployData;
    setDeployData: Dispatch<SetStateAction<DeployData>>;
    error: string;
  }