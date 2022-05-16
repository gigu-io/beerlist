import Dashboard from '../components/overview/Dashboard';
import Loading from '../components/Loading';
import { useUserContext } from '../context/userContext';
import { DashboardType, useDashboardContext } from '../context/dashboardContext';

export default function MyDebts() {
    const { user, loading, error }: any = useUserContext();

    return (
        <div>
            {
                loading ?
                    <Loading /> :
                    user && !error ?
                        <Dashboard /> :
                        null
            }
        </div>
    )
}