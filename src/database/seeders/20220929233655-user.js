import bcrypt from "bcrypt";

const password = process.env.ADMIN_PASSWORD;
const hash = bcrypt.hashSync(password, 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [{
      id: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",
      email: "admin@findate.com",
      username: "admin",
      firstName: "Admin",
      lastName: "Findate",
      phone: "+234803findate",
      location: "FindateHq",
      gender: "",
      role: "admin",
      active: true,
      verified: true,
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "98e0850f-ed09-46b0-83d7-8a137afeaf84",
      email: "emma@findate.com",
      username: "emma",
      firstName: "Emma",
      lastName: "Findate",
      phone: "+234802findate",
      location: "FindateHq",
      gender: "",
      role: "admin",
      active: true,
      verified: true,
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], 
    {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};