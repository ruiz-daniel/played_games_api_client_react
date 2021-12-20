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

const Top10Characters = () => {
  const location = useLocation();
  const [characters, setCharacters] = useState([]);
  const [top10name, setTop10Name] = useState(location.state.top10name);
  const [games, setGames] = useState();

  const [addCharName, setCharName] = useState();
  const [addCharWikia, setCharWikia] = useState();
  const [addCharImage, setCharImage] = useState();
  const [addCharGame, setCharGame] = useState();
  const [addCharPos, setCharPos] = useState();

  const clearAddCharacter = (event) => {
    setCharGame("");
    setCharName("");
    setCharImage("");
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

  const carrouselTemplate = (character) => {
    return (
      <img
        className="top10charactersimg"
        src={character.character.image}
        alt={character.character.name}
      ></img>
    );
  };

  return (
    <div>
      <div className="p-mx-6">
        <div className="top10header">
          <h1>Top 10 {top10name} Characters</h1>
        </div>
        <div className="p-grid">
          <div className="p-col-5">
            <ScrollPanel style={{ width: "100%", height: "84vh" }}>
              <div className="p-d-flex-column">
                {characters.map((character, index) => {
                  return (
                    <div key={character.id} className="p-d-flex">
                      <div className="p-p-5">
                        <h2>
                          <Position pos={character.pos}></Position>
                        </h2>
                      </div>
                      <Top10CharacterBox
                        character={character}
                      ></Top10CharacterBox>
                      <div className="p-d-flex p-flex-column">
                        <Button
                          icon="pi pi-trash"
                          className="p-button-rounded p-button-danger p-my-1"
                          onClick={(e) => {
                            removeCharacter(character);
                          }}
                        />
                        {character.pos > 1 && (
                          <Button
                            icon="pi pi-arrow-up"
                            className="p-button-rounded p-button-primary p-my-1"
                            onClick={(e) => {
                              switchCharacters(
                                characters[index - 1],
                                character
                              );
                            }}
                          />
                        )}
                        {character.pos < characters.length && (
                          <Button
                            icon="pi pi-arrow-down"
                            className="p-button-rounded p-button-primary p-my-1"
                            onClick={(e) => {
                              switchCharacters(
                                character,
                                characters[index + 1]
                              );
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollPanel>
          </div>
          <div className="p-col-7 p-pl-4 p-justify-center">
            <div className="p-my-6">
              <Carousel
                value={characters}
                numVisible={6}
                numScroll={4}
                className="custom-carousel"
                itemTemplate={carrouselTemplate}
              />
            </div>
            <div className="p-grid p-justify-center p-flex-column">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top10Characters;
