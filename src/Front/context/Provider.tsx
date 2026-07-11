import type { ReactNode } from "react";
import { WarehouseProvider } from "./Providers/WarehouseProvider";
import { PopupProvider } from "./Providers/PopupProvider";
import { SalesProvider } from "./Providers/SalesProvider";
import { InvoicesProvider } from "./Providers/InvoiceProvider";
import { ClientsProvider } from "./Providers/ClientsProvider";
import { AuthorizationProvider } from "./Providers/AuthorizationProvider";

export interface PropProviderType {
  children: ReactNode;
}

export const AppProviders = ({ children }: PropProviderType) => {
  return (
    <AuthorizationProvider>
      <PopupProvider>
        <WarehouseProvider>
          <SalesProvider>
            <ClientsProvider>
              <InvoicesProvider>{children}</InvoicesProvider>
            </ClientsProvider>
          </SalesProvider>
        </WarehouseProvider>
      </PopupProvider>
    </AuthorizationProvider>
  );
};
