const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
.connect("mongodb://127.0.0.1/shop_db")
.then((result) => {
  console.log("connected to mongodb");
})
.catch((err) => {
  console.log(err);
});


app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
