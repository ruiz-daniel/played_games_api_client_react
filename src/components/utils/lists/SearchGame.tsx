import { InputText } from "primereact/inputtext"
import { useSearchGame } from "../../../hooks/useSearchGame"
import { useEffect, useState } from "react"
import { PlayedGame } from "../../../models/PlayedGame"

export type SearchGameProps = {
  onSelectedGame: (game: PlayedGame) => void
}

const SearchGame = ({ onSelectedGame }: SearchGameProps) => {
  const {games, searchByName} = useSearchGame()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    searchByName(searchTerm)
    setSearchTerm('')
  }

  useEffect(() => {
    const searchGameList = document.getElementById('search-game-list');

    searchGameList?.addEventListener('wheel', (event) => {
        // Prevent the default vertical scroll
        event.preventDefault(); 
        
        // Scroll horizontally by the amount of vertical scroll
        searchGameList.scrollLeft += event.deltaY;
    });

  }, [])

  
  return <div className="search-game-container">
    <InputText
      id="search-game-input"
      placeholder="Search your game"
      className="p-inputtext-sm"
      value={searchTerm}
      onChange={e => { setSearchTerm(e.target.value) }}
      onKeyDownCapture={e => e.key === 'Enter' && handleSearch()}
      inputMode="search"
    />
    <div className="search-game-list w-100 flex gap-3" id="search-game-list">
      {games.map(game => {
        return (
          <img key={game._id} src={game.cover} width={250} height={110} onClick={() => {onSelectedGame(game)}} />
        )
      })}
    </div>
  </div>
}

export default SearchGame