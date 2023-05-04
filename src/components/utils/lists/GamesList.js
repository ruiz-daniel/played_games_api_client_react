import { ScrollPanel } from 'primereact/scrollpanel'
import { ScrollTop } from 'primereact/scrolltop'
import GameBox from '../../utils/cards/GameBox'


function GamesList({games}) {
  
  return (
    <ScrollPanel style={{ width: '100%', height: '75vh' }}>
      <div className="games-container flex flex-wrap justify-content-evenly">
        {games && games.map((game) => 
          <GameBox key={game._id} game={game} />
        )}
      </div>
      <ScrollTop
        target="parent"
        threshold={100}
        className="custom-scrolltop"
        icon="pi pi-arrow-up"
      />
    </ScrollPanel>
  )
}

export default GamesList