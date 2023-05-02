const express=require('express')
const { PostModel } = require('../model/posts.model')
const postRoute=express.Router()
postRoute.post('/add',async(req,res)=>{
    try{
        const post=new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"New post Uploaded"})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

postRoute.get('/',async(req,res)=>{
    const query=req.query
    let data;
    if(query.device){
        query.device={$eq:String(req.query.device)}
        data=query
    }
    try{
        const posts=await PostModel.find({clientId:req.body.clientId,data})
        res.send(posts)
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

postRoute.get('/postId/:id',async(req,res)=>{
    const post=await PostModel.findById(req.params.id)
    if(!post){
        res.send("post not found")
    }
    res.send(post)
})

postRoute.patch('/update/:postId',async(req,res)=>{
    const {postId}=req.params
    const post =await PostModel.findOne({_id:postId})
    try {
        if(req.body.clientId !==post.clientId){
            res.status(200).send({"msg":"ClientId not match"})
        }else{
            await PostModel.findByIdAndUpdate({_id:postId},req.body)
            res.status(200).send("post has ben updated")
    }
    } catch (err) {
        console.log(err)
    }
})

postRoute.delete('/delete/:postId',async(req,res)=>{
    const {postId}=req.params
    const post= await PostModel.findOne({_id:postId})
    try {
        if(req.body.clientId !==post.clientId){
            res.status(200).send({"msg":"ClientId not match"})
        }else{
            await PostModel.findByIdAndDelete({_id:postId})
            res.status(200).send("post has ben deleted")
        }
    } catch (err) {
        console.log(err)
        res.send("something wrong")
    }
})
module.exports={postRoute}