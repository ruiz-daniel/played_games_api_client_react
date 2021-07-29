import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const AddTop10Game = (props) => {
  const [games, setGames] = useState([]);
  const [selectedGame, selectGame] = useState({
    name: "No game selected",
    rating: 0,
  });
  const [pos, setPos] = useState();
  const [modGame, modifyGame] = useState();
  const [modPos, modifyPos] = useState();

  const [remove, setRemoveGame] = useState();

  useEffect(() => {
    api.getPlayedGames((data) => {
      setGames(data);
    });
  }, []);

  const addGame = () => {
    if (selectedGame.rating > 0) {
      props.addGame(selectedGame, pos);
    }
  };

  const moveGame = () => {
    if (modGame) {
      props.moveGame(modGame, modPos);
    }
  };

  const removeGame = () => {
    if (remove) {
      props.removeGame(remove);
    }
  };

  return (
    <div className="p-grid p-justify-center top10manage">
      <div className="p-col-12 top10section">
        <h2>Add Game</h2>
      </div>

      <div className="p-col-10 top10section">
        <Dropdown
          id="gamePlatform"
          options={games}
          value={selectedGame}
          onChange={(e) => {
            selectGame(e.value);
          }}
          optionLabel="name"
          showClear
        />
      </div>
      <div className="p-col-10 top10section">
        <InputText
          label="Position"
          type="number"
          value={pos}
          onChange={(e) => setPos(e.target.value)}
          placeholder="position"
        />
      </div>
      <div className="p-col-10 top10section" style={{ marginBottom: 50 }}>
        <Button label="Add Game" icon="pi pi-check" onClick={addGame} />
      </div>

      <div>
        <h2>Move Game</h2>
      </div>
      <div className="p-col-10 top10section">
        <Dropdown
          options={props.orderedGames}
          value={modGame}
          onChange={(e) => {
            modifyGame(e.value);
          }}
          optionLabel="name"
          showClear
        />
      </div>
      <div className="p-col-10 top10section">
        <InputText
          label="Position"
          type="number"
          value={modPos}
          onChange={(e) => modifyPos(e.target.value)}
          placeholder="position"
        />
      </div>
      <div className="p-col-10 top10section" style={{ marginBottom: 50 }}>
        <Button label="Move Game" icon="pi pi-pencil" onClick={moveGame} />
      </div>

      <div>
        <h2>Remove Game</h2>
      </div>
      <div className="p-col-10 top10section">
        <Dropdown
          options={props.orderedGames}
          value={remove}
          onChange={(e) => {
            setRemoveGame(e.value);
          }}
          optionLabel="name"
          showClear
        />
      </div>
      <div className="p-col-10 top10section" style={{ marginBottom: 50 }}>
        <Button label="Remove Game" icon="pi pi-trash" onClick={removeGame} />
      </div>
    </div>
  );
};

export default AddTop10Game;
