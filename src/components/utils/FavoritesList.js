import { Button } from 'primereact/button'
import React, { useState, useEffect } from 'react'
import api from '../../services/APICalls'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

const FavoritesList = ({ onSelect }) => {
  const [top10names, setTop10Names] = useState([])
  const [newName, setNewName] = useState('')

  useEffect(() => {
    getTop10Names()
  }, [])

  const getTop10Names = () => {
    api.getTop10Names(sessionStorage.getItem('userid'), onGetNames)
  }
  const onGetNames = (data) => {
    setTop10Names(data)
  }

  const addName = () => {
    api.postTop10Name(
      { name: newName, userid: sessionStorage.getItem('userid') },
      () => {
        getTop10Names()
      },
    )
  }
  const deleteName = (top10) => {
    api.deleteTop10Name(top10.id, () => {
      getTop10Names()
    })
  }

  return (
    <div className="filters-border">
      <div className="favorites-container">
        <h2>Favorites Lists</h2>
        <div className="flex flex-wrap favorites-list">
          {top10names.map((top10) => {
            return (
              <div className="flex favorite-list-item">
                <h3
                  onClick={() => {
                    onSelect(top10)
                  }}
                >
                  {top10.name}
                </h3>
                <h3>
                  <i
                    className="pi pi-times"
                    onClick={() => deleteName(top10)}
                  />
                </h3>
              </div>
            )
          })}
        </div>
        <div className="favorites-options">
          <div className="flex">
            <InputText
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />{' '}
            <Button label="New List" onClick={() => addName()} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavoritesList
