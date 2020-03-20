const auth = async (req, res, next) => {
  try {
    if (req.session.token) {
      next();
    } else {
      res.cookie("token", "");
      res.redirect("/");
    }
  } catch (e) {
    res.redirect("/");
  }
};

module.exports = auth;
