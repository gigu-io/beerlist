/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from '@heroicons/react/solid'
import { Skeleton } from '@mui/material';
import { User } from 'firebase/auth';
import ExportedImage from 'next-image-export-optimizer';
import { useUserContext } from '../context/userContext'

export default function Profile() {

    const { user, loading }: any = useUserContext();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 relative">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Profile Picture</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{
                                    !loading && user ?
                                        <ExportedImage
                                            src={user.photoURL}
                                            alt="beerlist logo"
                                            width={60}
                                            height={60}
                                            className="rounded-full"
                                        // unoptimized={true}
                                        /> :
                                        <Skeleton variant="circular" width={60} height={60} />
                                }</dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Display Name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{
                                    !loading && user ?
                                        user.displayName :
                                        <Skeleton width="100%" height="20px" />
                                }</dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{
                                    !loading && user ?
                                        user.email :
                                        < Skeleton width="100%" height="20px" />
                                }</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
