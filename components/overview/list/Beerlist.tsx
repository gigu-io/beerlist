import { Beer, BeerIconDark, BeerIconIPA, BeerIconLager, BeerIconStout } from '../../icons/BeerIcons'
import BeerlistDetails from './BeerlistDetails'

const beerguilties = [
  {
    id: 1,
    user: {
      uid: 1,
      displayName: 'Ricardo Cooper',
      email: 'ricardo.cooper@example.com',
      photoURL:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    bets: [
      {
        id: 1,
        type: Beer.Dark,
        reason: 'Dolphin are fishes',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: true,
        // completeDate: '2020-09-20',
        // completeDatetime: '2020-09-20'
      },
      {
        id: 2,
        type: Beer.Stout,
        reason: 'Some people are crazy, but I am not',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: false,
        // completeDate: '2020-09-20',
        // completeDatetime: '2020-09-20'
      },
      {
        id: 3,
        type: Beer.Stout,
        reason: 'Why do you think I am so stupid?',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: true,
        completeDate: 'Sep 20',
        completeDatetime: '2020-09-20'
      },
      {
        id: 4,
        type: Beer.Lager,
        reason: 'Some reason for this',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: true
      },
      {
        id: 5,
        type: Beer.Stout,
        reason: 'Some reason for this',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: true
      },
      {
        id: 6,
        type: Beer.IPA,
        reason: 'Some reason for this',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: true
      },
    ]
  },
  {
    id: 2,
    user: {
      uid: 2,
      displayName: 'Michaela Bagardi',
      email: 'ricardo.cooper@example.com',
      photoURL:
        'https://images.unsplash.com/photo-1553514029-1318c9127859?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80',
    },
    bets: [
      {
        id: 7,
        type: Beer.IPA,
        reason: 'Dolphin are some sort of fishes',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: true,
        // completeDate: '2020-09-20',
        // completeDatetime: '2020-09-20'
      },
    ]
  }
]


export default function Beerlist() {

  return (
    <div className="bg-white overflow-hidden shadow rounded-md">
      <ul role="list" className="divide-y divide-stroke divide-opacity-10">
        {beerguilties.map((beerguilty) => (
          <li key={beerguilty.user.uid}>
            <BeerlistDetails beerguilty={beerguilty} />
          </li>
        ))}
      </ul>
    </div>
  )
}
