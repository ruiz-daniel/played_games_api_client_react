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
    <div className="flex gap-3 justify-content-center">
      <Dialog
        className='bg-white py-2 px-3'
        header="Change Profile Picture"
        headerClassName="flex justify-between cursor-pointer"
        visible={toggleValue}
        onHide={toggle}
      >
        <div className="flex flex-col gap-3 px-2 py-3">
          <div className='flex justify-center'>
            <img src={user?.profile_picture} width={150} className='rounded-full'/>
          </div>
            <FileUpload
              className="flex flex-col justify-center items-center bg-amber-300 text-white cursor-pointer rounded-2xl file-uploader"
              customUpload
              mode="basic"
              auto
              multiple={false}
              uploadHandler={onUpload}
              accept="image/*"
            />
          </div>
      </Dialog>
      <img src={user?.profile_picture} width={170} className='rounded-full cursor-pointer hover:w-[190px] transition-all' onClick={toggle} />
      <div className='flex flex-col gap-6 justify-center'>
        <h1 className='text-4xl'>{user?.display_name ?? "Guest"}</h1>
        <h3 className='text-2xl' style={{ margin: 0 }}>@{user?.username ?? "username"}</h3>
      </div>
      
    </div>
  );
}

export default UserCard
