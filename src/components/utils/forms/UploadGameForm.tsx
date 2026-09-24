import { useEffect, useState } from "react";
import { useToggle } from "../../../hooks/useToggle";

import { Dialog } from "primereact/dialog";
import EditGame from "./EditGame";
import { useIgdbGames } from "../../../hooks/useIgdbGames";
import { dialogProps } from "../cards/GameBox";
import { UploadGameData } from "../../../models/types";

type UploadGameFormProps = {
  onSubmit: (data: UploadGameData) => void;
  importData?: any;
  resetOnSubmit?: boolean;
};

const UploadGameForm = ({
  onSubmit,
  importData,
  resetOnSubmit = false,
}: UploadGameFormProps) => {
  const { getGameCoverImg, getGameArtworks } = useIgdbGames();

  const imagesDialogToggle = useToggle();
  const [covers, setCovers] = useState<string[]>([]);
  const [artworks, setArtworks] = useState<string[]>([]);

  const handleImagesFromIgdb = async () => {
    if (importData) {
      const coversResponse = await getGameCoverImg(importData.id);
      const artboxResponse = await getGameArtworks(importData.id);

      if (coversResponse) {
        const mapToUrls = coversResponse.map(
          (imageData: { url: string; image_id: string }) =>
            `https://images.igdb.com/igdb/image/upload/t_1080p/${imageData.image_id}.webp`,
        );
        setCovers(mapToUrls);
      }
      if (artboxResponse) {
        const mapToUrls = artboxResponse.map(
          (imageData: { url: string; image_id: string }) =>
            `https://images.igdb.com/igdb/image/upload/t_1080p/${imageData.image_id}.webp`,
        );
        setArtworks(mapToUrls);
      }
    }
  };

  const handleSubmit = (data: UploadGameData) => {
    data.gallery = artworks;
    data.cover_box = covers[0];
    onSubmit(data);
    if (resetOnSubmit) {
      setCovers([]);
      setArtworks([]);
    }
  };

  useEffect(() => {
    handleImagesFromIgdb();
  }, [importData]);

  return (
    <>
      <Dialog
        header="Game Images"
        visible={imagesDialogToggle.toggleValue}
        onHide={imagesDialogToggle.toggle}
        pt={dialogProps}
      ></Dialog>

      <EditGame
        game={undefined}
        onSubmit={handleSubmit}
        className={"w-full"}
        importedGameData={importData}
        resetOnSubmit={resetOnSubmit}
      />

      {/* <div className="flex flex-row-reverse gap-4">
        <BaseButton
          label="Images"
          type="button"
          icon="pi pi-camera"
          onClick={imagesDialogToggle.toggle}
        />
        <BaseButton label="Upload" type="submit" icon="pi pi-upload" />
      </div> */}
    </>
  );
};

export default UploadGameForm;
