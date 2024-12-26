const express = require('express')
const router = express.Router()

const userData = [
    {
        nama: 'satu',
        umur: 10
    },
    {
        nama: 'dua',
        umur: 20
    },
    {
        nama: 'tiga',
        umur: 30
    }
]

router.get('/user', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: userData
    })
})

module.exports = router