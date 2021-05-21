import React from 'react'
import "./style/bottom.css"
import {Link} from "react-router-dom"

function Bottom() {
    return (
        <div className='div_main'>
            <div className='div_1'>
              <Link to="/profile" className="link_div1">
                <p>Profile</p>
              </Link>
            </div>
           <div classNam='div_2'>
               <Link to="/security" className="link_div2">
                  <p>الأمن و الأمان</p>
               </Link>
           </div>
          <div className='div_3'>
                <Link to="/" className="link_div3">
                    <p>اللغة</p>
                </Link> 
          </div>
        </div>
    )
}

export default Bottom

