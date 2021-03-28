import React from 'react';
import "./App.css"; 

function Tweet({name, information, message, pr}){
    return(
        <div className="tweet">
            <h3>{name}</h3>
            <p>{information}</p>
            <h3>{message}</h3>
            <h3>{pr}</h3>
        </div>
    )
}

export default Tweet ;