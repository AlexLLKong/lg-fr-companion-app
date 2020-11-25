import axios from 'axios'
import {
	POKEDEX_LOADED,
	POKEDEX_LOADING,
	POKEDEX_DATA_LOADING,
	POKEDEX_DATA_LOADED,
} from './types'
import Card from '../components/Card'
import CardGrid from '../components/CardGrid'
const getAllKantoPokemon = () => {
	let retArr = []
	for (let i = 1; i <= 151; i++) {
		retArr.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`))
	}
	return retArr
}
export const getPokedex = () => async dispatch => {
	dispatch({ type: POKEDEX_DATA_LOADING })
	try {
		const res = await axios.all(getAllKantoPokemon())
		dispatch({
			type: POKEDEX_DATA_LOADED,
			payload: res.map(response => response.data),
		})
	} catch (e) {
		console.log(e)
	}
}
export const filterPokedex = (data, query = '') => dispatch => {
	dispatch({ type: POKEDEX_LOADING })

	const cards = generateCards(configureData(data), query)
	dispatch({
		type: POKEDEX_LOADED,
		payload: cards,
	})
}
const configureData = dataResponse => {
	return dataResponse.map(x => ({
		title: x.name,
		image: x.sprites.other.dream_world.front_default,
		id: x.id,
		tags: x.types.map(type => ({
			text: type.type.name,
			type: type.type.name,
		})),
		buttonActions: [
			{
				name: 'Temp',
				function: () => console.log('button works'),
			},
		],
	}))
}

const generateCards = (data, query) => {
	return (
		<CardGrid>
			{data
				.filter(x => (query ? x.title.includes(query) : x))
				.map(x => (
					<Card key={x.id} {...x} />
				))}
		</CardGrid>
	)
}
