import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  let [user,setuser]=React.useState(null)
  const [userType,setUserType] = React.useState(null);
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
     // console.log(data)
      setuser(data)
      setUserType(data.data.userType)
    })
 },[])
 //console.log(user)
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/register' element={ <Register/>}></Route>
        <Route path='/' element={user?<Home type={userType}/>:<Register/>}></Route>
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
