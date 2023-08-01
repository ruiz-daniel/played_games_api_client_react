import { ScrollPanel } from 'primereact/scrollpanel'
import { ScrollTop } from 'primereact/scrolltop'
import GameBox from '../../utils/cards/GameBox'


function GamesList({games, onScrollEnd}) {
  
  return (
    <ScrollPanel style={{ width: '100%', height: '75vh', padding: 10 }} onScrollCapture={onScrollEnd}>
      <div className="flex flex-wrap sm:justify-content-center md:justify-content-between row-gap-3 column-gap-5">
        {games && games.map((game) => 
          <GameBox key={game._id} game={game} />
        )}
      </div>
      <ScrollTop
        target="parent"
        threshold={100}
        className="custom-scrolltop"
        icon="pi pi-arrow-up"
        onScroll={onScrollEnd}
      />
    </ScrollPanel>
  )
}

export default GamesList