import React, { Fragment } from 'react' ; 
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipes, filterRecipesByTypes, orderByName, orderByPoints} from '../actions/index.js';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paged from './Paged.jsx';
import SearchBar from './SearchBar.jsx';
import './home.css';

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes);
    const [currentPage, setCurrentPage] =useState(1);
    const [recipePerPage, setRecipePerPage] = useState(9);
    const [ordenName, setOrdenName] = useState(''); 
    const [ordenPoints, setOrdenPoints] =useState('');
    const indexOfLastRecipe  = currentPage * recipePerPage; //9
    const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage; //0
    const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe); //0,1,2,3,4,5,6,7,

    function Paginado(numberPage){
        setCurrentPage(numberPage)
    }

    useEffect(()=>{
        dispatch(getRecipes())
    },[dispatch])
    console.log("Allrecipes:",allRecipes)
    // en select podriamos hacer un maps.

    function handleFilterValue(e){
        dispatch(filterRecipesByTypes(e.target.value))
    }

    function handleSortName(e){
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrdenName(`Ordenado ${e.target.value}`)
    }
    
    function handleSortPoints(e){
        dispatch(orderByPoints(e.target.value))
        setCurrentPage(1);
        setOrdenPoints(`Ordenado ${e.target.value}`)
    }

    return(
        
        <div className='home'>
            <div className='container-home'>
            <div className='createdRecipe'>
                <div className="middle">
            <Link className="btn btn1"to='/recipe'>Create Your Recipe!</Link>
               </div>
            </div>
            <h1 className='recipes'>RECIPES</h1>
            <div className='container_bar'>
            <select className='select select-1' onChange={e=>handleSortName(e)}>
                    <option value="asc">Name-Upward</option>
                    <option value="desc">Name-Falling</option>
                </select>
                <select className='select select-2' onChange={e=>handleSortPoints(e)}>
                    <option value="Z-A">Points-Upward</option>
                    <option value="A-Z">Points-FAlling</option>
                </select>
                <select className='select select-3' onChange={e=> handleFilterValue(e)}>
                    <option value="gluten free">Gluten Free</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="fodmap friendly">Fodmap Friendly</option>
                    <option value="whole 30">Whole 30</option>
                </select>
                <SearchBar/>
                </div> 
            </div>

            <div>
                <Paged recipePerPage={recipePerPage} allRecipes={allRecipes.length} Paginado={Paginado}s/>
                
                    <div className='container'>
                    {
                    currentRecipe?.map((c,i)=>{
                        return(
                            
                            <Fragment>
                                <div className='chill'>
                                <Link to={'/recipes/' + c.ID} className='link' >
                                    <Card key={i} name={c.name} image={c.img} type={c.type} id={c.id} />
                                </Link>
                                </div>
                            </Fragment>
                        )
                    })
                }
                    </div>
                
            </div>
        </div>
    )   
}