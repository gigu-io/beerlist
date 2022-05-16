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
    Green = "hover:bg-green-100",
    Red = "hover:bg-red-100",
    Orange = "hover:bg-orange-100",
    Blue = "hover:bg-secondary",
    Transparent = "hover:bg-transparent",
    Gray = "hover:bg-gray-100",
}

export default function Dashboard() {
    return (
        <DeptsOverview />
    );
}