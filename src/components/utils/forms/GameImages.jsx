import { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { useMessages } from "../../../hooks/context hooks/useMessages";

import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
        

function GameImages({ onSubmit }) {
  const [cover, setCover] = useState()
  const [coverURL, setCoverURL] = useState()
  const [coverBox, setCoverBox] = useState()
  const [coverBoxURL, setCoverBoxURL] = useState()
  const [gallery, setGallery] = useState()
  const { message } = useMessages()

  const coverUpload = (data) => {
    setCover(data.files[0])
    message('info', 'Saved Cover')
  }

  const coverBoxUpload = (data) => {
    setCoverBox(data.files[0])
    message('info', 'Saved Box Cover')
  }

  const galleryUpload = (data) => {
    setGallery(data.files)
    message('info', 'Added to gallery')
  }

  const handleSubmit = () => {
    onSubmit({
      cover,
      coverBox,
      gallery,
      coverURL,
      coverBoxURL
    })
  }

  const removeFromGallery = (file) => {
    const updatedGallery = gallery.filter(element => element.name !== file.name)
    setGallery(updatedGallery)
  }

  return (
    <div className="game-form">
      <TabView className="p-4 game-form">
        <TabPanel header="Cover" className="game-form-item">
          <FileUpload
            customUpload
            mode="advanced"
            auto
            onRemove={() => setCover(null)}
            multiple={false}
            uploadHandler={coverUpload}
            accept="image/*"
            chooseLabel="Select Cover Art (16:9)"
          />
          <label>Or add image URL (takes priority)</label>
          <InputText value={coverURL} onChange={e => setCoverURL(e.target.value)} />
        </TabPanel>
        <TabPanel header="Box Cover" className="game-form-item">
          <FileUpload
            customUpload
            mode="advanced"
            auto
            onRemove={() => setCoverBox(null)}
            multiple={false}
            uploadHandler={coverBoxUpload}
            accept="image/*"
            chooseLabel="Select Box Art (9:16)"
          />
          <label>Or add image URL (takes priority)</label>
          <InputText value={coverBoxURL} onChange={e => setCoverBoxURL(e.target.value)} />
        </TabPanel>
        <TabPanel header="Gallery" className="game-form-item">
          <FileUpload
            customUpload
            mode="advanced"
            multiple={true}
            auto
            onRemove={removeFromGallery}
            uploadHandler={galleryUpload}
            accept="image/*"
            chooseLabel="Select Files (Art collection)"
          />
        </TabPanel>
      </TabView>
      <div className="flex p-3">
        <Button className="pink-button" label="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
  
}

export default GameImages