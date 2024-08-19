import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTickets } from '../../store/slices/ticketsSlice'
import { useAppSelector } from '../../store/store'
import { Ticket } from './Ticket'

export const Tickets = () => {
  const { tickets, isLoading } = useAppSelector(state => state.tickets)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  return (
    <div>
      {isLoading
        ? 'Loading'
        : tickets.map(ticket => {
            return <Ticket ticket={ticket} key={ticket.id}></Ticket>
          })}
    </div>
  )
}
