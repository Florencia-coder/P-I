import React from 'react';
import './Card.css';

export default function Card({name, image, type}){
    return(
        <div className='card'>
            <img className='img' src={image} alt="Image not found" />
            <h3 className='name'>{name}</h3>
            <ul className='detail'>
                {
                     type?.map(tip=> tip +', ')
                }
            </ul>
        </div>
    );
}