import { ITicket } from '../../types'
import { convertTime } from '../../utils/convertTime'
import s from './style.module.scss'

interface TicketProps {
  ticket: ITicket
}

export const Ticket = ({ ticket }: TicketProps) => {
  const { price, company, duration, from, to, time, transfer } = ticket
  return (
    <div className={s.inner}>
      <div className={s.header}>
        <div>
          <span className={s.price}>{price} Р</span>
        </div>
        <div className={s.logoWrapper}>
          <img
            className={s.logo}
            src={`./${company}-logo.png`}
            alt='company logo'
            width={160}
            height={26}
          />
        </div>
      </div>
      <div className={s.ticketInfo}>
        <div className={s.infoDetails}>
          <div className={s.title}>
            {from} - {to}
          </div>
          <div>
            {time.startTime} - {time.endTime}
          </div>
        </div>
        <div className={s.infoDetails}>
          <div className={s.title}>В пути</div>
          <div>{convertTime(duration)}</div>
        </div>
        <div className={s.infoDetails}>
          <div className={s.title}>Пересадки</div>
          <div>
            {transfer
              ? transfer === 1
                ? `${transfer} пересадка`
                : `${transfer} пересадки`
              : `Без пересадок`}
          </div>
        </div>
      </div>
    </div>
  )
}
