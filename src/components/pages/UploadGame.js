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
import { Steps } from "primereact/steps";

const UploadGame = () => {
  const [platformList, setPlatformList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [gameImage, setGameImage] = useState();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    name: "Test",
  });

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

  //FETCH PLATFORMS AND STATUSES WHEN THE COMPONENT MOUNTS
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

  //SAVE THE IMAGE TO ITS STATE AFTER SELECTING IT FROM LOCAL FILES
  const onupload = async (e) => {
    setGameImage(e.files[0]);
  };

  //STEPS ITEMS
  const step_items = [
    { label: "Info" },
    { label: "Played" },
    { label: "Finish" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Panel header="New Game" className="upload-game-form">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="upload-game-fields">
          <Steps
            model={step_items}
            activeIndex={activeIndex}
            onSelect={(e) => setActiveIndex(e.index)}
            readOnly={false}
            style={{ width: "100%" }}
          />

          {activeIndex === 0 && (
            <div className="form-content justify-content-center">
              <span className="p-float-label item flex flex-column">
                <InputText
                  id="gname"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="error-message">Name is required</span>
                )}
                <label htmlFor="gname">Name*</label>
              </span>

              <span className="p-float-label item">
                <InputText id="gdev" {...register("dev")} />
                <label htmlFor="gdev">Developer</label>
              </span>

              <span className="p-float-label item">
                <InputText id="gpub" {...register("publisher")} />
                <label htmlFor="gpub">Publisher</label>
              </span>

              <span className="p-float-label item">
                <InputText
                  id="gyear"
                  type="number"
                  {...register("year", { min: 1970, max: 2030 })}
                />
                {errors.year && (
                  <span className="error-message">Requires a valid year</span>
                )}
                <label htmlFor="gyear">Year</label>
              </span>

              <span className="p-float-label item">
                <InputText id="ggenre" {...register("genre")} />
                <label htmlFor="ggenre">Genre</label>
              </span>

              <span className="flex">
                <Button
                  label="Continue"
                  icon="pi pi-angle-right"
                  iconPos="right"
                  onClick={() => {
                    setActiveIndex(activeIndex + 1);
                  }}
                />
              </span>
            </div>
          )}

          {activeIndex === 1 && (
            <div className="form-content justify-content-center">
              <span className="p-float-label item">
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
                <label htmlFor="platform">Platform</label>
              </span>

              <span className="p-float-label item">
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
                <label htmlFor="status">Status</label>
              </span>

              <span className="p-float-label item">
                <InputText
                  id="grating"
                  type="number"
                  {...register("rating", { min: 1, max: 10, required: true })}
                />
                {errors.rating && (
                  <div className="error-message">Requires a valid rating</div>
                )}
                <label htmlFor="grating">Rating</label>
              </span>

              <span className="p-float-label item">
                <InputTextarea
                  id="gdesc"
                  rows={5}
                  {...register("description")}
                  autoResize
                />
                <label htmlFor="gdesc">Description (optional)</label>
              </span>

              <span className="flex">
                <Button
                  label="Continue"
                  icon="pi pi-angle-right"
                  iconPos="right"
                  onClick={() => {
                    setActiveIndex(activeIndex + 1);
                  }}
                />
              </span>
            </div>
          )}

          {activeIndex === 2 && (
            <div className="form-content justify-content-center">
              <h3>Cover Image</h3>
              <span className="item">
                <FileUpload
                  name="gameImage"
                  customUpload
                  auto
                  uploadHandler={onupload}
                  accept="image/*"
                  chooseLabel="File"
                  emptyTemplate={
                    <p className="p-m-0">
                      Drag and drop files to here to upload.
                    </p>
                  }
                />
              </span>

              <span className="flex">
                <Button
                  className="upload-button"
                  label="Upload Game"
                  type="submit"
                ></Button>
              </span>
            </div>
          )}

          {activeIndex === 3 && <div className="item mt-4"></div>}
        </div>
      </form>
    </Panel>
  );
};

export default UploadGame;
