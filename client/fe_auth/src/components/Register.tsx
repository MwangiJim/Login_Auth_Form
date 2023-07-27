import React from 'react'

function Register() {
    const [Form,setForm] = React.useState({
        email:'',
        username:'',
        password:'',
        secret:'',
        country:'',
        phonenumber:'',
        position:'',
    })
    const [State,setState] = React.useState({
       choice:'',
       admin:'Admin',
       user:'User'
    })
    const setAuth=(e: { target: {
        value: any ,name: any 
} })=>{
        setState((prevState)=>{
            return{
                ...prevState,
                [e.target.name]:e.target.value
            }
        })
    }
    const HandleInput=(event:{target:{
        value: any, name:any
}})=>{
      setForm((prevForm)=>{
        return{
            ...prevForm,
            [event.target.name]:event.target.value
        }
      })  
    }
    const HandleForm =async(e: any)=>{
      e.preventDefault()
      if(State.choice === 'Admin' && Form.secret !== 'P@ssword@[123]'){
        alert('You are not Authorized Admin')
      }
      else{
        await fetch('http://localhost:8080/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:Form.email,
                password:Form.password,
                phonenumber:Form.phonenumber,
                country:Form.country,
                username:Form.username,
                role:Form.position,
                userType:State.choice
            })
          })
          .then((res)=>{
            alert('User successfully registered'+ State.choice)
            window.location.assign('/login')
          })
      }
    }
  return (
    <div>
        <form onSubmit={HandleForm}>
            <h3>Auth Form</h3>
        <label>Register as:</label>
         <label>User</label>
        <input
          type='radio'
          onChange={setAuth}
          value={State.user}
          name='choice'
        />
         <label>Admin</label>
        <input
         type='radio'
         onChange={setAuth}
         value={State.admin}
         name='choice'
        />
     {State.choice === 'Admin' && <div>
      <label>Secret Key</label>
      <br/>
        <input
         className='input'
         type='text'
         onChange={HandleInput}
         name='secret'
         value={Form.secret}
         placeholder='Secret-Key'
        />
      </div>}
      <br/>
        <label>Username</label>
        <br/>
        <input
        type='text'
         className='input'
        placeholder='Username'
        onChange={HandleInput}
        value={Form.username}
        name='username'
         />
        <br/>
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
        <label>Country</label>
        <br/>
        <input
         type='text'
         className='input'
         placeholder='Country'
         onChange={HandleInput}
         value={Form.country}
         name='country'
         />
        <br/>
        <label>PhoneNumber</label>
        <br/>
        <input
         type='text'
         className='input'
         placeholder='PhoneNumber'
         onChange={HandleInput}
         value={Form.phonenumber}
         name='phonenumber'
         />
        <br/>
        <label>Position/Role</label>
        <br/>
        <input
         type='text'
         className='input'
         placeholder='Position/Role'
         onChange={HandleInput}
         value={Form.position}
         name='position'
         />
        <br/>
        <label>Password</label>
        <br/>
        <input
         className='input'
         type='password'
         placeholder='Password'
         onChange={HandleInput}
         value={Form.password}
         name='password'
         />
        <br/>
        <button 
        disabled={!Form.email ||
         !Form.password ||
         !Form.username ?true:false}>Create Account</button>
         <p
         onClick={()=>window.location.assign('/login')}>Already have Account?<small>Login</small></p>
        </form>
    </div>
  )
}

export default Register