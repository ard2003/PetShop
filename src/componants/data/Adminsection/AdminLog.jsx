import React, { useState } from 'react'
import './Adminlog.css'
import toast from 'react-hot-toast'
import AdminDtl from './AdminDtl'
import { useNavigate } from 'react-router-dom'

const AdminLog = () => {
    const[logValue,setLogValue]=useState('')
    const admin=AdminDtl[0]
    const navgate=useNavigate()

    const handleChange=(e)=>{
        const{name,value}=e.target;

        setLogValue({...logValue,[name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!logValue.username||!logValue.email||!logValue.password) {
            toast.error('fill the input field')
        }else if(
            logValue.username===admin.Username&&logValue.email===admin.email&&logValue.password===admin.password

            
        ){
            toast.success('login succesfull')
            navgate('/navbaradmin')
        }else{
            toast.error('invalid user')
        }

        
    }

  return (
    <div className='logbody'>
        <div className='input-body'>
            <div className='header'>Login</div>
            <form onSubmit={handleSubmit}>
            <div className='content'>
                <input type="text" placeholder='username' className='input-log' name='username' value={logValue.username} onChange={handleChange}/>
                <br />
                <input type="email" placeholder='email' className='input-log' name='email' value={logValue.email} onChange={handleChange}/>
                <br />
                <input type="password"placeholder='password' className='input-log ' name='password' value={logValue.password} onChange={handleChange}/>
                <br />
                <button className='log-btn' >Login</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default AdminLog