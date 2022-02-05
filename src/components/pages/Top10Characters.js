import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import { useLocation } from "react-router-dom";
import AddTop10Character from "../utils/AddTop10Character";
import Position from "../utils/position";

import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Sidebar } from "primereact/sidebar";

const Top10Characters = () => {
  const location = useLocation();
  const [characters, setCharacters] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [top10name, setTop10Name] = useState(location.state.top10name);

  const [selectedCharacter, setSelectedCharacter] = useState();

  const [sidebar, toggleSideBar] = useState(false);

  const getCharacters = () => {
    api.getTop10Characters("All Time", (data) => {
      data.forEach((element) => {
        element.name = element.character.name;
      });
      setCharacters(data);
    });
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const movePositions = (position) => {
    characters.forEach((element) => {
      if (element.pos >= position) {
        element.pos++;
      }
    });
    updateCharactersList(position - 2);
  };

  const updateCharactersList = (index) => {
    if (index === characters.length) {
      getCharacters();
    } else {
      api.putTop10Character(characters[index], () => {
        updateCharactersList(index + 1);
      });
    }
  };
  const removeCharacter = (character) => {
    api.deleteTop10Character(character.id, () => {
      characters.forEach((element) => {
        if (element.pos > character.pos) {
          element.pos--;
        }
      });
      updateCharactersList(character.pos);
    });
  };
  const switchCharacters = (character1, character2) => {
    character1.pos++;
    character2.pos--;
    updateCharactersList(character2.pos - 1);
  };

  return (
    <>
      <div className="top10header">
        <h1>Top 10 {top10name} Characters</h1>
      </div>
      {!sidebar && (
        <Button
          className="add-character-button"
          icon="pi pi-arrow-left"
          onClick={() => {
            toggleSideBar(true);
          }}
        />
      )}
      <Sidebar
        visible={sidebar}
        position="right"
        onHide={() => toggleSideBar(false)}
        showCloseIcon={false}
      >
        <AddTop10Character
          movePositions={movePositions}
          top10name={top10name}
        />
      </Sidebar>
      <div className="top10-characters-container flex flex-wrap">
        {characters.map((character, index) => {
          return (
            <div
              className="top10-character"
              key={character.id}
              onMouseEnter={() => {
                setSelectedCharacter(character.character);
              }}
            >
              <h2>
                <Position pos={character.pos}></Position>
              </h2>

              <Image
                alt="Character Art"
                src={character.character.image}
                preview
              />
              <div className="top10-characters-handle flex justify-content-center">
                {character.pos > 1 && (
                  <Button
                    icon="pi pi-arrow-left"
                    className=" p-button-primary p-button-sm "
                    onClick={(e) => {
                      switchCharacters(characters[index - 1], character);
                    }}
                  />
                )}
                {character.pos < characters.length && (
                  <Button
                    icon="pi pi-arrow-right"
                    className=" p-button-primary p-button-sm "
                    onClick={(e) => {
                      switchCharacters(character, characters[index + 1]);
                    }}
                  />
                )}
                <Button
                  icon="pi pi-trash"
                  className=" p-button-danger p-button-sm "
                  onClick={(e) => {
                    removeCharacter(character);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {selectedCharacter && (
        <div className="top10-character-info">
          <h3>{selectedCharacter.name}</h3>
          <p>from {selectedCharacter.game.name}</p>
          <p>
            <a
              href={selectedCharacter.wikia_url}
              target="_blank"
              rel="noreferrer"
            >
              {selectedCharacter.wikia_url}
            </a>
          </p>
        </div>
      )}
    </>
  );
};

export default Top10Characters;
