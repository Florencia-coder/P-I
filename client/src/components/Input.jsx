import React from 'react';
import './Input.css';


export default function Input({nameLabel, value,name, cb}){
    return(
        <div id='container-label'>
            <label className='style-label'>{nameLabel}</label>
            <input className='style-input'
                    type='text' 
                    value={value} 
                    name={name} 
                    onChange={cb}
                    />
        </div>
    )
}