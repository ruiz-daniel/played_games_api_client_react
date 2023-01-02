/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import api from '../../services/GeneralApi'

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'

var filterRecord = {
  name: '',
  dev: '',
  publisher: '',
  year: '',
  genre: '',
  rating: '',
  status: undefined,
  platform: undefined,
  played_year: '',
  played_hours: '',
}

var filterOutRecord = {
  name: '',
  dev: '',
  publisher: '',
  year: '',
  genre: '',
  rating: '',
  status: undefined,
  platform: undefined,
  played_year: '',
  played_hours: '',
}

const FilterForm = ({ list, onFilter }) => {
  const [name, setName] = useState(filterRecord.name)
  const [year, setYear] = useState(filterRecord.year)
  const [played_year, setPlayedYear] = useState(filterRecord.played_year)
  const [played_hours, setPlayedHours] = useState(filterRecord.played_hours)
  const [dev, setDev] = useState(filterRecord.dev)
  const [publisher, setPublisher] = useState(filterRecord.publisher)
  const [genre, setGenre] = useState(filterRecord.genre)
  const [rating, setRating] = useState(filterRecord.rating)
  const [status, setStatus] = useState(filterRecord.status)
  const [platform, setPlatform] = useState(filterRecord.platform)

  const [nameOut, setNameOut] = useState(filterOutRecord.name)
  const [yearOut, setYearOut] = useState(filterOutRecord.year)
  const [played_yearOut, setPlayedYearOut] = useState(
    filterOutRecord.played_year,
  )
  const [played_hoursOut, setPlayedHoursOut] = useState(
    filterOutRecord.played_hours,
  )
  const [devOut, setDevOut] = useState(filterOutRecord.dev)
  const [publisherOut, setPublisherOut] = useState(filterOutRecord.publisher)
  const [genreOut, setGenreOut] = useState(filterOutRecord.genre)
  const [ratingOut, setRatingOut] = useState(filterOutRecord.rating)
  const [statusOut, setStatusOut] = useState(filterOutRecord.status)
  const [platformOut, setPlatformOut] = useState(filterOutRecord.platform)

  const [platformList, setPlatformList] = useState([])
  const [statusList, setStatusList] = useState([])

  const filter = () => {
    var filtered = []

    list.forEach((game) => {
      // Compare filters using include. Empty filters will not have effect
      if (
        compareIgnoreCase(game.name, name) &&
        compareIgnoreCase(game.developer, dev) &&
        compareIgnoreCase(game.publisher, publisher) &&
        (game.year?.includes(year) || !game.year) &&
        (game.played_year?.includes(played_year) || !game.played_year) &&
        (played_hours == '' || game.played_hours
          ? Number(game.played_hours) >= Number(played_hours)
          : true) &&
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
        // Immediately pop out if it matches a filter-out condition
        if (
          (nameOut !== '' && compareIgnoreCase(game.name, nameOut)) ||
          (devOut !== '' && compareIgnoreCase(game.developer, devOut)) ||
          (publisherOut !== '' &&
            compareIgnoreCase(game.publisher, publisherOut)) ||
          (yearOut !== '' && (game.year?.includes(yearOut) || !game.year)) ||
          (played_yearOut !== '' &&
            (game.played_year?.includes(played_yearOut) ||
              !game.played_year)) ||
          (played_hoursOut !== '' && game.played_hours
            ? Number(game.played_hours) > Number(played_hoursOut)
            : false) ||
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
    if (stringA === undefined || stringB === undefined) {
      return false
    }
    return stringA.toUpperCase().includes(stringB.toUpperCase())
  }

  const handleFilter = () => {
    saveRecords()
    onFilter(filter())
  }

  const clearInFilters = () => {
    setName('')
    setDev('')
    setPublisher('')
    setYear('')
    setPlayedYear('')
    setPlayedHours('')
    setPlayedHoursOut('')
    setGenre('')
    setStatus()
    setPlatform()
    setRating('')

    clearInRecords()
  }
  const clearOutFilters = () => {
    setNameOut('')
    setPublisherOut('')
    setDevOut('')
    setYearOut('')
    setPlayedYearOut('')
    setGenreOut('')
    setStatusOut()
    setPlatformOut()
    setRatingOut('')

    clearOutRecords()
  }
  const clearFilters = () => {
    clearInFilters()
    clearOutFilters()
  }

  const enterKeyEvent = (e) => {
    if (e.key === 'Enter') {
      console.log(e)
      handleFilter()
    }
  }

  const saveRecords = () => {
    filterRecord = {
      name,
      dev,
      publisher,
      year,
      genre,
      rating,
      status,
      platform,
      played_year,
      played_hours,
    }

    filterOutRecord = {
      name: nameOut,
      dev: devOut,
      publisher: publisherOut,
      year: yearOut,
      genre: genreOut,
      rating: ratingOut,
      status: statusOut,
      platform: platformOut,
      played_year: played_yearOut,
      played_hours: played_hoursOut,
    }
  }

  const clearInRecords = () => {
    filterRecord = {
      name: '',
      dev: '',
      publisher: '',
      year: '',
      genre: '',
      rating: '',
      status: undefined,
      platform: undefined,
      played_year: '',
      played_hours: '',
    }
  }
  const clearOutRecords = () => {
    filterOutRecord = {
      name: '',
      dev: '',
      publisher: '',
      year: '',
      genre: '',
      rating: '',
      status: undefined,
      platform: undefined,
      played_year: '',
      played_hours: '',
    }
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
    <div
      className="filters-container"
      onKeyUp={(e) => {
        enterKeyEvent(e)
      }}
    >
      <div className="filter-in">
        <h3>Filter In <span onClick={clearInFilters}>X</span></h3>
        <InputText
          placeholder="Name"
          className="p-inputtext-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputText
          placeholder="Developer"
          className="p-inputtext-sm"
          value={dev}
          onChange={(e) => setDev(e.target.value)}
        />
        <InputText
          placeholder="Publisher"
          className="p-inputtext-sm"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
        <InputText
          placeholder="Year"
          className="p-inputtext-sm"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <InputText
          placeholder="Played Year"
          className="p-inputtext-sm"
          value={played_year}
          onChange={(e) => setPlayedYear(e.target.value)}
        />

        <InputText
          placeholder="Genre"
          className="p-inputtext-sm"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <Dropdown
          placeholder="Platform"
          className="p-inputtext-sm"
          options={platformList}
          optionLabel="name"
          value={platform}
          editable
          onChange={(e) => setPlatform(e.value)}
        />
        <Dropdown
          placeholder="Status"
          className="p-inputtext-sm"
          options={statusList}
          optionLabel="name"
          value={status}
          editable
          onChange={(e) => setStatus(e.value)}
        />
        <InputText
          placeholder="Rating"
          className="p-inputtext-sm"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <InputText
          placeholder="Played Hours (min)"
          className="p-inputtext-sm"
          value={played_hours}
          onChange={(e) => setPlayedHours(e.target.value)}
        />
        <InputText
          placeholder="Played Hours (max)"
          className="p-inputtext-sm"
          value={played_hoursOut}
          onChange={(e) => setPlayedHoursOut(e.target.value)}
        />
      </div>
      <div className="filter-out">
        <h3>Filter Out <span onClick={clearOutFilters}>X</span></h3>
        <InputText
          placeholder="Name"
          className="p-inputtext-sm"
          value={nameOut}
          onChange={(e) => setNameOut(e.target.value)}
        />
        <InputText
          placeholder="Developer"
          className="p-inputtext-sm"
          value={devOut}
          onChange={(e) => setDevOut(e.target.value)}
        />
        <InputText
          placeholder="Publisher"
          className="p-inputtext-sm"
          value={publisherOut}
          onChange={(e) => setPublisherOut(e.target.value)}
        />
        <InputText
          placeholder="Year"
          className="p-inputtext-sm"
          value={yearOut}
          onChange={(e) => setYearOut(e.target.value)}
        />
        <InputText
          placeholder="Played Year"
          className="p-inputtext-sm"
          value={played_yearOut}
          onChange={(e) => setPlayedYearOut(e.target.value)}
        />
        <InputText
          placeholder="Genre"
          className="p-inputtext-sm"
          value={genreOut}
          onChange={(e) => setGenreOut(e.target.value)}
        />
        <Dropdown
          placeholder="Platform"
          className="p-inputtext-sm"
          options={platformList}
          optionLabel="name"
          value={platformOut}
          editable
          onChange={(e) => setPlatformOut(e.target.value)}
        />
        <Dropdown
          placeholder="Status"
          className="p-inputtext-sm"
          options={statusList}
          optionLabel="name"
          value={statusOut}
          editable
          onChange={(e) => setStatusOut(e.value)}
        />
        <InputText
          placeholder="Rating"
          className="p-inputtext-sm"
          value={ratingOut}
          onChange={(e) => setRatingOut(e.target.value)}
        />
      </div>
      <div className="filter-buttons">
        <Button
          className="filter-button"
          onClick={handleFilter}
          label="Filter"
        />
        <Button className="clear-button" onClick={clearFilters} label="Clear" />
      </div>
    </div>
  )
}

export default FilterForm
