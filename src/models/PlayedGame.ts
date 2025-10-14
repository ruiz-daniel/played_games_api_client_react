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
  description?: String,
  steam_page?: String,
  epic_page?: String,
  other_stores?: String[],
  favorite?: boolean,
  played_hours?: Number,
  cover: String,
  cover_box?: String,
  gallery?: String[],
  added_at: Date,
  updated_at: Date,
  completion: Completion,
  platform: Platform,
  user: User,
  _id: string
}