import { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { useMessages } from "../../../hooks/useMessages";

function GameImages({ onSubmit }) {
  const [cover, setCover] = useState()
  const [coverBox, setCoverBox] = useState()
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
      gallery
    })
  }

  const removeFromGallery = (file) => {
    const updatedGallery = gallery.filter(element => element.name !== file.name)
    setGallery(updatedGallery)
  }

  return (
    <div className="p-4 flex flex-column gap-4">
      <label>Cover</label>
      <FileUpload
        customUpload
        mode="advanced"
        auto
        onRemove={() => setCover(null)}
        multiple={false}
        uploadHandler={coverUpload}
        accept="image/*"
        chooseLabel="Select File"
      />
      <label>Box Cover</label>
      <FileUpload
        customUpload
        mode="advanced"
        auto
        onRemove={() => setCoverBox(null)}
        multiple={false}
        uploadHandler={coverBoxUpload}
        accept="image/*"
        chooseLabel="Select File"
      />
      <label>Gallery</label>
      <FileUpload
        customUpload
        mode="advanced"
        multiple={true}
        auto
        onRemove={removeFromGallery}
        uploadHandler={galleryUpload}
        accept="image/*"
        chooseLabel="Select Files"
      />

      <div className="flex p-3">
        <Button className="pink-button" label="Submit" onClick={handleSubmit} />
      </div>
    </div>
  )
  
}

export default GameImages