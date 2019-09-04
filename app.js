const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const dbURI = require("./config/keys").MongoURI;
const indexRoute = require("./routes");
const usersRoute = require("./routes/users");

const app = express();

// DB Config
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log(err));

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/users", usersRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
