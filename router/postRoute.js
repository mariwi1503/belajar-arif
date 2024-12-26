const express = require('express')
const router = express.Router()

const postData = [
    {
        judul: 'satu',
        konten: 'asfgakjsgfkajsfgjkashfk'
    },
    
    {
        judul: 'sambilan',
        konten: 'asfgakjsgfkajsfgjkashfk'
    },
    {
        judul: 'sasak',
        konten: 'asfgakjsgfkajsfgjkashfk'
    }
]

// get semua post
router.get('/post', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: postData
    })
})

router.post('/post', (req, res) => {
    const {judul, konten} = req.body

    // cek judul sudaha da atau gak
    const postExist = postData.find(x => x.judul === judul)
    if (postExist) {
        res.status(409).json({
            status: 'failed',
            message: 'Judul sudah terpakai',
        })
    } else {
        postData.push({judul, konten})
        res.status(200).json({
            status: 'success',
        })
    }
})

module.exports = router