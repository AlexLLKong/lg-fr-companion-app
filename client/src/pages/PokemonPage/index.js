import React from 'react'
import SearchBar from 'components/SearchBar'
import CardGrid from 'components/CardGrid'
import './PokedexPage.scss'
const mockContent = [
	<div style={{ width: 280, height: 400, border: 'solid' }}>
		<h1>Item 1</h1>
	</div>,
	<div style={{ width: 280, height: 400, border: 'solid' }}>
		<h1>Item 2</h1>
	</div>,
	<div style={{ width: 280, height: 400, border: 'solid' }}>
		<h1>Item 3</h1>
	</div>,
	<div style={{ width: 280, height: 400, border: 'solid' }}>
		<h1>Item 4</h1>
	</div>,
	<div style={{ width: 280, height: 400, border: 'solid' }}>
		<h1>Item 5</h1>
	</div>,
]
const PokedexPage = () => {
	return (
		<div className="container">
			<SearchBar />
			<CardGrid>{mockContent}</CardGrid>
		</div>
	)
}

export { PokedexPage as default }
