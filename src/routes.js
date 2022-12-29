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
export const loggedRoutes = [playedgames, tableview, uploadgame, gamedetails, stats, top10games, managetop10games, top10characters]

//server routes
export const sr_images = 'https://localhost:5001/game_images/'
export const sr_top10games = 'top10games'
export const sr_playedgames = 'PlayedGames/'
export const sr_playinggames = 'PlayedGames/status/3'
export const sr_platforms = 'PlayedGames/platforms/'
export const sr_statuses = 'PlayedGames/statuses/'
