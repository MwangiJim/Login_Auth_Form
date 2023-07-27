import React from 'react'

function Login() {
    const [Form,setForm]=React.useState({
        email:'',
        password:''
    })
 const HandleInput =(e:{target:{name:any,value:any}})=>{
    setForm((prevState)=>{
        return{
            ...prevState,
            [e.target.name]:e.target.value
        }
    })
 }
 const HandleForm = async(event:any) =>{
   event.preventDefault()

   await fetch('http://localhost:8080/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        email:Form.email,
        password:Form.password
    })
   })
   .then((res)=>res.json())
   .then((data)=>{
    if(data.status === 'ok'){
        window.localStorage.setItem('token',data.data)
        alert('Successfully Logged In!')
        window.location.assign('/')
    }
   })
   .catch((err)=>{
     console.log(err)
   })
 }
  return (
    <div>
        <form onSubmit={HandleForm}>
        <label>Email</label>
        <br/>
        <input
         type='email'
         className='input'
         placeholder='Email'
         onChange={HandleInput}
         value={Form.email}
         name='email'
         />
        <br/>
        <label>Password</label>
        <br/>
        <input
         className='input'
         type='password'
         placeholder='Password'
         onChange={HandleInput}
         name='password'
         value={Form.password}
         />
        <br/>
        <button 
        disabled={!Form.email ||
         !Form.password ? true:false}>Login</button>
          <p
         onClick={()=>window.location.assign('/register')}>Don't have Account?<small>Register here</small></p>
        </form>
    </div>
  )
}

export default Login
