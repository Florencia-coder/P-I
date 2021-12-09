const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const axios = require('axios');
const { Recipe, Type } = require ('../db'); 
APIKEY = `https://api.spoonacular.com/recipes/complexSearch?apiKey=02cc3a7001ce449aa23c75c0da28075a&number=5&addRecipeInformation=true`

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
            model:Type,     //Para que me traiga el TIPO de receta
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

router.get('/recipes',async (req,res)=>{
    const name = req.query.name;
    let recipeTotal = await getAllRecipes();
    console.log(recipeTotal.length)
    if (name){
        let recipeName = await recipeTotal.filter(el => el.name.includes(name));
        console.log(recipeName)
        recipeName.length ? 
        res.status(200).send(recipeName) :
        res.status(404).send('Lo sentimos, no se encuentra la receta.')
    }
    else{
        //res.status(404).send('No existe tal receta.')
        res.status(200).send(recipeTotal)
    }
})


router.get('/recipes/:id', async(req, res)=>{
    const id = req.params.id;
    const recipeTotal = await getAllRecipes();
    console.log(recipeTotal)
    console.log(recipeTotal.length)
    if(id){
        let recipeId = await recipeTotal.filter(el => el.ID==id)
        recipeId.length ?
        res.status(200).json(recipeId) :
        res.status(404).send('No hay receta con ese id.')
    }
})//falta agregar que tengo que traer tambien el tipo de receta(podria hacerlo virtual)


router.get('/types', async(req,res)=>{
    const typeApi = await axios.get(APIKEY);
    const diets = typeApi.data.results.map(el =>el.diets);
    const typEach = diets.flat()
    for(let i=0; i<typEach.length;i++){
        await Type.findOrCreate({
            where:{name:typEach[i]}
        })
    }
    const allTypes = await Type.findAll();
    res.send(allTypes)
} )

router.post('/recipe', async (req, res)=>{
    try{
    let {
        ID,
        name,
        dishSummary,
        points,
        healthyLevel,
        stepByStep,
        CreatedInDb,    //en el postamn no se la paso, pero me tiene que llegar, por default true
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

    let typeDb = await Type.include({
        where: {name:type}
    })

    recipeCreated.addType(typeDb)
    res.send('Receta creada con exito.')
}
catch(err){
    console.log(err)
}})

module.exports = router;
