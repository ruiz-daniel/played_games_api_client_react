import { Image } from "primereact/image"
import { Button } from "primereact/button"
import { Dialog } from 'primereact/dialog'
import { Galleria } from 'primereact/galleria';
import GameImages from "../forms/GameImages"
import  no_cover  from '../../../images/no-cover.jpg'
import { useToggle } from "../../../hooks/useToggle"
import { useState } from "react"
import { usePlayedGames } from "../../../hooks/usePlayedGames";

const GameImageViewer = ({ game, style }) => {
  const { updateGame } = usePlayedGames()
  const {toggle, toggleValue} = useToggle()
  const [view, setView] = useState('cover')
  const containerStyles = {
    width: '100%',
    ...style
  }
  const galleryResponsiveOptions = [
      {
          breakpoint: '991px',
          numVisible: 4
      },
      {
          breakpoint: '767px',
          numVisible: 3
      },
      {
          breakpoint: '575px',
          numVisible: 1
      }
  ];

  const itemTemplate = (item) => {
        return <img src={item} alt={game.name} height={window.matchMedia("(max-width: 600px)").matches ? 200 : 300} />
  }

  const thumbnailTemplate = (item) => {
      return <img src={item} alt={game.name} width={150} height={80} />
  }

  const handleImagesSubmit = (data) => {
    updateGame({
      _id: game._id,
      images: data
    })
  }


  return (
    <div className="flex flex-column gap-2" style={containerStyles}>
      <Dialog 
          header="Game Images" 
          visible={toggleValue} 
          style={{ width: '50vw' }} 
          onHide={toggle}
        >
          <GameImages onSubmit={handleImagesSubmit} />
        </Dialog>
      <section className="flex justify-content-center">
        <h2>{game.name}</h2>
      </section>
      <section className="flex justify-content-center">
        {view === 'cover' && 
          <Image 
            src={game.cover || no_cover} 
            alt={game.name} 
            preview 
            width={containerStyles.width}
            height={ window.matchMedia("(max-width: 600px)").matches ? 200 : 300 }
          />
        }
        {view === 'cover-box' && 
          <Image 
            src={game.cover_box || game.cover || no_cover} 
            alt={game.name} 
            preview 
            width={200}
            height={ 400 }
          />
        }
        {view === 'gallery' &&
          <Galleria value={game.gallery || []} responsiveOptions={galleryResponsiveOptions} numVisible={4} style={{ maxWidth: containerStyles.width }} 
                item={itemTemplate} thumbnail={thumbnailTemplate}/>
        }
      </section>
      <section className="flex justify-content-center gap-3">
        <Button
          icon='pi pi-image'
          className="p-button-outlined p-button-rounded p-button-warning edit-button"
          onClick={() => setView('cover')}
        />
        <Button
          icon='pi pi-mobile'
          className="p-button-outlined p-button-rounded p-button-warning edit-button"
          onClick={() => setView('cover-box')}
        />
        <Button
          icon='pi pi-images'
          className="p-button-outlined p-button-rounded p-button-warning edit-button"
          onClick={() => setView('gallery')}
        />
        <Button
          icon='pi pi-file-edit'
          className="p-button-outlined p-button-rounded p-button-warning edit-button"
          onClick={toggle}
        />
      </section>
    </div>
  )
}

export default GameImageViewer