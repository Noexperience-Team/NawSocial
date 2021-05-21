import React from 'react'
import "./style/profil.css"

function Profil() {
    return (
        <div className='main'>
                <div class='name'>
                    <input type='text' placeholder='بدل إسمك هنا'/>
                    <p>بدل إسمك  </p>
                </div>

                <div class='lastname'>
                    <input type='text' placeholder='بدل اللقب هنا'/>
                    <p>بدل اللقب </p>
                </div>

                <div class='age'>
                    
                    <input type='text' placeholder='نهار'/>
                    <input type='text' placeholder='شهر'/>
                    <input type='text' placeholder='عام'/>
                    <p>بدل عمرك </p>

                </div>

                
                <div class='parcour'>
                    <input type='text' placeholder='زيد بركور هنا'/>
                    <p>زيد بركور</p>

                </div>

                <button>إنرجستراي</button>

         </div>

    
    )
}

export default Profil
