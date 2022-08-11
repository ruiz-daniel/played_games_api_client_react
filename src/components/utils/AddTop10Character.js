import React, { useState, useEffect } from "react";
import api from "../../services/IApi";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Panel } from "primereact/panel";

import { useForm, Controller } from "react-hook-form";

const AddTop10Character = (props) => {
  const [image, setImage] = useState();
  const [games, setGames] = useState();

  const getGames = () => {
    api.PlayedGamesApi.getPlayedGames((data) => {
      setGames(data);
    });
  };

  useEffect(() => {
    getGames();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await api.GeneralApi.uploadImage(image);
    addCharacter(
      {
        name: data.name,
        gameid: data.game.id,
        wikia_url: data.wikia_url,
        image: image ? image.name : "",
      },
      data.position
    );
  };

  const addCharacter = (character, position) => {
    api.CharactersApi.postCharacter(character, (data) => {
      api.Top10CharactersApi.postTop10Character(
        { characterid: data.id, pos: position },
        props.top10name,
        () => {
          props.movePositions(position);
        }
      );
    });
  };

  const onupload = async (e) => {
    setImage(e.files[0]);
  };

  return (
    <div className="flex-column">
      <Panel header="New Character" className="upload-character-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h5>Name *</h5>
          <InputText
            className="p-mb-3"
            {...register("name", { required: true })}
          />
          {errors.name && <div className="error-message">Name required</div>}
          <h5>Wikia Url</h5>
          <InputText className="p-mb-3" {...register("wikia_url")} />
          <h5>Game *</h5>
          <Controller
            name="game"
            control={control}
            rules={{ required: "Game is required" }}
            render={({ field, fieldState }) => (
              <Dropdown
                className="p-mb-3"
                options={games}
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                optionLabel="name"
              />
            )}
          />
          {errors.game && <div className="error-message">Select a game</div>}
          <h5>Position *</h5>
          <InputText
            type="number"
            {...register("position", { required: true, min: 1 })}
          />
          {errors.position && (
            <div className="error-message">Position required</div>
          )}
          <h5>Image</h5>
          <FileUpload
            name="characterImage"
            customUpload
            auto
            uploadHandler={onupload}
            onUpload={(e) => {}}
            accept="image/*"
            chooseLabel="File"
            emptyTemplate={
              <p className="p-m-0">Drag and drop files to here to upload.</p>
            }
          />
          <Button
            className="upload-button mt-4"
            label="Add Character"
            type="submit"
          ></Button>
        </form>
      </Panel>
    </div>
  );
};

export default AddTop10Character;
