import { Avatar } from 'primereact/avatar'
import { FileUpload } from 'primereact/fileupload'
import { Dialog } from 'primereact/dialog'

import weissIcon from '../../../images/KUIYU.png'
import { useToggle } from '../../../hooks/useToggle'

import api from '../../../services/IApi'

function UserCard({ user, update }) {
  
  const { toggleValue, toggle } = useToggle();

  const onUpload = async (data) => {
    toggle();
    const image = await api.GeneralApi.uploadImage(data.files[0]);
    const userData = {
      _id: user._id,
      profile_picture: image.data,
    };
    update(userData);
  };

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
      <Avatar
        image={user?.profile_picture || weissIcon}
        className="extra-large-avatar"
        size="xlarge"
        shape="circle"
        onClick={toggle}
      />
      <h1>{user?.display_name ?? "Guest"}</h1>
      <h3 style={{ margin: 0 }}>@{user?.username ?? "username"}</h3>
    </div>
  );
}

export default UserCard
