const getIPAdress = (req) => {
  try {
    return req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] ||
      req.remoteAddress || req.ip;
  } catch (error) {
    return null;
  }
};

module.exports = getIPAdress;
