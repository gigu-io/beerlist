import { useEffect, useState } from "react";
import { Combobox, RadioGroup } from '@headlessui/react';
import { Beer, BeerIconDark, BeerIconIPA, BeerIconLager, BeerIconStout, MatchBeerIcon } from "../icons/BeerIcons";
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { SmallUser } from "../overview/list/BeerlistDetails";
import ExportedImage from "next-image-export-optimizer";
import { child, get, onValue, ref, set } from "firebase/database";
import { database } from "../../firebase/firebaseAuth.client";
import { useUserContext } from "../../context/userContext";
import { Dialog } from '@headlessui/react';
import { AlertType, DefaultAlert, DefaultAlertMessage } from "../alerts/Alerts";
import { DashboardType, useDashboardContext } from "../../context/dashboardContext";
import { Avatar } from "@mui/material";
import { SearchIcon, UserCircleIcon } from "@heroicons/react/outline";
import { MailOptions } from "../../lib/mail";
import { useLastDebtContext } from "../../context/lastDebt";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const beerOptions = [
  { name: Beer.Lager, icon: <BeerIconLager height={40} width={40} /> },
  { name: Beer.Dark, icon: <BeerIconDark height={40} width={40} /> },
  { name: Beer.IPA, icon: <BeerIconIPA height={40} width={40} /> },
  { name: Beer.Stout, icon: <BeerIconStout height={40} width={40} /> }
]

const beerSizeOptions = [
  { name: '0.33L', value: '0.33' },
  { name: '0.5L', value: '0.5' },
  { name: '0.75L', value: '0.75' },
]

