const Router = require('express');
const { Type, Recipe } = require('../db.js');

const router = Router();


router.post('/', async (req, res, next)=>{
    try{
    let {
        ID,
        name,
        dishSummary,
        points,
        healthyLevel,
        stepByStep,
        CreatedInDb, 
        type
    } = req.body;

    let recipeCreated = await Recipe.create({
        ID,
        name,
        dishSummary,
        points,
        healthyLevel,
        stepByStep,
        CreatedInDb,
        type
    });

    let typeDb = await Type.findAll({
        where: {name:type}
    })

    await recipeCreated.addType(typeDb)
    res.send('Receta creada con exito.')
}
catch(err){
    next(err)
}})

module.exports  = router