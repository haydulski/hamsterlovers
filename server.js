const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

//polaczenie z MongoAtlas
connectDB();

//nasluch portu
app.get('/', (req, res) => {
    res.send('strona działa');
})

app.listen(PORT, () => {
    console.log(`App listen on port: ${PORT}`);
})