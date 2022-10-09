import bcrypt from "bcrypt";
import config from "../config";

const password = config.ADMIN_PASSWORD as string;
const hash = bcrypt.hashSync(password, 10);

const Admin = [
  {
    _id: "624eb07a3c2dafd2b3cf43ea",
    username: "Admin",
    email: "admin@findate.com",
    name: "Admin",
    surname: "Findate",
    gender: "Male",
    occupation: "Admin",
    interest: "Your Interest",
    about: "I am your first hand responder here",
    location: "Findate Hq",
    password: hash,
    role: "admin",
    active: true,
    verified: true,
  }

];

export default Admin;
