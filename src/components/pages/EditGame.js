import React, { useState, useRef } from "react";
import api from "../../services/APICalls";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import GameBox from "../utils/GameBox";
import { useLocation } from "react-router-dom";
import { sr_images } from "../../routes";

import { Toast } from "primereact/toast";

const EditGame = (props) => {
  const location = useLocation();
  const [name, setName] = useState(location.state.game.name);
  const [year, setYear] = useState(location.state.game.year);
  const [dev, setDev] = useState(location.state.game.developer);
  const [publisher, setPublisher] = useState(location.state.game.publisher);
  const [genre, setGenre] = useState(location.state.game.genre);
  const [rating, setRating] = useState(location.state.game.rating);
  const [status, setStatus] = useState(location.state.game.status);
  const [platform, setPlatform] = useState(location.state.game.platform);
  const [image, setImage] = useState(location.state.game.image);
  const [platformList, setPlatformList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const toast = useRef(null);

  const handleSubmit = () => {
    api.putPlayedGame(
      {
        id: location.state.game.id,
        name,
        developer: dev,
        publisher,
        year,
        genre,
        rating,
        platformid: platform.id,
        statusid: status.id,
        image,
      },
      () => {
        toast.current.show({
          severity: "success",
          summary: "Game Uploaded Successfully",
          life: 3000,
        });
      }
    );
  };

  React.useEffect(() => {
    (async () => {
      const response = await api.fetchPlatforms();
      const platforms = await response.data;
      setPlatformList(platforms);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const response = await api.fetchStatuses();
      const statuses = await response.data;
      setStatusList(statuses);
    })();
  }, []);

  const onupload = async (e) => {
    await api.uploadImage(e.files[0]);
    setImage(sr_images + e.files[0].name);
    e.options.clear();
  };

  return (
    <div className="upload-game-wrapper p-grid">
      <div className="p-grid p-col-8 upload-game-fields">
        <Toast ref={toast} />
        <div className="p-col-6 upload-game-field-half">
          <span className="p-field item">
            <label htmlFor="gname" className="p-d-block">
              Name
            </label>
            <InputText
              id="gname"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <span className="p-field item">
            <label htmlFor="gdev" className="p-d-block">
              Developer
            </label>
            <InputText
              id="gdev"
              value={dev}
              onChange={(e) => setDev(e.target.value)}
            />
          </span>
          <span className="p-field item">
            <label htmlFor="gpub" className="p-d-block">
              Publisher
            </label>
            <InputText
              id="gpub"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </span>
          <span className="p-field item">
            <label htmlFor="gyear" className="p-d-block">
              Year
            </label>
            <InputText
              id="gyear"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </span>
        </div>
        <div className="p-col-6 upload-game-field-half">
          <span className="p-field item">
            <label htmlFor="ggenre" className="p-d-block">
              Genre
            </label>
            <InputText
              id="ggenre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </span>
          <span className="p-field item">
            <label htmlFor="gplatform" className="p-d-block">
              Platform
            </label>
            <Dropdown
              id="gplatform"
              value={platform}
              options={platformList}
              onChange={(e) => setPlatform(e.value)}
              optionLabel="name"
            />
          </span>
          <span className="p-field item">
            <label htmlFor="gstatus" className="p-d-block">
              Status
            </label>
            <Dropdown
              id="gstatus"
              value={status}
              options={statusList}
              onChange={(e) => setStatus(e.value)}
              optionLabel="name"
            />
          </span>
          <span className="p-field item">
            <label htmlFor="grating" className="p-d-block">
              Rating
            </label>
            <InputText
              id="grating"
              value={rating}
              type="number"
              onChange={(e) => setRating(e.target.value)}
            />
          </span>
        </div>
        <div className="p-col-12">
          <h2>Game Image</h2>
          <FileUpload
            name="gameImage"
            customUpload
            uploadHandler={onupload}
            onUpload={(e) => {}}
            accept="image/*"
            chooseLabel="File"
            emptyTemplate={
              <p className="p-m-0">Drag and drop files to here to upload.</p>
            }
          />
        </div>
        <div className="p-col">
          <h2 className="upload-button" onClick={handleSubmit}>
            <div>
              <i className="pi pi-check"></i> Upload Game
            </div>
          </h2>
        </div>
      </div>
      <div className="p-col-4 upload-game-preview">
        <h2>Preview</h2>
        <GameBox
          game={{
            name,
            developer: dev,
            publisher,
            year,
            rating,
            genre,
            status,
            platform,
            image,
          }}
        ></GameBox>
      </div>
    </div>
  );
};

export default EditGame;
