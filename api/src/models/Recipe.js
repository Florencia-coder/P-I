const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define('Recipe', {
    ID:{
      type: DataTypes.UUID, //nro random con letras y nros que no se repiten
      defaultValue: DataTypes.UUIDV4,   //Le damos un valor por default
      allowNull:false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dishSummary: {
      type : DataTypes.TEXT,
      allowNull:false
    },
    points: {
      type:DataTypes.INTEGER,
      allowNull: true
    },
    healthyLevel: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    stepByStep: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    CreatedInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  });
};
