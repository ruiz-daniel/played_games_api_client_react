/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import api from '../../services/APICalls'
import GameBox from '../utils/Top10GameBox'
import Position from '../utils/position'
import { ScrollPanel } from 'primereact/scrollpanel'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import FavoritesList from '../utils/FavoritesList'

var gamesBackup = []
var filters = {
  name: '',
}
var top10name = 'Favorite Games'

const Top10Games = (props) => {
  const [allGames, setAllGames] = useState([])
  const [orderedGames, setOrder] = useState([])
  const [movingGame, setMovingGame] = useState(null)
  const [addingGame, setAddingGame] = useState(null)
  const [filtering, setFiltering] = useState(false)
  const [gamesPanel, toogleGamesPanel] = useState(false)
  const [topsPanel, togleTopsPanel] = useState(false)

  const cleanFilters = () => {
    filters = {
      name: '',
    }
  }
  const compareIgnoreCase = (stringA, stringB) => {
    return stringA.toUpperCase().includes(stringB.toUpperCase())
  }
  useEffect(() => {
    var filtered = []

    gamesBackup.forEach((game) => {
      if (compareIgnoreCase(game.name, filters.name)) {
        filtered.push(game)
      }
    })
    setAllGames(filtered)
    setFiltering(false)
  }, [filtering])

  const filterName = (name) => {
    filters.name = name
    setFiltering(true)
  }

  const changeTop10 = (newName) => {
    top10name = newName.name
    togleTopsPanel(false)
    getGames()
  }

  const getGames = () => {
    api.getTop10Games(top10name, sessionStorage.getItem('userid'), (data) => {
      splitGames(data)
    })
  }

  const getFirstTop10 = () => {
    api.getTop10Names(
      sessionStorage.getItem('userid'),
      (data) => {
        top10name = data[0].name
        getGames()
      },
      onGetFirstError,
    )
  }

  const onGetFirstError = () => {
    toogleGamesPanel(false)
    top10name = 'No favorites list found'
  }

  const addGame = (game, position) => {
    if (!top10name.includes('No favorites list found'))
      api.postTop10Game(
        {
          gameid: game.id,
          pos: position,
          userid: sessionStorage.getItem('userid'),
        },
        top10name,
        () => {
          getGames()
          setAddingGame(null)
          setMovingGame(null)
          cleanFilters()
        },
      )
  }

  const moveGame = (game, position) => {
    game.pos = position
    api.putTop10Game(game, () => {
      getGames()
      setAddingGame(null)
      setMovingGame(null)
      cleanFilters()
    })
  }

  const removeGame = (game) => {
    api.deleteTop10Game(game.id, () => {
      getGames()
      setAddingGame(null)
      setMovingGame(null)
      cleanFilters()
    })
  }

  const drag = (game) => {
    setMovingGame(game)
  }
  const dragNew = (game) => {
    setAddingGame(game)
  }
  const allowDrop = (ev) => {
    ev.preventDefault()
  }
  const drop = (ev, pos) => {
    ev.preventDefault()
    if (movingGame != null) {
      moveGame(movingGame, pos)
    } else if (addingGame != null) {
      addGame(addingGame, pos)
    }
  }

  useEffect(() => {
    cleanFilters()
    getFirstTop10()
    api.getPlayedGames(sessionStorage.getItem('userid'), (data) => {
      setAllGames(data)
      gamesBackup = data
    })
  }, [])

  const splitGames = (games) => {
    let result = []
    games.forEach((game, index) => {
      game.name = game.game.name
      if (index === 0) {
        result.push([game])
      } else {
        if (game.pos > games[index - 1].pos + 1) {
          result.push([])
          result.push([game])
        } else if (game.pos === games[index - 1].pos) {
          result[game.pos - 1].push(game)
        } else {
          result.push([game])
        }
      }
    })
    setOrder(result)
  }

  const lightUpTier = (id) => {
    document.getElementById(id).classList.add('hoveredTier')
  }
  const turnLightOff = (id) => {
    document.getElementById(id).classList.remove('hoveredTier')
  }

  const moveTierUp = (tier, index) => {
    tier.forEach((game) => {
      moveGame(game, game.pos - 1)
    })
    orderedGames[index - 1].map((game) => {
      moveGame(game, game.pos + 1)
    })
  }
  const moveTierDown = (tier, index) => {
    tier.forEach((game) => {
      moveGame(game, game.pos + 1)
    })
    orderedGames[index + 1].map((game) => {
      moveGame(game, game.pos - 1)
    })
  }

  return (
    <>
      <div className="top10gamesheader">
        <h1>{top10name}</h1>
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
          visible={topsPanel}
          showHeader={false}
          dismissableMask
          position="top"
          onHide={() => togleTopsPanel(false)}
        >
          <FavoritesList onSelect={(newName) => changeTop10(newName)} />
        </Dialog>
      </div>
      <ScrollPanel style={{ width: '100%', height: '90vh' }}>
        <div className="top10games flex flex-column">
          <Dialog
            visible={gamesPanel}
            header="Add Game"
            modal={false}
            dismissableMask
            position="bottom-right"
            onHide={() => {
              toogleGamesPanel(false)
            }}
          >
            <div className="top10-newgame">
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
                <div className="flex flex-wrap justify-content-between">
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
            </div>
          </Dialog>
          {orderedGames.map((tier, index) => {
            return (
              <div
                id={`tier-${index}`}
                className="top10-item"
                onDrop={(ev) => {
                  drop(ev, index + 1)
                  turnLightOff(`tier-${index}`)
                }}
                onDragOver={(ev) => {
                  allowDrop(ev)
                  lightUpTier(`tier-${index}`)
                }}
                onDragLeave={(ev) => {
                  turnLightOff(`tier-${index}`)
                }}
              >
                <h2>
                  <Position pos={index + 1}></Position>
                </h2>

                {tier.map((game) => {
                  if (tier.length === 0) {
                    return <div style={{ height: 130 }}></div>
                  }
                  return (
                    <div
                      key={game.id}
                      draggable="true"
                      onDragStart={(e) => {
                        drag(game)
                      }}
                      onDragEnd={(e) => {
                        setTimeout(3000)
                        setMovingGame()
                      }}
                      onDoubleClick={() => {
                        moveGame(game, orderedGames.length + 1)
                      }}
                    >
                      <GameBox key={game.id} game={game.game}></GameBox>
                    </div>
                  )
                })}
                <div className="tier-buttons flex flex-column">
                  {index > 0 && (
                    <i
                      className="pi pi-arrow-up"
                      onClick={() => {
                        moveTierUp(tier, index)
                      }}
                    />
                  )}
                  <i
                    className="pi pi-arrow-down"
                    onClick={() => {
                      moveTierDown(tier, index)
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </ScrollPanel>
      {movingGame && (
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-raised p-button-danger top10-remove-button  z-1"
          hidden={movingGame == null}
          onDrop={(ev) => {
            ev.preventDefault()
            removeGame(movingGame)
          }}
          onDragOver={(ev) => {
            allowDrop(ev)
          }}
        />
      )}
    </>
  )
}

export default Top10Games
