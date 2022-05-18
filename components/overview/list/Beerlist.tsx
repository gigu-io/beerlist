import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { DashboardType, useDashboardContext } from '../../../context/dashboardContext'
import { useUserContext } from '../../../context/userContext'
import { database } from '../../../firebase/firebaseAuth.client'
import { Beer } from '../../icons/BeerIcons'
import BeerlistDetails, { SmallUser } from './BeerlistDetails'

export enum BeerSize {
  Small = '0.3',
  Medium = '0.5',
  Large = '0.75',
}

export interface UserDebtList {
  userinfo: SmallUser
  debts: Map<string, Debt>;
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
  const [myDebts, setMyDebts] = useState<Map<string, UserDebtList>>(new Map<string, UserDebtList>());

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

  return (
    <div className="overflow-hidden sm:bg-white rounded-md">
      <ul role="list" className="divide-y divide-stroke divide-opacity-10">
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
