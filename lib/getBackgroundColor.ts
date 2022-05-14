import { StatusBackgroundColors } from "../components/overview/Dashboard";
import { Bet } from "../components/overview/list/Beerlist";

export function getBackgroundColor(bet: Bet): string {
    if (bet.completedTimestamp) {
        return StatusBackgroundColors.Green;
    }
    if (bet.cancelledTimestamp) {
        return StatusBackgroundColors.Red;
    }
    if (!bet.confirmedTimestamp) {
        return StatusBackgroundColors.Orange;
    }
    return StatusBackgroundColors.Transparent;
    
}