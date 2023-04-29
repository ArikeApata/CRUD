const express = require('express')
const fs = require("fs");


const app = express();
app.use(express.json());

const userRouter = require('./routes/users')

app.use("/users", userRouter)

//console.log(users);
const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`listening on ${PORT}`))


