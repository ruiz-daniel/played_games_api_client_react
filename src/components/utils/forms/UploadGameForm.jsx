import { useState } from "react";
import { usePlatforms } from "../../../hooks/usePlatforms";
import { useCompletions } from "../../../hooks/useCompletions";
import { useForm, Controller } from "react-hook-form";
import { useMessages } from "../../../hooks/context hooks/useMessages";
import { useToggle } from "../../../hooks/useToggle";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Chips } from "primereact/chips";
import { Dialog } from "primereact/dialog";
import GameImages from "./GameImages";
import ImportFromSteam from "../lists/ImportFromSteam";
import EditGame from "./EditGame";

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
    setValue("name", game.title);
    setValue("developers", [game.developer.name]);
    setValue("publishers", [game.publisher.name]);
    setValue("steam_page", game.steamURL);
    setValue("release_year", game.released.slice(-4));
    setValue("platform", getPlatform(null, "PC"));
    setValue("description", game.description);
    const image = {
      coverURL: game.imgUrl,
    };
    handleImagesSubmit(image);
    steamDialogToggle.toggleOFF();
  };

  return (
    <>
      <Dialog
        header="Game Images"
        visible={imagesDialogToggle.toggleValue}
        onHide={imagesDialogToggle.toggle}
      >
        <GameImages onSubmit={handleImagesSubmit} />
      </Dialog>

      <EditGame onSubmit={onSubmit} className={"w-full"} />

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
    </>
  );
};

export default UploadGameForm;
