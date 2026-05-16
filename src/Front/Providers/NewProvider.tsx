import type { ReactNode } from "react";
import { WarehouseProvider } from "../Provider";
import { PopupProvider } from "./PopupProvider";
import { SalesProvider } from "./SalesContext";


export interface PropProviderType {
  children: ReactNode;
}


export const AppProviders = ({ children }: PropProviderType) => {
  return (
    <PopupProvider>
      <WarehouseProvider>
        <SalesProvider>
          {children}
        </SalesProvider>
      </WarehouseProvider>
    </PopupProvider>
  );
};