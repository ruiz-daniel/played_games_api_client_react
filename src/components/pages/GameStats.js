/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import { usePlayedGames } from '../../hooks/usePlayedGames'
import { Chart } from 'primereact/chart'
import FilterForm from '../utils/forms/FilterForm'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'

const GameStats = () => {
  const { games, externalFilter, resetFilter } = usePlayedGames()
  const [filter, setFilter] = useState(false)
  const [total_games, setTotalGames] = useState()
  const [avg_score, setAvgScore] = useState(0)
  const color = '#fbfaf8'
  const [completionChart, setcompletionChart] = useState({
    labels: [],
    datasets: [{}],
  })
  const [completionPercent, setcompletionPercent] = useState({
    labels: [],
    datasets: [{}],
  })
  const [completionDrop, setCompletionDrop] = useState({
    labels: [],
    datasets: [{}],
  })
  const [platformChart, setPlatformChart] = useState({
    labels: [],
    datasets: [{}],
  })
  const [yearsChart, setYearsChart] = useState({
    labels: [],
    datasets: [{}],
  })
  const [scoresChart, setScoresChart] = useState({
    labels: [],
    datasets: [{}],
  })
  const [playedYearChart, setPlayedYearStats] = useState({
    labels: [],
    datasets: [{}],
  })
  const [genreChart, setGenreStats] = useState({
    labels: [],
    datasets: [{}],
  })
  const [developerChart, setDeveloperChart] = useState({
    labels: [],
    datasets: [{}],
  })
  const [publisherChart, setPublisherChart] = useState({
    labels: [],
    datasets: [{}],
  })

  useEffect(() => {
    setTotalGames(games.length)
    getStats(games)
    getCompletionStats(games.length)
    setBarChartStats()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games])

  // VARIABLES FOR DATA
  let completed = 0
  let dropped = 0
  let na = 0
  let online = 0
  let onHold = 0

  let playedYearDatasets = {}
  let yearDatasets = {}
  let platformDatasets = {}
  let scoreDatasets = {}
  let genreDatasets = {}
  let developerDataset = {}
  let publisherDataset = {}

  const completionOptions = {
    plugins: {
      legend: {
        labels: {
          color,
        },
      },
      title: {
        display: true,
        text: 'Completion nominal',
        color,
        font: {
          size: 16,
        },
      },
    },
  }
  const completionPercentageOptions = {
    plugins: {
      legend: {
        labels: {
          color,
        },
      },
      title: {
        display: true,
        text: 'Completion percentage',
        color,
        font: {
          size: 16,
        },
      },
    },
  }
  const completionDropOptions = {
    plugins: {
      legend: {
        labels: {
          color,
        },
      },
      title: {
        display: true,
        text: 'Completed vs Dropped Percentage',
        color,
        font: {
          size: 16,
        },
      },
    },
  }

  const barOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color,
        },
      },
      y: {
        ticks: {
          color,
        },
        grid: {
          color,
        },
      },
    },
  }

  const getAvgScore = (data) => {
    let totalScore = 0
    Object.keys(scoreDatasets).forEach((key) => {
      totalScore += scoreDatasets[key] * Number(key)
    })
    setAvgScore(totalScore / data.length)
  }

  const getStats = (data) => {
    data.forEach((element) => {
      // COMPLETION
      if (element.completion) {
        switch (element.completion.name) {
          case 'Completed':
            completed++
            break;
          case 'Replaying':
            completed++
            break
          case 'Dropped':
            dropped++
            break
          case 'N/A':
            na++
            break
          case 'Online':
            online++
            break
          case 'On Hold':
            onHold++
            break
          default:
            break;
        }
      }

      // PLATFORMS
      if (
        element.platform &&
        platformDatasets[element.platform.short_name] == undefined
      ) {
        platformDatasets[element.platform.short_name] = 1
      } else if (
        element.platform &&
        platformDatasets[element.platform.short_name] >= 1
      ) {
        platformDatasets[element.platform.short_name]++
      }

      // YEARS
      if (
        element.release_year &&
        yearDatasets[element.release_year.toString()] == undefined
      ) {
        yearDatasets[element.release_year.toString()] = 1
      } else if (
        element.release_year &&
        yearDatasets[element.release_year.toString()] >= 1
      ) {
        yearDatasets[element.release_year.toString()]++
      }

      // PLAYED YEAR
      if (
        element.played_year &&
        playedYearDatasets[element.played_year.toString()] == undefined
      ) {
        playedYearDatasets[element.played_year.toString()] = 1
      } else if (
        element.played_year &&
        playedYearDatasets[element.played_year.toString()] >= 1
      ) {
        playedYearDatasets[element.played_year.toString()]++
      }

      // SCORES
      if (
        element.score &&
        scoreDatasets[element.score.toString()] == undefined
      ) {
        scoreDatasets[element.score.toString()] = 1
      } else if (
        element.score &&
        scoreDatasets[element.score.toString()] >= 1
      ) {
        scoreDatasets[element.score.toString()]++
      }

      // GENRES
      if (element.genres?.length) {
        element.genres.forEach((genre) => {
          if (genreDatasets[genre] == undefined) {
            genreDatasets[genre] = 1
          } else if (genreDatasets[genre] >= 1) {
            genreDatasets[genre]++
          }
        })
      }

      // DEVELOPER
      if (element.developers?.length) {
        element.developers.forEach((developer) => {
          if (developerDataset[developer] == undefined) {
            developerDataset[developer] = 1
          } else if (developerDataset[developer] >= 1) {
            developerDataset[developer]++
          }
        })
      }

      // PUBLISHER
      if (element.publishers?.length) {
        element.publishers.forEach((publisher) => {
          if (publisherDataset[publisher] == undefined) {
            publisherDataset[publisher] = 1
          } else if (publisherDataset[publisher] >= 1) {
            publisherDataset[publisher]++
          }
        })
      }
    })

    getAvgScore(data)
  }

  const getCompletionStats = (total_games) => {
    setcompletionChart({
      labels: ['Completed', 'Online', 'Dropped', 'On Hold', 'N/A'],
      datasets: [
        {
          data: [completed, online, dropped, onHold, na],
          backgroundColor: ['#12c941', '#ffff00', '#d71c2f', '#fea604', '#2196f3'],
          hoverBackgroundColor: ['#12b13a', '#d4d401', '#c51d2e', '#e39506', '#2196f3'],
        },
      ],
    })
    setcompletionPercent({
      labels: ['Completed', 'Online', 'Dropped', 'On Hold', 'N/A'],
      datasets: [
        {
          data: [
            (completed / total_games) * 100,
            (online / total_games) * 100,
            (dropped / total_games) * 100,
            (onHold / total_games) * 100,
            (na / total_games) * 100
          ],
          backgroundColor: ['#12c941', '#ffff00', '#d71c2f', '#fea604', '#2196f3'],
          hoverBackgroundColor: ['#12b13a', '#d4d401', '#c51d2e', '#e39506', '#2196f3'],
        },
      ],
    })
    setCompletionDrop({
      labels: ['Completed', 'Dropped'],
      datasets: [
        {
          data: [
            (completed / (completed + dropped)) * 100,
            (dropped / (completed + dropped)) * 100,
          ],
          backgroundColor: ['#12c941', '#d71c2f'],
          hoverBackgroundColor: ['#12b13a', '#c51d2e'],
        },
      ],
    })
  }

  const setBarChartStats = () => {
    setPlatformChart({
      labels: Object.keys(platformDatasets),
      datasets: [
        {
          label: 'Games per Platform',
          backgroundColor: '#42A5F5',
          data: Object.values(platformDatasets),
        },
      ],
    })
    setYearsChart({
      labels: Object.keys(yearDatasets),
      datasets: [
        {
          type: 'bar',
          label: 'Games per Year',
          backgroundColor: '#d8e00d',
          data: Object.values(yearDatasets),
        },
      ],
    })
    setScoresChart({
      labels: Object.keys(scoreDatasets),
      datasets: [
        {
          label: 'Games per Score',
          backgroundColor: '#13cf46',
          data: Object.values(scoreDatasets),
        },
      ],
    })
    setPlayedYearStats({
      labels: Object.keys(playedYearDatasets),
      datasets: [
        {
          label: 'Games per Played Year',
          backgroundColor: '#bd0f75',
          data: Object.values(playedYearDatasets),
        },
      ],
    })
    setGenreStats({
      labels: Object.keys(genreDatasets).filter(
        (key) => genreDatasets[key] > 1,
      ).sort((a,b) => genreDatasets[b] - genreDatasets[a]),
      datasets: [
        {
          label: 'Games per Genre (more than 1)',
          backgroundColor: '#00cbcb',
          data: Object.values(genreDatasets).filter((value) => value > 1).sort((a,b) => b - a),
        },
      ],
    })
    setDeveloperChart({
      labels: Object.keys(developerDataset).filter(
        (key) => developerDataset[key] > 1,
      ).sort((a,b) => developerDataset[b] - developerDataset[a]),
      datasets: [
        {
          label: 'Games per Developer (more than 1)',
          backgroundColor: '#ff0042',
          data: Object.values(developerDataset).filter((value) => value > 1).sort((a,b) => b - a),
        },
      ],
    })
    setPublisherChart({
      labels: Object.keys(publisherDataset).filter(
        (key) => publisherDataset[key] > 1,
      ).sort((a,b) => publisherDataset[b] - publisherDataset[a]),
      datasets: [
        {
          label: 'Games per Publisher (more than 1)',
          backgroundColor: '#155495',
          data: Object.values(publisherDataset).filter((value) => value > 1).sort((a,b) => b - a),
        },
      ],
    })
  }

  return (
    <div className="stats-wrapper">
      <Sidebar
        visible={filter}
        position="right"
        showCloseIcon={false}
        onHide={() => setFilter(false)}
        className="filter-sidebar"
      >
        <FilterForm
          onSubmit={(data) => {
            externalFilter(data)
            setFilter(false)
          }}
        />
      </Sidebar>
      <h1>Played Games Stats</h1>
      <div className='flex gap-4'>
        <Button
          icon="pi pi-filter"
          label="Advanced Filter"
          onClick={() => setFilter(!filter)}
        />
        <Button
          icon="pi pi-times"
          label="Clear Filters"
          onClick={resetFilter}
          onMouseLeave={(e) => e.target.blur()}
          onTouchEnd={(e) => e.target.blur()}
        />
      </div>
      
      <div className="text-center mb-5">
        <h3>Total played games: {total_games}</h3>
        <h3>Avg Score: {avg_score.toFixed(2)}</h3>
      </div>
      <div className="flex flex-wrap justify-content-evenly stats-item stats-pie">
        <Chart type="pie" data={completionChart} options={completionOptions} />
        <Chart
          type="pie"
          data={completionPercent}
          options={completionPercentageOptions}
        />
        <Chart
          type="pie"
          data={completionDrop}
          options={completionDropOptions}
        />
      </div>
      <div className=" stats-item">
        <Chart type="bar" data={platformChart} options={barOptions} />
      </div>
      <div className="stats-item">
        <Chart type="bar" data={yearsChart} options={barOptions} />
      </div>
      <div className="stats-item">
        <Chart type="bar" data={playedYearChart} options={barOptions} />
      </div>
      <div className="stats-item">
        <Chart type="bar" data={scoresChart} options={barOptions} />
      </div>
      <div className="stats-item">
        <Chart type="bar" data={genreChart} options={barOptions} />
      </div>
      <div className="stats-item">
        <Chart type="bar" data={developerChart} options={barOptions} />
      </div>
      <div className="stats-item">
        <Chart type="bar" data={publisherChart} options={barOptions} />
      </div>
    </div>
  )
}

export default GameStats
