module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Profiles", [
    {
      id: "0a973445-7f4e-412d-a880-96a7f708cc62",
      username: "emma",
      location: "FindateHq",
      gender: "",
      photo: "",
      userId: "98e0850f-ed09-46b0-83d7-8a137afeaf84",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "330547ae-d310-4b4b-a70e-a11eb9dde8f9",
      username: "admin",
      location: "FindateHq",
      gender: "",
      photo: "",
      userId: "fc1f4e25-8e83-4a38-ab1e-8e4da2c6ddbb",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};