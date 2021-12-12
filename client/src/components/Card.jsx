import React from 'react';
import './Card.css';

export default function Card({name, image, type}){
    return(
        <div className='card'>
            {
                image ?
                <img className='img' src={image} alt='Image not found' /> :
                <img className='img' width='312px' height='231px' src='https://img.freepik.com/foto-gratis/dos-copas-vino-tinto-sabroso-plato-queso-fruta-uva-nueces-pan-tostado-plato-cocina-madera-sobre-fondo-piedra-negra_155003-32341.jpg?size=626&ext=jpg' alt='image not founds'/>
            }
            <h3 className='name'>{name}</h3>
            <ul className='detail'>
                {
                     type?.map(tip=> tip +', ')
                }
            </ul>
        </div>
    );
}