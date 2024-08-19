import React, { useCallback, useState } from 'react'
import s from './style.module.scss'
import { useDispatch } from 'react-redux'
import {
  sortByDuration,
  sortByOptimal,
  sortByPrice,
} from '../../store/slices/ticketsSlice'
import { useAppSelector } from '../../store/store'

export const SortingControl = () => {
  const tickets = useAppSelector(state => state.tickets)

  const [isDisabled, setIsDisabled] = useState([true, false, false])
  const dispatch = useDispatch()

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      switch (e.currentTarget.name) {
        case 'cheap':
          dispatch(sortByPrice())
          setIsDisabled([true, false, false])
          break
        case 'fast':
          dispatch(sortByDuration())
          setIsDisabled([false, true, false])
          break
        default:
          dispatch(sortByOptimal())
          setIsDisabled([false, false, true])
          break
      }
    },
    [isDisabled, tickets]
  )

  return (
    <div className={s.inner}>
      <button
        disabled={isDisabled[0]}
        className={s.button}
        onClick={e => handleClick(e)}
        name='cheap'
      >
        Самый дешевый
      </button>
      <button
        disabled={isDisabled[1]}
        className={s.button}
        onClick={handleClick}
        name='fast'
      >
        Самый быстрый
      </button>
      <button
        disabled={isDisabled[2]}
        className={s.button}
        onClick={handleClick}
        name='optimal'
      >
        Самый оптимальный
      </button>
    </div>
  )
}
