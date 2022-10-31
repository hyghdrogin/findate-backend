export interface UserInterface {
  _id?: string;
  username?: string;
  email: string;
  password: string;
  phone: number;
  name?: string;
  surname?: string;
  googleId?: string;
  dob?: Date;
  gender?: string;
  location?: string;
  occupation?: string;
  interest?: string;
  about?: string;
  photo?: string;
  header?: string;
  role?: string;
  verified: boolean;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomRequest {
  details: UserInterface;
  file: object;
  params: object;
  query: object;
  path: object;
}

interface Person {
  $search: string;
}

export interface FilterInterface {
  verified?: string;
  role?: string;
  updated?: string;
  $text: Person;
}

export interface OtpInterface {
  _id?: string;
  email: string;
  token: number;
  expired: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginInterface {
  username: string;
  email: string;
  password: string;
  remember: boolean;
}

export interface NewslistInterface {
  email: string;
}

export interface NotificationInterface{
  _id: string;
  message: string;
  owner: string;
  status: string;
  title: string;
  receiver: string;
}

export interface Search {
  $search: string;
}
