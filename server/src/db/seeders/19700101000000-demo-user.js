const bcrypt = require("bcryptjs");
const password = bcrypt.hashSync("pass", 10);

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        email: "email@example.com",
        password,
        name: "Name",
        surname: "Surname",
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
