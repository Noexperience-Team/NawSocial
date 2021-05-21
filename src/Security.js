import React from 'react'
import "./style/security.css"

function Security() {
    return (
        <div className='main'>
                <div class='adressmail'>
                    <input type='text' placeholder='زيد ادريس ميل أخرى هنا'/>
                    <p>زيد ادريس ميل أخرى  </p>
                </div>

                <div class='changemdp'>
                    <input type='text' placeholder='بدل المطبس هنا'/>
                    <p> بدل المطبس </p>
                </div>


                <div class='contact'>
                    <input type='text' placeholder='زيد كونتاكت هنا'/>
                    <p>زيد كونتاكت</p>
                </div>

                <div class='addnumero'>
                    <input type='text' placeholder='زيد نومروك هنا'/>
                    <p> زيد نومروك</p>

                </div>

                <button>إنرجستراي</button>

         </div>

    
    )
}

export default Security
