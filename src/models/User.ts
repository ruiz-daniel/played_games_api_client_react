export type User = {
  _id: string,
  username: string,
  display_name: string,
  email?: string,
  admin: boolean,
  premium: boolean,
  profile_picture: string,
  password?: string,
  disabled: boolean,
}
export interface UserResponse extends User {
  access_token: string
}

export type NewUser = {
  username: string,
  display_name: string,
  password: string,
  profile_picture?: string
}