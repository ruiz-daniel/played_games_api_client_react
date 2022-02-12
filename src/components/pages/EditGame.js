import React, { useState, useRef } from "react";
import api from "../../services/APICalls";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";

import Score from "../utils/score";
import Status from "../utils/status";

import { useLocation, useHistory } from "react-router-dom";
import { sr_images, playedgames } from "../../routes";

import { Toast } from "primereact/toast";

const EditGame = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [name, setName] = useState(location.state.game.name);
  const [year, setYear] = useState(location.state.game.year);
  const [dev, setDev] = useState(location.state.game.developer);
  const [publisher, setPublisher] = useState(location.state.game.publisher);
  const [genre, setGenre] = useState(location.state.game.genre);
  const [rating, setRating] = useState(location.state.game.rating);
  const [status, setStatus] = useState(location.state.game.status);
  const [platform, setPlatform] = useState(location.state.game.platform);
  const [description, setDescription] = useState(
    location.state.game.description
  );
  const [image, setImage] = useState(location.state.game.image);
  const [platformList, setPlatformList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const toast = useRef(null);
  const [editing, setEditing] = useState(false);

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

  const deleteGame = () => {
    api.deletePlayedGame(location.state.game, () => {
      toast.current.show({
        severity: "error",
        summary: "Game Deleted Successfully",
        life: 3000,
      });
      setTimeout(function () {
        history.push(playedgames);
      }, 3000);
    });
  };

  const confirm = () => {
    confirmDialog({
      message: "Are you sure you want to delete this game?",
      header: "Delete Game",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => deleteGame(),
    });
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
    <div className="game-details-wrapper flex ">
      <Toast ref={toast} />
      <div className="game-details-image">
        <Image src={image} alt={name} preview />
        <div className="flex justify-content-end mt-2">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="p-button-outlined edit-button"
            onClick={() => {
              setEditing(true);
            }}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-outlined p-button-danger ml-3 delete-button"
            onClick={confirm}
          />
        </div>
      </div>
      <div className="game-details-fields flex-column">
        <h3>{name}</h3>
        <p>
          Developed by <span>{dev}</span>
        </p>
        <p>
          Published by <span>{publisher}</span>
        </p>
        <p>
          Year: <span>{year}</span>
        </p>
        <p>
          Genre: <span>{genre}</span>
        </p>
        <p>
          Played On: <span>{platform.name}</span>
        </p>
        <p>
          Score: <Score score={rating} />{" "}
        </p>
        <p>
          <Status status={status.name} />{" "}
        </p>
        {description && description != "" && <p>{description}</p>}
      </div>
    </div>
  );
};

export default EditGame;
