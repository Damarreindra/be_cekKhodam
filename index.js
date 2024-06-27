const express = require('express');
const connectDB = require('./db');
const Khodam = require('./models/Khodam');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',  // for local development
  'https://khodamku-apa.vercel.app/'  // replace with your actual deployed frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

const startServer = async () => {
  await connectDB();
  app.use(express.urlencoded({ extended: true }));
  function wrapAsync(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch((err) => next(err));
    };
  }
  app.get('/khodam', wrapAsync(async (req, res) => {
    const { name } = req.query; 
    try {
        const count = await Khodam.countDocuments();
        console.log('Document count:', count); // Log document count
        if (count === 0) {
            return res.status(404).json({ message: 'No Khodam found' });
        }

        const randomIndex = Math.floor(Math.random() * count);
        const randomKhodam = await Khodam.findOne().skip(randomIndex);
        if (!randomKhodam) {
            return res.status(404).json({ message: 'No Khodam found' });
        }
        if(name==="rehan"){
          res.json({ name, khodam: {name:"Anjing Rabies"} });
        }else if(name==="dile"){
          res.json({ name, khodam: {name:"Antena Biru"} });
          
        }else if(name==="raihan"){
          res.json({ name, khodam: {name:"Badut"} });
        }
        else if(name==="alpat"){
          res.json({ name, khodam: {name:"Starlight Princess", img:'https://res.cloudinary.com/dttd52ltg/image/upload/v1719501663/gbvqydur5fe1jhan5r4c.jpg'} });
        }
        else{
          res.json({ name, khodam: randomKhodam });
        }
      
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
