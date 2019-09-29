const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./../models/User");
const passport = require("passport");
const {ensureAuthenticated} = require('../config/auth');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    name: 'Name'
  });
});

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


  bcrypt.hash(newUser.password, 10)
    .then(hash => {
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          res.redirect("/users/login");
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/users/dashboard',
                                                 failureRedirect: '/users/login'})
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;
