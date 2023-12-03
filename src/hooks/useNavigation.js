import { useNavigate } from "react-router-dom";
import * as routes from "../routes";

export const useNavigation = () => {
  const navigator = useNavigate()

  const navigateTo = (route) => {
    navigator(route)
  }


  const goToDashboard = () => {
    navigateTo(routes.dashboard);
  }
  const goHome = () => {
    navigateTo(routes.home);
  }
  const goToPlayedGames = () => {
    navigateTo(routes.playedgames);
  }
  const goToUploadGame = () => {
    navigateTo(routes.uploadgame);
  }
  const goToGameDetails = (gameid) => {
    navigateTo(`${routes.gamedetails}/?id=${gameid}`);
  }
  const goToStats = () => {
    navigateTo(routes.stats);
  }
  const goToLogin = () => {
    navigateTo(routes.login);
  }
  const goToRegister = () => {
    navigateTo(routes.register);
  }

  return {
    navigateTo,
    goToDashboard,
    goHome,
    goToPlayedGames,
    goToUploadGame,
    goToGameDetails,
    goToStats,
    goToLogin,
    goToRegister
  }
}