import React, { useState, useEffect } from "react";
import api from "../../services/APICalls";
import { useLocation } from "react-router-dom";
import Top10CharacterBox from "../utils/Top10CharacterBox";

const Top10Characters = () => {
  const location = useLocation();
  const [characters, setCharacters] = useState([]);
  const [top10name, setTop10Name] = useState(location.state.top10name);

  const getCharacters = () => {
    api.getTop10Characters("All Time", (data) => {
      setCharacters(data);
    });
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const addCharacter = (character, position) => {
    api.postCharacter(character, () => {
      api.postTop10Character(
        { characterid: character.id, pos: position },
        top10name,
        () => {
          getCharacters();
        }
      );
    });
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
              <Top10CharacterBox></Top10CharacterBox>
              <Top10CharacterBox></Top10CharacterBox>
              <Top10CharacterBox></Top10CharacterBox>
              <Top10CharacterBox></Top10CharacterBox>
              <Top10CharacterBox></Top10CharacterBox>
              <Top10CharacterBox></Top10CharacterBox>
              <Top10CharacterBox></Top10CharacterBox>
              <Top10CharacterBox></Top10CharacterBox>
              <Top10CharacterBox></Top10CharacterBox>
              <Top10CharacterBox></Top10CharacterBox>
            </div>

            {characters.map((character) => {})}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Top10Characters;
