import type { ReactNode } from "react";
import { WarehouseProvider } from "./Providers/WarehouseContext";
import { PopupProvider } from "./Providers/PopupProvider";
import { SalesProvider } from "./Providers/SalesContext";


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