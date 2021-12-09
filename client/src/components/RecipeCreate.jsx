import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import { getTypesDiets, postRecipe } from "../actions";
import './recipeCreate.css'

export default function RecipeCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const typediets = useSelector((state)=>state.typesDiets)

    const [input, setInput] = useState({
        name: "",
        dishSummary: "",
        points: "",
        healthyLevel: "",
        stepByStep: "",
        typeDiets: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            typeDiets : [...input.typeDiets,e.target.value ]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipe(input))
        alert('Reciped Created!!')
        setInput({
            name: "",
            dishSummary: "",
            points: "",
            healthyLevel: "",
            stepByStep: "",
            typeDiets: []
        })
        history.push('/home')
    }

    function handleDelete(el){
        setInput({
            ...input,
            typeDiets: input.typeDiets.filter(type=> type !== el)
        })
    }

    useEffect(()=>{
        dispatch(getTypesDiets());
    },[]);

    return(
        <div id='container-create'>
            <Link to='/home'><button>Back</button></Link>
            <h1>Create Your Recipe!</h1>
            <form onSubmit={e=>handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                    type='text' 
                    value={input.name} 
                    name='name' 
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Dish Summary:</label>
                    <input 
                    type='text' 
                    value={input.dishSummary} 
                    name='dishSummary' 
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Points:</label>
                    <input 
                    type='text' 
                    value={input.points} 
                    name='points' 
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Healthy Level:</label>
                    <input 
                    type='text' 
                    value={input.healthyLevel} 
                    name='healthyLevel' 
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Step By Step:</label>
                    <input 
                    type='text' 
                    value={input.stepByStep} 
                    name='stepByStep' 
                    onChange={handleChange}
                    />
                </div>

                <select onChange={e=>handleSelect(e)}>
                    {typediets.map(type=>{
                        return(
                        <option value={type.name}>{type.name}</option>
                        )
                    })}
                </select>
                {
                    input.typeDiets?.map(el=>
                        <div>
                            <p>{el}</p>
                            <button onClick={()=>handleDelete(el)}>x</button>
                        </div>
                    )
                }
                <button type='submit'>Create Recipe!</button>
            </form>
        </div>
    )
}