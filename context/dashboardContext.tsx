import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useState } from "react";

export const DashboardContext = createContext({});

export const useDashboardContext = () => {
    return useContext(DashboardContext);
};

type Props = {
    children: ReactNode;
};

export enum DashboardType {
    OwesMe = "owesme",
    MyDebts = "mydebts",
}

export const DashboardContextProvider = ({ children }: Props) => {
    const [dashboardType, setDashboardType] = useState<DashboardType>(DashboardType.OwesMe);

    const router = useRouter();

    if (router.pathname === "/mydebts" && dashboardType !== DashboardType.MyDebts) {
        setDashboardType(DashboardType.MyDebts);
    } else if (router.pathname === "/owesme" && dashboardType !== DashboardType.OwesMe) {
        setDashboardType(DashboardType.OwesMe);
    }

    const contextValue = {
        dashboardType,
        setDashboardType,
    };

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    )
}