import { useGame } from '../../hooks/useGame'
import { useToggle } from '../../hooks/useToggle'
import { useSearchParams } from 'react-router-dom'

import GameImageViewer from '../utils/cards/GameImageViewer'
import GameInfo from '../utils/cards/GameInfo'
import GameCrudButtons from '../utils/GameCrudButtons'

const GameDetails = () => {
  const [queryParams] = useSearchParams()
  const gameid = queryParams.get('id')
  const { game, updateImages } = useGame(gameid)

  const images = useToggle()

  const handleImagesSubmit = (data) => {
    updateImages(data)
    images.toggle()
  }
  
  return (
    <>
      {game && <div className="flex flex-column gap-4 px-3 pb-3">
        
        <GameImageViewer game={game} handleImagesSubmit={handleImagesSubmit}  />
        <GameInfo game={game} />
        <GameCrudButtons game={game} />
      </div>}
    </>
  )
}

export default GameDetails
