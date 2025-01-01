const express = require('express');
//
const router = express.Router();

const postData = [
    {
        judul: 'satu',
        konten: 'lorem ipsum dolor sit amet tempor invid'
    },{
        judul: 'salad',
        konten: 'lorem ipsum dolor sit amet tempor invid'
    },{
        judul: 'tiga',
        konten: 'lorem ipsum dolor sit amet tempor invid'
    },
];

// //get semua post dan get by query param judul 
router.get('/post', (req,res)=>{
    const {judul} = req.query;
    if(judul){
        const cari = postData.filter(cariJudul => cariJudul.judul.toLowerCase().includes(judul.toLowerCase()));

        if(cari.length === 0){
            return res.status(400).json({
                status: 'failed',
                message: 'data not found'
                });
        }else{
            return res.status(200).json({
                status:'success',
                data : cari
            });
        }
    }else{
        return res.status(200).json({
            status : 'success',
            data : postData
        });
    }
})

//get data by query parameters with filter
router.get('/post/search', (req, res) => {
    const { judul } = req.query;

    if(!judul) return res.status(400).json({
        status: 'failed',
        message: 'Judul yang anda cari harus diisi'
    });

    const cari = postData.filter(cariJudul=> cariJudul.judul.includes(judul));

    if(cari.length === 0) return res.status(404).json({
        status:'failed',
        message: 'Post dengan judul yang anda cari tidak ditemukan'
    });

    console.log(cari);

    res.status(200).json({
        status:'success',
        data : {
            ...cari
        }
    })


});

//get finding post with req params
router.get('/post/:judul', (req,res)=>{
    const cari = postData.find(aJudul => aJudul.judul === req.params.judul );
    if(!cari){
        return res.status(404).json({
            status:'failed',
            message: 'Post not found'
        });
    }
    res.status(200).json({
        status : 'success',
        data : {
            judul : cari.judul,
            konten : cari.konten
        }
    });
})

router.delete('/post', (req, res)=>{
    const {judul} = req.query;

    if(!judul) return res.status(400).json({
        status:'failed',
        message: 'Judul yang anda ingin hapus harus diisi'
    });

    const index = postData.findIndex(post => post.judul === judul);

    if(index === -1) return res.status(404).json({
        status:'failed',
        message: 'post tidak ditemukan'
    });

    postData.splice(index,1);
    res.status(200).json({
        status:'success',
        message:'Judul berhasil di hapus'
    })
});

router.put('/post', (req,res)=>{
    //const { judul} = req.query;
    const { judul, konten} = req.body;
    
    //check title is available or not
    const postExist = postData.find(arr => arr.judul === judul);
    // console.log(postData.title);
    console.log(postExist);
    // console.log(judul);
    if(!postExist){
        res.status(400).json({
            status:'failed',
            message: 'Judul post tidak ada'
        });
        return;
    }
    //update post
    const postIndex = postData.findIndex(post => post.judul === judul);

    postData[postIndex] = {...postData[postIndex], konten};

    console.log(postExist);
    res.status(200).json({
        status:'success',
        message:'Post berhasil diupdate',
        data: postExist
    });
});


router.post('/post', (req,res)=>{
    const {judul, konten} = req.body;

    //check title is available or not
    const postExist = postData.find(arr => arr.judul === judul);
    // console.log(postData.title);
    // console.log(postExist);
    // console.log(judul);

    if(postExist){
        res.status(400).json({
            status:'failed',
            message: 'Judul post sudah ada'
        });
        return;
    }

    //add new post to array data post
    postData.push({judul,konten});
   // console.log ({judul, konten});

    res.status(200).json({
        status:'success',
        data: {
            judul,
            konten
        }
    })
});

module.exports = router;