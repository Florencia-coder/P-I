const { Router } = require('express');
const { Type } = require('../db.js');
const axios = require('axios');
const { APIKEY } =process.env;

const router = Router();

router.get('/', async(req,res,next)=>{
    try{
    const typeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=5&addRecipeInformation=true`);
    const diets = typeApi.data.results.map(el =>el.diets);
    const typEach = diets.flat() //crea una nueva matriz con todos los elementos del sub-array
    
    for(let i=0; i<typEach.length;i++){
        await Type.findOrCreate({
            where:{name:typEach[i]}
        })
    }
    const allTypes = await Type.findAll();
    res.send(allTypes)

}catch(error){
    next(error)
}
} )

module.exports = router