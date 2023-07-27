import React from 'react'

type UserTypes = {
    name:string,
    email:string,
    country:String,
    phonenumber:string,
    position:String,
    id:String
}
function User({name,email,country,phonenumber,position,id}:UserTypes) {
  return (
    <div className='user_box'>
      <div>{id}</div>
        <div>{name}</div>
        <div>{email}</div>
        <div>{country}</div>
        <div>{phonenumber}</div>
        <div>{position}</div>
    </div>
  )
}

export default User