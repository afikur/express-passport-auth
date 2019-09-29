const express = require("express");
const session = require("express-session");
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const dbURI = require("./config/keys").MongoURI;
const indexRoute = require("./routes");
const usersRoute = require("./routes/users");

const app = express();

require('./config/passport')(passport);

// DB Config
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log(err));

app.use(session({secret: 'myveryscretsecret'}));

app.use(expressLayouts);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/users", usersRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
