import { useGame } from '../../hooks/useGame'
import { useSearchParams } from 'react-router-dom'

import GameImageViewer from '../utils/cards/GameImageViewer'
import GameInfo from '../utils/cards/GameInfo'
import GameCrudButtons from '../utils/GameCrudButtons'

const GameDetails = () => {
  const [queryParams] = useSearchParams()
  const gameid = queryParams.get('id')
  const { game } = useGame(gameid)
  
  return (
    <>
      {game && <div className="flex flex-column gap-4 px-3 pb-3">
        
        <GameImageViewer game={game} />
        <GameInfo game={game} />
        <GameCrudButtons game={game} />
      </div>}
    </>
  )
}

export default GameDetails
