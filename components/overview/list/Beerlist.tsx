import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useUserContext } from '../../../context/userContext'
import { database } from '../../../firebase/firebaseAuth.client'
import { Beer, BeerIconDark, BeerIconIPA, BeerIconLager, BeerIconStout } from '../../icons/BeerIcons'
import { StatusBackgroundColors } from '../Dashboard'
import BeerlistDetails, { BeerGuilty, SmallUser } from './BeerlistDetails'

export enum BeerSize {
  Small = '0.33',
  Medium = '0.5',
  Large = '0.75',
}

export interface UserOwesMeBetList {
  displayName: string;
  email: string;
  photoURL: string;
  bets: Map<string, Bet>;
}

export interface Bet {
  type: Beer;
  reason: string;
  createdTimestamp: number
  confirmedTimestamp: number | null
  completedTimestamp: number | null
  users: Map<string, SmallUser> | null
  size: BeerSize
}

// export const MatchBackgroundBetColor = (bet: OwesMe) => {
//   if (bet.confirmedTimestamp) {
//     if (bet.completedTimestamp) {
//       return StatusBackgroundColors.Green
//     } else {
//       return StatusBackgroundColors.Transparent
//     }
//   } else {
//     return StatusBackgroundColors.Orange
//   }
// }

export default function Beerlist() {
  const { user, loading, error }: any = useUserContext();
  const [owesme, setOwesme] = useState<Map<string, UserOwesMeBetList>>(new Map<string, UserOwesMeBetList>());

  const [betsPerGuiltyUser, setBetsPerGuiltyUser] = useState<Map<string, Array<UserOwesMeBetList>>>(new Map<string, Array<UserOwesMeBetList>>());

  useEffect(() => {
    const betsRef = ref(database, 'owesme/' + user.uid);
    onValue(betsRef, (snapshot) => {
      // setBets(snapshot.val());
      const returnOwnesmeUsers = new Map<string, UserOwesMeBetList>();
      if (snapshot.size > 0) {
        Object.keys(snapshot.val()).forEach((key: string) => {
          returnOwnesmeUsers.set(key, snapshot.val()[key]);
        });
        setOwesme(returnOwnesmeUsers);
      }
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-white overflow-hidden shadow rounded-md">
      <ul role="list" className="divide-y divide-stroke divide-opacity-10">
        {
          Array.from(owesme).map(([key, userOwesMeBetList]: [string, UserOwesMeBetList]) => {
            return (
              <li key={key}>
                <BeerlistDetails userOwesMeBetList={userOwesMeBetList} owesmeuid={key} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
