const mongoose = require('mongoose');
const Khodam = require('./models/Khodam');

mongoose.connect('mongodb://localhost:27017/dbKhodam', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  const khodams = [
    { name: 'Babi Imut' },
    { name: 'Kerbau Cina' },
    { name: 'Kucing Galau' },
    { name: 'Tokek Narsis' },
    { name: 'Lele Patah Hati' },
    { name: 'Kodok Ngegas' },
    { name: 'Kuda Goyang' },
    { name: 'Kupu-kupu Labil' },
    { name: 'Bebek Karaoke' },
    { name: 'Srigala Baper' },
    { name: 'Kelinci Halu' },
    { name: 'Anjing' },
    { name: 'Kerang Ijo' },
    { name: 'Belalang Depresi' },
    { name: 'Laba-laba Bucin' },
    { name: 'Iguana Puitis' },
    { name: 'Kambing Etawa' },
    { name: 'Lebah Ganteng' },
    { name: 'Pain Akatsuki' },
    { name: 'Admin Idlix' },
    { name: 'Spotify Premium' },
    { name: 'Kondom Bekas' },
    { name: 'Arwana Jatinegara' },
    { name: 'Kiwil' },
    { name: 'Kak Gem' },
    { name: 'Sigit Rendang' },
    { name: 'icikiwir' },
    { name: 'Ambatukam' },
    { name: 'Lord Alul' },
    { name: 'Pentol Kriwil' },
    { name: 'Ayah Ojak' },
    { name: 'Boti Nako' },
    { name: 'Antena Biru' },
    { name: 'Kucing Berdebu' },
  ];

  try {
    const saving = await Khodam.insertMany(khodams);
   
    console.log('Data khodam berhasil ditambahkan');
  } catch (error) {
    console.error('Error menambahkan data khodam:', error);
  } finally {
    mongoose.connection.close();
  }
});
