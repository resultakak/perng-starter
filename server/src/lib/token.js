const getToken = (req) => {
  try {
    let token = req.get("Authorization") || "";
    token = token.replace("Bearer ", "");

    return token;
  } catch (error) {
    return null;
  }
};

module.exports = getToken;
