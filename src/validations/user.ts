import Joi from "joi";
import { UserInterface, LoginInterface } from "../utilities/interface";

export const validateSignup = (user: UserInterface) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(20).required(),
    name: Joi.string().min(2).max(20),
    surname: Joi.string().min(2).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(16),
    dob: Joi.date(),
    occupation: Joi.string(),
    interest: Joi.string(),
    about: Joi.string(),
    gender: Joi.string(),
    location: Joi.string(),
    photo: Joi.string(),
    header: Joi.string(),
  });
  return schema.validate(user);
};

export const validateLogin = (login: LoginInterface) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(login);
};

export const validateProfile = (user: UserInterface) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20),
    surname: Joi.string().min(2).max(20)
  });
  return schema.validate(user);
};

export const validateEmail = (user: UserInterface) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(user);
};

export const validateAccount = (user: UserInterface) => {
  const schema = Joi.object({
    token: Joi.number().required(),
  });
  return schema.validate(user);
};
