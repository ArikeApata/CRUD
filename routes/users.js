const express = require("express");
const router = express.Router();
const fs = require("fs");
const jsonData = require("../data/users.json");

const dataPath = "./data/users.json"; // path to our JSON file

router.get("/list", (req, res) => {
  res.send(jsonData);
});

router.post("/new", (req, res) => {
  let data = req.body;
  data.id = jsonData.length + 1;
  jsonData.push(data);

  fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), (err, data) => {
    if (err) {
      res.json({ msg: "error occured", err });
    } else {
      res.send({ success: true, msg: "account added successfully" });
    }
  });
});

router
  .route("/:id")
  .get((req, res) => {
    const newUser = req.body;
    res.send(newUser);
  })
  .delete((req, res) => {
    const newJsonData = jsonData.filter((j) => j.id !== Number(req.params.id));

    fs.writeFile(
      dataPath,
      JSON.stringify(newJsonData, null, 2),
      (err, data) => {
        if (err) {
          res.json({ msg: "error occured", err });
        } else {
          res.send({ success: true, msg: "user deleted succesfully!" });
        }
      }
    );
  })
  .put((req, res) => {
    const userId = req.params.id;
    let userData = req.body;
    // userData.id = Number(userId); second method to add id
    const findUser = jsonData.find((i) => i.id === Number(userId));
    if (!findUser) {
      return res.status(409).send({ error: true, msg: "User not exist" });
    }

    const updatedJsondata = jsonData.filter((i) => i.id !== Number(userId));

    updatedJsondata.push(userData);
    res.send({ success: true, msg: "User data updated successfully" });

    fs.writeFile(
      dataPath,
      JSON.stringify(updatedJsondata, null, 2),
      (err, data) => {
        if (err) {
          res.json({ msg: "error occured", err });
        } else {
          res.send({ success: true, msg: "user deleted succesfully!" });
        }
      }
    );
  });

router.put("/alt/:id", (req, res) => {
  const { id } = req.params;
  const newJsonData = jsonData.map((j) => {
    if (j.id === Number(id)) j = req.body;
    return j;
  });
  fs.writeFile(dataPath, JSON.stringify(newJsonData, null, 2), (err, data) => {
    if (err) {
      res.json({ msg: "error occured", err });
    } else {
      res.send({ success: true, msg: "user updated succesfully!" });
    }
  });
});

// router.put(":/id", (req, res) => {
//   const user = req.params.id;

//   jsonData.user = req.body

//   console.log(jsonData.user)
// fs.readFile(dataPath, JSON.stringify(jsonData, null, 2), (err, data) => {
//   if (err) {
//     res.json({ msg: "error occured", err });
//   } else {
//     res.send({ success: true, msg: "account updated" });
//   }

module.exports = router;
