/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { PlusSmIcon } from '@heroicons/react/solid'
import ExportedImage from "next-image-export-optimizer";
import { useUserContext } from '../context/userContext'
import { Skeleton } from '@mui/material'
import { NewDebtForm } from './forms/NewDebtForm';
import { Dialog } from '@headlessui/react';
import { DashboardType, useDashboardContext } from '../context/dashboardContext';
import { useRouter } from 'next/router';

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
        // { name: 'Settings', onClickFunction: () => { } },
        { name: 'Sign out', onClickFunction: () => { logoutUser() } },
    ]
    const navigation = [
        {
            name: 'Owes Me', onClickFunction: () => {
                setDashboardType(DashboardType.OwesMe)
                router.push('/owesme')
            }, current: dashboardType === DashboardType.OwesMe
        },
        {
            name: 'My Debts', onClickFunction: () => {
                setDashboardType(DashboardType.MyDebts)
                router.push('/mydebts')
            }, current: dashboardType === DashboardType.MyDebts
        },
    ]

    return (

        <Disclosure as="nav" className="bg-main mb-6">
            {({ open }) => (
                <div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-button-text focus:outline-none transition-all duration-200 ease-in-out">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-shrink-0 flex items-center">
                                    <div className="relative h-20 w-16">
                                        <ExportedImage
                                            src="/images/logo/beerlist_logo.png"
                                            alt="beerlist logo"
                                            layout="fill"
                                            objectFit="contain"
                                        // unoptimized={true}
                                        />
                                    </div>
                                </div>
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                    {navigation.map((item) => (
                                        <button
                                            key={item.name}
                                            onClick={item.onClickFunction}
                                            className={classNames(
                                                item.current ? 'bg-secondary text-button-text hover:bg-tertiary hover:text-white' : 'text-paragraph hover:bg-tertiary hover:text-white',
                                                'px-3 py-2 rounded-md text-sm font-medium transition-colors ease-in-out'
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
                                        className="text-button-text relative inline-flex items-center px-4 py-2 border-transparent shadow-sm text-sm font-medium rounded-md bg-tertiary hover:shadow-md hover:translate-x-0.5 transition-all duration-300 ease-in-out"
                                    >
                                        <PlusSmIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                        <span>New Debt</span>
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
                                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full">
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
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 shadow-lg rounded-md  bg-secondary">
                                                {userNavigation.map((item) => (
                                                    <div
                                                        key={item.name}
                                                        className="hover:bg-tertiary  hover:shadow-xl transition-all duration-300 ease-in-out first:rounded-t-md last:rounded-b-md rounded-none "
                                                    >
                                                        <div
                                                            onClick={item.onClickFunction}
                                                            className='block px-4 py-2 text-sm text-button-text font-bold hover:translate-x-1 transition-all duration-300 ease-in-out cursor-pointer'
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
                        enterTo="max-h-full"
                        leave="ease-in-out duration-200"
                        leaveFrom=" max-h-full"
                        leaveTo=" max-h-0"
                    >
                        <Disclosure.Panel className="absolute max-h-0 z-10 bg-main shadow-lg w-full md:hidden overflow-hidden rounded-b-md ">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        onClick={item.onClickFunction}
                                        className={classNames(
                                            item.current ? 'bg-secondary text-button-text hover:bg-tertiary hover:text-white' : 'text-paragraph hover:bg-tertiary hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium w-full text-left'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="pt-4 pb-3">
                                <div className="flex items-center px-5 sm:px-6">
                                    <div className="flex-shrink-0">
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
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">{user ? user.displayName : ''}</div>
                                        <div className="text-sm font-medium text-gray-700">{user ? user.email : ''}</div>
                                    </div>
                                </div>
                                <div className="mt-3 px-2 space-y-1 sm:px-3">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            onClick={item.onClickFunction}
                                            className="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </div>
            )}
        </Disclosure>
    )

}
