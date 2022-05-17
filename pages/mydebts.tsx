import Dashboard from '../components/overview/Dashboard';
import Loading from '../components/Loading';
import { useUserContext } from '../context/userContext';
import { Skeleton } from '@mui/material';

export default function MyDebts() {
    const { user, loading, error }: any = useUserContext();

    return (
        <div>
            {
                user && !loading ?
                    <Dashboard /> :
                    <Skeleton variant="rectangular" width="80%" height="100%" />
            }
        </div>
    )
}