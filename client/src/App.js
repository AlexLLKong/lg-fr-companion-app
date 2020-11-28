import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import store from 'store'
import { Provider } from 'react-redux'
import { getPokedex } from 'actions/PokedexActions'
import PokedexPage from 'pages/PokemonPage'
import TeamPage from 'pages/TeamPage'
function App() {
	useEffect(() => {
		store.dispatch(getPokedex())
	}, [])
	return (
		<Provider store={store}>
			<Router>
				<nav>
					<ul>
						<li>
							<Link to="/">Pokedex</Link>
						</li>
						<li>
							<Link to="/team">Team</Link>
						</li>
						<li>
							<Link to="/users">Users</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<Route path="/team">
						<TeamPage />
					</Route>
					<Route path="/users">
						<Users />
					</Route>
					<Route path="/">
						<PokedexPage />
					</Route>
				</Switch>
			</Router>
		</Provider>
	)
}

function Users() {
	return <h2>Users</h2>
}

export default App
