import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css'
import PokedexPage from 'pages/PokemonPage'
function App() {
	return (
		<Router>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
					<li>
						<Link to="/users">Users</Link>
					</li>
				</ul>
			</nav>
			<Switch>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/users">
					<Users />
				</Route>
				<Route path="/">
					<PokedexPage />
				</Route>
			</Switch>
		</Router>
	)
}

function About() {
	return <h2>About</h2>
}

function Users() {
	return <h2>Users</h2>
}

export default App
