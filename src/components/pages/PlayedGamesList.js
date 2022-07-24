/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from 'react'
import api from '../../services/APICalls'
import GameBox from '../utils/GameBox'
import FilterForm from '../utils/FilterForm'
import { ScrollPanel } from 'primereact/scrollpanel'
import { ScrollTop } from 'primereact/scrolltop'
import { Dialog } from 'primereact/dialog'

import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'

var gamesBackup = []

const PlayedGamesList = () => {
  const [games, setGames] = useState([])
  const [filter, setFilter] = useState(false)

  const toast = useRef(null)

  const resetFilter = () => {
    setGames(gamesBackup)
  }

  useEffect(() => {
    api.getPlayedGames(
      sessionStorage.getItem('userid'),
      (data) => {
        setGames(data)
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
      <Dialog
        visible={filter}
        showHeader={false}
        dismissableMask
        position="top"
        onHide={() => {
          setFilter(false)
        }}
      >
        <FilterForm
          list={gamesBackup}
          onFilter={(games) => {
            setGames(games)
            setFilter(false)
          }}
        />
      </Dialog>
      <div className="options-container flex">
        <Button
          icon="pi pi-filter"
          label="Filter"
          onClick={() => setFilter(!filter)}
        />
        <Button
          icon="pi pi-times"
          label="Clear Filters"
          onClick={resetFilter}
        />
      </div>
      <h3>Showing: {games.length}</h3>
      <ScrollPanel style={{ width: '100%', height: '90vh' }}>
        <div className="games-container flex flex-wrap justify-content-evenly">
          {games.map((game) => {
            return (
              <GameBox
                key={game.id}
                game={game}
                reload={() => {
                  api.getPlayedGames((data) => {
                    setGames(data)
                    gamesBackup = data
                  })
                }}
              ></GameBox>
            )
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
