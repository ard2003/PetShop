import React, { useContext, useState } from 'react';
import './sidebar.css'
import { MdAdminPanelSettings , MdOutlineArrowDropDown} from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';
import Prodect from './Prodect';
import { myContext } from '../CreateContext';
import AllCollection from '../pages/AllColection';


const NavbarAdmin = () => {
  const{productDatas}=useContext(myContext)
  const [isOpen, setIsOpen] = useState(false);
  const [filterType,setFilterType]=useState('All Products')
  

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
       <Link  onClick={toggleDropdown} className='contents-links'>Prodects  <MdOutlineArrowDropDown /> </Link><br/>
       <hr className='line'></hr>
       {isOpen&&(
      <ul>
        <li><Link className='contents-links-li' > Cat</Link></li>
        <li> <Link className='contents-links-li'> Dog</Link></li>
        <li> <Link className='contents-links-li' to={'/prodectadd'}> All Products</Link></li>
      </ul>

       )}
      
       <Link to={'/user '} className='contents-links'>User</Link>
       <hr className='line'></hr>
       <h4  className='logout'><BiLogOutCircle /> Logout</h4>
      </div>
    </div>
    
  </div>
);
};
 
export default NavbarAdmin;
