import React, { Fragment } from 'react' ; 
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipes, filterRecipesByTypes, orderByName, orderByPoints, filterByHealty} from '../actions/index.js';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paged from './Paged.jsx';
import SearchBar from './SearchBar.jsx';
import Select from './Select.jsx';
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


    function handleSortHealty(e){
        dispatch(filterByHealty(e.target.value))
        console.log(e.target.value)
    }

    return(
        
    <div className='home'>
        <div className='container-home'>
                <div className='container_bar'>

                    <Select 
                    cb={e=>handleSortName(e)} 
                    arrValue={['asc', 'desc']} 
                    arrName={['Name-Ascendent','Name-Descendent']}
                    />

                    <Select
                    cb={e=>handleSortPoints(e)}
                    arrValue={["Z-A","A-Z"]}
                    arrName={['Points-Ascendent','Points-Descendent']}
                    />

                    <Select
                    cb={e=>handleSortHealty(e)}
                    arrValue={["Healty-Asc","Healty-Desc"]}
                    arrName={['HealtyLevel-Ascendent', 'HealtyLevel-Descendent']}
                    />

                    <Select
                    cb={e=> handleFilterValue(e)}
                    arrValue={['gluten free', 'dairy free', 'lacto ovo vegetarian', 'vegan', 'paleolithic', 'primal', 'pescatarian', 'fodmap friendly', 'whole 30']}
                    arrName={['Gluten Free', 'Dairy Free', 'Lacto Ovo Vegetarian', 'Vegan', 'Paleolithic', 'Primal', 'Pescatarian', 'Fodmap Friendly', 'Whole 30']}
                    />

                </div> 
                <div id='container-title'>
                <h1 className='recipes'>FIND THE BEST FOOD RECIPES HERE!</h1>
                <h5 id='resume'>Welcome to the page with the best food recipes, a wide variety of healthy dishes, meats, fish, desserts, and more, where we include all the nutritional data in the detail of each recipe. We also give you the facility to search for the desired recipe by filtering it and also to create your own recipe!</h5>
                <div className="middle">
                    <Link className="btn btn1"to='/recipe'>Create Your Recipe!</Link>
               </div>
                </div>
            <SearchBar/>
        </div>

            <div>
                <Paged recipePerPage={recipePerPage} 
                allRecipes={allRecipes.length} 
                Paginado={Paginado}
                />
                
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