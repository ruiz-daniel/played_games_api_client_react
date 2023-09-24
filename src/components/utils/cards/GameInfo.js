import GameInfoBox from './GameInfoBox'
import { Chip } from 'primereact/chip'
import Status from '../../utils/status'

function GameInfo({ game }) {
  return (
    <div className="game-info-container">
      <section className="flex flex-wrap justify-content-center row-gap-3">
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
      </section>
      <section className="flex flex-column gap-4 align-items-center px-4 mt-3" style={{textAlign: 'center'}}>
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
          <div className="flex flex-wrap gap-3">
            {game.genres.map((genre) => (
              <Chip key={genre} label={genre} />
            ))}{' '}
          </div>
        )}
        {game.tags?.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {game.tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}{' '}
          </div>
        )}
        {game.completion && (
          <p>
            <Status status={game.completion.name} />
          </p>
        )}
        {game.description && <p className='game-info-description'>{game.description}</p>}
      </section>
    </div>
  )
}

export default GameInfo
