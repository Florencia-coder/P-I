import React from 'react';
import{ useState } from 'react';
import { orderByName } from '../actions/index';
import { useDispatch } from 'react-redux';
import './Select.css';



export default function Select({cb, arrValue, arrName}){

    return(
        <select className='select' onChange={cb}>
            {
                arrValue?.map((value,indice)=>{
                    return(
                        <option className='style-option' value={value}>{arrName[indice]}</option>
                    )
                })
            }
        </select>
    )
}