import s from './style.module.scss'
import arrow from '../../assets/icons/arrow.png'
import { useState } from 'react'
import { Filters } from '../Filters/Filters'
import { Input } from '../Input/Input'
import { useAppSelector } from '../../store/store'
import { FILTERS_TYPES } from '../../config'

export const Aside = () => {
  const { filters } = useAppSelector(state => state.tickets)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const chekFilters = (filterType: 'airlines' | 'transfers') => {
    let activeFilters = FILTERS_TYPES[filterType] as (string | number)[]

    filters[filterType].map(
      filter =>
        (activeFilters = activeFilters.filter(
          activeFilter => activeFilter !== filter
        ))
    )

    if (filters[filterType].length) {
      return filterType === 'airlines'
        ? `Авиакомпании: ${activeFilters.join(', ')}`
        : `Пересадок: ${activeFilters.join(', ')}`
    }

    return filterType === 'airlines'
      ? 'Любая авиакомпания'
      : 'Любое кол-во пересадок'
  }

  return (
    <div className={isOpen ? `${s.aside}` : `${s.aside} ${s.hide}`}>
      <div className={s.header}>
        <div>
          {chekFilters('airlines')}, {chekFilters('transfers')}
        </div>
        <div className={s.settings} onClick={() => setIsOpen(!isOpen)}>
          <div className={s.description}>
            {isOpen ? 'Закрыть настройки' : 'Открыть настройки'}
          </div>

          <div
            className={
              isOpen ? `${s.settingsButton} ${s.rotate}` : `${s.settingsButton}`
            }
          >
            <img src={arrow} width={20} height={12} />
          </div>
        </div>
      </div>
      <div className={s.filters}>
        <Filters title='Количество пересадок'>
          <Input type='checkbox' name='transfers' id='no-transfers' value='0'>
            Без пересадок
          </Input>
          <Input type='checkbox' name='transfers' id='1-transfer' value='1'>
            1 пересадка
          </Input>
          <Input type='checkbox' name='transfers' id='2-transfer' value='2'>
            2 пересадки
          </Input>
          <Input type='checkbox' name='transfers' id='3-transfer' value='3'>
            3 пересадки
          </Input>
        </Filters>
        <Filters title='Компании'>
          <Input type='radio' name='airlines' id='pobeda' value='pobeda'>
            Победа
          </Input>
          <Input type='radio' name='airlines' id='red-wings' value='red-wings'>
            Red Wings
          </Input>
          <Input type='radio' name='airlines' id='s7' value='s7'>
            S7 Airlines
          </Input>
        </Filters>
      </div>
    </div>
  )
}
