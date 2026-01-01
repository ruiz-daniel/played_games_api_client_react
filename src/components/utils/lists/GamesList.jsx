import { ScrollPanel } from 'primereact/scrollpanel'
import { ScrollTop } from 'primereact/scrolltop'
import GameBox from '../cards/GameBox'


function GamesList({games, onScrollEnd, updateGame, removeGame}) {
  
  return (
    <ScrollPanel className='overflow-y-auto' style={{ width: '100%', height: '75vh', padding: 10 }} onScrollCapture={onScrollEnd}>
      <div className="flex flex-wrap justify-center md:justify-content-between gap-y-6 gap-x-10">
        {games && games.map((game) => 
          <GameBox key={game._id} game={game} updateGame={updateGame} removeGame={removeGame} />
        )}
      </div>
    </ScrollPanel>
  )
}

export default GamesList