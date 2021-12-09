import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/home';
import RecipeCreate from './components/RecipeCreate';
import RecipeDetail from './components/recipeDetail';
//Aca empezamos a codificar y pasar los componentes.
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/recipe' component={RecipeCreate}/>
        <Route exact path='/recipes/:id' component={RecipeDetail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
