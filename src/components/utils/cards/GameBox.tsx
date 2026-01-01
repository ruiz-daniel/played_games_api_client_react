import React, { ReactNode, useMemo } from 'react'
import { useNavigation } from '../../../hooks/useNavigation'
// @ts-ignore
import  no_cover  from '../../../images/no-cover.jpg'
import { ConfirmDialog } from 'primereact/confirmdialog'

import Score from '../score'
import Status from '../status'
import { useToggle } from '../../../hooks/useToggle'
import { PlayedGame } from '../../../models/PlayedGame'
import { UploadGameData } from '../../../models/types'
import { Chip } from 'primereact/chip'

export type GameBoxProps = {
  game: PlayedGame,
  width?: number,
  imageHeight?: number,
  updateGame?: (game: UploadGameData) => void,
  removeGame?: (gameId: string) => void,
  children?: ReactNode
}

const GameBox = ({ game, width = 250, imageHeight = 130, updateGame, removeGame, children }: GameBoxProps) => {
  const navigator = useNavigation()
  const showInfo = useToggle()
  const editEvent = () => {
    navigator.goToGameDetails(game._id)
  }
  const deleteConfirmToggle = useToggle()

  const gameHeaderAllowedLength = useMemo(() => {
    return width < 300 ? 20 : 30
  }, [width])

  const favorite = () => {
    updateGame?.({
      _id: game._id,
      favorite: !game.favorite
    })
  }

  const containerStyles = {
    width,
    minWidth: width,
    height: showInfo.toggleValue ? '475px' : '230px'
  }

  return (
    <div className="bg-amber-300/75 rounded-t-md transition-[height] duration-500 ease-in-out shadow-2xl" style={containerStyles}>
      <div className='flex gap-2 justify-between items-center py-2 px-2'>
        <i className={`text-white cursor-pointer pi ${game.favorite ? 'pi-star-fill' : 'pi-star'}`} onClick={favorite} />
        <p>{`${game.name.substring(0,gameHeaderAllowedLength)}${game.name.length > gameHeaderAllowedLength ? '...' : ''}`}</p>
        {game.score && <Score score={game.score}></Score>}
      </div>
      <div className="game-box-img">
        <img alt="Game Cover" src={game?.cover || no_cover}  className={`w-full h-[130px]!`} />
      </div>
      <div className='flex justify-between items-center py-2 px-2'>
        {game.completion && (
          <Status status={game.completion.name} />
        )}
        {children}
        <div className='flex gap-3'>
          <i className='text-white pi pi-eye' onClick={editEvent} />
          {removeGame && <i className={`text-red-500 cursor-pointer hover:text-red-700 pi pi-trash`} onClick={deleteConfirmToggle.toggle} />}
        </div>
      </div>
      <div className='flex  flex-col items-center justify-center pb-1 px-3'>
        <i className={`pi pi-angle-${showInfo.toggleValue ? 'up' : 'down'} cursor-pointer`} onClick={showInfo.toggle} />
        {<div className={`flex flex-col gap-2 transition-all transition-discrete duration-700 ease-in ${showInfo.toggleValue ? 'opacity-100' : 'opacity-0'}`} >
          <p>Developed by {game.developers?.map(d => d.substring(0,14) + " ")}</p>
          <p>Published by {game.publishers?.map(p => p.substring(0,14) + " ")}</p>
          <p>Released in {game.release_year}</p>
          {game.played_year && <p>Played in {game.played_year} </p>}
          <p>Played on {game.platform.short_name ?? game.platform.name} </p>
          <div className='flex gap-2 flex-wrap'>
            {game.genres?.map(g => 
              <Chip
                key={game._id}
                className="bg-amber-200! flex items-center justify-center rounded-2xl "
                label={g}
              />
            )}
          </div>
        </div>}
      </div>
      
      {removeGame && <ConfirmDialog 
        visible={deleteConfirmToggle.toggleValue}
        onHide={deleteConfirmToggle.toggleOFF}
        header="Delete Game"
        icon='pi pi-exclamation-triangle'
        message='Are you sure you want to delete this game?'
        accept={() => removeGame(game._id)}
        reject={deleteConfirmToggle.toggleOFF}
       />}
      
    </div>
  )
}

export default GameBox
