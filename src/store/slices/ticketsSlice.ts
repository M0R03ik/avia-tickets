import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilterType, ITicket } from '../../types'
import data from '../../../mock.json'

type TinitialState = {
  isLoading: boolean
  tickets: ITicket[]
  filters: IFilterType
}

const initialState: TinitialState = {
  isLoading: false,
  tickets: [],
  filters: {
    airlines: [],
    transfers: [],
  },
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

      return response as ITicket[]
    } catch (e) {
      return api.rejectWithValue('Ошибка')
    }
  }
)

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,

  reducers: {
    addFilters: (state, action) => {
      if (action.payload.name === 'airlines') {
        if (state.filters.airlines.some(r => r === action.payload.value)) {
          return
        }
        state.filters.airlines.push(action.payload.value)
      }
      if (action.payload.name === 'transfers') {
        if (state.filters.transfers.some(r => r === +action.payload.value)) {
          return
        }
        state.filters.transfers.push(+action.payload.value)
      }
    },
    removeFilters: ({ filters }, action) => {
      if (action.payload.name === 'airlines') {
        filters.airlines = filters.airlines.filter(
          item => item !== action.payload.value
        )
      }

      if (action.payload.name === 'transfers') {
        filters.transfers = filters.transfers.filter(
          item => item !== +action.payload.value
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
    builder.addCase(fetchTickets.rejected, state => {
      state.isLoading = false
      state.tickets = []
    })
  },
})

export const {
  addFilters,
  removeFilters,
  sortByPrice,
  sortByDuration,
  sortByOptimal,
} = ticketsSlice.actions

export default ticketsSlice
