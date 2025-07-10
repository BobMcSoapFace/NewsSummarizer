import React from 'react'

function Separator({mult=5}){
    return(
        <div style={{width:20*mult + "px", height: 20*mult + "px"}}/>
    )
}
export default Separator