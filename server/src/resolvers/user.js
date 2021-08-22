require("dotenv").config();
const { UserInputError, AuthenticationError } = require("apollo-server");
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import md5 from "md5";
const { v4: uuidv4 } = require("uuid");

import config from "./../config";
const { errors } = require("./../lib");
import { User } from "../models";

const resolvers = {
  AuthPayload: {
    async user({ user }, _) {
      return await User.findOne({ where: { id: user.id } });
    },
  },
  Query: {
    async me(_, args, { user, cache }, info) {
      if (!user) {
        throw new AuthenticationError(errors.YOU_ARE_NOT_AUTH);
      }

      if (!user) {
        throw new UserInputError(errors.YOU_ARE_NOT_AUTH);
      }

      const cache_id = md5(user.email);

      let control = await cache.get(`me:${cache_id}`)
      if(control) {
        return JSON.parse(control);
      }

      user = await User.findByPk(user.id);
      if (!user) {
        throw new Error(errors.USER_NOT_EXIST);
      }

      user.password = false;
      cache.set(`me:${cache_id}`, JSON.stringify(user), "EX", 3600)

      return user;
    },
  },
  Mutation: {
    async registerUser(_, { input }, { cache }) {
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

        const cache_id = md5(user.email);
        user.password = false;
        cache.set(`me:${cache_id}`, JSON.stringify(user), "EX", 3600)

        return {
          token,
          user
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async login(_, { input }, { cache, ip }) {
      try {
        const { email, password } = input;

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

        const cache_id = md5(user.email);
        user.password = false;
        cache.set(`me:${cache_id}`, JSON.stringify(user), "EX", 3600)

        return {
          token, user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async updateMe(_, { input }, { user, cache }) {
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }

      const where = { id: user.id };

      const me = await User.findOne({ where });

      if (!me) {
        throw new UserInputError("Account not found");
      }

      input.email = me.email;

      await User.update({ ...input }, { where, limit: 1 });

      await me.reload();

      const cache_id = md5(me.email);
      me.password = false;
      cache.set(`me:${cache_id}`, JSON.stringify(me), "EX", 3600)

      return me || {};
    },
  },
};

module.exports = resolvers;
