import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import { useLocation } from "react-router-dom";
import Top10CharacterBox from "../utils/Top10CharacterBox";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { sr_images } from "../../routes";

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

  const [modChar, setModChar] = useState();
  const [modPos, setModPos] = useState();

  const [removeChar, setRemoveChar] = useState();

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
          getCharacters();

          clearAddCharacter(event);
        }
      );
    });
  };
  const moveCharacter = (character, position) => {
    character.pos = position;
    api.putTop10Character(character, () => {});
  };
  const removeCharacter = (character) => {
    api.deleteTop10Character(character.id);
  };

  const onupload = async (e) => {
    await api.uploadImage(e.files[0]);
    setCharImage(e.files[0].name);
    addCharacter(
      {
        name: addCharName,
        gameid: addCharGame.id,
        wikia_url: addCharWikia,
        image: addCharImage,
      },
      addCharPos,
      e
    );
  };

  return (
    <div>
      <div className="p-grid">
        <div className="p-col-12">
          <div className="top10content">
            <div className="top10header">
              <h1>Top 10 {top10name} Characters</h1>
            </div>
            <div className="p-d-flex">
              {characters.map((character) => {
                return (
                  <div className="p-d-flex">
                    <Top10CharacterBox
                      character={character}
                    ></Top10CharacterBox>
                  </div>
                );
              })}
            </div>
            <div className="p-grid top10manage">
              <div className="p-col-5">
                <h2>Add Character</h2>
                <div className="p-grid">
                  <div className="p-col-6">
                    <div className="p-d-flex p-flex-column">
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
                  </div>
                  <div className="p-col-6">
                    <div className="p-d-flex p-flex-column">
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
                  </div>
                  <div>
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
              <div className="p-col-4 top10section">
                <h2>Move Character</h2>
                <div className="p-mb-3">
                  <Dropdown
                    options={characters}
                    value={modChar}
                    onChange={(e) => {
                      setModChar(e.value);
                    }}
                    optionLabel="name"
                    showClear
                  />
                </div>
                <div>
                  <InputText
                    label="Position"
                    type="number"
                    value={modPos}
                    onChange={(e) => setModPos(e.target.value)}
                    placeholder="position"
                  />
                </div>
              </div>
              <div className="p-col-3 top10section">
                <h2>Remove Character</h2>
                <div className="p-mb-3">
                  <Dropdown
                    options={characters}
                    value={removeChar}
                    onChange={(e) => {
                      setRemoveChar(e.value);
                    }}
                    optionLabel="name"
                    showClear
                  />
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Top10Characters;
