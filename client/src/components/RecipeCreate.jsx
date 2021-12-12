import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import { getTypesDiets, postRecipe } from "../actions";
import Input from "./Input";
import './recipeCreate.css'

function validate(input){
    let errors = {}
    if(!input.name){
        errors.name = 'Title is required';
    }
    if(!input.dishSummary){
        errors.dishSummary = 'Dish Summary is required';
    }
    return errors
}

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

    const [errors, setError] =useState({});
    
    function handleChange(e){
        setInput((input)=>{
            const newInput={
                ...input,
                [e.target.name] : e.target.value
            }
            const errors = validate(newInput);
            setError(errors);

            return newInput
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

            <Link to='/home'><button id='button-back'>x</button></Link>

            <h1 id='title'>¡Create Your Recipe!</h1>

            <form className='style-form' onSubmit={e=>handleSubmit(e)}>
                <Input 
                className={errors.name && "danger"}
                nameLabel={'Name:'}
                value={input.name}
                name={'name'}
                cb={e=>handleChange(e)}
                />
                {
                    errors.name && <p className='error'>{errors.name}</p> 
                }

                <Input
                className={errors.dishSummary && 'danger'}
                nameLabel={'Dish Summary:'}
                value={input.dishSummary} 
                name={'dishSummary'} 
                cb={e=>handleChange(e)}
                />
                {errors.dishSummary && <p className='error'>{errors.dishSummary}</p>}

                <Input
                nameLabel={'Points:'}
                value={input.points}
                name={'points'}
                cb={e=>handleChange(e)}
                />

                <Input
                nameLabel={'Healthy Level:'}
                value={input.healthyLevel} 
                name={'healthyLevel' }
                cb={e=>handleChange(e)}
                />

                <Input
                nameLabel={'Step By Step:'}
                value={input.stepByStep} 
                name={'stepByStep'} 
                cb={e=>handleChange(e)}
                />
                <div id='select-style'>
                <select id='select'onChange={e=>handleSelect(e)}>
                    {typediets.map(type=>{
                        return(
                        <option value={type.name}>{type.name}</option>
                        )
                    })}
                </select>
                {
                    input.typeDiets?.map(el=>
                        <div id='container-detailType'>
                            <p id='style-type'>{el}</p>
                            <button id='button-type' onClick={()=>handleDelete(el)}>x</button>
                        </div>
                    )
                }
                </div>
                <button id='button-create' disabled={Object.keys(errors).length ? true : false} type='submit'>Create Recipe!</button>
            </form>
        </div>

    )
}