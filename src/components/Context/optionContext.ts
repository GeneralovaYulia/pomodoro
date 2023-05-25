/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

type OptionContextType = {
    option: string;
    optionChange: (value: string) => void;
}

export const optionContext = React.createContext<OptionContextType>({
    option: '',
    optionChange: () => { },
});