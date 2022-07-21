import React from "react";
import './index.css';


const Footer = () => {
    return (
        <>
        <div  style={{display: 'flex', justifyItems: 'right', width:'100%'}}>
           <div className="footer" style={{display: 'flex', justifyContent: 'flex-end', width:'33%', fontWeight: 'bold'}}>
                <span>
                    Created by <a target='_blank' href="https://github.com/TommyHacker">Tom,</a>
                    <a target='_blank' href="https://github.com/SuperBrava">Stuart,</a>
                    <a target='_blank' href="https://github.com/syedmjavaid">Syed,</a> and 
                    <a target='_blank' href="https://github.com/solo-vlada">Vlada</a>
                </span>
            </div> 
        </div>

        </>
    )
}

export default Footer; 
