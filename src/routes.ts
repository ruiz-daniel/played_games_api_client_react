//client routes
export const home = '/'
export const dashboard = '/dashboard'
export const playedgames = '/playedgames'
export const tableview = '/tableview'
export const uploadgame = '/uploadgame'
export const gamedetails = '/gamedetails'
export const stats = '/stats'
export const top10games = '/top10games'
export const managetop10games = '/managetop10games'
export const top10characters = '/top10characters'
export const login = '/login'
export const register = '/signup'
export const singleLists = '/lists'
export const loggedRoutes = [
  playedgames,
  tableview,
  uploadgame,
  gamedetails,
  stats,
  top10games,
  managetop10games,
  top10characters,
  singleLists
]

//server routes
export const sr_imagesHost = 'https://localhost:7104/'
export const sr_images = `${sr_imagesHost}imageHost/Images/`
export const sr_played_games_folder = 'games'
export const sr_played_pfp_folder = 'pfp'
export const sr_images_games = (username: string) => {
  return `${sr_imagesHost}/${username}/${sr_played_games_folder}/`
}
export const sr_images_pfp = (username: string) => {
  return `${sr_imagesHost}/${username}/${sr_played_pfp_folder}/`
}
