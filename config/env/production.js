
module.exports = {
  sessionSecret: process.env.SESSION_SECRET,
  db: process.env.MONGOHQ_URL,
  facebook: {
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACKURL
  }
};
