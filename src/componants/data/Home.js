import React from 'react'
import Navbar from './Navbar'
import '../data/style css/Home.css'
import { useNavigate,Link } from 'react-router-dom';

const Home = () => {
  const sNavigate=useNavigate()
  return (
    <>
    <Navbar />
    <div className='home'>
      
        
       <div className='content'>
        <h3><span>Hi</span> welcome to our petfood shop </h3>
        <button className='btn-home' onClick={()=>sNavigate('/colection')}>shop now</button>
        <Link to={"/adminlog"}>ard</Link> 
       </div>
    
   </div>
   </>
  )
}

export default Home