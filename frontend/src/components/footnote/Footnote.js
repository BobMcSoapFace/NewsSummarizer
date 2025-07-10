import React, { useState } from 'react'
import "./Footnote.css"

function Footnote({data={appName:"undefined", initTime:"undefined"}}){
    return (
        <div class="footnote-box"> 
            <div class='title'>
                {data.appName}
            </div>
            <div class='separator'/>
            <div class='footnote-text'>
                Data: {typeof(data)}, initTime: {data.initTime}
            </div>
        </div>
    );
}

export default Footnote