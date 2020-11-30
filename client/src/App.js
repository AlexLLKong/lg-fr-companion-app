import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from 'store'
import { Provider } from 'react-redux'
import { getPokedex } from 'actions/PokedexActions'
import PokedexPage from 'pages/PokemonPage'
import TeamPage from 'pages/TeamPage'
import AboutPage from 'pages/AboutPage'
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
					<Route path="/about">
						<AboutPage />
					</Route>
					<Route path="/">
						<PokedexPage />
					</Route>
				</Switch>
			</Router>
		</Provider>
	)
}

export default App
