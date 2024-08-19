import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITicket } from '../../types'
import data from '../../../mock.json'

type TinitialState = {
  isLoading: boolean
  tickets: ITicket[]
}

const initialState: TinitialState = {
  isLoading: false,
  tickets: [] as any,
}

const mock = (success: boolean, timeout: number = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(data)
      } else {
        reject({ message: 'Error' })
      }
    }, timeout)
  })
}

export const fetchTickets = createAsyncThunk(
  'tickets/fetch',
  async (_, api) => {
    try {
      const response = await mock(true, 2000)

      return response
    } catch (e) {
      return api.rejectWithValue('Ошибка')
    }
  }
)

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,

  reducers: {
    addTickets: (state, action: PayloadAction<ITicket[]>) => {},
    removeTickets: (state, action) => {
      if (action.payload.name === 'company') {
        state.tickets = state.tickets.filter(
          ticket => ticket.company !== action.payload.value
        )
      }
      if (action.payload.name === 'transfers') {
        state.tickets = state.tickets.filter(
          ticket => ticket.transfer !== +action.payload.value
        )
      }
    },
    sortByPrice: state => {
      state.tickets.sort((a, b) => a.price - b.price)
    },
    sortByDuration: state => {
      state.tickets.sort((a, b) => a.duration - b.duration)
    },
    sortByOptimal: state => {
      state.tickets.sort((a, b) => a.price - b.price)
      state.tickets.sort((a, b) => a.transfer - b.transfer)
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchTickets.pending, state => {
      state.isLoading = true
    })
    builder.addCase(
      fetchTickets.fulfilled,
      (state, action: PayloadAction<ITicket[]>) => {
        state.isLoading = false
        state.tickets = action.payload
      }
    )
    builder.addCase(fetchTickets.rejected, (state, action) => {
      console.log(action)
      state.isLoading = false
      state.tickets = []
    })
  },
})

export const {
  addTickets,
  removeTickets,
  sortByPrice,
  sortByDuration,
  sortByOptimal,
} = ticketsSlice.actions

export default ticketsSlice
