import { StatusBackgroundColors } from "../components/overview/Dashboard";
import { Debt } from "../components/overview/list/Beerlist";

export function getBackgroundColor(debt: Debt): string {
    if (debt.completedTimestamp) {
        return StatusBackgroundColors.Green;
    }
    if (debt.canceledTimestamp) {
        return StatusBackgroundColors.Red;
    }
    if (!debt.confirmedTimestamp) {
        return StatusBackgroundColors.Orange;
    }
    return StatusBackgroundColors.Transparent;
    
}