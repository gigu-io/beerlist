import DeptsOverview from "./DepsOverview";

export enum StatusBackgroundColors {
    Green = "bg-green-200",
    Red = "bg-red-200",
    Orange = "bg-orange-200",
    Blue = "bg-secondary",
    Transparent = "bg-transparent",
    Gray = "bg-gray-100",
}

export enum StatusBackgroundHoverColors {
    Green = "sm:hover:bg-green-100",
    Red = "sm:hover:bg-red-100",
    Orange = "sm:hover:bg-orange-100",
    Blue = "sm:hover:bg-secondary",
    Transparent = "sm:hover:bg-transparent",
    Gray = "sm:hover:bg-gray-100",
}

export default function Dashboard() {
    return (
        <DeptsOverview />
    );
}