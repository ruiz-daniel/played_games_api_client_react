import { PlayedGame } from "./PlayedGame"

export type SingleList = {
  _id: string,
  games: PlayedGame[],
  name: string,
  user: string
}

export interface NewSingleList {
  _id?: string,
  games: string[],
  name: string
}