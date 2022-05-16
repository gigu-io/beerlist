import Dashboard from '../components/overview/Dashboard';
import Loading from '../components/Loading';
import { useUserContext } from '../context/userContext';

export default function OwesMe() {
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