import { useState } from "react"
import SteamRapidApi from "../../../services/SteamRapidApi"
import SteamGameBox from "../cards/SteamGameBox"
import { InputText } from "primereact/inputtext"
import { useLoading } from "../../../hooks/context hooks/useLoading"


const ImportFromSteam = ({onSelect}) => {
  const [steamGames, setSteamGames] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [limitMessage, setLimitMessage] = useState(false)
  const [notFoundMessage, setnotFoundMessage] = useState('');
  const {setLoading} = useLoading()

  const search = async () => {
    setLoading(true)
    const gamesResponse = await SteamRapidApi.getSteamGames(searchTerm)
    setLoading(false)
    if (gamesResponse.status === 200) {
      if(gamesResponse.data.length === 0) {
        setnotFoundMessage(`No results found for ${searchTerm}`)
      }
      else {
        setnotFoundMessage(null)
      }
      setLimitMessage(false);
      setSteamGames(gamesResponse.data);
    }
    else if (gamesResponse.data.message.includes('rate limit')) {
      setLimitMessage(true)
    }

  }

  const handleGameSelect = async (game) => {
    setLoading(true)
    const gameResponse = await SteamRapidApi.getGameDetails(game.appId)
    setLoading(false)
    onSelect({...gameResponse.data, steamURL: game.url});
    
  }

  return (
    <div className="game-form">
      <div className="game-form-item gap-4">
        <span className="p-input-icon-left">
          <i className="pi pi-search" onClick={search} />
          <InputText
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDownCapture={e => e.key === 'Enter' && search()}
          />
        </span>

        <div className="flex flex-wrap justify-content-between gap-3">
          {steamGames.map((game) => (
            <SteamGameBox key={game.appId} game={game} onSelect={handleGameSelect} />
          ))}
        </div>
        {limitMessage && <h4>Search Limit per minute exceed, please wait</h4>}
        {notFoundMessage && <h4>{notFoundMessage}</h4>}
      </div>
    </div>
  );
}

export default ImportFromSteam