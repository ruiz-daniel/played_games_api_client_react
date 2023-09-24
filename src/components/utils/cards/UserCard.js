import { Avatar } from 'primereact/avatar'
import { FileUpload } from 'primereact/fileupload'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

import weissIcon from '../../../images/KUIYU.png'
import { useUser } from '../../../hooks/useUser'
import { useToggle } from '../../../hooks/useToggle'

import api from '../../../services/IApi'

function UserCard() {
  const { user, update } = useUser()
  const { toggleValue, toggle } = useToggle()

  const onUpload = async (data) => {
    const image = await api.GeneralApi.uploadImage(data.files[0])
    const userData = {
      _id: user._id,
      profile_picture: image.data
    }
    update(userData)
  }

  return (
    <div className="flex flex-column justify-content-center align-items-center">
      <Dialog
        header="Change Profile Picture"
        visible={toggleValue}
        onHide={toggle}
      >
        <FileUpload
          className="m-2"
          customUpload
          mode="advanced"
          multiple={false}
          uploadHandler={onUpload}
          accept="image/*"
          chooseLabel="Change Picture"
        />
      </Dialog>
      <Avatar
        image={user?.profile_picture || weissIcon}
        className="mr-4 extra-large-avatar"
        size="xlarge"
        shape="circle"
      />
      <h1>{user?.display_name ?? "Guest"}</h1>
      <h3>@{user?.username ?? "username"}</h3>
      <Button className="pink-button" label="Change Picture" onClick={toggle} />
    </div>
  );
}

export default UserCard
