import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSingleLists } from "../../hooks/useSingleLists";
import ListHandler from "../utils/ListHandler";
import AddToListBox from "../utils/cards/AddToListBox";
import { NewSingleList } from "../../models/SingleList";
import { Divider } from 'primereact/divider';


const GameSingleLists = () => {
  const {lists, addToList, createList, deleteList, updateListName, moveGameInList, removeGameFromList} = useSingleLists()

  const handleCreateList = () => {
    const newList: NewSingleList = {
      games: [],
      name: "New Games List"
    }
    createList(newList)
  }

  return (
    <>
      <div className="played-games-list mt-2 flex flex-column gap-3">
        <h1 className="text-center">Game Lists</h1>
        {lists.map(list => 
          <div key={list._id} >
            <ListHandler list={list} addToList={addToList} updateListName={updateListName} deleteList={deleteList} moveGame={moveGameInList} removeGame={removeGameFromList}  />
            <Divider />
          </div>
        )}
        <AddToListBox onClick={handleCreateList} height={80} width={"100%"} />
      </div>
    </>
  )
}

export default GameSingleLists