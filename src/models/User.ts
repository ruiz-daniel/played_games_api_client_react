export type User = {
  username: String,
  display_name: String,
  email?: String,
  admin: boolean,
  premium: boolean,
  profile_picture: String,
  password?: String,
  disabled: boolean,
}