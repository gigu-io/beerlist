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

export interface Bet {
  [key: string]: Beer | SmallUser | string | number | boolean | null | undefined
  type: Beer
  reason: string
  size: BeerSize
  createdTimestamp: number
  confirmedTimestamp: number | null
  completedTimestamp: number | null
  guiltyUser: SmallUser | null
  user: SmallUser
}



export const MatchBackgroundBetColor = (bet: Bet) => {
  if (bet.confirmedTimestamp) {
    if (bet.completedTimestamp) {
      return StatusBackgroundColors.Green
    } else {
      return StatusBackgroundColors.Transparent
    }
  } else {
    return StatusBackgroundColors.Orange
  }
}

export default function Beerlist() {
  const { user, loading, error }: any = useUserContext();
  // const [bets, setBets] = useState<Map>([]);
  // a map with key and value is bet object
  const [bets, setBets] = useState<Map<string, Bet>>(new Map<string, Bet>());

  useEffect(() => {
    const betsRef = ref(database, 'bets/' + user.uid);
    onValue(betsRef, (snapshot) => {
      setBets(snapshot.val());
    })
  }, []);

  // get keys from map
  console.log(Object.keys(bets));



  // Port BeerlistDetails to Beerlist because it is not used anymore


  



  return (
    <div className="bg-white overflow-hidden shadow rounded-md">
      <ul role="list" className="divide-y divide-stroke divide-opacity-10">
        {/* {bets.map((beerguilty: BeerGuilty) => (
          <li key={beerguilty.user.uid}>
            <BeerlistDetails beerguilty={beerguilty} />
          </li>
        ))} */}
        {
          Object.keys(bets).map((key: string) => {
            const bet: Bet = bets[key];
            return (
              <li key={key}>
                <h1>{bet.reason}</h1>
              </li>
            )})
        }
      </ul>
    </div>
  )
}
