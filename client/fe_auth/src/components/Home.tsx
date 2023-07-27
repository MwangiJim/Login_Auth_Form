import React, { useEffect } from 'react'
import User from './User'
type userProps={
  type:String | null
}
type dataProps = {
  Name:String,

}
function Home({type}:userProps) {
  const[Users,setUsers] = React.useState([])
  const[user,setuser] = React.useState<dataProps>()

    React.useEffect(()=>{
        fetch('http://localhost:8080/userDetails',{
         method:'POST',
         headers:{'Content-Type':'application/json'},
         body:JSON.stringify({
             token:window.localStorage.getItem('token')
         })
        })
        .then((res)=>res.json())
        .then((data)=>{
          //console.log(data)
          setuser(data)
        })
     },[])
     function Logout(){
      window.localStorage.clear()
      window.location.assign('/register')
     }
     useEffect(()=>{
       fetch('http://localhost:8080/fetchUsers')
       .then((res)=>res.json())
       .then((data)=>{
        console.log(data)
        let userInfo = data.data.map((user:any)=>{
          return{
             id:user._id,
             email:user.Email,
             phonenumber:user.phoneNumber,
             name:user.Name,
             position:user.Role,
             country:user.Country
          }
        })
        setUsers(userInfo)
       })
     },[])
     console.log(user)
  return (
    <div>
      <h3>Welcome to your HomePage</h3>
      {type === 'Admin'?<div className='dashboard'>
      <div className='header'>
        <div>Id</div>
        <div>Name</div>
        <div>Email</div>
        <div>Country</div>
        <div>PhoneNumber</div>
        <div>Role</div>
      </div>
      <div className='users'>
         {Users.map((user:any)=>{
          return(
            <User 
            key={user.id}
            name= {user.name}
            email= {user.email}
            phonenumber= {user.phonenumber}
            position={user.position}
            country={user.country}
            id={user.id}
            />
          )
         })}
      </div>
      </div>:<h1>Welcome</h1>}
        <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default Home