import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Skeleton count={10} height={50} width={200} />
            <Skeleton count={10} height={50} width={200} />
            <Skeleton count={10} height={50} width={200} />
        </div>
    );


}