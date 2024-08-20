import { useEffect } from 'react'
import { fetchTickets } from '../../store/slices/ticketsSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Ticket } from './Ticket'

export const Tickets = () => {
  const { tickets, isLoading, filters } = useAppSelector(state => state.tickets)
  const dispatch = useAppDispatch()
  let listTikets = [...tickets]

  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading</div>
  }

  Object.keys(filters).map(key => {
    switch (key) {
      case 'airlines': {
        if (filters.airlines.length) {
          filters.airlines.map(
            filter =>
              (listTikets = listTikets.filter(
                ticket => ticket.company !== filter
              ))
          )
        }
        break
      }
      case 'transfers': {
        if (filters.transfers.length) {
          filters.transfers.map(
            filter =>
              (listTikets = listTikets.filter(
                ticket => ticket.transfer !== +filter
              ))
          )
        }
        break
      }
    }

    return null
  })

  return (
    <div>
      {listTikets.map(ticket => {
        return <Ticket ticket={ticket} key={ticket.id}></Ticket>
      })}
    </div>
  )
}
