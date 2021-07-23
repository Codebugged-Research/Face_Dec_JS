const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const path = require("path");


app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "/public")));


app.listen(port, () => {
  console.log(`server running ${port}`);
});
