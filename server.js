const app = require("express")();
const path = require("path");
const PORT = process.env.PORT || 5000;
const http = require("http").Server(app);
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const db = require("./config");
const logger = require("morgan");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);

// Middle Ware //
app.use(helmet());
app.use(methodOverride("_method"));
app.use(fileUpload());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }, { deprecated: false }));
app.use(logger("dev"));
app.use(cors());

// DB Connection //
db().then((connection) => {
  app.use(
    expressSession({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: { secure: true },
      store: new MongoStore({ mongooseConnection: connection }),
    })
  );
});

// Utils //
const formatMessage = require("./utils/Messages");
const { userLeave } = require("./utils/Users");

// API Routes //
app.use("/api/members", require("./routes/API/Members"));

// Deployment //
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});

// PORT //
http.listen(PORT, () => {
  console.log("Listening on PORT " + PORT);
});
