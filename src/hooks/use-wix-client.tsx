import { WixClientContext } from "@/context/wix-context";
import { useContext } from "react";

export const useWixClient = () => {
  useContext(WixClientContext);
};
