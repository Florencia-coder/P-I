import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import './recipeDetail.css';

export default function RecipeDetail(props){
    const dispatch = useDispatch();
    console.log(props.match.params.id)

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const myRecipe = useSelector((state)=> state.detail)
    console.log(myRecipe)

    return(
        <div id='PP'>
        <div id='container-detail'>
            <Link to='/home'>
                <button id='back-button'>x</button>
            </Link>
            {
                myRecipe.length>0 ?
                <div>
                    <h1 id='name-detail'>{myRecipe[0].name}</h1>
                    {
                        myRecipe[0].img ?
                    <img id='image-detail' src={myRecipe[0].img} alt="Image not found" width="300px" height="300px"/> :
                    <img id='image-detail' src='https://img.freepik.com/foto-gratis/dos-copas-vino-tinto-sabroso-plato-queso-fruta-uva-nueces-pan-tostado-plato-cocina-madera-sobre-fondo-piedra-negra_155003-32341.jpg?size=626&ext=jpg' alt="Image not found" width="300px" height="300px"/>
                    }
                    <p id='summary'>{myRecipe[0].dishSummary.replace(/<[^>]*>?/g,"")}</p>
                    <h4 id='type-diets'>Diets: {myRecipe[0].type}</h4>
                    <h4 id='points'>Weight Watcher Smart Points: {myRecipe[0].points}</h4>
                    <p className='diets'>
                        STEPS: 
                        {
                            Array.isArray(myRecipe[0].stepByStep) ? 
                            myRecipe[0].stepByStep.map((e) => e.steps.map((f,i)=> f.step)) : myRecipe[0].stepByStep
                        }
                    </p> 

                </div> : 
                <p id='loading'>Loading...</p>
            }
        </div>  
        </div>    
        
    )
}