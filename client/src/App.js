import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from 'store'
import { Provider } from 'react-redux'
import { getPokedex } from 'actions/PokedexActions'
import PokedexPage from 'pages/PokemonPage'
import TeamPage from 'pages/TeamPage'
import Navbar from 'components/Navbar'
function App() {
	useEffect(() => {
		store.dispatch(getPokedex())
	}, [])
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
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
