require("dotenv").config();
const { UserInputError, AuthenticationError } = require("apollo-server");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
import config from "./../config";

const { errors } = require("./../lib");
import { User } from "../models";

const resolvers = {
  AuthPayload: {
    async user({ id }, _) {
      return await User.findOne({ where: { id } });
    },
  },
  Query: {
    async me(_, args, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }

      if (!user) {
        throw new UserInputError("You are not authenticated!");
      }

      user = await User.findByPk(user.id);

      if (!user) {
        throw new Error("You are not authenticated!");
      }

      return user;
    },
  },
  Mutation: {
    async registerUser(_, { input }) {
      try {
        const { email, password, name, surname } = input;

        if (!email || email.length < config.emailMinLength) {
          return new UserInputError(errors.USER_EMAIL_INVALID, {
            argumentName: "email",
          });
        }

        if (!password || password.length < config.passwordMinLength) {
          return new UserInputError(errors.PASSWORD_TOO_SHORT, {
            argumentName: "password",
          });
        }

        const control = await User.findOne({ where: { email } });

        if (control && control.email) {
          return new UserInputError(errors.USER_EMAIL_EXISTS, {
            argumentName: "email",
          });
        }

        const user = await User.create({
          email,
          password,
          name,
          surname,
        });

        const token = jsonwebtoken.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "10m" },
        );

        return {
          token,
          id: user.id,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async login(_, { email, password }, { ip }) {
      try {
        const user = await User.findByLogin(email);

        if (!user) {
          throw new AuthenticationError(errors.USER_EXISTS);
        }

        const isValid = await user.validatePassword(password);

        if (!isValid) {
          throw new AuthenticationError(errors.INCORRECT_PASSWORD);
        }

        const token = jsonwebtoken.sign(
          { id: user.id, email: user.email, uid: uuidv4(), ip },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );

        return {
          token, user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async updateMe(_, { input }, { user }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }

      const where = { id: user.id };

      const me = await models.User.findOne({ where });

      if (!me) {
        throw new UserInputError("Account not found");
      }

      input.email = me.email;

      await models.User.update({ ...input }, { where, limit: 1 });

      await me.reload();

      return me || {};
    },
  },
};

module.exports = resolvers;
