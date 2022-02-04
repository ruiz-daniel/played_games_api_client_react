import React, { useState, useRef } from "react";
import api from "../../services/APICalls";
import { useForm, Controller } from "react-hook-form";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Panel } from "primereact/panel";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

import { Toast } from "primereact/toast";

const UploadGame = () => {
  const [platformList, setPlatformList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [gameImage, setGameImage] = useState();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const toast = useRef(null);

  const onSubmit = async (data) => {
    await api.uploadImage(gameImage);
    api.postPlayedGame(
      {
        name: data.name,
        developer: data.dev ? data.dev : "Unknown",
        publisher: data.publisher ? data.publisher : "Unknown",
        year: data.year ? data.year : "Unknown",
        genre: data.genre ? data.genre : "Unknown",
        rating: data.rating,
        description: data.description,
        platformid: data.platform.id,
        statusid: data.status.id,
        image: gameImage ? gameImage.name : "no-cover.jpg",
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
      const response_platforms = await api.fetchPlatforms();
      const platforms = await response_platforms.data;
      setPlatformList(platforms);
      const response_status = await api.fetchStatuses();
      const statuses = await response_status.data;
      setStatusList(statuses);
    })();
  }, []);

  const onupload = async (e) => {
    setGameImage(e.files[0]);
  };

  return (
    <Panel header="New Game" className="upload-game-form">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="upload-game-fields flex flex-column">
          <div className="item">
            <h5>Name *</h5>
            <InputText id="gname" {...register("name", { required: true })} />
            {errors.name && (
              <span className="error-message">Name is required</span>
            )}
          </div>
          <span className="item">
            <h5>Developer(s)</h5>
            <InputText id="gdev" {...register("dev")} />
          </span>
          <span className="item">
            <h5>Publisher(s)</h5>
            <InputText id="gpub" {...register("publisher")} />
          </span>
          <span className="item">
            <h5>Year</h5>
            <InputText
              id="gyear"
              type="number"
              {...register("year", { min: 1970, max: 2030 })}
            />
            {errors.year && (
              <span className="error-message">Requires a valid year</span>
            )}
          </span>

          <span className="item">
            <h5>Genre(s)</h5>
            <InputText id="ggenre" {...register("genre")} />
          </span>
          <span className="item">
            <h5>Description (Optional)</h5>
            <InputTextarea rows={5} {...register("description")} autoResize />
          </span>
          <div className="items-platform-status-rating flex justify-content-between">
            <span className="item item-platform">
              <h5>Platform *</h5>
              <Controller
                name="platform"
                control={control}
                rules={{ required: "Platform is required" }}
                render={({ field, fieldState }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={platformList}
                    optionLabel="name"
                  />
                )}
              />
              {errors.platform && (
                <div className="error-message">Platform is required</div>
              )}
            </span>
            <span className="item item-status">
              <h5>Status *</h5>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field, fieldState }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={statusList}
                    optionLabel="name"
                  />
                )}
              />
              {errors.status && (
                <div className="error-message">Status is required</div>
              )}
            </span>
            <span className="item item-rating">
              <h5>Rating *</h5>
              <InputText
                id="grating"
                type="number"
                {...register("rating", { min: 1, max: 10, required: true })}
              />
              {errors.rating && (
                <div className="error-message">Requires a valid rating</div>
              )}
            </span>
          </div>

          <div className="item">
            <h5>Image</h5>
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
          <div className="item mt-4">
            <Button
              className="upload-button"
              label="Upload Game"
              type="submit"
            ></Button>
          </div>
        </div>
      </form>
    </Panel>
  );
};

export default UploadGame;
