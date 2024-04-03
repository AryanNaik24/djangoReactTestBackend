import React from 'react'
import api from '../api'
import { useNavigate,Navigate } from 'react-router'
import { useState } from 'react'
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../constants'
import "../styles/Form.css";
import LoadingIndicator from './LoadingIndicator'

function Form({route,method}) {

    const [username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);

    const name = method === "login"? "Login":"Register";
    const name2 = method === "login"? "Register":"Login";


    const navigate = useNavigate();

    const handleSubmit =async (e)=>{
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method==="login") {
                localStorage.setItem(ACCESS_TOKEN,res.data.access);
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
                navigate("/");
            }else{
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
        
    }

    const reglog = ()=>{
        if (name2==="Login"){
            // <Navigate path="/login"/>
            navigate("/login");
        }else if (name2==="Register") {
            // <Navigate path="/register"/>
            navigate("/register");
        }
    };


  return (
    <form onSubmit={handleSubmit} className='form-container'>
        <h1>{name}</h1>
        <input className='form-input' type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='Username'/>
        <input className='form-input' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'/>
        {loading && <LoadingIndicator/>}
        <button className='form-button' type='submit'>{name}</button>
        <br />
        
        <button className='form-button' onClick={reglog()}>{name2}</button>
        

    </form>
  )
}

export default Form