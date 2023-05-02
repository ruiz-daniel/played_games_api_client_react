import { Avatar } from 'primereact/avatar'
import { FileUpload } from 'primereact/fileupload'

import weissIcon from '../../../images/KUIYU.png'
import { useUser } from '../../../hooks/useUser'

import api from '../../../services/IApi'

function UserCard() {
  const { user, update } = useUser()

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
      <Avatar
        image={user?.profile_picture || weissIcon}
        className="mr-4 extra-large-avatar"
        size="xlarge"
        shape="circle"
      />
      <h1>{user?.display_name ?? 'Guest'}</h1>
      <h3>@{user?.username ?? 'username'}</h3>
      <FileUpload
        customUpload
        auto
        mode="basic"
        uploadHandler={onUpload}
        accept="image/*"
        chooseLabel="Change Picture"
      />
    </div>
  )
}

export default UserCard
