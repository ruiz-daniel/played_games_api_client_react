import React, { useState, useRef } from "react";
import api from "../../services/APICalls";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import GameBox from "../utils/GameBox";
import { sr_images } from "../../routes";
import { Panel } from "primereact/panel";

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
    setGameImage(e.files[0]);
    e.options.clear();
  };

  return (
    <Panel header="New Game" className="upload-game-form">
      <Toast ref={toast} />
      <div className="upload-game-fields flex flex-column">
        <div className="item">
          <h5>Name</h5>
          <InputText
            id="gname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <span className="item">
          <h5>Developer(s)</h5>
          <InputText
            id="gdev"
            value={dev}
            onChange={(e) => setDev(e.target.value)}
          />
        </span>
        <span className="item">
          <h5>Publisher(s)</h5>
          <InputText
            id="gpub"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </span>
        <span className="item">
          <h5>Year</h5>
          <InputText
            id="gyear"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </span>

        <span className="item">
          <h5>Genre(s)</h5>
          <InputText
            id="ggenre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </span>
        <div className="items-platform-status-rating flex justify-content-between">
          <span className="item item-platform">
            <h5>Platform</h5>
            <Dropdown
              id="gplatform"
              value={platform}
              options={platformList}
              onChange={(e) => setPlatform(e.value)}
              optionLabel="name"
            />
          </span>
          <span className="item item-status">
            <h5>Status</h5>
            <Dropdown
              id="gstatus"
              value={status}
              options={statusList}
              onChange={(e) => setStatus(e.value)}
              optionLabel="name"
            />
          </span>
          <span className="item item-rating">
            <h5>Rating</h5>
            <InputText
              id="grating"
              value={rating}
              type="number"
              onChange={(e) => setRating(e.target.value)}
            />
          </span>
        </div>

        <div className="item">
          <h5>Game Image</h5>
          <FileUpload
            name="gameImage"
            customUpload
            auto
            uploadHandler={onupload}
            accept="image/*"
            chooseLabel="File"
            emptyTemplate={
              <p className="p-m-0">Drag and drop files to here to upload.</p>
            }
          />
        </div>
        <div className="item">
          <h2 className="upload-button" onClick={handleSubmit}>
            <div>
              <i className="pi pi-check"></i> Upload Game
            </div>
          </h2>
        </div>
      </div>
      {/* <div className="p-col-4 upload-game-preview">
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
      </div> */}
    </Panel>
  );
};

export default UploadGame;
