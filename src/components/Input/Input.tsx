import s from './style.module.scss'
import { addFilters, removeFilters } from '../../store/slices/ticketsSlice'
import { useAppDispatch } from '../../store/store'

interface IInput {
  type: 'checkbox' | 'radio'
  name: string
  id: string
  value: string
  children: string
}

export const Input = ({ type, name, id, value, children }: IInput) => {
  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = {
      name: e.target.name,
      value: e.target.value,
    }

    if (e.target.checked) {
      dispatch(removeFilters(payload))
      return
    }

    dispatch(addFilters(payload))
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
