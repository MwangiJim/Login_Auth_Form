import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import userModels from './models/userModels.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/Auth_db')
.then((res)=>console.log('Db connected Successfully'))
.catch((err)=>console.log(err))

const Transporter = nodemailer.createTransport({
    service:'hotmail',
    auth:{
        user:'kingongomwangi@outlook.com',
        pass:'Kingongo@[123]'
    }
})

app.post('/register',async(req,res)=>{
    const{email,username,password,country,role,userType,phonenumber} = req.body;

    const existingUser = await userModels.findOne({Email:email})
    if(existingUser) res.status(500).json({status:'error',error:'User Already exists with this email'})
    else{
        const hashPwd = await bcrypt.hash(password,10)
        const newUser = await userModels.create({
          Email:email,
          Name:username,
          Password:hashPwd,
          Country:country,
          phoneNumber:phonenumber,
          Role:role,
          userType:userType
        })
        res.status(201).json({status:'ok'})
        const mailDetails = {
            from:'kingongomwangi@outlook.com',
            to:email,
            subject:'Welcome to Node js with Node mailer with Typescript <a href="https://react.org"></a>',
            text:'Hey It works.Do it with Node.Learn type checking with Typescript.Event loops.Blocking Nature of Noe js'
        }
        Transporter.sendMail(mailDetails,(err,data)=>{
            if(err){
                console.log('Couldnt send mail')
            }else{
                console.log('Mail sent successfully',data.response)
            }
        })
    }
})

const JWT_SECRET = 'vyuagwQUIWEGSQugsyeqUYSGVQet8oe12uey213ey121iuey38129yweh23187ye1hye3dh23e1ihoq268e2t2gyd23uiye23e2qw'

app.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    
    const existingUser = await userModels.findOne({Email:email})
    if(!existingUser) return res.status(403).json({status:'error',error:'User does not exist'})

    else{
         if(await bcrypt.compare(password,existingUser.Password)){
            const token = jwt.sign({user:existingUser.Email},JWT_SECRET)
             if(res.status(200)){
                res.status(200).json({status:'ok',data:token})
                const mailDetails = {
                    from:'kingongomwangi@outlook.com',
                    to:'kingongomwangi@gmail.com',
                    subject:'Welcome Back to Node js with TypeScript',
                    text:'We work with Node js,Ts and nodemailer'
                }

                Transporter.sendMail(mailDetails,(err,data)=>{
                    if(err){
                        console.log('Mail failed to send!!')
                    }
                    else{
                        console.log('Mail sent successfully!!!',data.response)
                    }
                })
             }
             else{
                return res.status(403).json({status:'error'})
             }
         }
         else{
             return res.status(500).json({status:'error',error:'Password validation failed'})
         }
    }
})
app.post('/userDetails',async(req,res)=>{
    const {token} = req.body;
    try {
        const user = jwt.verify(token,JWT_SECRET)

        const useremail = user.user

        await userModels.findOne({Email:useremail})
        .then((data)=>{
           // console.log(data)
            return res.status(200).json({status:'ok',data:data})
        })
        .catch((err)=>{
            return res.status(403).json({status:'error',error:'Couldnt fetch user details,server down'})
        })
    } catch (error) {
        
    }

})
app.get('/fetchUsers',async(req,res)=>{

    const Users = await userModels.find({userType:'User'})
    if(!Users) return res.status(500).json({status:'error',error:'No users found!'})
    else{
        res.status(200).json({status:'ok',data:Users})
    }
})

app.all('*',(req,res)=>{
    res.json({message:'Page not Found'})
})

app.listen(8080,()=>console.log(`Server running`))