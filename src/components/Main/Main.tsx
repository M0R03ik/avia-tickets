import s from './style.module.scss'
import { SortingControl } from '../SortingControl/SortingControl'
import { Aside } from '../Aside/Aside'
import { Tickets } from '../Ticket/Tickets'

export const Main = () => {
  return (
    <main className={s.inner}>
      <Aside />

      <div className={s.content}>
        <SortingControl />
        <Tickets />
        <button className={s.loadButton}>Загрузить еще билеты</button>
      </div>
    </main>
  )
}
