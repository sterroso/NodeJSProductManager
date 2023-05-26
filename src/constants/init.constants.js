import USER_GENDERS, { DEFAULT_USER_GENDER } from "./user.genders.js";

const today = new Date();

const fakeDateOfBirth = `${today.getFullYear() - 21}-${
  today.getMonth() + 1
}-${today.getDate()}`;

const INIT_QUESTIONS = [
  {
    type: "input",
    name: "email",
    message: "Admin's e-mail address",
  },
  {
    type: "password",
    message: "Admin's password",
    name: "password",
    mask: "*",
  },
  {
    type: "password",
    message: "Confirm admin's password",
    name: "confirmPassword",
    mask: "*",
  },
  {
    type: "input",
    name: "firstName",
    message: "Admin's first name",
    default() {
      return "Admin";
    },
  },
  {
    type: "input",
    name: "lastName",
    message: "Admin's last name",
    default() {
      return "User";
    },
  },
  {
    type: "list",
    name: "gender",
    message: "Admin's gender",
    choices: Object.values(USER_GENDERS),
    default() {
      return DEFAULT_USER_GENDER;
    },
  },
  {
    type: "input",
    name: "dateOfBirth",
    message: "Admin's date of birth (YYYY-MM-DD)",
    default() {
      return fakeDateOfBirth;
    },
  },
];

export default INIT_QUESTIONS;
