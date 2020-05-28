const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

//polaczenie z MongoAtlas
connectDB();
//middleware jsonowy
app.use(express.json({ extended: false }))

//nasluch portu
app.get('/', (req, res) => {
    res.send('strona działa');
})

//routing
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));


app.listen(PORT, () => {
    console.log(`App listen on port: ${PORT}`);
})