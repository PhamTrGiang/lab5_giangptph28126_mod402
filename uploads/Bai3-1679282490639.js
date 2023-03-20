const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cal = require("./Caculator.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const soA = Number(req.body.soA);
  const soB = Number(req.body.soB);
  const operator = req.body.operator;

  switch (operator) {
    case "cong":
      const tong = cal.add(soA, soB);
        res.send(`Tong cua ${soA} + ${soB} = ${tong}`);
      break;
    case "tru":
      const hieu = cal.sub(soA, soB);
        res.send(`Hieu cua ${soA} - ${soB} = ${hieu}`);
      break;
    case "nhan":
      const tich = cal.mul(soA, soB);
        res.send(`Tich cua ${soA} * ${soB} = ${tich}`);
      break;
    case "chia":
      const thuong = cal.div(soA, soB);
        res.send(`Thuong cua ${soA} / ${soB} = ${thuong}`);
      break;
  }
});

app.listen(8080);