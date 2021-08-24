module.exports = {
  PORT: process.env.PORT || 4000,
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT || "6379",
  emailMinLength: 8,
  passwordMinLength: 8,
  cache_time: {
    me: 3600,
  },
};
