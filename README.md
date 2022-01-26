# Project - Food

## Resumen:
LA siguiente SPA es de recetas de comidas, donde se pueden apreciar ordenamientos por nombre, puntaje, filtros por tipo de dieta, etc. A continuación estan las instrucciones para poder correrlo, y seguidamente agrege un poco de vista grafica sobre el proyecto.

### ¿Como levantar la SPA?

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

 * __Node__: 12.18.3 o mayor
 * __NPM__: 6.14.16 o mayor

Para verificar que versión tienen instalada:

> node -v
> npm -v

### Como inicializar el SPA

- Despues de haber descargado el repositorio(y teniendo en cuanta los requerimientos anteriores) instalar las dependencias correspondientes con el siguiente comando: 'npm install' sin comillas.
- luego dentro de la carpeta api ejecutar el comando: npm start
- en la carpeta client ejecutar el mismo comando: npm start

## Inicio
Este landingpage es el que nos permite acceder al home.
<img src='https://github.com/Florencia2022/P-I/blob/master/img/landingpage.png'/>

## Recetas
Aca podemos ver el home del proyecto, donde tenemos las opciones de filtrado, creación de recetas, busqueda por nombre, paginación cada diez recetas, distintos tipos de recetas con sus respectivos detalles, etc.
<img src='https://github.com/Florencia2022/P-I/blob/master/img/home1.png'/>
<img src='https://github.com/Florencia2022/P-I/blob/master/img/home2.png'/>


## Búsqueda
En el searchBar, podemos buscar a las recetas por nombre, sin que importen las mayusculas o minusculas.
<img src='https://github.com/Florencia2022/P-I/blob/master/img/searchBar.png'/>


## Creación de receta
Al crear una receta, se verifica que no falten los campos importantes,caso contrario no deja crear a la receta y tambien tenemos la posibilidad de eliminar algún tipo de dieta agregado que ya no querramos.

<img src='https://github.com/Florencia2022/P-I/blob/master/img/createRecipe.png'/>
<img src='https://github.com/Florencia2022/P-I/blob/master/img/recipeCreateClick.png'/>


## Detalle de receta
Al clickear una receta,podemos ver el detalle de la misma con todas sus caracteristicas. Si en la receta creada no le agregamos imagen, la SPA le agregara una por default.
<img src='https://github.com/Florencia2022/P-I/blob/master/img/detailRecipe.png'/>
