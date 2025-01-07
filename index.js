const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const multer = require("multer")

const blogsite=express()

blogsite.use(express.static('public'))
blogsite.set('views' , __dirname +'/views')
blogsite.set('view engine' , 'ejs')

blogsite.use(bodyParser.urlencoded({extended:true}))

const imageupload = multer.diskStorage({
    destination:'public/blogimage/',
    filename:(req,file,tempname)=>{
        tempname(null,file.originalname)
    }
})

const upload = multer({storage:imageupload})


mongoose.connect("mongodb://localhost:27017/blogdata")

const blogSchema = new mongoose.Schema({
    title: String,
    date:Date,
    smalldesc: String,
    basicdesc: String,
    fulldesc: String,
    postimg: String,
    postimg2:String,
    postimg3:String, // Corrected data type declaration
})

const blogdata = mongoose.model('blogdata', blogSchema)

blogsite.get('/blog' , async(req,res)=>{
    res.render('blogform')
})
blogsite.post('/blogformsubmit' ,upload.single('postimg'), async(req,res)=>{
    const {title , date , smalldesc , basicdesc , fulldesc} = req.body
    const postimg = '/blogimage/' + req.file.originalname;
    // const postimg2 = '/blogimage/' + req.files['postimg2'][0].originalname;
    // const postimg3 = '/blogimage/' + req.files['postimg3'][0].originalname;
    const data = await blogdata({
        title,
        date,
        smalldesc,
        basicdesc,
        fulldesc,
        postimg,
        
    })
    await data.save()
    res.render('blogform')
})

blogsite.get('/allblogs' , async(req,res)=>{
    const data = await blogdata.find()
    res.render('allblogs' , {data})
})


blogsite.post('/blogdetailopen/:id' , async(req,res)=>{
    const productid = req.params.id
    const data = await blogdata.findById(productid)
    res.render('blogsdetails', {data})

    
})
blogsite.listen(3000,()=>{
    console.log("Blog site server live")
})
