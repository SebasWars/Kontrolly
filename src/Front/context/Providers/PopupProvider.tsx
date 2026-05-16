import { createContext, type ReactNode } from "react";

export interface PopupContextType {
  popup: PopupState;
  showPopup: (data: PopupState) => void;
  hidePopup: () => void;
}

type PopupState = {
  open: boolean,
  type: "create" | "update" | "sale" | null;
  title: string;
  message: string;
}

export interface PropProviderType {
  children: ReactNode;
}

export const PopupContext = createContext<
  PopupContextType | undefined
>(undefined);

import { useState } from "react";

export const PopupProvider = ({ children }: PropProviderType) => {
  const [popup, setPopup] = useState<PopupState>({
    open: false,
    type: null,
    title: "",
    message: "",
  });

  const showPopup = (data: PopupState) => {
    setPopup({
      open: data.open,
      type: data.type,
      title: data.title,
      message: data.message
    });
  };

  const hidePopup = () => {
    setPopup((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <PopupContext.Provider
      value={{
        popup,
        showPopup,
        hidePopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};