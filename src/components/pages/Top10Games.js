/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import api from '../../services/APICalls'
import GameBox from '../utils/Top10GameBox'
import Position from '../utils/position'
import { ScrollPanel } from 'primereact/scrollpanel'
import { useLocation } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

var gamesBackup = []
var filters = {
  name: '',
}

const Top10Games = (props) => {
  const location = useLocation()
  const [allGames, setAllGames] = useState([])
  const [orderedGames, setOrder] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [top10name, setTop10Name] = useState(location.state.top10name)
  const [movingGame, setMovingGame] = useState(null)
  const [addingGame, setAddingGame] = useState(null)
  const [filtering, setFiltering] = useState(false)

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

  const getGames = () => {
    api.getTop10Games(top10name, sessionStorage.getItem('userid'), (data) => {
      splitGames(data)
    })
  }

  const addGame = (game, position) => {
    api.postTop10Game({ gameid: game.id, pos: position }, top10name, () => {
      getGames()
      setAddingGame(null)
      setMovingGame(null)
      cleanFilters()
    })
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
    getGames()
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

  return (
    <>
      <div className="top10header">
        <h1>Top 10 Games</h1>
      </div>
      <div className="top10games flex flex-wrap flex-justify-between">
        {orderedGames.map((tier, index) => {
          return (
            <div
              className="top10-item"
              onDrop={(ev) => {
                drop(ev, index + 1)
              }}
              onDragOver={(ev) => {
                allowDrop(ev)
              }}
            >
              <h2>
                <Position pos={index + 1}></Position>
              </h2>

              {tier.map((game) => {
                if (tier.length === 0) {
                  return <div style={{ width: 190 }}></div>
                }
                return (
                  <div
                    key={game.id}
                    draggable="true"
                    onDragStart={() => {
                      drag(game)
                    }}
                    onDoubleClick={() => {
                      moveGame(game, orderedGames.length + 1)
                    }}
                  >
                    <GameBox key={game.id} game={game.game}></GameBox>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <div className="top10-newgame">
        <div style={{ paddingLeft: 0, marginBottom: 10 }}>
          <h2>Add Game</h2>
          <p>
            <span style={{ color: 'red', fontWeight: 900 }}>Drag </span> a game
            from here to add it to the list or{' '}
            <span style={{ color: 'red', fontWeight: 900 }}>double click </span>
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
        <ScrollPanel style={{ width: '100%', height: '12vh' }}>
          <div className="flex">
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
