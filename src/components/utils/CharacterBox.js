import React from 'react'

import { Image } from 'primereact/image'

const CharacterBox = ({ character }) => {
  return (
    <div className="character-box flex">
      <div className='flex justify-content-center character-box-image'>
        <Image alt="Character Art" src={character.image} />
      </div>
      
      <div className="character-box-data flex flex-grow-1 flex-column">
        <h2>{character.name}</h2>
        <p className="character-data-item">{character.game.name}</p>
        <p className="character-data-item">
          <a href={character.wikia_url}>Wikia</a>
        </p>
      </div>
    </div>
  )
}

export default CharacterBox
