import { Platform } from "./Platform"
import { Completion } from "./Completion"

export type UploadGameData = {
    name: string,
    release_year: string,
    played_year: string,
    score: string,
    played_hours: string
    steam_page: string,
    epic_page: string,
    description: string,
    developers: string[],
    publishers: string[],
    genres: string[],
    tags: string[],
    platform: Platform,
    completion: Completion,
    other_stores: string[],
    images: any,
    cover: string,
    cover_box: string,
    gallery: string[]
}

export type GameFilterData = {
  completion?: Completion
  developers?: string
  genre?: string
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

export type GameFilterDataQuery = {
    name: "" | {
        $regex: string;
    } | undefined;
    developers: "" | {
        $regex: string;
    } | undefined;
    publishers: "" | {
        $regex: string;
    } | undefined;
    tags: "" | {
        $regex: string;
    } | undefined;
    completion?: Completion | undefined;
    genre?: string;
    platform?: Platform;
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