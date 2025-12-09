import {Completion} from "./Completion";
import { Platform } from "./Platform";
import { User } from "./User";

export type PlayedGame = {
  name: string,
  developers?: string[],
  publishers?: string[],
  release_year?: string,
  played_year?: string,
  genres?: string[],
  tags?: string[],
  score?: Number,
  description?: string,
  steam_page?: string,
  epic_page?: string,
  other_stores?: string[],
  favorite?: boolean,
  played_hours?: Number,
  cover: string,
  cover_box?: string,
  gallery?: string[],
  added_at: Date,
  updated_at: Date,
  completion: Completion,
  platform: Platform,
  user: User,
  _id: string
}