import React from 'react'
import SearchBar from 'components/SearchBar'
import './PokedexPage.scss'
const PokedexPage = () => {
	return (
		<div className="container">
			<SearchBar />
			<h1>Card grid goes here</h1>
		</div>
	)
}

export { PokedexPage as default }
