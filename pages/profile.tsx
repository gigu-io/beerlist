/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from '@heroicons/react/solid'
import { Skeleton } from '@mui/material';
import { User } from 'firebase/auth';
import ExportedImage from 'next-image-export-optimizer';
import { useEffect, useState } from 'react';
import { useUserContext } from '../context/userContext'
import { Switch } from '@headlessui/react'
import { onValue, ref, update } from 'firebase/database';
import { database } from '../firebase/firebaseAuth.client';
import { SmallUser } from '../components/overview/list/BeerlistDetails';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Profile() {

    const { user, loading }: any = useUserContext();

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);


    useEffect(() => {
        const userRef = ref(database, 'users/' + user.uid);
        onValue(userRef, (snapshot) => {
            if (snapshot.size > 0) {
                setNotificationsEnabled(snapshot.val().notificationsEnabled);
            } else {
                setNotificationsEnabled(false);
            }
          });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(notificationsEnabled);

    const handleNotificationsChange = (event: any) => {
        const updatedUser: SmallUser = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            notificationsEnabled: !notificationsEnabled
        }
        let updates: any = {};
        updates['/users/' + user.uid] = updatedUser;
        update(ref(database), updates);
    }


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow overflow-hidden rounded-lg">
                    <div className="px-4 py-5 sm:px-6 relative">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="divide-y divide-gray-200">
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
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    <span className="flex-grow flex flex-col">
                                        <span className="text-sm font-medium ">
                                            Enable Email Notifications
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            You will receive an email from <strong>beer.gigu.io@gmail.com</strong> when someone adds a debt to your list.
                                        </span>
                                    </span>
                                </dt>
                                <dd className="mt-10 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <Switch.Group as="div" className="block items-center justify-between">

                                        <Switch
                                            checked={notificationsEnabled}
                                            onChange={handleNotificationsChange}
                                            className={classNames(
                                                notificationsEnabled ? 'bg-tertiary' : 'bg-gray-200',
                                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0'
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0',
                                                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                )}
                                            />
                                        </Switch>
                                    </Switch.Group>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
