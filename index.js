const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const response = require("./response");
const axios = require("axios");

const DataBase = require("./database.js");
const database = new DataBase();
(async () => {
  const data = await database.read();
  if (data && Object.keys(data).length === 0) {
    global.db = {
      request: {},
      ...(data || {}),
    };
    await database.write(global.db);
  } else {
    global.db = data;
  }
  setInterval(async () => {
    if (global.db) {
      await database.write(global.db);
    }
  }, 3500);
})();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/webhook", (req, res) => {
  if (!db.request[req.query.refid]) {
    db.request[req.query.refid] = {};
  }
  db.request[req.query.refid] = req.query;
  res.send(req.query);
});
app.get("/db", (req, res) => {
  if (db.request[req.query.refid]) {
    response(res, 200, db.request[req.query.refid], "Berhasil mengambil data");
  } else {
    response(res, 404, {}, "Data tidak ditemukan");
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
