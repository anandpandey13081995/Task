import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Dashboard from "./pages/DashBoard";
import Login from './pages/Login';

function App() { 
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/dashboard" exact component={Dashboard}/>
          
          <Route path="/" component={NotFound}/>

        </Switch>
      </div>
    </Router>
  );
}

function NotFound() {
    return (
        <div>
            404 Not Found!
        </div>
    )
}

export default App;