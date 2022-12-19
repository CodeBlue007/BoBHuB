exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

exports.isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role == "admin") {
    next();
  } else {
    const message = encodeURIComponent("권한이 없습니다.");
    res.redirect(`/?error=${message}`);
  }
};
