const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

const Khodam = require("./models/Khodam");

mongoose
.connect("mongodb://127.0.0.1/dbKhodam")
.then((result) => {
  console.log("connected to mongodb");
})
.catch((err) => {
  console.log(err);
});

app.get('/khodam', async (req, res) => {
  try {
    const count = await Khodam.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: 'No Khodam found' });
    }

    const randomIndex = Math.floor(Math.random() * count);
    const randomKhodam = await Khodam.findOne().skip(randomIndex);

    if (!randomKhodam) {
      return res.status(404).json({ message: 'No Khodam found' });
    }

    console.log(randomKhodam);
    res.send(randomKhodam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
