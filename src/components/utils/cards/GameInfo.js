import GameInfoBox from './GameInfoBox'
import { Chip } from 'primereact/chip'
import Status from '../../utils/status'

function GameInfo({ game }) {
  return (
    <div className="game-details-fields">
      {game.developers?.length > 0 && (
        <p>
          Developed by <span>{game.developers.join(', ')}</span>
        </p>
      )}
      {game.publishers?.length > 0 && (
        <p>
          Published by <span>{game.publishers.join(', ')}</span>
        </p>
      )}
      {game.genres?.length > 0 && (
        <div className="flex flex-wrap mb-3">
          {game.genres.map((genre) => (
            <Chip key={genre} className="mr-2" label={genre} />
          ))}{' '}
        </div>
      )}
      <div className="flex flex-wrap game-details-info-box">
        {game?.platform && (
          <GameInfoBox
            type="platform"
            style={{ marginRight: '10px' }}
            game={game}
          />
        )}
        {game.release_year && (
          <GameInfoBox
            type="year"
            style={{ marginRight: '10px' }}
            game={game}
          />
        )}
        {game.played_year && (
          <GameInfoBox
            type="played_year"
            style={{ marginRight: '10px' }}
            game={game}
          />
        )}
        {game.score && (
          <GameInfoBox
            type="score"
            style={{ marginRight: '10px' }}
            game={game}
          />
        )}
        {game.played_hours > 0 && (
          <GameInfoBox
            type="hours"
            style={{ marginRight: '10px' }}
            game={game}
          />
        )}
        {game.steam_page && (
          <GameInfoBox
            type="steam"
            style={{ marginRight: '10px' }}
            game={game}
          />
        )}
      </div>

      {game.completion && (
        <p>
          <Status status={game.completion.name} />
        </p>
      )}
      {game.description && game.description !== '' && <p>{game.description}</p>}
    </div>
  )
}

export default GameInfo
