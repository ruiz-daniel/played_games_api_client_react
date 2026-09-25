import React from "react";
import { useToggle } from "../../../hooks/useToggle";

import api from "../../../services/IApi";

import classNames from "classnames";
import { User } from "@/models/User";

type UserCardProps = {
  user?: User;
  update?: (userData: Partial<User>) => void;
  className?: string;
};

function UserCard({ user, update, className }: UserCardProps) {
  const { toggleValue, toggle } = useToggle();

  const onUpload = async (data: { files: File[] }) => {
    toggle();
    const image = await api.GeneralApi.uploadImage(data.files[0]);
    const userData = {
      _id: user?._id,
      profile_picture: image.data,
    };
    update?.(userData);
  };

  return (
    <div className={classNames("flex gap-3 justify-start", className)}>
      <div className="p-2">
        <img
          src={user?.profile_picture}
          className="rounded-full cursor-pointer transition-all h-[90%]!"
          onClick={toggle}
        />
      </div>

      <div className="flex gap-3 items-center justify-end">
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
