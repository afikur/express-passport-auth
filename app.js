const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const indexRoute = require("./routes");
const usersRoute = require("./routes/users");

const app = express();
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use("/", indexRoute);
app.use("/users", usersRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
