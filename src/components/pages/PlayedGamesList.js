/* eslint-disable eqeqeq */
import { useState } from 'react'
import { usePlayedGames, gamesBackup } from '../../hooks/usePlayedGames'

import FilterForm from '../utils/forms/FilterForm'
import { Sidebar } from 'primereact/sidebar'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import GamesList from '../utils/lists/GamesList'



const PlayedGamesList = () => {
  const [filter, setFilter] = useState(false)
  const {games, onFilter, localFilter, resetFilter} = usePlayedGames()
  return (
    <div className="played-games-list">
      <Sidebar
        visible={filter}
        position="right"
        showCloseIcon={false}
        onHide={() => setFilter(false)}
        className="filter-sidebar"
      >
        <FilterForm
          list={gamesBackup}
          onFilter={(games) => {
            onFilter(games)
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
          onClick={() => setFilter(!filter)}
        />
        <Button
          icon="pi pi-times"
          label="Clear Filters"
          onClick={resetFilter}
          onMouseLeave={(e) => e.target.blur()}
          onTouchEnd={(e) => e.target.blur()}
        />
      </div>
      <h3>Showing: {games.length}</h3>
      <GamesList games={games} />
    </div>
  )
}

export default PlayedGamesList
