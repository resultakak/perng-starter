"use strict";

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: "users",
  });

  // User.associate = models => {
  //   User.hasMany(models.Message, { onDelete: 'CASCADE' });
  // };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { email: login },
    });

    // if (!user) {
    //   user = await User.findOne({
    //     where: { username: login },
    //   });
    // }

    return user;
  };

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
