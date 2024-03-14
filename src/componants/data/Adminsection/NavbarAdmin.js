import React, { useContext, useState } from 'react';
import './sidebar.css'
import { MdAdminPanelSettings , MdOutlineArrowDropDown} from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from '../CreateContext';



const NavbarAdmin = () => {
  const{productDatas,setDogOrCat}=useContext(myContext)
  const [isOpen, setIsOpen] = useState(false);
  const [filterType,setFilterType]=useState('All Products')
  const navigate=useNavigate()
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const filteredData=filterType==='All Products'?
  productDatas:productDatas.filter((items)=>items.item===filterType)

return(
  <div className='nav-body'>
    
    <div className='nav-bar'>
      <div className='header'>
      <MdAdminPanelSettings className='head-icon' />
      </div>
      <div className='contents'>
       <h3>arshad</h3>
       <hr className='line'></hr>
       <Link to={'/'} className='contents-links'>Home</Link><br/>
       <hr className='line'></hr>
       <Link  onClick={toggleDropdown} className='contents-links' to={'/prodectadd'}>Prodects  <MdOutlineArrowDropDown /> </Link><br/>
       <hr className='line'></hr>
       {isOpen&&(
      <ul>
        <li><Link className='contents-links-li' onClick={()=>setDogOrCat("cat-food")}> Cat</Link></li>
        <li> <Link className='contents-links-li'onClick={()=>setDogOrCat("dog-food")}> Dog</Link></li>
        <li> <Link className='contents-links-li' onClick={()=>setDogOrCat("")}> All Products</Link></li>
      </ul>

       )}
      
       <Link to={'/user '} className='contents-links'>User</Link>
       <hr className='line'></hr>
      
       <h4  className='logout' onClick={()=>navigate('/')}    ><BiLogOutCircle /> Logout</h4>
      
      </div>
    </div>
    
  </div>
);
};
 
export default NavbarAdmin;
