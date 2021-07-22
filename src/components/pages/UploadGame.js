import React, { useState, useRef } from "react";
import api from "../../services/APICalls";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import GameBox from "../utils/GameBox";
import { sr_images } from "../../routes";

import { Toast } from "primereact/toast";

const UploadGame = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [dev, setDev] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState({ id: "", name: "" });
  const [platform, setPlatform] = useState({ id: "", name: "" });
  const [platformList, setPlatformList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [gameImage, setGameImage] = useState({ name: "none" });

  const toast = useRef(null);

  const clear = () => {
    setName("");
    setYear("");
    setDev("");
    setPublisher("");
    setGenre("");
    setRating("");
    setStatus("");
    setPlatform("");
    setGameImage("");
  };

  const handleSubmit = () => {
    api.postPlayedGame(
      {
        name,
        developer: dev,
        publisher,
        year,
        genre,
        rating,
        platformid: platform.id,
        statusid: status.id,
        image: gameImage.name,
      },
      () => {
        clear();
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
    setGameImage(e.files[0]);
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
            <InputText id="gname" onChange={(e) => setName(e.target.value)} />
          </span>
          <span className="p-field item">
            <label htmlFor="gdev" className="p-d-block">
              Developer
            </label>
            <InputText id="gdev" onChange={(e) => setDev(e.target.value)} />
          </span>
          <span className="p-field item">
            <label htmlFor="gpub" className="p-d-block">
              Publisher
            </label>
            <InputText
              id="gpub"
              onChange={(e) => setPublisher(e.target.value)}
            />
          </span>
          <span className="p-field item">
            <label htmlFor="gyear" className="p-d-block">
              Year
            </label>
            <InputText id="gyear" onChange={(e) => setYear(e.target.value)} />
          </span>
        </div>
        <div className="p-col-6 upload-game-field-half">
          <span className="p-field item">
            <label htmlFor="ggenre" className="p-d-block">
              Genre
            </label>
            <InputText id="ggenre" onChange={(e) => setGenre(e.target.value)} />
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
            image: sr_images + gameImage.name,
          }}
        ></GameBox>
      </div>
    </div>
  );
};

export default UploadGame;
