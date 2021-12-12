const Router = require('express');
const axios = require('axios');
const { Recipe, Type } = require('../db.js')
const {APIKEY} = process.env;

const router = Router()

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


router.get('/:id', async(req, res,next)=>{
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
module.exports = router