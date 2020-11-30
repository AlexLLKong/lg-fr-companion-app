import React, { useEffect, useState } from 'react'
import SearchBar from 'components/SearchBar'
import { filterPokedex } from '../../actions/PokedexActions'
import { addPokemontoTeam } from '../../actions/TeamActions'
import Pokeball from 'components/Pokeball-animation'
import './PokedexPage.scss'

import { connect } from 'react-redux'

const PokedexPage = ({
	data,
	pokedex,
	isDataLoading,
	isPokedexLoading,
	filterPokedex,
	addPokemontoTeam,
}) => {
	let [query, setQuery] = useState('')

	const handleSetQuery = e => {
		setQuery(e.target.value.toLowerCase())
	}

	useEffect(() => {
		filterPokedex(data, query, addPokemontoTeam)
	}, [data, query, filterPokedex, addPokemontoTeam])

	return isDataLoading || isPokedexLoading ? (
		<div className="loadingPokeball">
			<Pokeball />
		</div>
	) : (
		<div className="container">
			<SearchBar onChangeHandler={handleSetQuery} />
			{pokedex}
		</div>
	)
}
const mapStatetoProps = state => ({
	data: state.pokedex.data,
	pokedex: state.pokedex.dex,
	isDataLoading: state.pokedex.isDataLoading,
	isPokedexLoading: state.pokedex.isPokedexLoading,
})

export default connect(mapStatetoProps, { filterPokedex, addPokemontoTeam })(
	PokedexPage
)
