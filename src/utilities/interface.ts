export interface UserInterface {
  _id?: string;
  username?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  location?: string;
  phone?: string;
  photo?: string;
  header?: string;
  role?: string;
  verified: boolean;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomRequest {
  user: UserInterface;
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
  password: string;
}

export interface WaitlistInterface {
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
