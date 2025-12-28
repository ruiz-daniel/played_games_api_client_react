import React, { useEffect, useState } from "react";
import { SingleList } from "../../models/SingleList";
import GameBox from "./cards/GameBox";
import AddToListBox from "./cards/AddToListBox";
import SearchGame from "./lists/SearchGame";
import { PlayedGame } from "../../models/PlayedGame";
import { InputText } from "primereact/inputtext";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useToggle } from "../../hooks/useToggle";

export type ListHandlerProps = {
  list: SingleList,
  addToList: (game: PlayedGame, listId: string) => void,
  updateListName: (newName: string, listId: string) => void,
  deleteList: (listId: string) => void,
  moveGame: (gameId: string, listId: string, direction: "left" | "right") => void,
  removeGame: (gameId: string, listId: string) => void
}

const ListHandler = ({list, addToList, updateListName, deleteList, moveGame, removeGame}: ListHandlerProps) => {
  const showSearch = useToggle()
  const editName = useToggle()
  const [newName, setNewName] = useState('')
  const deleteConfirmToggle = useToggle()
  const showWrapped = useToggle()

  const handleUpdateListName = () => {
    editName.toggleOFF()
    updateListName(newName, list._id)
  }

  useEffect(() => {
      const listContainer = document.getElementById('list-handler-row');
  
      listContainer?.addEventListener('wheel', (event) => {
          // Prevent the default vertical scroll
          event.preventDefault(); 
          
          // Scroll horizontally by the amount of vertical scroll
          listContainer.scrollLeft += event.deltaY;
      });
  
    }, [])
  
  return (
    <div className="list-handler-container">
      <ConfirmDialog 
        visible={deleteConfirmToggle.toggleValue}
        onHide={deleteConfirmToggle.toggleOFF}
        header="Delete List"
        icon='pi pi-exclamation-triangle'
        message='Are you sure you want to delete this list?'
        accept={() => deleteList(list._id)}
        reject={deleteConfirmToggle.toggleOFF}
        />
      <h3>
        {editName.toggleValue ? 
          <InputText
            id="edit-list-name-input"
            placeholder={list.name}
            className="p-inputtext-sm"
            defaultValue={list.name}
            value={newName}
            onChange={e => { setNewName(e.target.value) }}
            onKeyDownCapture={e => e.key === 'Enter' && handleUpdateListName()}
          /> 
          : list.name
        } 
        <i className={`pi ${editName.toggleValue ? 'pi-times' : 'pi-pencil'} hover:text-yellow-500`} onClick={editName.toggle} />
        <i className={`pi ${showSearch.toggleValue ? 'pi-times' : 'pi-plus'} hover:text-cyan-700`} onClick={showSearch.toggle} />
        <i className="pi pi-trash hover:text-red-500" onClick={deleteConfirmToggle.toggleON}/>
        <i className={`pi pi-list ${showWrapped.toggleValue ? 'text-blue-600': ''}` } onClick={showWrapped.toggle}/>
      </h3>
      <div id="list-handler-row" className={`flex gap-3 overflow-x-auto w-full pb-3 flex-column align-items-center sm:flex-row ${showWrapped.toggleValue ? 'flex-wrap' : ''}`}>
        {list?.games?.length > 0 && list.games.map((game, index) => 
          <GameBox key={game._id} game={game} width={280} imageHeight={120} removeGame={() => removeGame(game._id, list._id)}>
            <div className="flex gap-2">
              {index > 0 && <i className="pi pi-angle-left cursor-pointer" onClick={() => moveGame(game._id, list._id, 'left')} />}
              {index < list.games.length - 1 && <i className="pi pi-angle-right cursor-pointer" onClick={() => moveGame(game._id, list._id, 'right')} />}
            </div>
          </GameBox>
        )}
      </div>
      {showSearch.toggleValue && <SearchGame onSelectedGame={(game) => {addToList(game, list._id)}}/>}
    </div>
  )
}

export default ListHandler