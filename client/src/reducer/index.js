
const initialState = {
    recipes : [],
    allRecipes :[],
    typesDiets: [],
    detail:[]
}

export default function rootReducer(state= initialState, action){
    switch (action.type) {
        case 'GET_RECIPES':
            return{
                ...state,
                recipes : action.payload,
                allRecipes : action.payload
            }
        case 'FILTER_BY_VALUE':
            const allRecipes = state.allRecipes;
            const valueFiltered = allRecipes && allRecipes.filter(el=>el.type.includes(action.payload))
            return{
                ...state,
                recipes: valueFiltered

            }
        case 'ORDER_BY_NAME':           //y por puntuacion
            let sortedArr = action.payload === 'asc' ?
            state.recipes.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }):
            state.recipes.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            });
            return{
                ...state,
                recipes : sortedArr
            }
        case 'ORDER_BY_POINTS':
            let sortedAr = action.payload === 'Z-A' ?
            state.recipes.sort(function(a,b){
                if(a.points > b.points){
                    return 1;
                }
                if(b.points > a.points){
                    return -1;
                }
                return 0;
            }):
            state.recipes.sort(function(a,b){
                if(a.points > b.points){
                    return -1;
                }
                if(b.points > a.points){
                    return 1;
                }
                return 0;
            });
            return{
                ...state,
                recipes : sortedAr
            }
        case 'GET_NAME_RECIPE':
            return{
                ...state,
                recipes : action.payload
            }
        case 'GET_TYPES':
            return{
                ...state,
                typesDiets: action.payload
            }
        case 'GET_DETAILS':
            return{
                ...state,
                detail:action.payload
            }
        default:
            return state;
    }
}