export const NewDebtForm = ({ setShowNewDebtForm }: any) => {
  const [beerType, setBeerType] = useState(beerOptions[0].name);
  const [beerSize, setBeerSize] = useState(beerSizeOptions[0].value);
  const [selectedUser, setSelectedUser] = useState<SmallUser>({
    displayName: '',
    photoURL: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    email: '',
    notificationsEnabled: false
  });
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [userList, setUserList] = useState<Map<string, SmallUser>>(new Map<string, SmallUser>());
  const [reason, setReason] = useState('');
  const [size, setSize] = useState('');
  const [query, setQuery] = useState('');
  const { lastDebt, setLastDebt }: any = useLastDebtContext();

  const MAX_DEBTS = 24;

  const { setDashboardType }: any = useDashboardContext();

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

  // filter Map<string, SmallUser> by query of SmallUser.displayName and return a Map<string, SmallUser>
  const filteredUserList: Map<string, SmallUser> =
    query === '' ?
      new Map<string, SmallUser>(null) :
      query.length >= 3 ?
        new Map(
          Array.from(userList).filter(([key, value]) =>
            value.displayName && value.displayName.toLowerCase().includes(query.toLowerCase()))
        ) as Map<string, SmallUser>
        : new Map<string, SmallUser>(null);


  const handleClose = () => {
    setShowNewDebtForm(false);
  }

  const handleReasonChange = (event: any) => {
    setReason(event.target.value);
  }

  const handleSelectedUser = (newSelectedUser: any) => {
    setSelectedUserId(newSelectedUser.keys().next().value);
    setSelectedUser(newSelectedUser.values().next().value);
  }

  const sendMail = async () => {
    const { email } = selectedUser;
    const mailOptions: MailOptions = {
      from: '"BEER LIST" <beer.gigu.io@gmail.com>',
      to: email,
      subject: 'You owe ' + user.displayName + ' a beer!',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
            <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
            
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
              <!--[if !mso]><!-->
              <meta http-equiv="X-UA-Compatible" content="IE=Edge">
              <!--<![endif]-->
              <!--[if (gte mso 9)|(IE)]>
                  <xml>
                    <o:OfficeDocumentSettings>
                      <o:AllowPNG/>
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                  </xml>
                  <![endif]-->
              <!--[if (gte mso 9)|(IE)]>
              <style type="text/css">
                body {width: 600px;margin: 0 auto;}
                table {border-collapse: collapse;}
                table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
                img {-ms-interpolation-mode: bicubic;}
              </style>
            <![endif]-->
              <style type="text/css">
                body,
                p,
                div {
                  font-family: arial, helvetica, sans-serif;
                  font-size: 14px;
                }
            
                body {
                  color: #000000;
                }
            
                body a {
                  color: #8BD3DD;
                  text-decoration: none;
                }
            
                p {
                  margin: 0;
                  padding: 0;
                }
            
                table.wrapper {
                  width: 100% !important;
                  table-layout: fixed;
                  -webkit-font-smoothing: antialiased;
                  -webkit-text-size-adjust: 100%;
                  -moz-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                }
            
                img.max-width {
                  max-width: 100% !important;
                }
            
                .column.of-2 {
                  width: 50%;
                }
            
                .column.of-3 {
                  width: 33.333%;
                }
            
                .column.of-4 {
                  width: 25%;
                }
            
                ul ul ul ul {
                  list-style-type: disc !important;
                }
            
                ol ol {
                  list-style-type: lower-roman !important;
                }
            
                ol ol ol {
                  list-style-type: lower-latin !important;
                }
            
                ol ol ol ol {
                  list-style-type: decimal !important;
                }
            
                @media screen and (max-width:480px) {
            
                  .preheader .rightColumnContent,
                  .footer .rightColumnContent {
                    text-align: left !important;
                  }
            
                  .preheader .rightColumnContent div,
                  .preheader .rightColumnContent span,
                  .footer .rightColumnContent div,
                  .footer .rightColumnContent span {
                    text-align: left !important;
                  }
            
                  .preheader .rightColumnContent,
                  .preheader .leftColumnContent {
                    font-size: 80% !important;
                    padding: 5px 0;
                  }
            
                  table.wrapper-mobile {
                    width: 100% !important;
                    table-layout: fixed;
                  }
            
                  img.max-width {
                    height: auto !important;
                    max-width: 100% !important;
                  }
            
                  a.bulletproof-button {
                    display: block !important;
                    width: auto !important;
                    font-size: 80%;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                  }
            
                  .columns {
                    width: 100% !important;
                  }
            
                  .column {
                    display: block !important;
                    width: 100% !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                  }
            
                  .social-icon-column {
                    display: inline-block !important;
                  }
                }
              </style>
              <style>
                @media screen and (max-width:480px) {
                  table {
                    width: 480px !important;
                  }
                }
              </style>
              <!--user entered Head Start-->
              <!--End Head user entered-->
            </head>
            
            <body>
              <center class="wrapper" data-link-color="#8BD3DD"
                data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#8BD3DD;">
                <div class="webkit">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#8BD3DD">
                    <tr>
                      <td valign="top" bgcolor="#8BD3DD" width="100%">
                        <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0"
                          border="0">
                          <tr>
                            <td width="100%">
                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td>
                                    <!--[if mso]>
                <center>
                <table><tr><td width="600">
              <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                      style="width:100%; max-width:600px;" align="center">
                                      <tr>
                                        <td role="modules-container"
                                          style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#fff"
                                          width="100%" align="left">
                                          <table class="module preheader preheader-hide" role="module" data-type="preheader"
                                            border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                                            <tr>
                                              <td role="module-content">
                                                <p></p>
                                              </td>
                                            </tr>
                                          </table>
                                          <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0"
                                            cellspacing="0" width="100%" style="table-layout: fixed;"
                                            data-muid="ff57326d-a3b1-438e-ae0c-21223c912962">
                                            <tbody>
                                              <tr>
                                                <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top"
                                                  align="center">
                                                  <img class="max-width" border="0"
                                                    style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:20% !important; width:20%; height:auto !important;"
                                                    width="120" alt="" data-proportionally-constrained="true" data-responsive="true"
                                                    src="http://cdn.mcauto-images-production.sendgrid.net/34c3da017e71a103/d099f85f-1cb5-4a68-99eb-80bfd98d39a8/367x507.png">
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table class="module" role="module" data-type="text" border="0" cellpadding="0"
                                            cellspacing="0" width="100%" style="table-layout: fixed;"
                                            data-muid="a6845ff3-47c2-431d-b96c-20bfa25e2b12">
                                            <tbody>
                                              <tr>
                                                <td style="padding:18px 18px 18px 18px; line-height:22px; text-align:inherit;"
                                                  height="100%" valign="top" bgcolor="" role="module-content">
                                                  <div>
                                                    <div class="container" style="margin-left: 20px;margin-right: 20px;">
                                                      <h3>${user.displayName} has sent you a beer debt</h3>
                                                      <div style="font-size: 16px;">
                                                        <p>Reason:</p>
                                                        <p>${reason}</p>
                                                        <br>
                                                      </div>
                                                      <div style="font-size: 16px;">
                                                        <p>Size:</p>
                                                        <p>${beerSize}l</p>
                                                        <br>
                                                      </div>
                                                      <div style="font-size: 16px;">
                                                        <p>Type:</p>
                                                        <p>${beerType}</p>
                                                        <br>
                                                      </div>
                                                      <p style="font-size: 16px;">Head to <a href="https://beer.gigu.io/mydebts"
                                                          target="_blank">https://beer.gigu.io/mydebts</a> to confirm the debt.</p>
                                                    </div>
                                                    <div></div>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                              </td>
                                            </tr>
                                          </table>
                                        </center>
                                        <![endif]-->
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </center>
            </body>
            
            </html>`
    };
    await fetch("https://us-central1-gigu-8ed82.cloudfunctions.net/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mailOptions)
    });
  }
  const userRef = ref(database, 'users/' + user.uid);
  const refOwesMe = ref(database, 'owesme/' + user.uid + '/' + selectedUserId + '/debts');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // if lastDebtTimeStamp is less than 10 seconds ago, don't allow debt
    if (lastDebt) {
      const diff = new Date().getTime() - lastDebt;
      if (diff < 10000) {
        DefaultAlertMessage('Anti Spam!', 'You must wait ' + Math.round((10000 - diff) / 1000) + ' seconds.', AlertType.Error);
        return;
      }
    }

    const getDebtsValue: number = await get(refOwesMe).then((snapshot) => {
      return snapshot.size;
    }).catch((error) => {
      console.log(error);
      return 0;
    });

    if (getDebtsValue >= MAX_DEBTS) {
      // user is not in database
      DefaultAlertMessage('Too many debts!', 'You can only have ' + MAX_DEBTS + ' debts at a time for each user.', AlertType.Error);
      return false;
    }

    if (selectedUserId == '0') {
      DefaultAlert('Please select a user', AlertType.Error);
      return;
    }

    if (reason == '') {
      DefaultAlert('Please enter a reason', AlertType.Error);
      return;
    }

    // if reason has more than 100 characters
    if (reason.length > 100) {
      DefaultAlert('You got ' + reason.length + '/100 characters', AlertType.Error);
      return;
    }

    const timeStamp = Math.floor(Date.now() / 1000);
    const debtId = `${timeStamp}-${selectedUserId}-${user.uid}`;

    const getCurrentUser: SmallUser = await get(userRef).then((snapshot) => {
      return snapshot.val();
    });

    const smallUser: SmallUser = {
      displayName: getCurrentUser.displayName,
      photoURL: getCurrentUser.photoURL,
      email: getCurrentUser.email
    }

    const newDebt = {
      reason: reason,
      size: beerSize,
      type: beerType,
      createdTimestamp: timeStamp
    }

    try {
      const owesmeRef = ref(database, `owesme/${user.uid}/${selectedUserId}/debts/${debtId}`);
      const owesmeUserRef = ref(database, `owesme/${user.uid}/${selectedUserId}/userinfo`);
      const mydebtsRef = ref(database, `mydebts/${selectedUserId}/${user.uid}/debts/${debtId}`);
      const mydebtsUserRef = ref(database, `mydebts/${selectedUserId}/${user.uid}/userinfo`);
      const debtsRef = ref(database, `debts/${debtId}`);

      set(owesmeRef, newDebt);
      set(owesmeUserRef, selectedUser);
      set(mydebtsRef, newDebt);
      set(mydebtsUserRef, smallUser);
      set(debtsRef, newDebt);
    } catch (error) {
      DefaultAlert('Error creating debt', AlertType.Error);
      console.log(error);
      return;
    }

    setLastDebt(new Date().getTime());

    if (selectedUser.notificationsEnabled === true) {
      try {
        setShowNewDebtForm(false);
        setDashboardType(DashboardType.OwesMe);
        DefaultAlert('Debt added!', AlertType.Success);
        await sendMail();
        DefaultAlert('Email sent!', AlertType.Success);
      } catch (error) {
        setShowNewDebtForm(false);
        setDashboardType(DashboardType.OwesMe);
        // DefaultAlert('Debt added!', AlertType.Success)
        console.log(error);
        await new Promise(r => setTimeout(r, 2000));
        DefaultAlert('Error sending email', AlertType.Error);
        return;
      }
    } else {
      setShowNewDebtForm(false);
      setDashboardType(DashboardType.OwesMe);
      DefaultAlertMessage('Debt added!', 'User has deactivated Email Notification!', AlertType.Success);
    }
    setShowNewDebtForm(false);
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
      <Dialog.Panel className="select-none relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">

        <form className="space-y-4 divide-y divide-gray-200">
          <div>
            <div>
              <div>
                <h3 className=" text-2xl leading-6 font-bold text-gray-700">New Debt</h3>
              </div>

              <div className="sm:col-span-3 mt-2">
                <Combobox as="div" value={selectedUser} onChange={handleSelectedUser}>
                  <p className="mb-2 block text-sm bg-orange-50 font-medium p-2 text-center rounded-lg text-gray-500">Each user can owe you max. <strong className="text-orange-400">24</strong> beers</p>
                  <Combobox.Label className="block text-base font-medium">Search User<br /><span className="text-sm font-normal text-gray-500">(enter min. 3 chars of the Name)</span></Combobox.Label>
                  <div className="relative mt-1">
                    <Combobox.Label className="absolute inset-y-0 left-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      {
                        selectedUser ?
                          <ExportedImage
                            src={selectedUser.photoURL}
                            alt="beerlist logo"
                            objectFit="contain"
                            height={20}
                            width={20}
                            className="flex-shrink-0 h-6 w-6 rounded-full"
                          // unoptimized={true}
                          /> :
                          null
                      }
                    </Combobox.Label>

                    <Combobox.Input
                      className="w-full pl-10 rounded-md border border-gray-300 bg-white py-2 pr-10 shadow-sm focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary sm:text-sm"
                      onChange={(event) => setQuery(event.target.value)}
                      onFocus={(event) => event.target.select()}
                      // @ts-ignore
                      displayValue={
                        selectedUser ?
                          (selectedUser: SmallUser) => selectedUser.displayName
                          :
                          ''}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Combobox.Button>

                    {filteredUserList.size > 0 && (
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {Array.from(filteredUserList).map(([key, listUser]) => {
                            const listUserMap: Map<string, SmallUser> = new Map<string, SmallUser>();
                            listUserMap.set(key, listUser);

                            if (user.uid !== key) {
                              return (

                                <Combobox.Option
                                  key={key}
                                  value={listUserMap}
                                  className={({ active }) =>
                                    classNames(
                                      active ? 'bg-tertiary text-white' : 'text-gray-700',
                                      'relative select-none py-2 pl-3 pr-9 cursor-pointer'
                                    )
                                  }
                                >
                                  {({ active }) => {

                                    return (
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
                                              className={classNames(selectedUserId === key ? 'font-semibold' : 'font-normal', 'ml-3 truncate')}
                                            >
                                              {listUser.displayName}
                                            </span>
                                            <br />
                                            <span
                                              className={classNames(selectedUserId === key ? 'font-base' : 'font-normal', 'ml-3 truncate')}
                                            >

                                              {
                                                // censor email address with * except for the first 3 characters
                                                listUser.email.replace(/^(.{2}).*(@.*)$/, '$1***$2')
                                              }
                                            </span>
                                            <br />
                                          </div>
                                        </div>

                                        {selectedUserId === key ? (
                                          <span
                                            className={classNames(
                                              active ? 'text-white' : 'text-secondary',
                                              'absolute inset-y-0 right-0 flex items-center pr-4'
                                            )}
                                          >
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    );
                                  }}
                                </Combobox.Option>
                              )
                            }
                          })}
                        </Combobox.Options>
                      </Transition>
                    )}
                  </div>
                </Combobox>
              </div>

              <div className="sm:col-span-6 mt-2">
                <label htmlFor="reason" className="block text-base font-medium text-gray-700">
                  Reason
                </label>
                <p className="text-sm font-medium text-gray-500">{reason.length}/100</p>
                <div className="">
                  <textarea
                    id="reason"
                    name="reason"
                    rows={3}
                    onChange={handleReasonChange}
                    className="shadow-sm focus:ring-tertiary focus:border-tertiary w-full sm:text-base border border-gray-300 rounded-md"
                    defaultValue={''}
                  />
                </div>
              </div>

              <div
                className="mt-2"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-medium text-gray-700">Beer Type</h2>
                </div>
                <RadioGroup value={beerType} onChange={setBeerType} className="">
                  <RadioGroup.Label className="sr-only">Choose a beer type</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
                    {beerOptions.map((option) => (
                      <div
                        key={option.name}
                      >
                        <div
                          className={classNames(
                            'text-sm text-center m-auto font-medium text-gray-500 mt-1',
                          )}
                        >
                          {option.name}
                        </div>
                        <RadioGroup.Option
                          value={option.name}
                          className={({ active, checked }) =>
                            classNames(
                              active ? 'ring-0 focus:ring-0' : 'ring-0 focus:ring-0',
                              checked
                                ? 'border-transparent text-white bg-secondary'
                                : 'bg-white border-gray-200 text-gray-700',
                              'cursor-pointer border rounded-md py-3 px-3 flex items-center justify-center font-medium uppercase sm:flex-1',
                              'transition-all duration-150 ease-in-out',
                              'hover:active:bg-tertiary sm:hover:bg-tertiary'
                            )
                          }
                        >
                          <RadioGroup.Label as="span">
                            {option.icon}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div
                className="mt-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base font-medium text-gray-700">Beer Size</h2>
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
                            active ? 'ring-0 focus:ring-0' : 'ring-0 focus:ring-0',
                            checked
                              ? ' border-transparent text-white bg-secondary'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50',
                            'cursor-pointer border rounded-md py-3 px-3 flex items-center justify-center text-lg sm:text-base font-medium uppercase sm:flex-1',
                            'transition-all duration-150 ease-in-out',
                            'hover:active:bg-tertiary hover:active:text-white sm:hover:bg-tertiary sm:hover:text-white'
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
            <div className="grid grid-cols-2 justify-end text-lg sm:text-base">
              <button
                type="button"
                onClick={handleClose}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 hover:bg-gray-50 hover:active:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-tertiary hover:bg-tertiary-dark hover:active:bg-tertiary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary"
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