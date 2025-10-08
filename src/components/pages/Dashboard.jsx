import React from 'react'
import UserCard from '../utils/cards/UserCard'
import DashboardButton from "../utils/DashboardButton";
import UserForm from "../utils/forms/UserForm";
import { useToggle } from '../../hooks/useToggle';
import { useUser } from '../../hooks/useUser';
import { Dialog } from 'primereact/dialog';
import { useNavigation } from '../../hooks/useNavigation';

const Dashboard = () => {
  const userFormToggle = useToggle()
  const { user, update } = useUser()
  const navigator = useNavigation()

  return (
    <>
      <Dialog
        header="Edit User Info"
        visible={userFormToggle.toggleValue}
        onHide={userFormToggle.toggleOFF}
      >
        <UserForm submitCallback={userFormToggle.toggleOFF} />
      </Dialog>
      <section className="p-8">
        <UserCard user={user} update={update} />
        <div className="mt-6 flex flex-wrap gap-5 justify-content-center">
          <DashboardButton icon="desktop" text="Games" action={navigator.goToPlayedGames} />
          <DashboardButton icon="bars" text="Stats" action={navigator.goToStats} />
          <DashboardButton
            icon="search"
            text="Edit Info"
            action={userFormToggle.toggleON}
          />
        </div>
      </section>
    </>
  );
}

export default Dashboard
