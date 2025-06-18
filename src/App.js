import { Router, Route } from 'wouter';
import './index.css';
import Weather from './pages/Weather.js';
import NotFound from './pages/NotFound.js';

function App() {
  return (
    <Router>
      <Route path="/" component={Weather} />
      <Route path="/404" component={NotFound} />
    </Router>
  );
}

export default App;