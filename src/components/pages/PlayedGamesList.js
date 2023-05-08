import { usePlayedGames } from '../../hooks/usePlayedGames'
import { useToggle } from '../../hooks/useToggle'

import FilterForm from '../utils/forms/FilterForm'
import { Sidebar } from 'primereact/sidebar'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import GamesList from '../utils/lists/GamesList'



const PlayedGamesList = () => {
  const { toggleValue, toggle } = useToggle()
  const {games, localFilter, resetFilter, externalFilter } = usePlayedGames()
  return (
    <div className="played-games-list">
      <Sidebar
        visible={toggleValue}
        position="right"
        showCloseIcon={false}
        onHide={toggle}
        className="filter-sidebar"
      >
        <FilterForm
          onSubmit={(data) => {
            externalFilter(data)
            toggle()
          }}
        />
      </Sidebar>
      <div className="options-container flex">
        <InputText
          placeholder="Search"
          className="p-inputtext-sm search-input"
          onChange={(e) => localFilter(e.target.value)}
        />
        <Button
          icon="pi pi-filter"
          label="Advanced Filter"
          onClick={toggle}
        />
        <Button
          icon="pi pi-times"
          label="Clear Filters"
          onClick={resetFilter}
          onMouseLeave={(e) => e.target.blur()}
          onTouchEnd={(e) => e.target.blur()}
        />
      </div>
      <h3>Showing: {games?.length || 0}</h3>
      <GamesList games={games} />
    </div>
  )
}

export default PlayedGamesList
