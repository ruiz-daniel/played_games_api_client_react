/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import api from '../../services/APICalls'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'

const FilterForm = ({ list, onFilter }) => {
  const [games, setGames] = useState(list)
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [dev, setDev] = useState('')
  const [publisher, setPublisher] = useState('')
  const [genre, setGenre] = useState('')
  const [rating, setRating] = useState('')
  const [status, setStatus] = useState()
  const [platform, setPlatform] = useState()

  const [nameOut, setNameOut] = useState('')
  const [yearOut, setYearOut] = useState('')
  const [devOut, setDevOut] = useState('')
  const [publisherOut, setPublisherOut] = useState('')
  const [genreOut, setGenreOut] = useState('')
  const [ratingOut, setRatingOut] = useState('')
  const [statusOut, setStatusOut] = useState()
  const [platformOut, setPlatformOut] = useState()

  const [platformList, setPlatformList] = useState([])
  const [statusList, setStatusList] = useState([])

  const filter = () => {
    var filtered = []

    games.forEach((game) => {
      if (
        compareIgnoreCase(game.name, name) &&
        compareIgnoreCase(game.developer, dev) &&
        compareIgnoreCase(game.publisher, publisher) &&
        game.year.includes(year) &&
        compareIgnoreCase(game.genre, genre) &&
        (rating == '' || game.rating == rating) &&
        compareIgnoreCase(
          game.platform.name,
          platform
            ? typeof platform === 'string'
              ? platform
              : platform.name
            : '',
        ) &&
        compareIgnoreCase(
          game.status.name,
          status ? (typeof status === 'string' ? status : status.name) : '',
        )
      ) {
        filtered.push(game)
        if (
          (nameOut !== '' && compareIgnoreCase(game.name, nameOut)) ||
          (devOut !== '' && compareIgnoreCase(game.developer, devOut)) ||
          (publisherOut !== '' &&
            compareIgnoreCase(game.publisher, publisherOut)) ||
          (yearOut !== '' && game.year.includes(yearOut)) ||
          (genreOut !== '' && compareIgnoreCase(game.genre, genreOut)) ||
          (ratingOut !== '' && game.rating == ratingOut) ||
          (platformOut !== undefined &&
            compareIgnoreCase(
              game.platform.name,
              typeof platformOut === 'string' ? platformOut : platformOut.name,
            )) ||
          (statusOut !== undefined &&
            compareIgnoreCase(
              game.status.name,
              typeof statusOut === 'string' ? statusOut : statusOut.name,
            ))
        )
          filtered.pop()
      }
    })
    return filtered
  }

  const compareIgnoreCase = (stringA, stringB) => {
    return stringA.toUpperCase().includes(stringB.toUpperCase())
  }

  const handleFilter = () => {
    onFilter(filter())
  }
  const clearFilters = () => {
    setName('')
    setDev('')
    setPublisher('')
    setYear('')
    setGenre('')
    setStatus()
    setPlatform()
    setRating('')
    setNameOut('')
    setPublisherOut('')
    setDevOut('')
    setYearOut('')
    setGenreOut('')
    setStatusOut()
    setPlatformOut()
    setRatingOut('')
  }

  React.useEffect(() => {
    ;(async () => {
      const response_platforms = await api.fetchPlatforms()
      const platforms = await response_platforms.data
      setPlatformList(platforms)
      const response_status = await api.fetchStatuses()
      const statuses = await response_status.data
      setStatusList(statuses)
    })()
  }, [])
  return (
    <div className="filters-border">
      <div className="filters-container">
        <div className="filter-in">
          <h3>Filter by</h3>
          <div>
            <InputText
              id="fname"
              placeholder="Name"
              className="p-inputtext-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputText
              id="fdev"
              placeholder="Developer"
              className="p-inputtext-sm"
              value={dev}
              onChange={(e) => setDev(e.target.value)}
            />
            <InputText
              id="fpub"
              placeholder="Publisher"
              className="p-inputtext-sm"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
            <InputText
              id="fyear"
              placeholder="Year"
              className="p-inputtext-sm"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <InputText
              id="fgenre"
              placeholder="Genre"
              className="p-inputtext-sm"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <Dropdown
              id="fplatform"
              placeholder="Platform"
              className="p-inputtext-sm"
              options={platformList}
              optionLabel="name"
              value={platform}
              editable
              onChange={(e) => setPlatform(e.value)}
            />
            <Dropdown
              id="fstatus"
              placeholder="Status"
              className="p-inputtext-sm"
              options={statusList}
              optionLabel="name"
              value={status}
              editable
              onChange={(e) => setStatus(e.value)}
            />
            <InputText
              id="frating"
              placeholder="Rating"
              className="p-inputtext-sm"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-out">
          <h3>Filter Out</h3>
          <div>
            <InputText
              id="fname"
              placeholder="Name"
              className="p-inputtext-sm"
              value={nameOut}
              onChange={(e) => setNameOut(e.target.value)}
            />
            <InputText
              id="fdev"
              placeholder="Developer"
              className="p-inputtext-sm"
              value={devOut}
              onChange={(e) => setDevOut(e.target.value)}
            />
            <InputText
              id="fpub"
              placeholder="Publisher"
              className="p-inputtext-sm"
              value={publisherOut}
              onChange={(e) => setPublisherOut(e.target.value)}
            />
            <InputText
              id="fyear"
              placeholder="Year"
              className="p-inputtext-sm"
              value={yearOut}
              onChange={(e) => setYearOut(e.target.value)}
            />
            <InputText
              id="fgenre"
              placeholder="Genre"
              className="p-inputtext-sm"
              value={genreOut}
              onChange={(e) => setGenreOut(e.target.value)}
            />
            <Dropdown
              id="fplatform"
              placeholder="Platform"
              className="p-inputtext-sm"
              options={platformList}
              optionLabel="name"
              value={platformOut}
              editable
              onChange={(e) => setPlatformOut(e.target.value)}
            />
            <Dropdown
              id="fstatus"
              placeholder="Status"
              className="p-inputtext-sm"
              options={statusList}
              optionLabel="name"
              value={statusOut}
              editable
              onChange={(e) => setStatusOut(e.value)}
            />
            <InputText
              id="frating"
              placeholder="Rating"
              className="p-inputtext-sm"
              value={ratingOut}
              onChange={(e) => setRatingOut(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-buttons">
          <Button
            className="clear-button"
            onClick={clearFilters}
            label="Clear"
          />
          <Button
            className="filter-button"
            onClick={handleFilter}
            label="Filter"
          />
        </div>
      </div>
    </div>
  )
}

export default FilterForm
