/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

type ModalContextType = {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const modalContext = React.createContext<ModalContextType>({
  value: false,
  onChange: () => {},
});