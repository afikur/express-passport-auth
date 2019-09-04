const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./../models/User");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  const newUser = new User({
    name,
    email,
    password
  });

  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          res.redirect("/users/login");
        })
        .catch(err => console.log(err));
    })
  );
});

module.exports = router;
