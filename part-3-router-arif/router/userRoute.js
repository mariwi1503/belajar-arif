const express = require('express');

const app = express();

const router = express.Router();

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
    },
    {
        nama: 'salwa',
        umur: 26
    }

]

router.get('/user', (req, res)=>{
    const { nama } = req.query;

    if(nama) {
        const cari = userData.filter(n => n.nama.toLowerCase().includes(nama.toLowerCase()));
        if(cari.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }else{
            return res.status(200).json({
                status: 'success',
                data: cari
            });
        }
    }

    res.status(200).json({
        status:'success',
        data: userData
    });
});


router.delete('/user', (req, res)=>{
    const { nama } = req.query;

    if(!nama) return res.status(400).json({
        status:'failed',
        message: 'nama user yang anda ingin hapus harus diisi'
    });

    const index = userData.findIndex(user => user.nama === nama);

    if(index === -1) return res.status(404).json({
        status:'failed',
        message: 'user tidak ditemukan'
    });

    userData.splice(index,1);
    res.status(200).json({
        status:'success',
        message:'User berhasil di hapus'
    })

});

router.put('/user', (req,res)=>{

    const { nama, umur } = req.body;
    //check title is available or not
    const userExist = userData.find(arr => arr.nama === nama);
    console.log(userExist);

    if(!userExist){
        res.status(400).json({
            status:'failed',
            message: 'User tidak ada'
        });
        return;
    }
    //update user
    const userIndex = userData.findIndex(user => user.nama === nama);

    userData[userIndex] = {...userData[userIndex], umur};

    console.log(userExist);
    res.status(200).json({
        status:'success',
        message:'User data berhasil diupdate',
        data: userExist
    });
});


router.post('/user', (req,res)=>{
    const {nama, umur} = req.body;

    //check title is available or not
    const userExist = userData.find(arr => arr.nama === nama);
    
    if(userExist){
        res.status(400).json({
            status:'failed',
            message: 'nama sudah ada'
        });
        return;
    }

    //add new user to array data user
    userData.push({nama,umur});
   // console.log ({User, konten});

    res.status(200).json({
        status:'success',
        data: {
            nama,
            umur
        }
    })
});


module.exports = router;