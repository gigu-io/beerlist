import { useEffect, useState } from "react";
import { RadioGroup } from '@headlessui/react';
import { Beer, BeerIconDark, BeerIconIPA, BeerIconLager, BeerIconStout } from "../icons/BeerIcons";
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { SmallUser } from "../overview/list/BeerlistDetails";
import ExportedImage from "next-image-export-optimizer";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase/firebaseAuth.client";
import { useUserContext } from "../../context/userContext";
import { Dialog } from '@headlessui/react';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const beerOptions = [
    { name: Beer.Lager, icon: <BeerIconLager height={30} width={30} /> },
    { name: Beer.Dark, icon: <BeerIconDark height={30} width={30} /> },
    { name: Beer.IPA, icon: <BeerIconIPA height={30} width={30} /> },
    { name: Beer.Stout, icon: <BeerIconStout height={30} width={30} /> }
]

const beerSizeOptions = [
    { name: '0.33L', value: '0.33' },
    { name: '0.5L', value: '0.5' },
    { name: '0.75L', value: '0.75' },
]

export const NewDebtForm = ({ setShowNewDebtForm }: any) => {
    const [beerType, setBeerType] = useState(beerOptions[0].name);
    const [beerSize, setBeerSize] = useState(beerSizeOptions[0].value);
    const [selectedUser, setSelectedUser] = useState<SmallUser>({ uid: '1', email: '<emailaddress>', photoURL: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y', displayName: 'Select a user' });
    const [userList, setUserList] = useState<Map<string, SmallUser>>(new Map<string, SmallUser>());
    const [reason, setReason] = useState('');
    const [size, setSize] = useState('');

    const { user, logoutUser, loading, error }: any = useUserContext();

    useEffect(() => {
        const debtsRef = ref(database, 'users');
        onValue(debtsRef, (snapshot) => {
            const returnUserList = new Map<string, any>();
            if (snapshot.size > 0) {
                Object.keys(snapshot.val()).forEach((key: string) => {
                    returnUserList.set(key, snapshot.val()[key]);
                });
                setUserList(returnUserList);
            }
        })
        // eslint-disable-next-line
    }, []);

    const handleClose = () => {
        setShowNewDebtForm(false);
    }

    const handleReasonChange = (event: any) => {
        setReason(event.target.value);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const newDebt = {

        }
        const newOwesMe = {
            reason: reason,
        }
        const newMyDebt = {

        }
    }

    return (
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
            <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">

                <form className="space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div>
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">New Debt</h3>
                            </div>

                            <div className="sm:col-span-3 mt-3">
                                <Listbox value={selectedUser} onChange={setSelectedUser}>
                                    {({ open }) => (
                                        <>
                                            <Listbox.Label className="block text-sm font-medium text-gray-700">Select a guilty user</Listbox.Label>
                                            <div className="mt-1 relative">
                                                <Listbox.Button className="cursor-pointer relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary sm:text-sm">
                                                    <span className="flex items-center">
                                                        <ExportedImage
                                                            src={selectedUser.photoURL}
                                                            alt="beerlist logo"
                                                            objectFit="contain"
                                                            height={30}
                                                            width={30}
                                                            className="flex-shrink-0 h-6 w-6 rounded-full"
                                                        // unoptimized={true}
                                                        />
                                                        <div>
                                                            <span className="ml-3 truncate">{selectedUser.displayName}</span>
                                                            <br />
                                                            <span className="ml-3 font-light text-gray-400 text-xs truncate">{selectedUser.email}</span>
                                                        </div>
                                                    </span>
                                                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </span>
                                                </Listbox.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">

                                                        {Array.from(userList).map(([key, listUser]) => {

                                                            if (user.uid !== key) {
                                                                return (
                                                                    <Listbox.Option
                                                                        key={listUser.uid}
                                                                        className={({ active }) =>
                                                                            classNames(
                                                                                active ? 'text-white bg-tertiary' : 'text-gray-900',
                                                                                'cursor-pointer select-none relative py-2 pl-3 pr-9 transition-all duration-150 ease-in-out'
                                                                            )
                                                                        }
                                                                        value={listUser}
                                                                    >
                                                                        {({ selected, active }) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                                    <ExportedImage
                                                                                        src={listUser.photoURL}
                                                                                        alt="beerlist logo"
                                                                                        objectFit="contain"
                                                                                        height={30}
                                                                                        width={30}
                                                                                        className="flex-shrink-0 h-6 w-6 rounded-full"
                                                                                    // unoptimized={true}
                                                                                    />
                                                                                    <div>
                                                                                        <span
                                                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 truncate')}
                                                                                        >
                                                                                            {listUser.displayName}
                                                                                        </span>
                                                                                        <br />
                                                                                        <span
                                                                                            className={classNames(selected ? 'font-semibold' : 'font-light', 'ml-3 text-xs truncate')}
                                                                                        >
                                                                                            {listUser.email}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>

                                                                                {selected ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            active ? 'text-white' : 'text-tertiary',
                                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                        )}
                                                                                    >
                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                    </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                )
                                                            } else {
                                                                return null
                                                            }
                                                        })}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Listbox>
                            </div>

                            <div className="sm:col-span-6 mt-3">
                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                                    Reason
                                </label>
                                <p className="text-sm text-gray-500">Write a few words about the debt.</p>
                                <div className="mt-1">
                                    <textarea
                                        id="reason"
                                        name="reason"
                                        rows={3}
                                        onChange={handleReasonChange}
                                        className="shadow-sm focus:ring-tertiary focus:border-tertiary w-full sm:text-sm border border-gray-300 rounded-md"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>

                            <div
                                className="mt-3"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-medium text-gray-900">Beer Type</h2>
                                </div>
                                <RadioGroup value={beerType} onChange={setBeerType} className="">
                                    <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
                                    <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
                                        {beerOptions.map((option) => (
                                            <RadioGroup.Option
                                                key={option.name}
                                                value={option.name}
                                                className={({ active, checked }) =>
                                                    classNames(
                                                        active ? 'ring-2 ring-offset-2 ring-tertiary' : '',
                                                        checked
                                                            ? 'bg-secondary border-transparent text-white hover:bg-tertiary'
                                                            : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                                        'cursor-pointer border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1',
                                                        'transition-all duration-150 ease-in-out'
                                                    )
                                                }
                                            >
                                                <RadioGroup.Label as="span">
                                                    {option.icon}
                                                </RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>

                            <div
                                className="mt-3"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-medium text-gray-900">Beer Size</h2>
                                </div>
                                <RadioGroup value={beerSize} onChange={setBeerSize} className="">
                                    <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
                                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
                                        {beerSizeOptions.map((option) => (
                                            <RadioGroup.Option
                                                key={option.name}
                                                value={option.value}
                                                className={({ active, checked }) =>
                                                    classNames(
                                                        active ? 'ring-2 ring-offset-2 ring-tertiary' : '',
                                                        checked
                                                            ? 'bg-secondary border-transparent text-white hover:bg-tertiary'
                                                            : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                                        'cursor-pointer border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1',
                                                        'transition-all duration-150 ease-in-out'
                                                    )
                                                }
                                            >
                                                <RadioGroup.Label as="span">
                                                    {option.name}
                                                </RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>

                        </div>
                    </div>
                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-tertiary hover:bg-tertiary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </Dialog.Panel>
        </Transition.Child>
    )
}