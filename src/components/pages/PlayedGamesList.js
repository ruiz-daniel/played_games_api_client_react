/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from 'react'
import api from '../../services/IApi'
import GameBox from '../utils/GameBox'
import FilterForm from '../utils/FilterForm'
import { ScrollPanel } from 'primereact/scrollpanel'
import { ScrollTop } from 'primereact/scrolltop'
import { Sidebar } from 'primereact/sidebar'
import { InputText } from 'primereact/inputtext'

import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'

var gamesBackup = []
// Keep the filtered games when component unmounts
var filteringGames = []

const PlayedGamesList = () => {
  const [games, setGames] = useState([])
  const [filter, setFilter] = useState(false)

  const toast = useRef(null)

  const resetFilter = () => {
    filteringGames = []
    setGames(gamesBackup)
  }

  const onFilter = (games) => {
    filteringGames = games
    setGames(games)
    setFilter(false)
  }

  const localFilter = (value) => {
    const filtered = []
    gamesBackup.forEach((game) => {
      let found = false
      Object.keys(game).forEach((key) => {
        if (!['played_hours', 'id', '_id'].includes(key)) {
          if (['completion', 'platform'].includes(key)) {
            if (game[key].name == value) {
              found = true
            }
          } else if (typeof game[key] === 'string') {
            if (game[key].includes(value)) {
              found = true
            }
          } else if (game[key].length) {
            // Array
            if (game[key].toString().includes(value)) {
              console.log(key);
              found = true
            }
          } else {
            if (game[key] == value) {
              found = true
            }
          }
        }
      })
      if (found) {
        filtered.push(game)
      }
    })
    filteringGames = filtered
    setGames(filtered)
  }

  useEffect(() => {
    api.PlayedGamesApi.getPlayedGames(
      sessionStorage.getItem('userid'),
      (data) => {
        if (filteringGames.length) {
          setGames(filteringGames)
        } else {
          setGames(data)
        }
        gamesBackup = data
      },
      (error) => {
        console.log(
          '🚀 ~ file: PlayedGamesList.js ~ line 56 ~ useEffect ~ error',
          error,
        )
        toast.current.show({
          severity: 'error',
          summary: error.message,
          life: 3000,
        })
      },
    )
  }, [])

  return (
    <div className="played-games-list">
      <Toast ref={toast} position="top-center" />
      <Sidebar
        visible={filter}
        position="right"
        showCloseIcon={false}
        onHide={() => setFilter(false)}
        className="filter-sidebar"
      >
        <FilterForm
          list={gamesBackup}
          onFilter={(games) => {
            onFilter(games)
          }}
        />
      </Sidebar>
      <div className="options-container flex">
        <InputText
          placeholder="Search"
          className="p-inputtext-sm"
          onChange={(e) => localFilter(e.target.value)}
        />
        <Button
          icon="pi pi-filter"
          label="Advanced Filter"
          onClick={() => setFilter(!filter)}
        />
        <Button
          icon="pi pi-times"
          label="Clear Filters"
          onClick={resetFilter}
        />
      </div>
      <h3>Showing: {games.length}</h3>
      <ScrollPanel style={{ width: '100%', height: '75vh' }}>
        <div className="games-container flex flex-wrap justify-content-evenly">
          {games.map((game) => {
            return <GameBox key={game.id} game={game} />
          })}
        </div>
        <ScrollTop
          target="parent"
          threshold={100}
          className="custom-scrolltop"
          icon="pi pi-arrow-up"
        />
      </ScrollPanel>
    </div>
  )
}

export default PlayedGamesList
