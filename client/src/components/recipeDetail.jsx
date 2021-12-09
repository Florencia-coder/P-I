import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function RecipeDetail(props){
    const dispatch = useDispatch();
    console.log(props.match.params.id)

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const myRecipe = useSelector((state)=> state.detail)
    console.log(myRecipe)

    return(
        <div>
            {
                myRecipe.length>0 ?
                <div>
                    <h1>{myRecipe[0].name}</h1>
                    <img src={myRecipe[0].img} alt="Image not found" width="300px" height="300px"/>
                    <p>{myRecipe[0].dishSummary.replace(/<[^>]*>?/g,"")}</p>
                    <h4>Diets: {myRecipe[0].type}</h4>
                    <h4>Weight Watcher Smart Points: {myRecipe[0].points}</h4>
                    <h4>Pasos:</h4>
                    <p>
                        {
                            Array.isArray(myRecipe[0].stepByStep) ? 
                            myRecipe[0].stepByStep.map(e => e.steps.map(f => f.step)) : myRecipe[0].stepByStep
                        }
                    </p> 

                </div> : <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Back</button>
            </Link>
        </div>      
        
    )
}