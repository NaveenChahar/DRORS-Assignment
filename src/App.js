import logo from './logo.svg';
import {createBrowserHistory} from 'history';
import './App.css';
import Login from './Components/login/login';
import Commandcentre from './Components/admin/commandcentre'
import {Router,Route,Switch} from 'react-router';

function App() {
  const history= createBrowserHistory();
  return (
    <div className="App">
      <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/commandcentre" component={Commandcentre}></Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
