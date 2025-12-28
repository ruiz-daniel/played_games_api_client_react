import { Platform } from "./Platform"
import { Completion } from "./Completion"
import { PlayedGame } from "./PlayedGame"

export type UploadGameData = {
    _id?: string,
    name?: string,
    release_year?: string,
    played_year?: string,
    score?: string,
    played_hours?: string
    steam_page?: string,
    epic_page?: string,
    description?: string,
    developers?: string[],
    publishers?: string[],
    genres?: string[],
    tags?: string[],
    platform?: Platform,
    completion?: Completion,
    other_stores?: string[],
    images?: any,
    cover?: string,
    cover_box?: string,
    gallery?: string[],
    favorite?: boolean
}

export type GameFilterData = {
  completion?: Completion
  developers?: string
  genres?: string
  name?: string
  platform?: Platform
  played_hours_max?: string
  played_hours_min?: string
  played_year?: string
  publishers?: string
  release_year?: string
  score?: string
  tags?: string
}

export type GameFilterDataUrl = {
    completion?: string
    developers?: string
    genres?: string
    name?: string
    platform?: string
    played_hours_max?: string
    played_hours_min?: string
    played_year?: string
    publishers?: string
    release_year?: string
    score?: string
    tags?: string
}

export type GameFilterDataQuery = {
    name?: "" | {
        $regex: string;
        $options?: string;
    } | undefined;
    developers?: "" | {
        $regex: string;
        $options?: string;
    } | undefined;
    publishers?: "" | {
        $regex: string;
        $options?: string;
    } | undefined;
    tags?: "" | {
        $regex: string;
        $options?: string;
    } | undefined;
    completion?: string;
    genres?: "" | {
        $regex: string;
        $options?: string;
    } | undefined;
    platform?: string;
    played_hours_max?: string;
    played_hours_min?: string;
    played_year?: string;
    release_year?: string;
    score?: string;
}

export type GameImagesObject = {
  cover?: File,
  coverBox?: File,
  coverBoxURL?: string,
  coverURL: string,
  gallery: File[]
}

export type UserCredentials = {
    username: string,
    password: string
}

export type PlayedGamesResponse = {
    games: PlayedGame[],
    page: number,
    max: number
}

export type MessageType = 'success' | 'info' | 'warn' | 'error'

export type ComponentCallBackFunction = (response: boolean, error?: string) => void