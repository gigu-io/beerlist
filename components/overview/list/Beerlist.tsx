import { BeerIconDark, BeerIconIPA, BeerIconLager, BeerIconStout } from '../../icons/BeerIcons'
import BeerlistDetails, { Beer } from './BeerlistDetails'

const beerguilties = [
  {
    user: {
      uid: 1,
      name: 'Ricardo Cooper',
      email: 'ricardo.cooper@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    bets: [
      {
        id: 1,
        type: Beer.Dark,
        icon: BeerIconDark,
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
        icon: BeerIconStout,
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
        icon: BeerIconStout,
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
        icon: BeerIconLager,
        reason: 'Some reason for this',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: true
      },
      {
        id: 5,
        type: Beer.Stout,
        icon: BeerIconStout,
        reason: 'Some reason for this',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: true
      },
      {
        id: 6,
        type: Beer.IPA,
        icon: BeerIconIPA,
        reason: 'Some reason for this',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: true
      },
    ]
  },
  {
    user: {
      uid: 2,
      name: 'Michaela Bagardi',
      email: 'ricardo.cooper@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1553514029-1318c9127859?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80',
    },
    bets: [
      {
        id: 7,
        type: Beer.IPA,
        icon: BeerIconIPA,
        reason: 'Dolphin are some sort of fishes',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: true,
        // completeDate: '2020-09-20',
        // completeDatetime: '2020-09-20'
      },
      {
        id: 6,
        type: Beer.Lager,
        icon: BeerIconLager,
        reason: 'Some people are crazy, but I am not, I swear',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: true,
        // completeDate: '2020-09-20',
        // completeDatetime: '2020-09-20'
      },
      {
        id: 8,
        type: Beer.Stout,
        icon: BeerIconStout,
        reason: 'Why do you think I am so stupid?',
        size: '0.5',
        date: 'Sep 20',
        datetime: '2020-09-20',
        confirmed: true,
        completeDate: 'Sep 20',
        completeDatetime: '2020-09-20'
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
