import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../actions"; 
import './searchBar.css';

export default function SearchBar(){
    const dispatch =useDispatch()
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipe(name))
        setName("")
    }

    return(
        <div className='search-bar'>
            <input 
            className='input-search'
            type= 'text' 
            placeholder= 'Search...'
            onChange={e=>handleInputChange(e)}
            />
            <button className='button-search' type='submit' onClick={e=>handleSubmit(e)}>search</button>

        </div>
    )
}