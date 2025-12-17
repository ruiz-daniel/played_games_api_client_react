import { ScrollPanel } from 'primereact/scrollpanel'
import { ScrollTop } from 'primereact/scrolltop'
import GameBox from '../cards/GameBox'


function GamesList({games, onScrollEnd, updateGame, removeGame}) {
  
  return (
    <ScrollPanel style={{ width: '100%', height: '75vh', padding: 10 }} onScrollCapture={onScrollEnd}>
      <div className="flex flex-wrap justify-content-center md:justify-content-between row-gap-3 column-gap-5">
        {games && games.map((game) => 
          <GameBox key={game._id} game={game} updateGame={updateGame} removeGame={removeGame} />
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