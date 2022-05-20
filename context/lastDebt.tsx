import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useState } from "react";

export const LastDebtContext = createContext({});

export const useLastDebtContext = () => {
    return useContext(LastDebtContext);
};

type Props = {
    children: ReactNode;
};

export const LastDebtContextProvider = ({ children }: Props) => {
    const [lastDebt, setLastDebt] = useState<number>();

    const contextValue = {
        lastDebt,
        setLastDebt,
    };

    return (
        <LastDebtContext.Provider value={contextValue}>
            {children}
        </LastDebtContext.Provider>
    )
}