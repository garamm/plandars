import './App.css';
import { Route } from 'react-router-dom';

import Login from './pages/Login.js'
import Home from './pages/Home.js'

function App() {
	return (
		<div>
			<Route exact path="/" component={Home}/>
			<Route path="/login" component={Login}/>
		</div>
	);
}

export default App;
