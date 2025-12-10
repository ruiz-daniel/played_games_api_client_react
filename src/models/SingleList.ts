import { PlayedGame } from "./PlayedGame"

export type SingleList = {
  games: PlayedGame[],
  name?: string,
  user: string
}

export interface NewSingleList {
  games: string[],
  name: string,
  user: string
}