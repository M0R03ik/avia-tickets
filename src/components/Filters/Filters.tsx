import s from './style.module.scss'

interface FiltersProps {
  title: string
  children: JSX.Element | JSX.Element[]
}

export const Filters = ({ title, children }: FiltersProps) => {
  return (
    <div className={s.inner}>
      <h2 className={s.title}>{title}</h2>
      <form className={s.form}>{children}</form>
    </div>
  )
}
