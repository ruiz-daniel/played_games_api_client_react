/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'
import { usePlayedStats } from '../../hooks/usePlayedStats'

const GameStats = () => {
  const { stats, totalGames, avgScore } = usePlayedStats()
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
    if (stats) {
      getCompletionStats()
      setBarChartStats()
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats])

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

  const getCompletionStats = () => {
    let total_games = stats.totalGames
    let replaying = stats.completionDatasets.Replaying
    let completed = stats.completionDatasets.Completed + replaying
    let dropped = stats.completionDatasets.Dropped
    let na = stats.completionDatasets['N/A']
    let online = stats.completionDatasets.Online
    let onHold = stats.completionDatasets['On Hold']

    setcompletionChart({
      labels: ['Completed', 'Online', 'Dropped', 'On Hold', 'N/A'],
      datasets: [
        {
          data: [ completed, online, dropped, onHold, na ],
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
      labels: Object.keys(stats.platformDatasets),
      datasets: [
        {
          label: 'Games per Platform',
          backgroundColor: '#42A5F5',
          data: Object.values(stats.platformDatasets),
        },
      ],
    })
    setYearsChart({
      labels: Object.keys(stats.yearDatasets),
      datasets: [
        {
          type: 'bar',
          label: 'Games per Year',
          backgroundColor: '#d8e00d',
          data: Object.values(stats.yearDatasets),
        },
      ],
    })
    setScoresChart({
      labels: Object.keys(stats.scoreDatasets),
      datasets: [
        {
          label: 'Games per Score',
          backgroundColor: '#13cf46',
          data: Object.values(stats.scoreDatasets),
        },
      ],
    })
    setPlayedYearStats({
      labels: Object.keys(stats.playedYearDatasets),
      datasets: [
        {
          label: 'Games per Played Year',
          backgroundColor: '#bd0f75',
          data: Object.values(stats.playedYearDatasets),
        },
      ],
    })
    setGenreStats({
      labels: Object.keys(stats.genreDatasets).filter(
        (key) => stats.genreDatasets[key] > 1,
      ).sort((a,b) => stats.genreDatasets[b] - stats.genreDatasets[a]),
      datasets: [
        {
          label: 'Games per Genre (more than 1)',
          backgroundColor: '#00cbcb',
          data: Object.values(stats.genreDatasets).filter((value) => value > 1).sort((a,b) => b - a),
        },
      ],
    })
    setDeveloperChart({
      labels: Object.keys(stats.developerDataset).filter(
        (key) => stats.developerDataset[key] > 1,
      ).sort((a,b) => stats.developerDataset[b] - stats.developerDataset[a]),
      datasets: [
        {
          label: 'Games per Developer (more than 1)',
          backgroundColor: '#ff0042',
          data: Object.values(stats.developerDataset).filter((value) => value > 1).sort((a,b) => b - a),
        },
      ],
    })
    setPublisherChart({
      labels: Object.keys(stats.publisherDataset).filter(
        (key) => stats.publisherDataset[key] > 1,
      ).sort((a,b) => stats.publisherDataset[b] - stats.publisherDataset[a]),
      datasets: [
        {
          label: 'Games per Publisher (more than 1)',
          backgroundColor: '#155495',
          data: Object.values(stats.publisherDataset).filter((value) => value > 1).sort((a,b) => b - a),
        },
      ],
    })
  }

  return (
    <div className="stats-wrapper px-3">
      {/* <Sidebar
        visible={toggleValue}
        position="right"
        showCloseIcon={false}
        onHide={toggle}
        className="filter-sidebar"
      >
        <FilterForm
          onSubmit={(data) => {
            toggle()
          }}
        />
      </Sidebar> */}
      <h1>Played Games Stats</h1>
      {/* <div className='flex gap-4'>
        <Button
          icon="pi pi-filter"
          label="Advanced Filter"
          onClick={toggle}
        />
        <Button
          icon="pi pi-times"
          label="Clear Filters"
          onClick={resetFilter}
          onMouseLeave={(e) => e.target.blur()}
          onTouchEnd={(e) => e.target.blur()}
        />
      </div> */}
      
      <div className="text-center mb-5">
        <h3>Total played games: {totalGames}</h3>
        <h3>Avg Score: {avgScore.toFixed(2)}</h3>
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
