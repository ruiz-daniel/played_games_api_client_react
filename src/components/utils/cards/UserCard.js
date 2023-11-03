import { Avatar } from 'primereact/avatar'
import { FileUpload } from 'primereact/fileupload'
import { Dialog } from 'primereact/dialog'

import weissIcon from '../../../images/KUIYU.png'
import { useUser } from '../../../hooks/useUser'
import { useToggle } from '../../../hooks/useToggle'

import api from '../../../services/IApi'
import DashboardButton from '../DashboardButton'
import UserForm from '../forms/UserForm'

function UserCard() {
  const { user, update } = useUser()
  const { toggleValue, toggle } = useToggle()
  const userFormToggle = useToggle()

  const onUpload = async (data) => {
    toggle()
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
        <div className="game-form">
          <div className="game-form-item">
            <FileUpload
              className="m-2"
              customUpload
              mode="advanced"
              auto
              multiple={false}
              uploadHandler={onUpload}
              accept="image/*"
              chooseLabel="Change Picture"
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        header="Edit User Info"
        visible={userFormToggle.toggleValue}
        onHide={userFormToggle.toggleOFF}
      >
        <UserForm submitCallback={userFormToggle.toggleOFF} />
      </Dialog>
      <Avatar
        image={user?.profile_picture || weissIcon}
        className="extra-large-avatar"
        size="xlarge"
        shape="circle"
        onClick={toggle}
      />
      <h1>{user?.display_name ?? "Guest"}</h1>
      <h3 style={{ margin: 0 }}>@{user?.username ?? "username"}</h3>
      <div className="mt-6 flex flex-wrap gap-5 justify-content-center">
        <DashboardButton icon="desktop" text="Games" />
        <DashboardButton icon="bars" text="Stats" />
        <DashboardButton
          icon="search"
          text="Edit Info"
          action={userFormToggle.toggleON}
        />
      </div>
    </div>
  );
}

export default UserCard
