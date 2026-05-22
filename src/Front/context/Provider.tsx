import type { ReactNode } from "react";
import { WarehouseProvider } from "./Providers/WarehouseProvider";
import { PopupProvider } from "./Providers/PopupProvider";
import { SalesProvider } from "./Providers/SalesProvider";
import { InvoicesProvider } from "./Providers/InvoiceProvider";


export interface PropProviderType {
  children: ReactNode;
}


export const AppProviders = ({ children }: PropProviderType) => {
  return (
    <PopupProvider>
      <WarehouseProvider>
        <SalesProvider>
          <InvoicesProvider>
          {children}
          </InvoicesProvider>
        </SalesProvider>
      </WarehouseProvider>
    </PopupProvider>
  );
};