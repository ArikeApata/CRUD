const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

const userRouter = require("./routes/users");

app.use("/users", userRouter);

app.use(express.static(path.join(__dirname, "public")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//console.log(users);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`listening on ${PORT}`));
