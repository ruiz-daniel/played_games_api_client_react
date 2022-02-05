import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import { useLocation } from "react-router-dom";
import Top10CharacterBox from "../utils/Top10CharacterBox";
import Position from "../utils/position";

import { ScrollPanel } from "primereact/scrollpanel";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Carousel } from "primereact/carousel";
import { Image } from "primereact/image";

const Top10Characters = () => {
  const location = useLocation();
  const [characters, setCharacters] = useState([]);
  const [top10name, setTop10Name] = useState(location.state.top10name);
  const [games, setGames] = useState();

  const [addCharName, setCharName] = useState();
  const [addCharWikia, setCharWikia] = useState();
  const [addCharGame, setCharGame] = useState();
  const [addCharPos, setCharPos] = useState();

  const clearAddCharacter = (event) => {
    setCharGame("");
    setCharName("");
    setCharPos("");
    setCharWikia("");
    event.options.clear();
  };

  const getCharacters = () => {
    api.getTop10Characters("All Time", (data) => {
      data.forEach((element) => {
        element.name = element.character.name;
      });
      setCharacters(data);
    });
  };
  const getGames = () => {
    api.getPlayedGames((data) => {
      setGames(data);
    });
  };

  useEffect(() => {
    getCharacters();
    getGames();
  }, []);

  const addCharacter = (character, position, event) => {
    api.postCharacter(character, (data) => {
      api.postTop10Character(
        { characterid: data.id, pos: position },
        top10name,
        () => {
          clearAddCharacter(event);
          characters.forEach((element) => {
            if (element.pos >= position) {
              element.pos++;
            }
          });
          updateCharactersList(position - 2);
        }
      );
    });
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
        updateCharactersList(character.pos - 1);
      });
    });
  };
  const switchCharacters = (character1, character2) => {
    character1.pos++;
    character2.pos--;
    updateCharactersList(character2.pos - 1);
  };

  const onupload = async (e) => {
    await api.uploadImage(e.files[0]);
    addCharacter(
      {
        name: addCharName,
        gameid: addCharGame.id,
        wikia_url: addCharWikia,
        image: e.files[0].name,
      },
      addCharPos,
      e
    );
  };

  return (
    <>
      <div className="top10header">
        <h1>Top 10 {top10name} Characters</h1>
      </div>
      <div className="top10-characters-container flex flex-wrap">
        {characters.map((character, index) => {
          return (
            <div className="top10-character" key={character.id}>
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
      {/* <div className="p-grid p-justify-center p-flex-column">
          <h2>Add Character</h2>
          <div className="p-grid p-col-8">
            <div className="p-col-6 p-d-flex p-flex-column">
              <InputText
                className="p-mb-3"
                value={addCharName}
                onChange={(e) => setCharName(e.target.value)}
                placeholder="Name"
              />
              <InputText
                className="p-mb-3"
                value={addCharWikia}
                onChange={(e) => setCharWikia(e.target.value)}
                placeholder="Wikia URL"
              />
            </div>
            <div className="p-col-6 p-d-flex p-flex-column">
              <Dropdown
                className="p-mb-3"
                options={games}
                value={addCharGame}
                onChange={(e) => {
                  setCharGame(e.value);
                }}
                optionLabel="name"
                placeholder="Game"
                showClear
              />
              <InputText
                type="number"
                value={addCharPos}
                onChange={(e) => setCharPos(e.target.value)}
                placeholder="Position"
              />
            </div>
            <div className="p-col-12">
              <FileUpload
                name="gameImage"
                customUpload
                uploadHandler={onupload}
                onUpload={(e) => {}}
                accept="image/*"
                chooseLabel="File"
                emptyTemplate={
                  <p className="p-m-0">
                    Drag and drop files to here to upload.
                  </p>
                }
              />
            </div>
          </div>
        </div> */}
    </>
  );
};

export default Top10Characters;
