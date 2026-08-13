import { Avatar } from "primereact/avatar";
import { FileUpload } from "primereact/fileupload";
import { Dialog } from "primereact/dialog";

import weissIcon from "../../../images/KUIYU.png";
import { useToggle } from "../../../hooks/useToggle";

import api from "../../../services/IApi";
import { classNames } from "primereact/utils";

function UserCard({ user, update, className }) {
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
    <div className={classNames("flex gap-3 justify-content-center", className)}>
      <Dialog
        className="bg-white py-2 px-3"
        header="Change Profile Picture"
        headerClassName="flex justify-between cursor-pointer"
        visible={toggleValue}
        onHide={toggle}
      >
        <div className="flex flex-col gap-3 px-2 py-3">
          <div className="flex justify-center">
            <img
              src={user?.profile_picture}
              width={150}
              className="rounded-full"
            />
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
      <div className="w-1/2 hover:w-[70%] p-2">
        <img
          src={user?.profile_picture}
          className="rounded-full cursor-pointer transition-all h-[90%]!"
          onClick={toggle}
        />
      </div>

      <div className="flex gap-3 items-center justify-end w-1/2">
        <h1 className="text-2xl font-bold pb-1">
          {user?.display_name ?? "Guest"}
        </h1>
        <h3 className="hidden md:block text-lg" style={{ margin: 0 }}>
          @{user?.username ?? "username"}
        </h3>
      </div>
    </div>
  );
}

export default UserCard;
