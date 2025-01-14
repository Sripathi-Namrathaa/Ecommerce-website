import { useContext } from "react";
import { WixClientContext } from "@/context/wix-context";

export const useWixClient = () => {
  const wixClient = useContext(WixClientContext);
  if (!wixClient) {
    throw new Error("Wix client is not available in context.");
  }
  return wixClient;
};
