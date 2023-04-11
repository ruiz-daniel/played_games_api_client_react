/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import api from '../../services/IApi'
import GameBox from '../utils/Top10GameBox'
import Position from '../utils/position'
import { ScrollPanel } from 'primereact/scrollpanel'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import FavoritesList from '../utils/FavoritesList'

const FavoriteGames = (props) => {
  const [list, setList] = useState([])
  const [addingGame, setAddingGame] = useState(null)
  const [gamesPanel, toogleGamesPanel] = useState(false)
  const [topsPanel, togleTopsPanel] = useState(false)

  const changeList = (listId) => {
    api.FavoritesApi.getListById(listId, setList)
  }

  const getLists = () => {
    api.FavoritesApi.getLists(
      (data) => {
        if (data.length) {
          setList(data[0])
        }
      },
      (error) => {
        console.log(error.message)
      },
    )
  }

  const addGame = (game, position) => {
    if (list) {
    }
  }
  const dragNew = (game) => {
    setAddingGame(game)
  }
  const allowDrop = (ev) => {
    ev.preventDefault()
  }

  useEffect(() => {
    getLists()
  }, [])

  const lightUpTier = (id) => {
    document.getElementById(id).classList.add('hoveredTier')
  }
  const turnLightOff = (id) => {
    document.getElementById(id).classList.remove('hoveredTier')
  }

  return (
    <>
      <div className="top10gamesheader">
        {(list.length && <h1>{list.name}</h1>) || <h1>No List selected</h1>}
        <div className="flex">
          <Button
            label="Add Game"
            icon={gamesPanel ? 'pi pi-eye-slash' : 'pi pi-eye'}
            onClick={() => toogleGamesPanel(!gamesPanel)}
          />
          {sessionStorage.getItem('premium') && (
            <Button label="Manage Lists" onClick={() => togleTopsPanel(true)} />
          )}
        </div>
        <Dialog
          className="favorites-list-dialog"
          visible={topsPanel}
          showHeader={false}
          dismissableMask
          position="top"
          onHide={() => togleTopsPanel(false)}
        >
          <FavoritesList onSelect={(list) => setList(list)} />
        </Dialog>
      </div>
      <div className="top10games flex flex-column">
        <Dialog
          className="add-game-dialog"
          visible={gamesPanel}
          header="Add Game"
          modal={false}
          dismissableMask
          position="bottom-right"
          onHide={() => {
            toogleGamesPanel(false)
          }}
        >
          {/* <div className="top10-newgame">
            <div>
              <p>
                <span style={{ color: 'red', fontWeight: 900 }}>Drag </span> a
                game from here to add it to the list or{' '}
                <span style={{ color: 'red', fontWeight: 900 }}>
                  double click{' '}
                </span>
                to add it at the end of the list
              </p>
              <div>
                <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText
                    id="fname"
                    placeholder="Name"
                    onChange={(e) => filterName(e.target.value)}
                  />
                </span>
              </div>
            </div>
            <ScrollPanel style={{ width: '100%', height: '40vh' }}>
              <div className="flex flex-wrap justify-content-around">
                {allGames.map((game) => {
                  return (
                    <div
                      draggable="true"
                      onDragStart={() => {
                        dragNew(game)
                      }}
                      onDoubleClick={() => {
                        addGame(game, orderedGames.length + 1)
                      }}
                    >
                      <GameBox key={game.id} game={game}></GameBox>
                    </div>
                  )
                })}
              </div>
            </ScrollPanel>
          </div> */}
        </Dialog>
        {list?.tiers?.length > 0 && list.tiers.map((tier, index) => {})}
      </div>
    </>
  )
}

export default FavoriteGames
