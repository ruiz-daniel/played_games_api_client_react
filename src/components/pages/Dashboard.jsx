import React from 'react'
import UserCard from '../utils/cards/UserCard'
import DashboardButton from "../utils/DashboardButton";
import UserForm from "../utils/forms/UserForm";
import { useToggle } from '../../hooks/useToggle';
import { useUser } from '../../hooks/useUser';
import { Dialog } from 'primereact/dialog';
import { useNavigation } from '../../hooks/useNavigation';
import {usePlayedGames} from '../../hooks/usePlayedGames'
import { Carousel } from 'primereact/carousel';

const Dashboard = () => {
  const userFormToggle = useToggle()
  const { user, update } = useUser()
  const navigator = useNavigation()
  const {games} = usePlayedGames()

  const carouselTemplate = (game) => {
    return <img src={game.cover} width={200} className='h-45!' />
  }

  return (
    <>
      <Dialog
        header="Edit User Info"
        visible={userFormToggle.toggleValue}
        onHide={userFormToggle.toggleOFF}
      >
        <UserForm submitCallback={userFormToggle.toggleOFF} />
      </Dialog>
      <section className="flex flex-col gap-8 items-center justify-center p-8 h-[90vh]">
        <div className='flex gap-4 px-5 py-2 overflow-x-auto'>
          {games?.slice(0,5)?.map(game => 
            <img 
              src={game.cover} width={200} 
              className='h-45! cursor-pointer rounded-xl hover:w-[250px] transition-all' 
              onClick={() => navigator.goToGameDetails(game._id)} 
            />)}
        </div>
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
