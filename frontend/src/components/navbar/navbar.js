import React, { useState } from 'react'
import "./navbar.css"

//import { Link } from 'react-scroll'

/*
    borrowed code from https://github.com/fireclint/travel-react-app/blob/main/src/components/navbar/Navbar.js
*/
function Navbar(props){
    //navbar state
    const [nav, setNav] = useState(false)
    const handleNav = () => setNav(!nav)

    return (
        <div name='home' className={'navbar navbar-bg'}>
            <div className={'logo dark'}>
                <h2>NEWS SUMMARIZER</h2>
            </div>
        </div>
    )
}
export default Navbar