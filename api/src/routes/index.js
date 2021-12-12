const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Recipe, Type } = require ('../db'); 

const typesRouter = require('./typesRouter.js');
const recipeRouter = require('./recipeRouter');

APIKEY = `https://api.spoonacular.com/recipes/complexSearch?apiKey=25771101e23a4a109d5eacaec7b6526b&number=5&addRecipeInformation=true`


router.use( '/types', typesRouter );
router.use( '/recipe', recipeRouter );

const getApiInfo = async()=> {
    const apiUrl = await axios.get(APIKEY);
    const apiInfo = await apiUrl.data.results.map(el=>{
        return{
            name:el.title,
            img: el.image,
            ID: el.id,
            dishSummary: el.summary,
            points: el.weightWatcherSmartPoints,
            healthyLevel: el.healthScore,
            stepByStep: el.analyzedInstructions,
            type:el.diets,

        }
    })
    return apiInfo
}

const getDbInfo = async ()=> {
    return await Recipe.findAll({
        incluide:{
            model:Type,
            attibutes:['name'],
            through:{
                atributes: [],
            }
        }
    })
}

const getAllRecipes = async()=>{
    const apiInfo = await getApiInfo();
    const DbInfo = await getDbInfo();
    console.log('soy de base de datos:',DbInfo)
    const infoTotal = apiInfo.concat(DbInfo);
    return infoTotal;
}

router.get('/recipes',async (req,res, next)=>{
    try{
    const name = req.query.name;
    let recipeTotal = await getAllRecipes();
    if (name){
        let recipeName = await recipeTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        console.log(recipeName)
        recipeName.length ? 
        res.status(200).send(recipeName) :
        res.status(404).send('Lo sentimos, no se encuentra la receta.')
    }
    else{
        //res.status(404).send('No existe tal receta.')
        res.status(200).send(recipeTotal)
    }}
    catch(error){
        next(error)
    }
})


router.get('/recipes/:id', async(req, res)=>{
    try{
    const id = req.params.id;
    const recipeTotal = await getAllRecipes();
    console.log(recipeTotal)
    console.log(recipeTotal.length)
    if(id){
        let recipeId = await recipeTotal.filter(el => el.ID==id)
        recipeId.length ?
        res.status(200).json(recipeId) :
        res.status(404).send('No hay receta con ese id.')
    }}
    catch(error){
        next(error)
    }
})



module.exports = router;
