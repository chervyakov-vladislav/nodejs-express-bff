import express from "express";
import { myFunction } from "./file";

const app = express();

app.get("/", (req, res) => {
  console.log(myFunction(1, 3));
  console.log("do something");
  res.send("<h1>hello</h1>");
  res.end();
});

app.listen(3000, () => {
  console.log("app start on 3000");
});
