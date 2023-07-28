import { usePlayedGames } from '../../hooks/usePlayedGames'
import { useToggle } from '../../hooks/useToggle'

import FilterForm from '../utils/forms/FilterForm'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import GamesList from '../utils/lists/GamesList'



const PlayedGamesList = () => {
  const { toggleValue, toggle } = useToggle()
  const {games, page, max, getGames, resetFilter, externalFilter } = usePlayedGames()
  const onScrollEnd = (e) => {
    const { clientHeight, scrollHeight, scrollTop} = e.target
    // take the integer part cause sometimes the number isn't exact
    if ((scrollHeight - parseInt(scrollTop)) === clientHeight && games.length < max) {
      getGames(Number(page) + 1)
    }
  }
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
      
      <GamesList games={games} onScrollEnd={onScrollEnd} />
    </div>
  )
}

export default PlayedGamesList
