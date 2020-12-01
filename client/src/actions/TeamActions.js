import {
	ADDED_TO_TEAM,
	TYPES_LOADING,
	TYPES_LOADED,
	MODIFY_USER_INFO,
	REMOVE_FROM_TEAM,
} from './types'
import { Pokedex } from 'pokeapi-js-wrapper'
import { v4 as uuidv4 } from 'uuid'
const options = {
	cache: true,
	cacheImages: true,
}
const P = new Pokedex(options)
const dummyMove = {
	move: { name: '-' },
	version_group_details: [{ level_learned_at: 0 }],
}
const userInfo = {
	nickname: '',
	level: 1,
	nature: 'hardy',
	moves: [
		{ ...dummyMove },
		{ ...dummyMove },
		{ ...dummyMove },
		{ ...dummyMove },
	],
}
export const addPokemontoTeam = pokemon => {
	return {
		type: ADDED_TO_TEAM,
		payload: { ...pokemon, userInfo, rosterId: uuidv4() },
	}
}

export const removePokemonFromTeam = rosterId => {
	return { type: REMOVE_FROM_TEAM, payload: rosterId }
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

export const modifyUserInfo = (member, newUserInfo) => dispatch => {
	member.userInfo = { ...newUserInfo }
	dispatch({ type: MODIFY_USER_INFO, payload: member })
}
