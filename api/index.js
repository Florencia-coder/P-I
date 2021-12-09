//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios = require('axios');
const server = require('./src/app.js');
const { conn, Recipe } = require('./src/db.js');


// Syncing all the models at once.
// conn.sync({ force: false }).then(async() => {
//   let resDb = Recipe.findAll();
//   if(resDb.length ===0){
//   try{
//     let res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=90508d199f504ca086aae6ea7e0f5ce1&number=100&addRecipeInformation=true`,{})
//     let api = res.data.results
//     api && api.map(async el => await Recipe.findOrCreate({
//         name: el.title,
//         dishSummary: el.summary,
//         points: el.weightWatcherSmartPoints,
//         healthyLevel: el.healthScore,
//         stepByStep: JSON.stringify(el.analyzedInstructions)
//     }))
//   }catch(error){
//     console.log(error)
//   }
//   server.listen(5000, () => {
//     console.log('%s listening at 5000'); // eslint-disable-line no-console
//   });
// }
// })

conn.sync({ force: false }).then(() => {
  console.log('Base de datos conectada. ')
  server.listen(5000, () => {
    console.log('%s listening at 5000'); // eslint-disable-line no-console
});
});
