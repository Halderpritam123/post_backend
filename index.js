const express=require("express")
const cors=require("cors")
const { connection } = require("./db")
const { userRoute } = require("./router/user.router")
const { postRoute } = require("./router/posts.router")
const { auth } = require("./middleware/auth.middleware")

require("dotenv").config()

const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",userRoute)
app.get('/',(req,res)=>{
    res.status(200).send({"msg":"Home Page"})
})
app.use(auth)
app.use("/posts",postRoute)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("server connected")
    } catch (err) {
        console.log(err)
        console.log("server not connected")
    }
    console.log(`server is running on ${process.env.port}`)
})