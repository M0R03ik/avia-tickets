import s from './style.module.scss'
import logo from '../../assets/images/logo.png'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.logoWrapper}>
        <img className={s.logo} src={logo} alt='logo' width={100} height={80} />
      </div>
      <h1 className={s.title}>Поиск авиабилетов</h1>
    </header>
  )
}
