import bcrypt from "bcrypt";
import config from "../config";

const password = config.ADMIN_PASSWORD as string;
const hash = bcrypt.hashSync(password, 10);

const Admin = [
  {
    _id: "624eb07a3c2dafd2b3cf43ea",
    username: "Admin",
    email: "admin@findate.com",
    firstName: "Admin",
    lastName: "Findate",
    gender: "Male",
    location: "Findate Hq",
    photo: "",
    header: "",
    password: hash,
    role: "admin",
    active: true,
    verified: true,
    phone: "+234810000000"
  },
  {
    _id: "624eb07a3c2dafd2b3cf43eb",
    username: "Emma",
    email: "emma@findate.com",
    firstName: "Admin",
    lastName: "Emma",
    gender: "Male",
    location: "Findate Hq",
    photo: "",
    header: "",
    password: hash,
    role: "admin",
    active: true,
    verified: true,
    phone: "+2349072668695"
  }

];

export default Admin;
