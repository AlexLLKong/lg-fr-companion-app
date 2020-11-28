import { ADDED_TO_TEAM, TYPES_LOADING, TYPES_LOADED } from './types'
import { Pokedex } from 'pokeapi-js-wrapper'

const options = {
	cache: true,
	cacheImages: true,
}
const P = new Pokedex(options)
export const addPokemontoTeam = pokemon => {
	return { type: ADDED_TO_TEAM, payload: pokemon }
}

export const getTypes = () => dispatch => {
	dispatch({ type: TYPES_LOADING })
	const typeIds = Array.from(Array(17), (_, x) => x + 1)
	P.getTypeByName(typeIds)
		.then(res => {
			const typeChart = new Map()

			for (let i = 0; i < res.length; i++) {
				for (let j = 0; j < res.length; j++) {
					typeChart.set(`${res[i].name} ${res[j].name}`, {
						name: res[j].name,
						effectiveness: 1,
					})
				}
			}

			res.forEach(type => {
				type.damage_relations.double_damage_to
					.filter(y => y.name !== 'fairy')
					.forEach(x2 =>
						typeChart.set(`${type.name} ${x2.name}`, {
							name: x2.name,
							effectiveness: 2,
						})
					)
				type.damage_relations.half_damage_to
					.filter(y => y.name !== 'fairy')
					.forEach(xhalf =>
						typeChart.set(`${type.name} ${xhalf.name}`, {
							name: xhalf.name,
							effectiveness: 0.5,
						})
					)
				type.damage_relations.no_damage_to
					.filter(y => y.name !== 'fairy')
					.forEach(x0 =>
						typeChart.set(`${type.name} ${x0.name}`, {
							name: x0.name,
							effectiveness: 0,
						})
					)
			})
			dispatch({
				type: TYPES_LOADED,
				payload: { res: [...res], typeChart: typeChart },
			})
		})
		.catch(err => console.log(err))
}
