const express = require('express');
const connectDB = require('./db');
const Khodam = require('./models/Khodam');

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.use(express.urlencoded({ extended: true }));
  function wrapAsync(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch((err) => next(err));
    };
  }
  app.get('/khodam', wrapAsync(async (req, res) => {
    const { name } = req.query;  // Extracting name from query parameters
    try {
        const count = await Khodam.countDocuments();
        console.log('Document count:', count); // Log document count
        if (count === 0) {
            return res.status(404).json({ message: 'No Khodam found' });
        }

        const randomIndex = Math.floor(Math.random() * count);
        console.log('Random index:', randomIndex); // Log random index
        const randomKhodam = await Khodam.findOne().skip(randomIndex);

        if (!randomKhodam) {
            return res.status(404).json({ message: 'No Khodam found' });
        }

        console.log(randomKhodam);
        res.json({ name, khodam: randomKhodam });
    } catch (error) {
        console.error('Error fetching Khodam:', error.message); 
        res.status(500).json({ message: error.message });
    }
}));


  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

// Start the server
startServer();
