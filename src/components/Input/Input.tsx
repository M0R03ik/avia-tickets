import { useDispatch } from 'react-redux'
import s from './style.module.scss'
import { removeTickets } from '../../store/slices/ticketsSlice'

interface IInput {
  type: 'checkbox' | 'radio'
  name: string
  id: string
  value: string
  children: string
}

export const Input = ({ type, name, id, value, children }: IInput) => {
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
    }
    const payload = {
      name: e.target.name,
      value: e.target.value,
    }

    dispatch(removeTickets(payload))
  }
  return (
    <div className={s.inner}>
      <input
        type={'checkbox'}
        name={name}
        id={id}
        value={value}
        defaultChecked
        className={type === 'checkbox' ? s.checkbox : s.radio}
        onChange={handleChange}
      />
      <label htmlFor={id} className={s.label}>
        {children}
      </label>
    </div>
  )
}
