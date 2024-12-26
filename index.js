const express = require('express');
const postRoute = require('./router/postRoute')
const userRoute = require('./router/userRoute')
const app = express();

app.use(express.json());

// api check
app.get('/', (req, res) => {
    res.send('OKE')
})

app.use('/api', postRoute, userRoute)

// global routes
app.use('*', (req, res) => {
    res.send('Salah tulis bro')
})

app.listen(3000, console.log('listening on port 3000'));

/**
 * tambah, ambil data, hapus
 * update konten
 * fitur cari berdasarkan keyword
 */