export interface TicketTime {
  startTime: string
  endTime: string
}

export interface ITicket {
  id: number
  from: string
  to: string
  company: string
  price: number
  currency: 'RUB'
  time: TicketTime
  duration: number
  date: string
  transfer: number
}

export interface IFilterType {
  airlines: string[]
  transfers: number[]
}
