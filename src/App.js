import { Router, Route, Switch } from 'wouter';
import Weather from './pages/Weather';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Weather} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;