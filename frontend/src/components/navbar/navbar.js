import React, { useState } from 'react'
import "./navbar.css"
import {BiSearch} from 'react-icons/bi'
import {HiOutlineMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'


//import { Link } from 'react-scroll'

/*
    borrowed code from https://github.com/fireclint/travel-react-app/blob/main/src/components/navbar/Navbar.js
*/
function Navbar(props){
    //navbar state
    const [nav, setNav] = useState(false)
    const handleNav = () => setNav(!nav)

    return (
        <div name='home' className={nav ? 'navbar navbar-bg' : 'navbar'}>
            <div className={nav ? 'logo dark' : 'logo'}>
                <h2>NEWS SUMMARIZER</h2>
            </div>
            <ul className="nav-menu">
                {/* <Link to='home' smooth={true} duration={500} ><li>Home</li></Link> */}
            </ul>
            <div className="nav-icons">
                 <BiSearch className='icon' style={{ marginRight: '1rem' }} /> 
            </div>
            <div className="hamburger" onClick={handleNav}>
                {!nav ? (<HiOutlineMenuAlt4 className='icon' />) : (<AiOutlineClose style={{ color: '#000' }} className='icon' />) }

            </div>

            <div className={nav ? 'mobile-menu active' : 'mobile-menu'}>
                <ul className="mobile-nav">
                    {/* <Link to='home' smooth={true} duration={500} ><li>Home</li></Link> */}
                </ul>
                <div className="mobile-menu-bottom">
                    <div className="menu-icons">
                        <button>Search</button>
                        <button>Account</button>
                    </div>
                    <div className="social-icons">
                        {/* <FaFacebook className='icon' /> */}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Navbar