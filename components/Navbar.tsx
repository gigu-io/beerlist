/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, PlusIcon, XIcon } from '@heroicons/react/outline'
import { LogoutIcon, PlusSmIcon } from '@heroicons/react/solid'
import ExportedImage from "next-image-export-optimizer";
import { useUserContext } from '../context/userContext'
import { Skeleton } from '@mui/material'
import { NewDebtForm } from './forms/NewDebtForm';
import { Dialog } from '@headlessui/react';
import { DashboardType, useDashboardContext } from '../context/dashboardContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const [showNewDebtForm, setShowNewDebtForm] = useState(false);

    const { user, logoutUser, loading, error }: any = useUserContext();

    const { dashboardType, setDashboardType }: any = useDashboardContext();

    const router = useRouter();

    const userNavigation = [
        // { name: 'Your Profile', onClickFunction: () => { } },
        {
            name: 'Profile', onClickFunction: () => {
                router.push('/profile');
            }
        },
        { name: 'Sign out', onClickFunction: () => { logoutUser() } },
    ]
    const navigation = [
        {
            name: 'Owes Me', onClickFunction: () => {
                router.push('/owesme')
                setDashboardType(DashboardType.OwesMe)
            }, current: dashboardType === DashboardType.OwesMe
        },
        {
            name: 'My Debts', onClickFunction: () => {
                router.push('/mydebts')
                setDashboardType(DashboardType.MyDebts)
            }, current: dashboardType === DashboardType.MyDebts
        },
    ]

    return (

        <Disclosure as="nav" className="bg-secondary mb-6 w-full z-50">
            {({ open }) => (
                <div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20">
                            <div className="flex">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-stroke focus:outline-none ">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-10 w-10" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-10 w-10" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                    {navigation.map((item) => (
                                        <button
                                            key={item.name}
                                            onClick={item.onClickFunction}
                                            className={classNames(
                                                item.current ? 'bg-tertiary text-white hover:bg-tertiary-dark' : 'text-white hover:bg-tertiary',
                                                'px-3 py-2 rounded-md text-base font-medium transition-colors ease-in-out'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setShowNewDebtForm(!showNewDebtForm)}
                                        className="text-white relative inline-flex items-center text-xl sm:text-base font-extrabold sm:font-medium bg-tertiary p-2 sm:hover:-translate-x-1 hover:active:-translate-x-1 rounded-lg transition-all duration-300 ease-in-out">
                                        <PlusIcon className="h-6 w-6" aria-hidden="true" />
                                        New Debt

                                    </button>
                                </div>

                                <Transition.Root show={showNewDebtForm} as={Fragment}>
                                    <Dialog as="div" className="relative z-10" onClose={setShowNewDebtForm}>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                        </Transition.Child>

                                        <div className="fixed z-10 inset-0 overflow-y-auto">
                                            <div className="flex items-center justify-center min-h-full text-center p-0">
                                                <NewDebtForm setShowNewDebtForm={setShowNewDebtForm} />
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition.Root>

                                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button className="bg-gray-800 flex text-base rounded-full">
                                                <span className="sr-only">Open user menu</span>
                                                {
                                                    user && !loading ?
                                                        <ExportedImage
                                                            className="rounded-full"
                                                            src={user.photoURL}
                                                            alt="User"
                                                            width={46}
                                                            height={46}
                                                        // unoptimized={true}
                                                        />
                                                        :
                                                        <Skeleton variant="circular" width={46} height={46} />
                                                }
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 shadow-lg rounded-md z-20 bg-secondary">
                                                {userNavigation.map((item) => (
                                                    <div
                                                        key={item.name}
                                                        onClick={item.onClickFunction}
                                                        className="hover:bg-tertiary hover:shadow-xl transition-all duration-300 ease-in-out first:rounded-t-md last:rounded-b-md rounded-none "
                                                    >
                                                        <div
                                                            className='block px-4 py-2 text-base text-button-text font-bold hover:translate-x-1 transition-all duration-300 ease-in-out cursor-pointer'
                                                        >
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu, show/hide based on menu open state. */}
                    <Transition
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="max-h-0"
                        enterTo=" max-h-full"
                        leave="ease-in-out duration-200"
                        leaveFrom=" max-h-full"
                        leaveTo=" max-h-0"
                    >
                        <Disclosure.Panel className="absolute max-h-0 z-10 shadow-lg w-full md:hidden overflow-hidden rounded-b-md bg-secondary">
                            <div className="p-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        onClick={item.onClickFunction}
                                        className={classNames(
                                            item.current ? 'bg-tertiary text-white hover:active:bg-tertiary-dark hover:active:border-tertiary-dark border-tertiary border-4' : 'text-white border-4 border-white hover:active:bg-tertiary hover:active:border-tertiary',
                                            'block px-3 py-2 rounded-md text-xl font-extrabold w-full text-center transition-all duration-150 ease-in-out mb-2'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="p-2">
                                <Disclosure.Button
                                    onClick={
                                        () => {
                                            setDashboardType(null)
                                            router.push('/profile')
                                        }
                                    }
                                    className='mb-6 flex text-white border-4 border-white px-3 py-2 rounded-md text-2xl font-extrabold w-full text-center transition-all duration-150 ease-in-out'
                                >
                                    <div className="mt-1">
                                        {
                                            user && !loading ?
                                                <ExportedImage
                                                    className="rounded-full"
                                                    src={user.photoURL}
                                                    alt="User"
                                                    width={46}
                                                    height={46}
                                                // unoptimized={true}
                                                />
                                                :
                                                <Skeleton variant="circular" width={46} height={46} />
                                        }

                                    </div>
                                    <div className="grid grid-cols-1 ml-3 text-left">
                                        <span className="text-xl mt-1 font-extrabold text-white h-6">{user ? user.displayName : ''}</span>
                                        <span className="text-base font-normal text-gray-50">{user ? user.email : ''}</span>
                                    </div>
                                </Disclosure.Button>
                                <Disclosure.Button
                                    as="a"
                                    onClick={() => logoutUser()}
                                    className='mb-6 text-tertiary border-4 border-tertiary block px-3 py-2 rounded-md text-xl font-extrabold w-full text-center transition-all duration-150 ease-in-out'
                                >
                                    Logout <LogoutIcon className="inline w-6 h-6 mr-1" />
                                </Disclosure.Button>
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </div>
            )}
        </Disclosure >
    )

}
