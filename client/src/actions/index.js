import axios from 'axios';


export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:5000/recipes")
        return dispatch({
            type: 'GET_RECIPES',
            payload : json.data
        }) 
    }
}

export function getNameRecipe(payload){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:5000/recipes?name=" + payload);
            return dispatch({
                type : 'GET_NAME_RECIPE',
                payload : json.data
            })
        } catch(err) {
            console.log(err);
        }
    }
}

export function getTypesDiets(){
    return async function(dispatch){
        var json = await axios("http://localhost:5000/types")
        return dispatch({
            type:"GET_TYPES",
            payload: json.data
            })
    };
}

export function postRecipe(payload){
    return async function(dispatch){
        var response = await axios.post("http://localhost:5000/recipe", payload);
        console.log(payload)
        return response;
    }
}
export function filterRecipesByTypes(payload){
    console.log(payload)
    return{
        type:'FILTER_BY_VALUE',
        payload
    }
}

export function filterByHealty(payload){
    return{
        type:'FILTER_BY_HEALTY',
        payload
    }
}

export function orderByName(payload){
    return{
        type:'ORDER_BY_NAME',
        payload
    }
}

export function orderByPoints(payload){
    return{
        type:'ORDER_BY_POINTS',
        payload
    }
}
export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:5000/recipes/' + id);
            return dispatch({
                type: 'GET_DETAILS',
                payload:json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}