import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import store from 'store'
import { Provider } from 'react-redux'
import { getPokedex } from 'actions/PokedexActions'
import PokedexPage from 'pages/PokemonPage'
function App() {
	useEffect(() => {
		store.dispatch(getPokedex())
	}, [])
	return (
		<Provider store={store}>
			<Router>
				{/* <nav>
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
				</nav> */}
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
		</Provider>
	)
}

function About() {
	return <h2>About</h2>
}

function Users() {
	return <h2>Users</h2>
}

export default App
