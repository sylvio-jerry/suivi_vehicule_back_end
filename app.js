var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require('dotenv').config();


const { setDefaultResultOrder } = require("dns");



var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/compagnie", require("./routes/compagnie.route"));
app.use("/api/navire", require("./routes/navire.route"));
app.use("/api/groupe_lieu", require("./routes/groupe_lieu.route"));
app.use("/api/lieu", require("./routes/lieu.route"));
app.use("/api/parc", require("./routes/parc.route"));
app.use("/api/agent", require("./routes/agent.route"));
app.use("/api/vehicule", require("./routes/vehicule.route"));
app.use("/api/fst", require("./routes/fst.route"));
app.use("/api/fcav", require("./routes/fcav.route"));
app.use("/api/escale", require("./routes/escale.route"));
app.use("/api/utilisateur", require("./routes/utilisateur.route"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("http://localhost:" + port);
});
module.exports = app;
