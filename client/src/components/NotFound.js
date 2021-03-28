import React from 'react'

const NotFound = () => {
    return (
        <div className="position-relative" style={{minHeight:'500px'}}>
            <h2 className="position-absolute text-secondary" 
            style={{top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
                404 | Not Found !!
            </h2> 
        </div>
    )
}

export default NotFound
