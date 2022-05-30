import { onValue, ref } from 'firebase/database'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DashboardType, useDashboardContext } from '../../../context/dashboardContext'
import { useUserContext } from '../../../context/userContext'
import { database } from '../../../firebase/firebaseAuth.client'
import { Beer } from '../../icons/BeerIcons'
import BeerlistDetails, { SmallUser } from './BeerlistDetails'
import { DebtDetails } from './DebtDetails'

export enum BeerSize {
  Small = '0.3',
  Medium = '0.5',
  Large = '0.75',
}

export interface UserDebtList {
  userinfo: SmallUser
  debts: Map<string, Debt> | undefined;
}

export interface Debt {
  type: Beer;
  reason: string;
  createdTimestamp: number
  confirmedTimestamp?: number | null
  completedTimestamp?: number | null
  canceledTimestamp?: number | null
  users: Map<string, SmallUser> | null
  size: BeerSize
  background?: string
}

export default function Beerlist() {
  const { user, loading, error }: any = useUserContext();
  const [owesMe, setOwnesMe] = useState<Map<string, UserDebtList>>(new Map<string, UserDebtList>());
  let noOwesMe: boolean = true;
  const [myDebts, setMyDebts] = useState<Map<string, UserDebtList>>(new Map<string, UserDebtList>());
  let noMyDebts: boolean = true;
  const router = useRouter();

  const { dashboardType }: any = useDashboardContext();

  useEffect(() => {
    if (dashboardType === DashboardType.OwesMe) {
      const owesmeRef = ref(database, 'owesme/' + user.uid);
      onValue(owesmeRef, (snapshot) => {
        const returnOwnesmeUsers = new Map<string, UserDebtList>();
        if (snapshot.size > 0) {
          Object.keys(snapshot.val()).forEach((key: string) => {
            returnOwnesmeUsers.set(key, snapshot.val()[key]);
          });
          setOwnesMe(returnOwnesmeUsers);
        }
      });
    }
    if (dashboardType === DashboardType.MyDebts) {
      const mydebtsRef = ref(database, 'mydebts/' + user.uid);
      onValue(mydebtsRef, (snapshot) => {
        const returnMydebtsUsers = new Map<string, UserDebtList>();
        if (snapshot.size > 0) {
          Object.keys(snapshot.val()).forEach((key: string) => {
            returnMydebtsUsers.set(key, snapshot.val()[key]);
          });
          setMyDebts(returnMydebtsUsers);
        }
      });
    }
    // eslint-disable-next-line
  }, []);
  if (typeof myDebts.values().next().value !== 'undefined') {
    Array.from(myDebts).map(([key, value]) => {
      if (value.debts === undefined) {
        noMyDebts = true;
      } else {
        noMyDebts = false;
      }
    });
  }

  if (typeof owesMe.values().next().value !== 'undefined') {
    Array.from(owesMe).map(([key, value]) => {
      if (value.debts === undefined) {
        noOwesMe = true;
      } else {
        noOwesMe = false;
      }
    });
  }

  return (
    <div className="overflow-hidden rounded-lg">
      <ul role="list" className="divide-y divide-gray-500 divide-opacity-10 ">

        {
          dashboardType === DashboardType.OwesMe &&
            router.pathname === '/owesme' ?
            typeof owesMe.values().next().value === 'undefined' ?
              <li>
                <div className="text-center justify-between px-4 py-2">
                  <p
                    className='text-lg font-medium text-gray-600'
                  >
                    Click on &quot;
                    <span
                      className='sm:inline hidden'
                    >
                      + New Debt
                    </span>
                    <span
                      className='sm:hidden inline'
                    >
                      +
                    </span>
                    &quot; to add a new beer debt to someone.
                  </p>
                </div>
              </li>
              :
              typeof owesMe.values().next().value.debts === 'undefined'
              &&
              <li>
                <div className="text-center justify-between px-4 py-2">
                  <p
                    className='text-lg font-medium text-gray-600'
                  >
                    Click on &quot;
                    <span
                      className='sm:inline hidden'
                    >
                      + New Debt
                    </span>
                    <span
                      className='sm:hidden inline'
                    >
                      +
                    </span>
                    &quot; to add a new beer debt to someone.
                  </p>
                </div>
              </li>
            :
            null
        }

        {
          dashboardType === DashboardType.MyDebts &&
            router.pathname === '/mydebts' ?
            typeof myDebts.values().next().value === 'undefined' ?
              <li>
                <div className="text-center justify-between px-4 py-2">
                  <p
                    className='text-lg font-medium text-gray-600'
                  >
                    You have no debts.
                  </p>
                </div>
              </li>
              :
              // typeof myDebts.values().next().value.debts === 'undefined' 
              noMyDebts &&
              <li>
                <div className="text-center justify-between px-4 py-2">
                  <p
                    className='text-lg font-medium text-gray-600'
                  >
                    You have no debts.
                  </p>
                </div>
              </li>
            :
            null
        }



        {
          dashboardType === DashboardType.OwesMe ?

            Array.from(owesMe).map(([key, userDebtList]: [string, UserDebtList]) => {

              if (!userDebtList.debts) {
                return null;
              }

              return (
                <li key={key}>
                  <BeerlistDetails userDebtList={userDebtList} guiltyUID={key} />
                </li>
              )
            }) :
            Array.from(myDebts).map(([key, userDebtList]: [string, UserDebtList]) => {

              if (!userDebtList.debts) {
                return null;
              }

              return (
                <li key={key}>
                  <BeerlistDetails userDebtList={userDebtList} guiltyUID={key} />
                </li>
              )
            })
        }
      </ul>
    </div>
  )
}
