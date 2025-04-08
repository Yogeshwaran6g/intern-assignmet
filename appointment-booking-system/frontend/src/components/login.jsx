import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import Navbar from './Nav';
import {userLogin,userRegister} from '../services/myApi'

function LoginForm() {

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[name,setName]=useState('')
    const[page,setPage]=useState('login')
    const[error,setError]=useState(null)
    const navigate=useNavigate();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/

  async function handleSubmit(e){
    e.preventDefault()
    setError(null)
    
    try{
    if(page==='login'){
        
        if(!email || !password ) throw new Error('Fill all fields')
        if(!emailRegex.test(email)) throw new Error('Please enter a valid email')
        if(!passwordRegex.test(password)) throw new Error('Password must be 8+ chars with 1 letter and 1 number')
        setError("")
        console.log("passed")
        const userData={"usermail":email,"password":password}
        const result=  await userLogin(userData)
        console.log("result",result)
        
        if(result?.token){
          localStorage.setItem("token",result.token);
          localStorage.setItem("userId",result.id);
          navigate("/Doctor");
        }
        else{
          setError("Login failed try again" || result.message);
        }
      
    }else{

        if(!name||!email||!password) throw new Error('Fill all fields')
        if(!usernamePattern.test(name)) throw new Error('Username must be 3-20 chars (letters, numbers, _)')
        if(!emailRegex.test(email)) throw new Error('Invalid email format')
        if(!passwordRegex.test(password)) throw new Error('Password needs 8+ chars with 1 letter and 1 number')
          setError("")
        console.log("passed")
        const result= await userRegister({username:name,usermail:email,password,role:"patient"})
        if(result.user){
          setPage("login")
        }
        else{
          setError(result.message || "failed to register")
        }
    }
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <>
    <Navbar/>
    <div className="login-container">
      <div className="login-card">
      
      <h2 className="login-title">{page==='login'?'Login':'Register'}</h2>
      <p className="login-subtitle">Please {page==='login'?'login':'register'} to continue</p>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        
        {page==='register'&&(
        <div className="form-elements">
          <label>Username</label>
           <input type="text" value={name} onChange={e=>setName(e.target.value)} /></div>
        )}

        <div className="form-elements">
            <label>Email</label>
             <input type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>

        <div className="form-elements">
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        </div>

        <button type="submit" className="login-button">
          {page==='login'?
          'Login':'Register'}
        </button>

        <p className="register-link">
          {page==='login'?(<>Create a new account? <a onClick={()=>setPage('register')}>Register here</a></>)
          :
          (  <>Already have an account? <a onClick={()=>setPage('login')}>Login here</a></>)}
        </p>

      </form>
      </div>
    </div>
    </>
  )
}

export default LoginForm