import { useState } from "react";
import { usePlatforms } from "../../../hooks/usePlatforms";
import { useCompletions } from "../../../hooks/useCompletions";
import { useForm, Controller } from "react-hook-form";
import { useMessages } from "../../../hooks/useMessages";
import { useToggle } from "../../../hooks/useToggle";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Chips } from "primereact/chips";
import { Dialog } from "primereact/dialog";
import GameImages from "./GameImages";
import ImportFromSteam from "../lists/ImportFromSteam";

const UploadGameForm = ({ onSubmit }) => {
  const { platforms, getPlatform } = usePlatforms();
  const { completions } = useCompletions();
  const { message } = useMessages();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({});

  const imagesDialogToggle = useToggle();
  const [images, setImages] = useState();
  const steamDialogToggle = useToggle();

  const prepareSubmit = (data) => {
    if (images) {
      data.images = images;
    }
    onSubmit(data);
  };

  const handleImagesSubmit = (images) => {
    setImages(images);
    imagesDialogToggle.toggleOFF();
    message("info", "Saved Images");
  };

  const handleImportFromSteam = (game) => {
    setValue('name', game.title)
    setValue('developers', [game.developer.name])
    setValue('publishers', [game.publisher.name])
    setValue('steam_page', game.steamURL)
    setValue('release_year', game.released.slice(-4))
    setValue('platform', getPlatform(null, 'PC'))
    const image = {
      coverURL: game.imgUrl
    }
    handleImagesSubmit(image)
    steamDialogToggle.toggleOFF()
  }

  return (
    <>
      <Dialog
        header="Game Images"
        visible={imagesDialogToggle.toggleValue}
        onHide={imagesDialogToggle.toggle}
      >
        <GameImages onSubmit={handleImagesSubmit} />
      </Dialog>
      <Dialog
      header="Search your game on Steam"
        onHide={steamDialogToggle.toggleOFF}
        visible={steamDialogToggle.toggleValue}
      >
        <ImportFromSteam onSelect={handleImportFromSteam} />
      </Dialog>

      <form onSubmit={handleSubmit(prepareSubmit)} className="game-form">
        <Button 
          className="black-button align-self-end" 
          label="Import from Steam" 
          onClick={steamDialogToggle.toggle} 
          type="button" 
          style={{width: 200}} 
        />

        <div className="game-form-item text-center">
          <label htmlFor="gname">Name*</label>
          <InputText id="gname" {...register("name", { required: true })} />
          {errors.name && <div className="error-message">Name is required</div>}
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="gdev">Developers</label>
          <Controller
            name="developers"
            control={control}
            render={({ field, fieldState }) => (
              <Chips
                id="gdev"
                allowDuplicate={false}
                separator=","
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="gpub">Publisher</label>
          <Controller
            name="publishers"
            control={control}
            render={({ field, fieldState }) => (
              <Chips
                id="gpub"
                allowDuplicate={false}
                separator=","
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="gyear">Release Year</label>
          <InputText
            id="gyear"
            type="number"
            onWheel={(e) => {
              e.target.blur();
            }}
            {...register("release_year", { min: 1970, max: 2030 })}
          />
          {errors.release_year && (
            <div className="error-message">Requires a valid year</div>
          )}
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="gplayedyear">Played Year</label>
          <InputText
            id="gplayedyear"
            type="number"
            onWheel={(e) => {
              e.target.blur();
            }}
            {...register("played_year", { min: 1970, max: 2030 })}
          />
          {errors.played_year && (
            <div className="error-message">Requires a valid year</div>
          )}
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="ggenre">Genres</label>
          <Controller
            name="genres"
            control={control}
            render={({ field, fieldState }) => (
              <Chips
                id="gdev"
                allowDuplicate={false}
                separator=","
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="gtags">Tags</label>
          <Controller
            name="tags"
            control={control}
            render={({ field, fieldState }) => (
              <Chips
                id="gtags"
                allowDuplicate={false}
                separator=","
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="platform">Platform</label>
          <Controller
            name="platform"
            control={control}
            render={({ field, fieldState }) => (
              <Dropdown
                id={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={platforms}
                optionLabel="name"
              />
            )}
          />
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="status">Completion</label>
          <Controller
            name="completion"
            control={control}
            render={({ field, fieldState }) => (
              <Dropdown
                id={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={completions}
                optionLabel="name"
              />
            )}
          />
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="grating">Score</label>
          <InputText
            id="grating"
            type="number"
            onWheel={(e) => {
              e.target.blur();
            }}
            min={1}
            max={10}
            {...register("score", { min: 1, max: 10 })}
          />
          {errors.rating && (
            <div className="error-message">Requires a valid score</div>
          )}
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="ghours">Played Hours</label>
          <InputText
            id="ghours"
            type="number"
            min={0}
            onWheel={(e) => {
              e.target.blur();
            }}
            {...register("played_hours")}
          />
          {errors.played_hours && (
            <div className="error-message">
              Requires a valid amount of hours
            </div>
          )}
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="gsteam">Steam Page URL</label>
          <InputText id="gsteam" {...register("steam_page")} />
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="gepic">Epic Store Page URL</label>
          <InputText id="gepic" {...register("epic_page")} />
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="gother">Other Stores URLs</label>
          <Controller
            name="other_stores"
            control={control}
            render={({ field, fieldState }) => (
              <Chips
                id="gother"
                allowDuplicate={false}
                separator=","
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />
        </div>
        <div className="game-form-item text-center">
          <label htmlFor="gdesc">Description (optional)</label>
          <InputTextarea
            id="gdesc"
            rows={5}
            {...register("description")}
            autoResize
          />
        </div>

        <div className="flex justify-content-end gap-4">
          <Button
            label="Images"
            type="button"
            icon="pi pi-camera"
            className="pink-button"
            onClick={imagesDialogToggle.toggle}
          />
          <Button
            label="Upload"
            type="submit"
            icon="pi pi-upload"
            className="blue-button"
          />
        </div>
      </form>
    </>
  );
};

export default UploadGameForm;
