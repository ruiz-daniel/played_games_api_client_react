import React from "react";
import UserCard from "../utils/cards/UserCard";
import DashboardButton from "../utils/DashboardButton";
// import UserForm from "../utils/forms/UserForm";
import { useToggle } from "../../hooks/useToggle";
import { useUser } from "../../hooks/useUser";
import { useNavigation } from "../../hooks/useNavigation";
import { usePlayedGames } from "../../hooks/usePlayedGames";
import { Card, CardContent, CardHeader } from "../ui/card";
import HeaderText from "../HeaderText";
import GamesList from "../utils/lists/GamesList";

const Dashboard = () => {
  const userFormToggle = useToggle();
  const { user, update } = useUser();
  const navigator = useNavigation();
  const { games } = usePlayedGames("latest");

  // const carouselTemplate = (game) => {
  //   return <img src={game.cover} width={200} className='h-45!' />
  // }

  return (
    <>
      {/* <Dialog
        header="Edit User Info"
        visible={userFormToggle.toggleValue}
        onHide={userFormToggle.toggleOFF}
      >
        <UserForm submitCallback={userFormToggle.toggleOFF} />
      </Dialog> */}
      <Card className="w-full p-8">
        <CardContent className="flex flex-col gap-3">
          <UserCard user={user} update={update} className="h-24" />
          <div className="flex flex-col text-center gap-4 px-5 py-2 overflow-x-auto">
            <HeaderText text="Latest Games" />
            <GamesList games={games} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
