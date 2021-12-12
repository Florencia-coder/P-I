import React from "react";
import './Paged.css';
                                //9         //50            function
export default function Paged({recipePerPage, allRecipes, Paginado}){
    const pageNumbers = []
                                    //5
    for(let i=0 ; i< Math.ceil(allRecipes/recipePerPage); i++){
        pageNumbers.push(i+1)
    }
    
    return(
        <nav id='container-nav'>
            <ul class="pagination">
                {
                    pageNumbers.map((number)=>{
                        return(
                            <li className='li' onClick={()=>Paginado(number)}><a href="#">{number}</a></li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}